# Dreams of Diploma — Website

Building Leaders, Creating Opportunities.

A static site (HTML/CSS/JS, no framework, no build step) plus a lightweight
git-based admin panel for Events and Resources, real contact channels, a
branded share image, an analytics slot, and a reusable certificate generator.

## What's in here

```
dreams-of-diploma/
├── index.html, about.html, programs.html,       Public pages. Each is fully
│   community.html, resources.html,              self-contained — CSS, JS,
│   events.html, join.html, contact.html         and the logo are inlined,
│                                                 so any single file renders
│                                                 correctly on its own.
├── certificate.html      Print-ready certificate generator (see below)
├── content/
│   ├── events.json        Edited via /admin → shows on events.html
│   └── resources.json      Edited via /admin → shows on resources.html
├── admin/
│   ├── index.html         Decap CMS login/editor page
│   └── config.yml         Defines what's editable (Events, Resources)
├── api/
│   ├── auth.js            GitHub OAuth step 1 (Vercel serverless function)
│   └── callback.js        GitHub OAuth step 2
├── assets/
│   ├── logo.svg            Brand mark
│   └── og-image.png        Branded 1200×630 share image (WhatsApp/socials)
├── css/styles.css, js/main.js   Source copies (already inlined into pages;
│                                 edit these if you want to regenerate)
├── package.json
├── robots.txt
└── sitemap.xml
```

## 1. Contact channels — already live

Email (`anjireddyboda83@gmail.com`), WhatsApp (`+91 83674 63908`), and
LinkedIn (`linkedin.com/in/anjireddyboda`) are wired into the footer of
every page, the Contact page, and the founder sections. WhatsApp buttons
open a real chat (`wa.me` link) — there's no group yet, so it's labeled
honestly as a direct message, not a "community."

## 2. Still placeholder — Google Forms

Four buttons on `join.html` still show a "not connected yet" alert:
Member, Mentor, Ambassador, and Change Maker forms. To connect each:

1. Create the Google Form.
2. Click **Send** → the link icon → copy the URL.
3. In `join.html`, find the matching `<a href="#" data-form="placeholder">`
   and replace `href="#"` with your form URL, and delete `data-form="placeholder"`.

Responses land in a connected Google Sheet automatically (Forms →
Responses tab → green Sheets icon).

## 3. Put it on GitHub

```bash
cd dreams-of-diploma
git init
git add .
git commit -m "Dreams of Diploma — website + admin panel"
git branch -M main
git remote add origin https://github.com/<your-username>/dreams-of-diploma.git
git push -u origin main
```

## 4. Deploy on Vercel

1. vercel.com → **Add New Project** → import the repo.
2. Framework preset: **Other** (static site, no build command).
3. Deploy. You'll get a `.vercel.app` URL. Add a custom domain later under
   Project → Settings → Domains.

`/api/auth.js` and `/api/callback.js` are picked up automatically as
serverless functions — no extra config needed.

## 5. Turn on the admin panel (Events + Resources, no coding)

This uses **Decap CMS** — a free, open-source editor that logs in with
GitHub and commits your changes straight to this repo (Vercel redeploys
automatically). It only edits `content/events.json` and
`content/resources.json` — everything else on the site stays as plain
HTML you (or Claude) edit directly.

**One-time setup (~10 minutes):**

1. **Create a GitHub OAuth App**: GitHub → Settings → Developer settings →
   OAuth Apps → New OAuth App.
   - Homepage URL: `https://your-vercel-domain.vercel.app`
   - Authorization callback URL: `https://your-vercel-domain.vercel.app/api/callback`
   - Save it, then copy the **Client ID** and generate a **Client Secret**.

2. **Add environment variables in Vercel**: Project → Settings →
   Environment Variables:
   - `OAUTH_CLIENT_ID` = the Client ID from step 1
   - `OAUTH_CLIENT_SECRET` = the Client Secret from step 1
   - Redeploy after adding these.

