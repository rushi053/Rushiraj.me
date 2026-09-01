export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  emoji: string;
  content: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'ai-built-app-audit-checklist',
    title: 'The AI-Built App Audit Checklist: What I Check Before You Charge Real Users',
    excerpt: 'Before auditing anyone else\'s app, I audited my own six products. I found a paywall that was pure CSS blur, an AI feature that had been silently dead for six months, and a contact form that faked success. Here\'s the full checklist.',
    date: '2026-09-02',
    readTime: '11 min',
    tags: ['Audits', 'Security', 'AI', 'Indie Dev', 'Building in Public'],
    emoji: '🔍',
    content: `
I need to start with a confession.

I haven't audited anyone else's app yet. What I have done is audit my own six products — the two that make money, line by line; the rest end to end — the way an attacker and a paying customer would. I built every one of them with heavy AI assistance, shipped fast, and assumed things worked because the UI said they did.

Here's what I found in software I wrote, tested, and charged money for:

- A paywall that was **pure CSS blur**. The full "locked" document was sitting in the DOM. Anyone who opened dev tools could read every premium doc, and had been able to since launch.
- An AI generation feature that had been **silently dead for about six months**. Missing environment keys after a migration, no error surfaced anywhere. Paying customers were getting static templates and neither they nor I knew.
- **No payment webhook.** Purchase success was handled entirely client-side. If the redirect back from checkout failed, a paying customer got nothing, and there was no server-side record to fix it from.
- A contact form that **faked success with a \`setTimeout\`** — spinner, green checkmark, "message sent" — while delivering nothing. The "backup" Supabase table it supposedly wrote to had never been created.
- A local repo that was **9 months behind production** — I work across multiple machines, and the one I was building on had never pulled a redesign that shipped from another. One deploy from the stale clone would have silently wiped that redesign; it was caught hours before it happened.
- A license "restore purchase" flow that **had never worked once**, because the purchase flow never captured the customer's email in the first place. There was nothing to restore against.

Six findings, every one in software I believed was working. And every single one was invisible from the UI — the apps looked finished, felt finished, and demoed perfectly.

That's the specific danger of AI-built apps. Tools like Lovable, Bolt, v0, Cursor, and Replit are extremely good at making things *look* done. The happy path works in the demo. What they don't guarantee is that the paths you can't see — webhooks, error handling, database rules, the gap between "the button turned green" and "the thing actually happened" — exist at all.

So before you charge real users, run this checklist. It's the one I built from my own wreckage. Each item includes a way to check it in about ten minutes with no special tools.

## 1. Payments & Entitlements Integrity

This is where the most expensive failures live, because it's where money changes hands based on logic nobody verified.

**Check: does a webhook actually exist?**

Client-side success handling means your app grants access when the browser comes back from checkout and says "paid." Browsers crash. Tabs close. Redirects fail. When that happens, you've taken money and delivered nothing — and you have no server-side record to make it right.

*Ten-minute check:* open your Stripe (or Razorpay, or Paddle) dashboard and look for a configured webhook endpoint. Then look for the handler in your codebase — search for \`webhook\` and for the signature verification call (\`constructEvent\` for Stripe). If the dashboard has no endpoint, or the code grants entitlements anywhere *except* the webhook handler, you have my bug. Buy your own product in test mode, close the tab immediately after paying, and see whether you got what you paid for.

**Check: is the paywall real or cosmetic?**

My "locked" documents were blurred with a CSS filter. The content was fully present in the page — the lock was an instruction to the browser, politely asking it not to show something it already had.

*Ten-minute check:* open a locked page, right-click, View Page Source (or open dev tools and delete the blur/overlay element). If the premium content is readable, your paywall is decoration. The fix is server-side: gated content should never be sent to a client that hasn't paid. Same test for "hidden" premium features — check whether the API endpoint behind them validates entitlement, or just trusts that the button was hidden.

**Check: can a customer recover their purchase?**

My restore flow failed for a reason one layer deeper than the flow itself: the purchase never captured an email. There was no identifier to restore against. AI tools build the flow you asked for; they don't ask whether the data it depends on exists.

*Ten-minute check:* buy in test mode, clear your cookies (or open an incognito window), and try to get your purchase back using only what a real customer would have — the receipt email. If you can't, neither can they, and every device change or cleared cache is a refund request.

## 2. Silent-Failure Detection

My AI generation feature didn't crash. That was the problem. The code caught the missing-API-key error, fell back to a static template, and returned it with a 200. Everything green, feature dead, for six months.

AI-generated code loves this pattern — \`try/catch\` blocks that swallow errors and return something plausible. It looks like robustness. It's actually a mechanism for hiding breakage from you indefinitely.

**Check: do your critical paths fail loudly?**

*Ten-minute check:* pick your most important feature — the one people pay for. In a local environment, delete the API key it depends on and use the feature. If you see a clear error, good. If you get a plausible-looking result, you have a silent failure waiting for the day a key expires, a quota runs out, or an env var doesn't survive a migration. Mine didn't survive one, and no alarm existed to tell me.

*Ten-minute check:* grep your codebase for \`catch\` and read every block. Any catch that returns fallback content, an empty array, or \`null\` without logging *and* alerting is a place your app can die without telling you. You don't need a monitoring stack on day one — a \`console.error\` you actually read, or an email to yourself, beats a swallowed exception.

**Check: does the output actually vary?**

If your "AI-powered" feature returns suspiciously consistent results, test it: run the same request twice, then run two very different requests. Static-template fallbacks produce identical structure with the nouns swapped. I should have noticed. I didn't look.

## 3. Auth & Data Security (Including Supabase RLS)

Most AI-built apps I've studied use Supabase, and most of the horror stories trace to the same root: Row Level Security either disabled or written by an AI that optimized for "make the error go away."

**Check: is RLS actually on, and are the policies real?**

The anon key in your frontend JavaScript is public — that's by design. RLS policies are the *only* thing standing between that public key and your entire database. A policy of \`USING (true)\` on a table of user data means anyone with your URL and anon key (both visible in your page source) can read every row.

*Ten-minute check:* in the Supabase dashboard, open each table and confirm RLS is enabled. Then read the policies — not their names, their conditions. Anything that doesn't reference \`auth.uid()\` (or an equivalent ownership check) on user-scoped data deserves suspicion. For a live test: copy your anon key from your deployed site's source, and from a terminal try to select another user's rows. If it works for you, it works for anyone.

**Check: what's exposed in the client bundle?**

*Ten-minute check:* view source on your deployed app and search for \`key\`, \`secret\`, and \`sk_\`. Anything prefixed \`NEXT_PUBLIC_\` (or the equivalent in your framework) ships to every visitor. Anon keys and publishable keys are fine there. Service-role keys, API keys for OpenAI or Resend, and anything with "secret" in the name are not — and AI tools will happily put them there if the alternative is a CORS error.

**Check: can users reach each other's data through the API?**

*Ten-minute check:* create two test accounts. Log in as user A, open dev tools, and find a request that fetches A's data — then replay it with B's IDs swapped in. If it returns B's data, your authorization lives in the UI, not the backend.

## 4. Lead & Contact Flows

The contact form is the least glamorous feature on your site, and the one whose failure you'll never hear about — by definition, the people it fails are the ones trying to reach you.

Mine was worse than broken. It was *theater*: a \`setTimeout\`, a success animation, and no network request that delivered anything. The AI that built it was asked for a contact form and produced something indistinguishable from one, right up to the part where a message would arrive.

**Check: send yourself a message.**

*Ten-minute check:* fill out your own contact form on the live production site — not localhost — and confirm the message arrives where you'd actually see it. Then check the failure path: what does the user see if delivery fails? If the answer is "the same success state," you're lying to your leads.

**Check: does the backup exist?**

If your form claims to save submissions to a database as a fallback, open the database and look for the table. Mine didn't have one. The insert failed silently on every submission — see section 2 — and the email path was fake, so the total delivery rate was zero.

*Ten-minute check:* submit the form, then look at the actual table rows and the actual inbox. Trust nothing that you haven't watched arrive.

## 5. Deploy & Repo Hygiene

This category feels bureaucratic until it costs you a redesign. It nearly cost me mine: I build across multiple machines, and the clone I was working from had quietly fallen 9 months behind the branch production actually deploys from. My local repo said one thing, production said another, and building "new" features on the stale clone came within hours of rolling back an entire redesign.

**Check: does your repo match production?**

*Ten-minute check:* run a fresh build from a clean clone of the branch production deploys from and compare it to the live site. A few pages is enough — if the copy, styles, or features differ from what your working copy would produce, you have drift, and every deploy is a loaded gun. The fix is a rule, not a tool: production only changes through the repo, and every machine pulls before it builds. No server-side edits, no "I'll sync later," no exceptions.

**Check: can you deploy from scratch?**

*Ten-minute check:* clone your repo to a new directory and try to run it using only what's in the README. Missing env vars, undocumented setup steps, and dependencies that only exist on your machine all surface immediately. Every one of them is a thing that breaks the day you're deploying under pressure — which is the only day deploys break.

**Check: are your env vars accounted for?**

List every environment variable your code reads (grep for \`process.env\`), and compare it against what's configured in your hosting dashboard. My six-months-dead AI feature was exactly this: a key that existed in one environment and not the other, with no startup check to notice. A ten-line script that asserts required env vars at boot would have saved me half a year of selling a broken feature.

## The Point of All This

Every item on this list was invisible in the UI. That's the pattern worth internalizing: **the failures that matter in AI-built apps are almost never on the happy path.** The demo works. The screenshots are real. The gaps are in webhooks, catch blocks, database policies, and the space between a green checkmark and an event that actually occurred.

You can run everything above yourself in an afternoon. Genuinely — the ten-minute checks are the audit. If you built your app with AI tools and you're about to put a price on it, block out three hours and go through each section with dev tools open and a test card ready.

And if you'd rather have someone who's seen these exact failures do it: I now do this professionally. $500, fixed. You get a prioritized report in 3 business days covering everything above — payments integrity, silent failures, auth and data security, lead flows, deploy hygiene — with reproduction steps and fixes ranked by severity. If I find nothing critical, half your money comes back. The details are on my [services page](/services).

Either way, run the checklist before your users run it for you. Mine did, for six months, and nobody told me.
`,
  },
  {
    slug: '3000-downloads-zero-marketing-budget',
    title: '3,000 Downloads with $0 Marketing: My App Store SEO Playbook',
    excerpt: 'How CashLens hit 3,000 downloads and a 4.8★ rating with zero ad spend. Real App Store Connect data, keyword strategy, and the Reddit post that changed everything.',
    date: '2026-02-21',
    readTime: '10 min',
    tags: ['App Store', 'ASO', 'CashLens', 'Marketing', 'iOS'],
    emoji: '📈',
    content: `
CashLens has been downloaded over 3,000 times. It has a 4.8-star rating from real users. My total marketing spend is exactly $0.

No paid ads. No influencer deals. No App Store Search Ads. No TikTok campaigns. Just a privacy-first expense tracker, some strategic decisions, and one Reddit post that snowballed into everything.

Here's the complete playbook with real numbers from App Store Connect.

## The Numbers (January–February 2026)

Let me start with actual data, not vibes:

| Metric | Value | Benchmark |
|--------|-------|-----------|
| Total downloads | 3,000+ | — |
| App Store impressions (30-day) | 3,410 | +35% month-over-month |
| Product page views (30-day) | 666 | +19% MoM |
| Conversion rate | 14.78% | Above 75th percentile |
| Rating | 4.8★ (6 ratings) | Top tier |
| Day 7 retention | 5.56% | 25th percentile (room to improve) |
| Revenue | ~$0 | Tip jars only, no Pro yet |

That conversion rate is the key number. **14.78% means roughly 1 in 7 people who see the product page download the app.** The App Store average for finance apps is around 8-10%. So something about the listing is working.

## Where the Downloads Come From

App Store Connect breaks down sources:

| Source | Percentage |
|--------|-----------|
| App Store Search | 73.6% |
| App Store Browse | 12.4% |
| Web Referral | 8.2% |
| App Referral | 5.8% |

**73.6% from search.** That's almost three-quarters of all downloads coming from people typing something into the App Store and finding CashLens. This is the entire game — App Store Optimization (ASO).

## The ASO Strategy

### 1. Name + Subtitle Are Everything

Your app name and subtitle are the two most powerful keyword fields. Apple gives you:
- **App name:** 30 characters
- **Subtitle:** 30 characters
- **Keyword field:** 100 characters (hidden from users)

CashLens uses:
- **Name:** CashLens - Personal Finance
- **Subtitle:** Private Expense Tracker

Every word is deliberate. "Personal Finance" catches people searching that category. "Private" and "Expense Tracker" hit two high-volume keywords. No wasted characters on fluff like "The Best" or emojis.

### 2. The Keyword Field Strategy

You get 100 characters for hidden keywords. No spaces — use commas to separate. Here's the approach:

**Don't repeat words already in your name or subtitle.** Apple indexes those automatically. If your app is called "CashLens - Personal Finance," you don't need "personal" or "finance" in the keyword field.

**Use singular, not plural.** Apple matches both. "budget" matches "budget" and "budgets." Save the character.

**Think like your user.** What would someone frustrated with their current expense tracker type? "no subscription," "offline," "no account," "simple." These are long-tail keywords with less competition.

**Include misspellings and variations.** "expence" is a common typo. "money tracker" is an alternative to "expense tracker." "spending" vs "expenses."

### 3. Screenshots Tell the Story

I use 5 screenshots. Each one answers a specific objection:

1. **First screenshot:** Shows the main dashboard — clean, minimal, no clutter. Answers "Is this app well-designed?"
2. **Second screenshot:** Highlights "100% Private — No accounts, no cloud, no tracking." Answers "Is my data safe?"
3. **Third screenshot:** Shows spending categories with charts. Answers "Can I actually track meaningful data?"
4. **Fourth screenshot:** Demonstrates subscription tracking and recurring expenses. Answers "Does it handle my subscriptions?"
5. **Fifth screenshot:** Shows the weekly digest feature. Answers "Will this help me long-term?"

**The order matters.** Most people only see the first 2-3 screenshots before deciding. Lead with design (visual appeal) and privacy (your differentiator).

### 4. The Description Nobody Reads (But Apple Does)

Your long description isn't indexed for search, but it affects conversion. People who scroll down to read it are on the fence — they need one more push.

My structure:
- **First line:** One sentence that nails the value prop. "Track your spending without giving up your privacy."
- **Feature list:** Bullet points, not paragraphs. Scannable.
- **Social proof:** "4.8★ on the App Store" (once you have it)
- **Privacy commitment:** Explicit paragraph about what data you DON'T collect. This converts the privacy-conscious crowd.

## The Reddit Post That Changed Everything

In early January 2026, I posted on r/iOSProgramming. The title was something like "I built a privacy-first expense tracker — no accounts, no cloud, everything stays on your device."

**Why it worked:**
- Developers appreciate privacy-first architecture
- The "no accounts, no cloud" hook is unusual enough to click
- I was genuinely asking for feedback, not hard-selling
- I responded to every single comment

That post got ~200 upvotes and drove the first wave of downloads. But more importantly, **those early users left the 5-star reviews that boosted my App Store ranking**, which drove organic search traffic, which drove more downloads.

This is the flywheel: **Reddit → early adopters → reviews → search ranking → organic downloads → more reviews → higher ranking.**

I also posted on r/privacy, r/personalfinance, and r/apple — each time with a different angle:
- r/privacy: "Most expense trackers collect your financial data. I built one that doesn't."
- r/personalfinance: "Free expense tracker with no ads, no subscriptions, no accounts."
- r/apple: "SwiftUI expense tracker — everything runs locally on your device."

Same app, different framing for different audiences. Each subreddit cares about different things.

## The Geographic Surprise

My top download markets:

| Country | Downloads (30-day) |
|---------|-------------------|
| India | 65 |
| USA | 37 |
| Brazil | 21 |
| Germany | 15 |
| UK | 12 |

**Brazil at #3 was completely unexpected.** I had zero marketing there, zero localized content, and no Portuguese keywords. Turns out the privacy angle resonates globally — especially in countries with growing digital privacy awareness.

**Lesson:** Don't assume your market. Let the data tell you where to invest. I'm now planning Portuguese and German localizations based on this data.

## What's NOT Working

Honesty time:

**Day 7 retention is 5.56%.** That's 25th percentile — meaning 75% of finance apps retain users better after a week. This tells me people download, try it, and many don't come back.

Possible reasons:
- No push notification reminders to log expenses
- No habit-building features (streaks, daily prompts)
- Manual entry only — no bank sync (by design, for privacy)
- Users might prefer the convenience of Mint/YNAB despite privacy tradeoffs

**Revenue is basically zero.** Tip jars exist but rarely get used. This is fine for now — the strategy is to build audience first, then add a Pro tier with genuinely new features. Not locking existing features behind a paywall. Ever.

**No virality mechanism.** CashLens has no reason for users to tell other people about it. There's no "shared budgets" or "split expenses with friends" feature. Every download is acquired independently. That's expensive (in effort) and limits growth.

## The Playbook (Steal This)

If you're launching an iOS app with no budget:

### Before Launch
1. **Research keywords with App Store Search Ads.** Even if you don't run ads, the keyword suggestion tool shows search volume. Use it for free.
2. **Design screenshots that answer objections.** Not screenshots that show features — screenshots that convince someone to download.
3. **Write your Reddit posts before launch.** Draft 3-4 posts for different subreddits, each with a different angle.

### Launch Week
4. **Post on Reddit first.** Developers, then niche communities, then broader ones. Respond to every comment.
5. **Ask for reviews (but not annoyingly).** After the user has logged 10+ expenses, prompt once. Never more than once.
6. **Monitor App Store Connect daily.** Watch which keywords drive impressions. Double down on what works.

### Post-Launch
7. **Iterate keywords monthly.** The App Store is dynamic. Keywords that didn't work at launch might work later as your app gains authority.
8. **Localize for surprise markets.** Check your geographic data. If a country shows up unexpectedly, add basic localization — even just translated keywords and screenshots can 3x downloads there.
9. **Cross-promote from your other products.** If you have a website, blog, or other apps — link to each other. Every backlink and every cross-reference helps.
10. **Build the review flywheel.** Great reviews → better ranking → more downloads → more reviews. Protect this at all costs. Fix bugs fast. Respond to feedback.

## What's Next for CashLens

I'm working on CashLens Pro — new features behind a subscription, while everything that's currently free stays free forever. The first Pro feature will be budget limits with notifications. Followed by advanced charts, export to CSV, and widgets.

The goal isn't to maximize revenue from existing users. It's to make the free version so good that it keeps growing organically, while Pro converts the power users who want more.

3,000 downloads with $0 spent. Not bad for a solo dev in Ahmedabad with no marketing budget and a lot of chai.

---

*CashLens is free on the [App Store](https://apps.apple.com/us/app/cashlens-personal-finance/id6743153951). If you try it, I'd genuinely love to hear what you think — [@rushirajjj on X](https://x.com/rushirajjj).*
`,
  },
  {
    slug: 'cursor-claude-ship-mvp-3-weeks',
    title: 'How I Ship an MVP in 3 Weeks with Cursor + Claude',
    excerpt: 'My exact workflow for building Savvit — a full-stack AI app with iOS frontend, Node.js backend, and 8-region global support — in 21 days using Cursor IDE and Claude.',
    date: '2026-02-20',
    readTime: '12 min',
    tags: ['Cursor', 'Claude', 'AI', 'Vibe Coding', 'Tutorial'],
    emoji: '⚡',
    content: `
Three weeks ago, I had an idea: an app that tells you whether to buy something now or wait for a better price. Today, [Savvit](https://savvit.app) has a live backend serving 8 global markets, an iOS app in final polish, and a landing page ranking on Google.

I built all of it with Cursor IDE and Claude. Here's exactly how — not the hype version, the real one.

## Why Cursor + Claude (and Not Just Copilot)

I've used GitHub Copilot, ChatGPT, and raw Claude in the browser. They're all useful. But Cursor with Claude is a different category entirely because of one thing: **codebase awareness**.

When I tell Cursor "add region-aware pricing to the Perplexity service," it doesn't just generate code. It reads my existing \`perplexity.ts\`, understands my \`region-config.ts\` data structure, checks how I'm handling caching in \`cache.ts\`, and generates code that actually fits. No hallucinated imports. No invented function signatures.

That's the difference between "AI that writes code" and "AI that writes code *for your project*."

### My Model Strategy

I don't use one model for everything:

| Task | Model | Why |
|------|-------|-----|
| Architecture decisions, complex logic | **Claude Opus 4.6** | Best reasoning, worth the cost for foundational code |
| UI components, quick features | **Claude Sonnet 4** | Fast, good enough for 90% of tasks |
| Bug fixes, small tweaks | **Claude Sonnet 4** | Speed matters more than depth |
| Design specs, planning docs | **Claude Opus 4.6** | Needs to understand the full picture |

**Cost:** About $20-30/week during active development. That's less than a single hour of freelance dev time.

## The Savvit Timeline: Week by Week

### Week 1: Architecture + Backend (Days 1-7)

**Day 1: The Spec**

Before writing a single line of code, I spent 4 hours with Claude Opus writing a comprehensive product spec. This is the most important step that most people skip.

I didn't say "build me a price comparison app." I described the *problem*:

> "Users Google 'should I buy MacBook now or wait' and get SEO spam. I want an app where you type a product name, and AI tells you: buy now (green), wait (yellow), or don't buy (red) — with actual price data, retailer links, and reasoning."

From that conversation, Claude helped me design:
- Database schema (5 tables in Supabase)
- API architecture (Node.js + Hono on Render)
- AI pipeline (Perplexity for price search → Gemini for verdict)
- Revenue model (freemium + affiliate links)

**Days 2-4: Backend Core**

This is where Cursor shines. I created the project structure manually (I always do this — don't let AI scaffold your entire project), then used Cursor's Agent mode for the heavy lifting.

My workflow for each backend feature:

1. **Write the interface first** — I define TypeScript types manually. This is my contract with the AI.
2. **Prompt Cursor with context** — "Implement the Perplexity price search service. It should accept a product name + region, query Perplexity Sonar for current prices across major retailers in that region, and return structured price data matching the PriceResult interface."
3. **Review the diff** — Cursor shows you exactly what it wants to change. I accept ~70% as-is, modify ~20%, reject ~10%.
4. **Test immediately** — I run the code before moving on. AI-generated code that isn't tested is a liability.

The Perplexity integration took 2 hours. The Gemini verdict engine took 3 hours. Caching layer, 1 hour. Authentication middleware, 30 minutes.

**Days 5-7: Global Expansion**

This is the part that would've taken weeks without AI. I needed the backend to support 8 markets (India, US, UK, Germany, Canada, Australia, Japan, France) — each with different retailers, currencies, sale calendars, and deal types.

I built India first (manually), then told Cursor: "Using region-config.ts as the template, extend this to support US, UK, DE, CA, AU, JP, FR. Each region needs: trusted retailer list with domains, currency code, locale, and region-specific deal types (e.g., bank offers for India, cashback for US, VAT deals for Germany)."

Claude generated 200+ lines of region config that was about 85% correct. I spent an hour fixing edge cases (UK using "GB" internally but "UK" in user-facing code, Japan needing different price formatting). Without AI, this would've been a full day of research per region.

### Week 2: iOS App (Days 8-14)

**The Two-Machine Setup**

I build iOS on my MacBook Pro M3 Max (faster Xcode builds) and backend on the Mac Mini. Code syncs via GitHub. This matters because Cursor with Claude Opus on the MacBook gives me the best possible iOS development experience.

**Days 8-10: Core Views**

For SwiftUI, my Cursor workflow changes slightly. I write a detailed design spec first (font sizes, colors, spacing, component hierarchy), save it as \`DESIGN-SPEC-v2.md\` in the project, and reference it in every prompt:

"Build SearchView.swift following DESIGN-SPEC-v2.md. Light theme first (white bg, #F5F5F5 cards). Search bar at top, results as cards below. Each card shows product name, verdict badge (green/yellow/red), price range, and retailer count."

The key insight: **give Claude the design system, not pixel-perfect mockups.** It's much better at implementing a coherent system than matching a screenshot.

**Days 11-12: Data Flow**

MVVM architecture with SwiftUI. I wrote the ViewModel interfaces myself and let Cursor implement the networking, state management, and error handling. This is the sweet spot — you define the contracts, AI fills in the implementation.

One pattern that works incredibly well:

\`\`\`
// I write this:
protocol SearchViewModelProtocol: ObservableObject {
    var searchText: String { get set }
    var results: [ProductResult] { get }
    var isLoading: Bool { get }
    func search() async
}

// Then tell Cursor: "Implement SearchViewModel conforming to this protocol.
// Use APIClient for network calls. Handle loading states, errors,
// and cache results locally."
\`\`\`

Claude generates a complete, working ViewModel in seconds. Including proper \`@Published\` properties, async/await handling, and error states. I'd estimate this saves 30-40 minutes per ViewModel.

**Days 13-14: Polish**

Onboarding screens, settings with region picker, PostHog analytics integration, App Store review prompt after 3rd search. Each of these is a 15-30 minute task with Cursor. Without AI, each would be 1-2 hours.

### Week 3: Launch Prep (Days 15-21)

**Landing Page (1 evening)**

The Savvit website is static HTML/CSS — no framework needed for a marketing page. I told Cursor to build it section by section, referencing the app's design language (blue + lime accent, Inter font, dark sections for contrast).

Full SEO implementation took another hour: structured data (WebSite, SoftwareApplication, FAQPage), Open Graph tags, sitemap, robots.txt, security headers. This is where AI saves the most tedious time — SEO boilerplate is mind-numbing to write manually.

**App Store Assets (2 days)**

Screenshots, metadata, description, keywords. Claude helped write the App Store description targeting "should I buy now or wait" — the exact query people type into Google.

## The Mistakes (And How AI Caused Them)

It's not all magic. Here's what went wrong:

### 1. Hallucinated URLs
Early on, I asked Perplexity to return retailer URLs for products. It confidently returned URLs that didn't exist. \`amazon.in/dp/B0FAKE123\` — looks real, completely made up. **Fix:** Generate search URLs instead of direct product links. Never trust LLM-generated URLs.

### 2. Server-Side Scraping Failure
Claude suggested scraping Amazon and Flipkart server-side to extract product names from URLs. Sounds reasonable. Except these sites block cloud server IPs with CAPTCHAs and 403s. **Fix:** Client-side URL resolution on the iOS device, which has a real browser user agent.

### 3. Over-Reliance on AI for Architecture
I initially let Claude design the entire caching strategy. It was "correct" but over-engineered — a multi-layer cache with TTLs, invalidation hooks, and Redis support. For an MVP. **Fix:** I replaced it with a simple in-memory Map with a 1-hour TTL. 10 lines instead of 200.

### 4. The 8GB RAM Lesson
My Mac Mini has 8GB RAM. Claude generated a TypeScript build script that OOM-killed the machine. It had no idea about my hardware constraints because I never told it. **Fix:** Push to GitHub, let Render build. Always tell the AI about your constraints.

**The pattern:** AI fails when it lacks context about the real world — hardware limits, API behavior, network conditions. It excels at pure logic and code generation. Know the boundary.

## My Rules for AI-Assisted Development

After shipping 6 products with AI assistance, here's my framework:

**1. You define architecture. AI implements.**
Never let AI make structural decisions. Database schema, API design, state management patterns — these are yours. Let AI fill in the functions within your structure.

**2. Write interfaces first, implementations second.**
TypeScript interfaces. Swift protocols. Function signatures. These are your contract with the AI. The more precise your interface, the better the generated code.

**3. Test every generated function immediately.**
Don't batch AI-generated code. Write → Generate → Test → Commit. If you generate 500 lines without testing, you'll spend more time debugging than you saved.

**4. Keep prompts specific and contextual.**
Bad: "Add authentication"
Good: "Add Bearer token validation middleware to the Express router in routes/products.ts. Token is checked against AUTH_TOKEN env var. Return 401 with { error: 'Unauthorized' } on failure."

**5. Don't use Opus for everything.**
Opus is $15/M input tokens. Sonnet is $3. For a bug fix or a simple component, Sonnet is plenty. Save Opus for architecture sessions and complex multi-file changes.

**6. Review diffs like you're reviewing a junior dev's PR.**
Because that's essentially what you're doing. The AI is a very fast junior developer with encyclopedic knowledge and zero judgment. Your job is the judgment.

## The Economics

Let me be real about what this cost:

| Item | Cost |
|------|------|
| Cursor Pro subscription | $20/month |
| Claude API (via Cursor) | ~$80 over 3 weeks |
| Supabase | Free tier |
| Render (backend hosting) | Free tier |
| Vercel (landing page) | Free tier |
| Domain (savvit.app) | $12/year |
| Apple Developer Account | Already had it ($99/year) |
| **Total for Savvit MVP** | **~$112** |

Three weeks. ~$112. A full-stack AI-powered app with iOS client, Node.js backend, landing page, and global region support.

I'm not saying anyone can do this — I have 7+ years of software engineering experience. The AI doesn't replace knowing how to code. It replaces the tedious parts of coding so you can focus on the creative parts.

## Should You Try This?

**Yes, if:**
- You already know how to code and want to ship faster
- You're building an MVP and speed matters more than perfection
- You're a solo dev who needs to cover frontend, backend, and infrastructure

**No, if:**
- You're learning to code (you need to understand what the AI generates)
- You're building something safety-critical (AI-generated code needs extra scrutiny)
- You think AI will do all the work (it won't — you're the architect, it's the builder)

## Try It Yourself

1. Download [Cursor](https://cursor.com) (free tier available, Pro is $20/mo)
2. Start a project with a clear spec (spend time on this)
3. Build one feature end-to-end with AI assistance
4. Notice how much faster it is. Then notice the mistakes.
5. Develop your own review instinct. That's the real skill.

The future of development isn't AI replacing developers. It's developers with AI shipping what used to take teams of 5.

I'm one person. I have 6 products live. That math only works with tools like this.

---

*Building something with Cursor? I'd love to hear about it — find me on [X @rushirajjj](https://x.com/rushirajjj).*
`,
  },
  {
    slug: 'stackradar-x-ray-any-website-tech-stack',
    title: 'I Built a Wappalyzer Alternative — Here\'s What I Learned',
    excerpt: 'StackRadar detects 150+ technologies on any website instantly. Here\'s why I built it, how it works under the hood, and what I\'d do differently.',
    date: '2026-02-14',
    readTime: '5 min',
    tags: ['StackRadar', 'Web Dev', 'Open Source'],
    emoji: '📡',
    content: `
Ever visited a website and wondered "what's this built with?" Maybe you're scoping out a competitor, researching a potential client, or just genuinely curious about the tech behind a beautiful site.

There are tools for this — Wappalyzer, BuiltWith, WhatRuns. But they're either paywalled, require browser extensions, or show you more ads than data. I wanted something simpler: paste a URL, get the tech stack. No sign-up, no extension, no BS.

So I built [StackRadar](https://stackradar.rushiraj.me).

## What It Does

StackRadar scans any website and detects **150+ technologies** across 25 categories:

- **Frameworks** — Next.js, React, Vue, Angular, Svelte, and more
- **Hosting** — Vercel, Netlify, AWS, Cloudflare, Fly.io
- **Analytics** — Google Analytics, PostHog, Mixpanel, Plausible, Heap
- **Payments** — Stripe, Razorpay, PayPal, Paddle
- **CMS** — WordPress, Shopify, Webflow, Contentful, Sanity
- **And 20 more categories** — Auth, CDN, Build Tools, Monitoring, Email, Search, you name it

Each detection comes with a confidence indicator (High, Medium, Low) based on how many matching patterns were found.

## How It Works Under the Hood

The detection engine is surprisingly straightforward. When you enter a URL, StackRadar:

1. **Fetches the page** server-side with a browser-like User-Agent
2. **Reads HTTP headers** — \`X-Powered-By\`, \`Server\`, \`X-Vercel-Id\`, \`CF-Ray\`, etc.
3. **Scans the HTML** for script sources, meta tags, link tags, and inline patterns
4. **Matches against 150+ regex patterns** — each technology has 2-4 unique signatures
5. **Extracts version numbers** where possible from script URLs and meta tags

For example, detecting Next.js is as simple as looking for \`/_next/static\` or \`__NEXT_DATA__\` in the HTML. Stripe? Check for \`js.stripe.com\`. Tailwind CSS? Look for utility class patterns.

The tricky part is **avoiding false positives**. A word like "express" appears on tons of websites in regular text. So for server-side frameworks, we rely on headers (\`X-Powered-By: Express\`) rather than body content.

## Features That Set It Apart

**Compare Mode** — Scan two sites side-by-side and see what they share vs. what's unique. Great for competitive analysis.

**Scan History** — Your last 10 scans are saved locally. One click to revisit any previous result.

**Share & Download** — Generate shareable links or download results as images. Perfect for reports or social sharing.

**Version Detection** — Where possible, StackRadar extracts version numbers (e.g., \`Next.js v14.1.0\`).

## The Tech Stack (Yes, It Scans Itself)

- **Next.js 15** with App Router
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Vercel** for hosting
- **Supabase** for the waitlist backend

If you scan \`stackradar.rushiraj.me\` with StackRadar... it detects itself. Meta.

## What's Next

StackRadar is free and always will be for basic scans. I'm working on a Pro tier with:

- **Bulk scanning** — paste 50+ URLs, get a CSV
- **API access** — for developers who want to integrate
- **Export as PDF/PNG** — branded reports for agencies
- **90-day history** — track how sites evolve over time

If that sounds useful, [join the waitlist](https://stackradar.rushiraj.me).

## Try It

Head to [stackradar.rushiraj.me](https://stackradar.rushiraj.me) and scan your favorite website. It takes about 3 seconds. Let me know what you find — I'm always adding new technologies to the detection engine.

The source code is on [GitHub](https://github.com/rushi053/stackradar) if you want to peek under the hood or contribute.
`,
  },
  {
    slug: 'why-your-expense-tracker-is-spying-on-you',
    title: 'Why Your Expense Tracker Is Spying on You',
    excerpt: 'Most finance apps collect more data than they need. I built CashLens to prove you can track expenses without sacrificing privacy.',
    date: '2026-02-10',
    readTime: '6 min',
    tags: ['Privacy', 'CashLens', 'iOS'],
    emoji: '🕵️',
    content: `
Let me tell you something uncomfortable: that expense tracker on your phone probably knows more about you than your closest friend.

Think about it. Every transaction you log tells a story. Coffee at 7 AM means you're a morning person. That Uber at 2 AM on a Saturday? Night out. The recurring payment to a therapist? That's deeply personal. The subscription to a dating app? Even more so.

Now ask yourself: where does that data go?

## The Dirty Secret of "Free" Finance Apps

Most popular expense trackers — the ones with millions of downloads and slick marketing — operate on a simple model: **your data is the product**.

They require an email to sign up. They sync to "the cloud" (which is just someone else's computer). They ask for bank connections. And buried in their privacy policy — the one nobody reads — is usually a clause about sharing "anonymized" data with third-party partners.

Here's the thing about "anonymized" financial data: it's not that hard to de-anonymize. If I know someone in San Francisco spends $4.50 every morning at a specific coffee shop, pays $2,400/month in rent, and subscribes to Adobe Creative Cloud... I can probably figure out who they are.

## Why I Built CashLens Differently

When I started building [CashLens](https://cashlens.app), I made one non-negotiable decision: **zero data collection**.

Not "we collect data but promise to be careful." Not "we anonymize everything." Zero. Nothing. Your data never leaves your phone.

Here's what that means technically:

- **No accounts.** You download the app and start using it. No email, no phone number, no sign-up flow.
- **No cloud sync.** Everything lives in Core Data on your device. If Apple can't read it, neither can I.
- **No analytics SDK.** No Firebase, no Mixpanel, no Amplitude. I literally have no idea how many screens you visit or buttons you tap.
- **No network requests.** The app works in airplane mode because it never phones home.

## "But How Do You Make Money?"

This is the question every investor would ask (if I had investors, which I don't). The honest answer: CashLens has optional tip jars — "Coffee for the Coder" ($0.99), "Lunch for the Library" ($4.99), "Fuel the Feature Rocket" ($9.99). That's it.

Will this make me rich? No. Does it let me sleep at night knowing I'm not selling someone's financial diary? Absolutely.

## The Real Cost of Free

When an app is free and backed by venture capital, someone is paying for those servers, those engineers, that office in SOMA. If it's not you paying with money, you're paying with data.

Mint was the poster child for this. Free expense tracking, amazing features, millions of users. Then Intuit shut it down. All that financial data, all those years of history — gone. Because when you don't pay for the product, you have zero leverage when the company decides to pivot.

## What You Can Do

1. **Check your current app's privacy label** on the App Store. If it says "Data Linked to You" or "Data Used to Track You," that's your answer.
2. **Ask yourself: does this app need an account?** If it's just tracking personal expenses, there's no technical reason it needs your email.
3. **Look at the business model.** If the app is free with no obvious revenue source, you are the revenue source.
4. **Consider local-first alternatives.** They exist. CashLens is one, but there are others.

Your spending data is a complete map of your life. It deserves the same protection as your medical records.

It's 2026. We can do better than selling our financial diaries for a prettier pie chart.
`,
  },
  {
    slug: 'running-5-ai-agents-on-a-mac',
    title: "I Run 5 AI Agents 24/7 on a Mac Mini. Here's How.",
    excerpt: 'My Mac Mini runs a team of AI agents that handle marketing, monitoring, code review, and customer support. No cloud servers, no $500/mo bills.',
    date: '2026-02-05',
    readTime: '8 min',
    tags: ['AI', 'Automation', 'Indie Dev'],
    emoji: '🤖',
    content: `
My Mac Mini M2 sits on a shelf in my room in Ahmedabad. It runs 24/7. It never sleeps. And it manages a team of 5 AI agents that collectively handle tasks that would normally require 2-3 employees.

No, this isn't a flex. This is the future of solo development, and it's available to anyone with a $599 computer and some patience.

## The Setup

I use [OpenClaw](https://github.com/openclaw/openclaw) — an open-source AI agent orchestrator. Think of it as a manager for AI workers. It handles scheduling, memory, tool access, and communication between agents. Each agent has its own personality, capabilities, and schedule.

Here's my team:

### 🦀 Clawdbot (The Main Brain)
- **Model:** Claude Opus
- **Role:** Orchestrator, direct assistant, complex reasoning
- **What it does:** This is the one I talk to directly. It coordinates the others, handles my questions, writes code, manages my calendar, and acts as the "CEO" of the agent team.

### 📣 Hype (The Marketer)
- **Model:** Claude Sonnet
- **Role:** Social media, content creation
- **What it does:** Posts to X (@cashLensApp), engages with the indie dev community, writes tweet drafts, manages Instagram. Runs on a schedule — morning post, afternoon engagement, evening community interaction.

### 🔨 Bolt (The Builder)
- **Model:** Claude Sonnet
- **Role:** Code review, bug fixes, deployment
- **What it does:** Reviews PRs, fixes bugs, deploys updates, manages Vercel deployments. When I push code, Bolt checks it.

### 👁️ Vigil (The Monitor)
- **Model:** Claude Haiku (cheapest)
- **Role:** Monitoring, alerts
- **What it does:** Checks App Store reviews, monitors uptime, watches for mentions, sends alerts if something breaks. Runs on Haiku because it's doing simple checks — no need for expensive models.

### 🔍 Nova (The Researcher)
- **Model:** Claude Sonnet
- **Role:** Market research, competitor analysis
- **What it does:** Researches product ideas, analyzes competitors, finds relevant Reddit threads, summarizes industry news.

## The Economics

Here's why this works for a solo dev:

| Agent | Model | Daily Cost |
|-------|-------|-----------|
| Clawdbot | Opus | ~$3-5 |
| Hype | Sonnet | ~$1-2 |
| Bolt | Sonnet | ~$0.50-1 |
| Vigil | Haiku | ~$0.10 |
| Nova | Sonnet | ~$0.50-1 |

**Total: roughly $5-10/day, or $150-300/month.**

Compare that to hiring even a part-time social media manager ($500-1000/mo), a junior dev ($2000+/mo), or a VA ($500+/mo). The agents aren't as good as a skilled human at any individual task, but they're available 24/7, never call in sick, and handle the volume of 3-4 people combined.

## How It Actually Works

OpenClaw uses cron jobs to schedule agent tasks. Each morning at 7:30 AM, Vigil checks overnight notifications and gives me a briefing. At 9 AM, Hype writes and posts the day's first tweet. Throughout the day, agents take turns doing their work.

They share a memory system — markdown files that serve as their "brain." When Hype posts something that gets engagement, it logs it. When Vigil finds a bad review, it alerts me. When Nova finds a competitor doing something interesting, it writes a memo.

The Mac Mini has 16GB of RAM and handles all of this without breaking a sweat. The agents themselves run via API calls to Anthropic — the Mac is just the orchestration layer.

## What Surprised Me

1. **Personality matters.** Giving each agent a distinct personality (via system prompts) makes them noticeably better at their jobs. Hype writes more engaging tweets than a generic "write a tweet" prompt.

2. **Memory is everything.** Without persistent memory between sessions, agents are useless. They wake up fresh each time. The markdown-based memory system is crude but effective.

3. **The cheapest model is often fine.** Vigil runs on Haiku and catches 95% of what I need it to catch. Don't use Opus for tasks that Haiku can handle.

4. **Human oversight is still critical.** I review every external-facing thing before it goes out. The agents draft, I approve. This is a co-pilot setup, not autopilot.

## Getting Started

If you want to try this yourself:

1. Get a machine that can run 24/7 (Mac Mini, old laptop, Raspberry Pi, or a cheap VPS)
2. Install OpenClaw
3. Start with ONE agent doing ONE thing well
4. Add agents as you find bottlenecks

Don't try to build the whole team at once. Start with monitoring (easiest), then add social media (hardest to get right), then development assistance.

The future isn't about replacing yourself. It's about giving yourself a team.
`,
  },
  {
    slug: 'solo-dev-4-products-zero-vc',
    title: 'Solo Dev, 6 Products, Zero VC: My Playbook',
    excerpt: "I left a US tech job, moved back to India, and launched 6 products in under a year. No co-founders, no funding, no Jira.",
    date: '2026-01-28',
    readTime: '10 min',
    tags: ['Indie Dev', 'Building in Public', 'Strategy'],
    emoji: '🚀',
    content: `
In the last year, I've shipped 6 products — [CashLens](https://cashlens.app), [PrivacyPage](https://privacy.rushiraj.me), [InvoiceZen](https://invoice.rushiraj.me), [DeadBy.ai](https://deadby.rushiraj.me), [StackRadar](https://stackradar.rushiraj.me), and [Cloudo](https://apps.apple.com/us/app/cloudo/id6742880068). No venture capital. No co-founder. No full-time employees. Just me, working from my room in Ahmedabad, India.

I'm not going to pretend I have it all figured out. But I've learned enough to have a playbook, and I think it's worth sharing.

## Rule 1: Ship Fast, Fix Later

My first version of CashLens was embarrassingly simple. Basic expense tracking, a few categories, no charts. I shipped it in about 3 weeks. A lot of people would have spent 6 months adding features before launching.

Here's the thing: **nobody cares about your v1.** The App Store has millions of apps. Your first version is just a ticket to the conversation. Ship it, get feedback, iterate.

CashLens is now on v1.0.5 with spending heatmaps, subscription tracking, weekly digests, and 150+ currencies. None of that was in v1. All of it was informed by real user feedback.

## Rule 2: Solve Your Own Problems

Every product I've built started with a personal frustration:

- **CashLens:** I wanted to track expenses without giving my data to some company
- **PrivacyPage:** I needed a privacy policy for CashLens and didn't want to pay a lawyer
- **InvoiceZen:** I needed to send invoices for freelance work without signing up for yet another SaaS
- **Cloudo:** I wanted a clean, simple task manager without Notion's complexity

When you solve your own problem, you have a massive advantage: you're the first user, the first tester, and you deeply understand the pain point. You never have to wonder "would someone pay for this?" because you already know the answer.

## Rule 3: Stack the Ecosystem

Notice how my products feed each other:

- CashLens needed a privacy policy → PrivacyPage was born
- I needed to invoice clients for CashLens consulting → InvoiceZen was born
- I needed to manage tasks across all these projects → Cloudo was born

Each product exists independently, but together they create an ecosystem. PrivacyPage users might need invoicing. InvoiceZen users might need expense tracking. One user can become a user of all four.

## Rule 4: Privacy as a Moat

This might be controversial: I think privacy-first is the best business strategy for indie devs in 2026.

Big companies can't do privacy-first. Their business models depend on data. They have shareholders expecting growth metrics that require tracking. They have ad partnerships that require user profiles.

As an indie dev, I have none of those constraints. I can say "your data never leaves your device" and actually mean it. That's a competitive advantage that no VC-backed startup can replicate without restructuring their entire business.

## Rule 5: Spend Money on Time, Not Things

My total infrastructure cost across all 6 products:

- **Vercel:** Free tier (hobby plan)
- **Supabase:** Free tier
- **Apple Developer Account:** $99/year
- **Domain names:** ~$50/year total
- **AI agents:** ~$200/month (this is my biggest expense)
- **Pro Display XDR:** $5,000 (okay this one was an impulse buy)

The AI agents are worth every penny because they save me 3-4 hours daily. The Pro Display XDR is worth every penny because... okay fine, I just wanted it. But the point is: keep infrastructure costs near zero and invest in things that save time.

## Rule 6: Build in Public (But Authentically)

I post about what I'm building on X (@rushirajjj). Not the "just raised $2M" kind of building in public. The real kind. The "spent 3 hours debugging a Tailwind class" kind.

People connect with authenticity. Nobody wants to hear your perfectly crafted success story. They want to hear that you shipped a feature at 2 AM, broke production, and fixed it while half asleep. That's relatable. That's human.

## Rule 7: India is an Unfair Advantage

I moved back from the US specifically for this. My monthly living expenses in Ahmedabad are a fraction of what they were in Texas. That means:

- I can survive longer without revenue
- I can price products lower and still be profitable
- I can take risks that someone with Bay Area rent can't

This isn't about "cheap labor." It's about buying yourself runway. Every month you don't need to earn money from your product is a month you can spend making it better.

## What's Next

I'm not done. The goal isn't 6 products — it's building a sustainable indie business that generates enough revenue to keep going indefinitely. No investors to please, no board meetings, no quarterly earnings calls.

Just me, my Mac, my AI agents, and the products.

That's the playbook. It's simple. Ship fast, solve your own problems, stack the ecosystem, use privacy as a moat, keep costs low, build in public, and leverage your geography.

Now stop reading and go build something.
`,
  },
  {
    slug: 'privacy-first-is-not-a-feature',
    title: "Privacy-First Is Not a Feature. It's a Business Model.",
    excerpt: "When your competitors monetize user data, choosing privacy isn't a constraint — it's a moat.",
    date: '2026-01-20',
    readTime: '5 min',
    tags: ['Privacy', 'Business', 'Opinion'],
    emoji: '🔒',
    content: `
Every other app on the App Store lists "privacy" as a feature. Right there in the bullet points, between "dark mode" and "widget support." As if not spying on your users is a premium perk.

Let me be blunt: **privacy is not a feature. It's a business model decision.** And it's the most underrated competitive advantage in software right now.

## The Data Tax

When a company collects user data, it takes on a massive hidden cost:

- **Engineering:** Building and maintaining data pipelines, analytics infrastructure, GDPR compliance systems, data deletion workflows
- **Legal:** Privacy policies, cookie consent flows, responding to data requests, staying compliant across jurisdictions
- **Security:** Protecting that data from breaches, hiring security engineers, paying for audits
- **Trust:** One breach and your reputation is destroyed

I call this the "data tax." Companies pay it because they believe user data is valuable. And for ad-supported businesses, it is. But for most indie apps? **You're paying the data tax for data you don't even need.**

## The Privacy Moat

Here's what happens when you go truly privacy-first:

1. **You eliminate the data tax.** No data to store means no data to protect, no compliance to maintain, no breaches to worry about.

2. **You create trust instantly.** In a world where every app asks for your email, an app that works without any account stands out immediately.

3. **You can't be copied by big companies.** Google can't make a privacy-first expense tracker. Their entire business is data. This is your moat.

4. **You attract the most valuable users.** Privacy-conscious users tend to be more educated, higher income, and more willing to pay for software. They're the premium audience.

5. **You simplify everything.** No user database means no auth system, no password resets, no "we've updated our privacy policy" emails. Your app is simpler to build, maintain, and explain.

## But Does It Make Money?

The counterargument is always: "If you don't collect data, how do you monetize?"

Simple: **you charge for the product.**

Revolutionary, I know. But hear me out. When your app provides genuine value and doesn't nickel-and-dime users with data harvesting, they're more willing to pay. CashLens has optional tip jars. PrivacyPage charges for premium document types. InvoiceZen has a Pro tier.

The conversion rates are small, but so are the costs. When your infrastructure is basically free (local storage, no servers, no data pipeline), even modest revenue is profitable.

## The Shift Is Already Happening

Apple has made privacy a core selling point. ATT (App Tracking Transparency) crushed the data brokers. GDPR and its equivalents are spreading globally. Users are waking up.

The companies that built their business on data are scrambling. The companies that built their business on value are thriving.

I'm not saying every app should go privacy-first. Social media needs servers. Collaboration tools need cloud sync. But if your app's core function can work locally? **There's no excuse for collecting data.**

## The Bottom Line

Privacy-first isn't a constraint. It's a strategy. It's cheaper, simpler, more trustworthy, and increasingly what users demand.

The best part? Big companies can't follow you here. Their shareholders won't let them.

That's not a feature. That's a moat.
`,
  },
  {
    slug: 'from-california-to-ahmedabad',
    title: 'From California to Ahmedabad: Why I Moved Back',
    excerpt: "MS in CS from Cal State Fullerton, worked in Texas, had the American dream on paper. Then I came home.",
    date: '2026-01-15',
    readTime: '7 min',
    tags: ['Personal', 'Life', 'Career'],
    emoji: '✈️',
    content: `
I spent 7 years in the United States. Master's in Computer Science from Cal State Fullerton. Worked as a software engineer in Texas. Had the H-1B, the apartment, the American routine.

On paper, I was living the dream. In practice, I was living someone else's dream.

## The California Years

I landed in Fullerton, California, in 2018. Orange County. Sunny, expensive, beautiful. Cal State Fullerton's CS program was solid — good professors, diverse classmates, and close enough to LA's tech scene to feel the energy.

Those two years shaped me more than I expected. Not just technically — I learned how Americans think about products, marketing, and user experience. I absorbed design thinking from being surrounded by it. Apple Park was a 6-hour drive north. Every other person was building an app or a startup.

I didn't start a company in college, but I started thinking like someone who would.

## The Texas Detour

After graduation, I moved to Texas for work. Lower cost of living, no state income tax, growing tech scene. It was practical. And it was fine.

But "fine" is a dangerous word. Fine means comfortable. Fine means you stop questioning whether this is what you actually want. I was writing code for someone else's product, attending someone else's standup meetings, hitting someone else's deadlines.

I was good at it. Got promoted. Got raises. Built features used by millions. And every Sunday night, I felt a quiet dread that I couldn't quite name.

## The Breaking Point

There wasn't a dramatic moment. No fight with a boss, no layoff, no epiphany on a mountaintop. It was more like a slow realization:

**I was building wealth for other people while my own ideas sat in a Notes app.**

I had a list — literally a list on my phone — of products I wanted to build. Privacy-first expense tracker. Legal doc generator. Invoice tool. The list kept growing, and my free time kept shrinking.

The math was simple: I could stay in the US, keep earning a good salary, and build side projects in the evenings. Or I could go back to India, where my expenses would drop by 70%, and go all-in.

## Coming Home

Ahmedabad in 2025 is not the Ahmedabad I left. The city has changed. India's tech scene has exploded. And my perspective — shaped by 7 years in the US — suddenly became an advantage instead of a normal thing everyone had.

I understood American users because I lived among them. I understood Indian economics because I grew up in them. I could build products for a global audience from a city where my rent is a tenth of what I paid in Texas.

The first month was an adjustment. Slower internet. Power cuts (rare, but they exist). Missing the convenience of Amazon Prime delivering everything in a day. But also: family dinners every night. Chai with my parents every morning. Friends I'd known since childhood.

I traded convenience for meaning, and I'd make that trade again every time.

## The Numbers

Let me be transparent about why India works for indie development:

In Texas, my monthly burn rate was around $3,000-4,000 (rent, food, car, insurance, everything). That's $36,000-48,000 per year just to survive.

In Ahmedabad, it's about $500-800 per month. That's $6,000-10,000 per year.

This means:
- **Runway multiplied by 4-5x.** I can survive without revenue for years, not months.
- **Pricing flexibility.** I can offer free tiers without panicking about server costs.
- **Risk tolerance.** I can experiment with products that might not work.

## What I'd Tell Others

If you're an Indian developer in the US, thinking about moving back:

1. **Do it for the right reason.** Not because the US is bad, but because India gives you specific advantages for what you want to do.
2. **Save first.** Have at least 12 months of runway before you make the jump. 18 is better.
3. **Build your US network before leaving.** Those connections are more valuable from India than from the US.
4. **Don't compare daily.** India will frustrate you sometimes. The US will seem perfect in hindsight. Neither is true.
5. **Ship something in the first 90 days.** Momentum matters more than perfection when you're starting fresh.

## One Year Later

As I write this, I have 6 products live, 2.5K+ downloads on CashLens, a 4.8-star rating, and a team of AI agents running my marketing. I work from my room, on my schedule, building things I believe in.

Is it harder than a tech job? In some ways, yes. There's no guaranteed paycheck. No health insurance from an employer. No team to fall back on.

But I wake up excited. Every day is mine. And that Notes app list? It's empty now.

I didn't come home because the American dream failed me. I came home because I found a better dream.
`,
  },
  {
    slug: 'the-tools-that-actually-matter',
    title: "The Tools That Actually Matter (And the Ones That Don't)",
    excerpt: "After shipping 6 products, here's my honest take on dev tools. Spoiler: the best tool is the one you stop thinking about.",
    date: '2026-01-10',
    readTime: '6 min',
    tags: ['Dev Tools', 'Productivity', 'Honest Review'],
    emoji: '🛠️',
    content: `
I've spent an embarrassing amount of money on tools, apps, and services since going indie. Some changed my life. Some were a complete waste. Here's my honest, no-affiliate-link breakdown.

## The "Changed My Life" Tier

### Cursor (AI Code Editor) — 💰 Worth every penny
Cursor is VS Code with AI built in so deeply that going back to regular VS Code feels like switching from a car to a bicycle. I write code in natural language half the time. It understands my codebase, suggests entire functions, and catches bugs before I make them.

**Verdict:** If you're coding without Cursor (or a comparable AI editor) in 2026, you're working 2-3x harder than you need to.

### Vercel — 💰 Free tier is insane
Every one of my web products runs on Vercel's free hobby plan. Zero configuration deployments. Push to GitHub, it's live. Preview deployments for every PR. Edge functions. Analytics.

**Verdict:** The fact that this is free for indie devs is genuinely wild. I've spent $0 on hosting.

### Supabase — 💰 Free tier covers most needs
PostgreSQL database, authentication, real-time subscriptions, storage — all with a generous free tier. I use it for my portfolio, blog data, and license key storage.

**Verdict:** Firebase but with SQL and without the Google data collection concerns. Perfect for indie devs.

### OpenClaw — 💰 Open source, just pay for AI API
This is what runs my 5 AI agents. Open source, runs on any machine, handles scheduling, memory, and tool access.

**Verdict:** Turned my solo operation into a team of 6. The ROI is immeasurable.

## The "Solid, Use Daily" Tier

### Xcode — 💰 Free with Apple Developer
Look, nobody *loves* Xcode. The build times, the cryptic errors, the simulator that somehow uses 8GB of RAM. But it's the only way to build iOS apps, and with SwiftUI, it's gotten genuinely good.

**Verdict:** Stockholm syndrome, but it works.

### GitHub — 💰 Free
Version control, CI/CD, issue tracking, project boards. I use GitHub for everything. The AI features (Copilot) are integrated into Cursor anyway.

**Verdict:** The standard. Just use it.

### Tailwind CSS — 💰 Free
I resisted Tailwind for a long time. "Utility classes are ugly!" I said, while writing 500-line CSS files. Then I tried it on one project and never wrote vanilla CSS again.

**Verdict:** Once you go Tailwind, you don't go back. Your HTML looks ugly, but you ship 3x faster.

## The "Regret Buying" Tier

### Pro Display XDR — 💰 $5,000
I do not need a 6K display to write code. Nobody needs a 6K display to write code. But it was 2 AM, I was on the Apple Store, and my impulse control was on vacation.

Is it gorgeous? Yes. Does the nano-texture coating make a difference? Yes. Was it worth $5,000 for someone who builds iOS apps and websites? Absolutely not. A Studio Display at $1,599 would have been 95% as good.

**Verdict:** Amazing monitor. Terrible financial decision. Zero regrets. (I'm aware this is contradictory.)

### Multiple Note-Taking Apps — 💰 Subscriptions add up
I've paid for Notion, Obsidian Sync, Bear, Craft, and Apple Notes (the last one is free, but I'm counting the time I spent setting it up). You know what I actually use now? Markdown files in a folder. That's it.

**Verdict:** The best note-taking system is the one you'll actually use. For me, that's \`memory/2026-02-05.md\` in my workspace. Fight me.

## The "Don't Bother" Tier

### Expensive hosting for indie projects
If you're an indie dev paying $50+/month for hosting, you're doing it wrong. Vercel free tier, Railway starter, or a $5 VPS can handle 99% of indie projects.

### Premium Figma for solo devs
I design directly in code with Tailwind. The feedback loop is faster than mockups. If you're a solo dev who can code, skip the design tool premium tiers.

### Project management tools
I tried Jira (kill me), Linear (beautiful but overkill), Trello (too basic), and Notion boards (too flexible). Now I use a markdown file called \`PRIORITIES.md\`. It has a numbered list. I work from the top. When something's done, I delete it.

**Verdict:** Sophisticated project management is for teams. Solo devs need a list.

## The Meta-Lesson

The tools that matter most are the ones that disappear. Vercel deploys without me thinking about it. Cursor suggests code without me asking. Tailwind lets me style without context-switching to a CSS file.

The tools I regret buying are the ones that made me think about the tool instead of the work. Every minute spent configuring Notion databases is a minute not spent shipping features.

**Buy the thing that removes a step. Skip the thing that adds one.**

That's the whole framework. Everything else is just shopping.
`,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}
