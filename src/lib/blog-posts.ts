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
    title: 'Solo Dev, 4 Products, Zero VC: My Playbook',
    excerpt: "I left a US tech job, moved back to India, and launched 4 products in under a year. No co-founders, no funding, no Jira.",
    date: '2026-01-28',
    readTime: '10 min',
    tags: ['Indie Dev', 'Building in Public', 'Strategy'],
    emoji: '🚀',
    content: `
In the last year, I've shipped 4 products — [CashLens](https://cashlens.app), [PrivacyPage](https://privacy.rushiraj.me), [InvoiceZen](https://invoice.rushiraj.me), and [Cloudo](https://apps.apple.com/us/app/cloudo/id6742880068). No venture capital. No co-founder. No full-time employees. Just me, working from my room in Ahmedabad, India.

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

My total infrastructure cost across all 4 products:

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

I'm not done. The goal isn't 4 products — it's building a sustainable indie business that generates enough revenue to keep going indefinitely. No investors to please, no board meetings, no quarterly earnings calls.

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

As I write this, I have 4 products live, 2.5K+ downloads on CashLens, a 4.8-star rating, and a team of AI agents running my marketing. I work from my room, on my schedule, building things I believe in.

Is it harder than a tech job? In some ways, yes. There's no guaranteed paycheck. No health insurance from an employer. No team to fall back on.

But I wake up excited. Every day is mine. And that Notes app list? It's empty now.

I didn't come home because the American dream failed me. I came home because I found a better dream.
`,
  },
  {
    slug: 'the-tools-that-actually-matter',
    title: "The Tools That Actually Matter (And the Ones That Don't)",
    excerpt: "After shipping 4 products, here's my honest take on dev tools. Spoiler: the best tool is the one you stop thinking about.",
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