3. **Edit `admin/config.yml`**: replace `YOUR-GITHUB-USERNAME/dreams-of-diploma`
   with your actual repo, and `YOUR-VERCEL-DOMAIN` with your real domain.
   Commit and push.

4. Visit `https://your-domain.vercel.app/admin` → log in with GitHub →
   edit Events or Resources → publish. Changes appear on the live site
   within a minute or two (a normal Vercel redeploy).

Until this is set up, `events.html` and `resources.html` just show their
current static content — nothing breaks in the meantime.

## 6. Certificates — no coding, reusable for every person

`certificate.html` is a print-ready template driven entirely by the URL,
so you never edit HTML to issue a new one. Example:

```
certificate.html?name=Priya%20Sharma&role=ambassador&date=08%20Jul%202026
```

`role` accepts `ambassador`, `mentor`, `changemaker`, or `core` and
auto-fills the title and reason text. Open the link, click **Print / Save
as PDF**, done. Host it the same way as the rest of the site (it's already
in this folder) and just change the URL parameters per person.

## 7. Analytics

A Google Analytics (GA4) snippet is already in every page's `<head>`,
pointed at a placeholder ID:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

To activate: create a free GA4 property at analytics.google.com, copy your
real Measurement ID (`G-XXXXXXXXXX`), and find-and-replace the placeholder
with it across all 8 `.html` files.

## 8. Share previews (WhatsApp / social)

Every page now has proper Open Graph and Twitter Card tags pointing to
`assets/og-image.png` — a branded 1200×630 image, so links shared on
WhatsApp, LinkedIn, etc. show a real preview image instead of nothing.
Regenerate it any time by editing the Pillow script Claude used, or swap
in your own designed image at the same path/dimensions.

## 9. Before real launch — remaining checklist

- [ ] The four Google Forms (section 2)
- [ ] Real domain in place of `https://dreamsofdiploma.org` (canonical/OG
      URLs — find-and-replace in every `<head>`, and in `admin/config.yml`,
      `robots.txt`, `sitemap.xml`)
- [ ] Real GA4 Measurement ID (section 7)
- [ ] Founder photo — currently a navy "AB" monogram. In `index.html` and
      `about.html`, replace `<div class="founder-portrait"><span aria-hidden="true">AB</span></div>`
      with `<div class="founder-portrait"><img src="assets/founder.jpg" alt="Anji Reddy Boda"></div>`
      after adding the photo to `assets/`.
- [ ] Submit `sitemap.xml` in Google Search Console once the real domain is live
- [ ] Decap CMS OAuth setup (section 5), whenever you're ready to edit
      Events/Resources without touching code

## What I can't do from here

A few things on the earlier "real impact" list need your action, not code:
creating the actual WhatsApp group, recruiting real mentors (a set of
outreach message drafts was shared separately — copy/send those), filling
the real Google Forms, getting a founder photo/video, and formal
registration (Section 8 / Trust / Society) when you're ready for that step.
I won't fabricate fake events, member counts, or testimonials on the site —
those need to reflect what's actually true as the org grows.

## Design notes

- **Colors**: Navy `#0F172A`, Gold `#F59E0B`, Surface `#F8FAFC`,
  Text `#334155` — CSS variables at the top of `css/styles.css`.
- **Type**: Inter only, full weight range (400–800), hierarchy from weight
  and spacing rather than mixing fonts.
- **Signature element — "the bridge line"**: a connecting line/node motif
  (hero, Community page) that makes the brand promise literal — it always
  runs from "a diploma student" to "opportunity."
- Accessible by default: visible focus states, skip-to-content link,
  semantic landmarks, `prefers-reduced-motion` respected.

## Next steps (v2 ideas, not built)

- Blog — would need a static-site generator or expanding the CMS scope
- Opportunity Portal / Student Dashboard / Mentor Dashboard — needs a real
  backend (this is where Firebase, mentioned earlier, would actually earn
  its place — logins and live user-submitted data)
- College Chapters directory page
- Expanding Decap CMS to more content (founder bio, hero copy) once the
  current scope feels comfortable
