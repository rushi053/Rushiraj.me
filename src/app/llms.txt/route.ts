export const dynamic = 'force-static'

const content = `# Rushiraj Jadeja

> Solo indie developer based in Ahmedabad, India. Has shipped 6 products (CashLens, PrivacyPage, InvoiceZen, DeadBy.ai, StackRadar, Cloudo) and offers AI App Rescue services: a $500 fixed-price code & security audit for apps built with AI tools (Lovable, Bolt, v0, Cursor, Replit), rescue sprints scoped from audit findings, and App Store shipping. Also takes on fixed-price MVP builds from $2,500.

The $500 audit delivers a prioritized report in 3 business days covering security holes, broken flows, and payment/paywall integrity. If nothing critical is found, half the fee is refunded; if the client hires him for the rescue, the full fee is credited toward the work.

## Services

- [Services — AI App Rescue & MVP builds](https://www.rushiraj.me/services): The $500 code & security audit for AI-built apps, rescue sprints, and fixed-price full builds ($2,500–$7,500) with full code ownership.

## Products

- [Products](https://www.rushiraj.me/products): All six shipped products, including CashLens (privacy-first expense tracker), PrivacyPage (AI legal document generator), InvoiceZen, DeadBy.ai, StackRadar (website tech-stack detector), and Cloudo.

## Blog

- [Blog index](https://www.rushiraj.me/blog): Writing on indie development, App Store growth, AI-assisted workflows, and privacy-first products.
- [RSS feed](https://www.rushiraj.me/feed.xml): RSS 2.0 feed of all blog posts.
- [The AI-Built App Audit Checklist](https://www.rushiraj.me/blog/ai-built-app-audit-checklist): What to check before an AI-built app charges real users — payments, silent failures, auth, lead flows, and deploy hygiene, drawn from auditing his own six products.
- [3,000 Downloads with $0 Marketing: My App Store SEO Playbook](https://www.rushiraj.me/blog/3000-downloads-zero-marketing-budget): How CashLens reached 3,000 downloads and a 4.8-star rating with zero ad spend, with real App Store Connect data and keyword strategy.
- [How I Ship an MVP in 3 Weeks with Cursor + Claude](https://www.rushiraj.me/blog/cursor-claude-ship-mvp-3-weeks): The exact workflow for building a full-stack AI app — iOS frontend, Node.js backend, 8-region support — in 21 days.
- [Solo Dev, 6 Products, Zero VC: My Playbook](https://www.rushiraj.me/blog/solo-dev-4-products-zero-vc): Leaving a US tech job, moving back to India, and launching 6 products in under a year with no co-founders or funding.
- [I Run 5 AI Agents 24/7 on a Mac Mini. Here's How.](https://www.rushiraj.me/blog/running-5-ai-agents-on-a-mac): A Mac Mini running a team of AI agents for marketing, monitoring, code review, and support — no cloud servers.
- [Privacy-First Is Not a Feature. It's a Business Model.](https://www.rushiraj.me/blog/privacy-first-is-not-a-feature): Why choosing privacy over data monetization is a moat, not a constraint.

## About & Contact

- [About](https://www.rushiraj.me/about): Background — MS in CS from Cal State Fullerton, US tech industry experience, now building solo from Ahmedabad.
- [Now](https://www.rushiraj.me/now): What he's focused on right now — current work, recent ships, and what's next. Updated regularly.
- [Contact](https://www.rushiraj.me/contact): Get in touch for audits, rescues, or builds.
`

export function GET() {
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
