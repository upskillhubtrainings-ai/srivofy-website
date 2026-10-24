# Srivofy website — deployment guide (GitHub → Hostinger)

This guide takes you from the project on your computer to the live site at
**https://www.srivofy.com**. No prior Git, GitHub, DNS or server experience is assumed.

> **How this site is deployed, in one paragraph.**
> The website is built with Next.js but **exported as plain static files** (HTML, CSS, JavaScript)
> into a folder called `out/`. Static files run on every Hostinger web-hosting plan — no Node.js
> server is needed. The contact form uses one small PHP file, which Hostinger web hosting runs
> natively. When you push code to GitHub, **GitHub Actions** builds the site automatically and
> publishes the finished files to a branch called **`deploy`**. Hostinger's **Git** feature then
> copies that branch into your site's `public_html` folder.
>
> ```
> Your computer ──git push──▶ GitHub (main) ──Actions build──▶ GitHub (deploy) ──Hostinger Git──▶ public_html ──▶ www.srivofy.com
> ```

Hostinger menus change from time to time and differ between plans. Where this guide names a menu,
look for the closest match; the search box at the top of hPanel also finds settings by name
(for example "Git", "SSL", "DNS").

---

## Part A — Prepare and test the website on your computer

**What you need:** Node.js 20.9 or newer (22 LTS recommended) from https://nodejs.org, and Git
from https://git-scm.com. Check them in a terminal:

```bash
node -v
git --version
```

This project uses **npm** (it has a `package-lock.json`), so use npm commands below.

1. **Open the project folder** in a terminal:

   ```bash
   cd D:\New_Downloads\srivofy-website
   ```

2. **Install dependencies** (first time, or after `package.json` changes):

   ```bash
   npm install
   ```

3. **Run the development server** and open http://localhost:3000:

   ```bash
   npm run dev
   ```

4. **Test every page:** Home, Services, the five service pages, About and Contact. Try the
   Services menu, the mobile menu (make the browser narrow), the architecture diagram on the home
   page and the "Run Sample Processing" demo on the Document Processing page.

5. **Run the production build:**

   ```bash
   npm run lint
   npm run build
   ```

   A successful build ends with a list of routes and creates the `out/` folder.

6. **Fix build errors before deploying.** If `npm run build` fails, read the first error it
   prints — it names the file and line. Never deploy a failed build.

7. **Check the details** (all set in `src/config/site.ts`):
   - Demo buttons show "Demo coming soon" until you add URLs.
   - Social icons, email and phone links open the right destinations.
   - `/portfolio/` is not linked anywhere. (Locally `npm run dev` may still show a "not found"
     page there; on the live site it returns a real 404.)

   To preview the exact built site: `npm start`, then open http://localhost:3000.
   The contact form only sends from the live Hostinger site (PHP does not run locally).

---

## Part B — Put the project on GitHub

**Current state of this folder:** it is already a Git repository on branch `main`, with
**no commits yet** and **no remote**. So you do **not** need `git init`.

1. Sign in at https://github.com.
2. Click **+** (top right) → **New repository**.
3. **Repository name:** `srivofy-website`.
4. Choose **Private** (recommended) or **Public**.
5. **Do not** tick "Add a README", ".gitignore" or "license" — the project already has them, and
   an initialized GitHub repository would conflict with your first push.
6. Click **Create repository**. Copy the repository URL GitHub shows, e.g.
   `https://github.com/YOUR-USERNAME/srivofy-website.git`.
7. In the project folder, make the first commit and push:

   ```bash
   git add .
   git commit -m "Initial Srivofy website"
   git remote add origin https://github.com/YOUR-USERNAME/srivofy-website.git
   git push -u origin main
   ```

   - The first push may open a browser window asking you to sign in to GitHub — approve it.
   - If Git asks for your name/email first, run:
     `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"`.
   - If `git remote add` says *remote origin already exists*, a remote was added before — check it
     with `git remote -v` instead of adding another.

8. **Verify:** refresh the repository page on GitHub — your files should be there. Open the
   **Actions** tab: a workflow called **Build and publish** should run and turn green within a
   few minutes. When it finishes, the branch selector on GitHub shows a new **`deploy`** branch
   containing `index.html`, `.htaccess`, `_next/`, `api/` and the page folders.

   `.env` files, `node_modules/`, `.next/` and `out/` are excluded by `.gitignore`. Never commit
   passwords or API keys.

---

## Part C — Identify your Hostinger hosting type

1. Log in to https://hpanel.hostinger.com.
2. Open **Websites** and find `srivofy.com`. The plan name appears on the website's dashboard or
   under **Hosting** in the main menu.

| What you see | What it means for this site |
| --- | --- |
| **Web Hosting** — Single, Premium or Business | ✅ Fully supported. Serves static files and runs PHP (needed for the contact form). This guide is written for this. |
| **Cloud Hosting** — Startup, Professional, Enterprise | ✅ Supported the same way (static files + PHP). Some plans also offer a Node.js option — this site does not need it. |
| **VPS** | Works, but you configure the web server yourself (Apache/Nginx + PHP). Ask for a VPS-specific guide. |
| **Website Builder / Horizons** only | ❌ Cannot host a custom-coded site. You need a Web or Cloud hosting plan. |

Notes:
- This project is **static + one PHP file**, so it does **not** depend on Node.js hosting.
- If you later add features that need a running server (server-side AI calls, database writes),
  they belong in a separate backend or service — or a Node.js-capable plan. The static site would
  stay as it is.

---

## Part D — Connect GitHub to Hostinger

### D1. Prepare the website folder

Hostinger's Git deployment needs the target folder to be **empty** the first time.

1. hPanel → **Websites** → **Manage** (next to srivofy.com) → **Files** → **File Manager**.
2. Open `public_html`. If it contains a placeholder (e.g. `default.php`, `index.html`), and you do
   not need anything in it, select all → **Delete**. If unsure, download a backup first.

### D2. Add the repository in Hostinger

1. In the website's menu, open **Advanced** → **GIT** (or search "Git").
2. Fill in:
   - **Repository:**
     - *Public repo:* `https://github.com/YOUR-USERNAME/srivofy-website.git`
     - *Private repo:* use the SSH address `git@github.com:YOUR-USERNAME/srivofy-website.git`
       (see D3 first).
   - **Branch:** `deploy` ← important: **not** `main`. `main` holds source code; `deploy` holds
     the built website.
   - **Directory:** leave **empty** to deploy into `public_html`.
3. Click **Create**, then **Deploy**.

### D3. Private repositories only — add Hostinger's deploy key

1. In the Hostinger **GIT** page, find the **SSH key** for private repositories and copy it.
2. GitHub → your repository → **Settings** → **Deploy keys** → **Add deploy key**.
3. Title: `Hostinger`; paste the key; leave "Allow write access" **unticked**; **Add key**.
4. Return to Hostinger and create/deploy the repository using the SSH address.

### D4. Turn on automatic deployment

1. In Hostinger's **GIT** page, open **Auto deployment** for the repository and copy the
   **Webhook URL**.
2. GitHub → repository → **Settings** → **Webhooks** → **Add webhook**.
3. **Payload URL:** paste the Hostinger URL. **Content type:** `application/json`.
   **Which events:** "Just the push event". Click **Add webhook**.

Now each time GitHub Actions updates the `deploy` branch, Hostinger pulls the new files.
(Pushes to `main` also ping the webhook; Hostinger then re-deploys `deploy`, which is harmless.)

### D5. Environment variables

None are required. Everything public lives in `src/config/site.ts`; the mail recipient lives
server-side in `public/api/contact-config.php`. Do not add secrets to the repository.

### D6. Check the deployment

- **GitHub:** **Actions** tab → latest run → open the **build** job to read its log.
- **Hostinger:** the **GIT** page shows the last deployment and its output.
- **File Manager:** `public_html` should now contain `index.html`, `.htaccess`, `404.html`,
  `_next/`, `api/`, `services/`, `about/`, `contact/` …

If something fails, fix it locally, run `npm run build`, commit and push again.

### Alternative — manual upload (no Git integration)

Use this if your plan has no Git option or you prefer uploading by hand:

1. On your computer: `npm run build`.
2. Open the `out/` folder and select **everything inside it** (not the `out` folder itself).
   Make sure hidden files are visible so `.htaccess` is included.
3. Compress the selection into a `.zip`.
4. hPanel → **File Manager** → `public_html` → **Upload** the zip → right-click → **Extract**,
   then delete the zip.

You can also upload with an SFTP client (FileZilla) using the credentials in hPanel → **Files** →
**FTP Accounts**.

> ⚠️ Upload the **built** files from `out/`, never the project source (`src/`, `package.json`…).
> Apache cannot run an unbuilt Next.js project.

---

## Part E — Domain, DNS and HTTPS

1. **Find where DNS is managed.** hPanel → **Domains** → `srivofy.com`. If the domain uses
   Hostinger nameservers and is connected to this hosting plan, DNS is already correct — skip to
   step 5.
2. **If the domain is registered elsewhere**, either point its nameservers to the ones Hostinger
   shows for your hosting plan, or keep your current DNS and add the records Hostinger lists
   (typically an **A record** for `@` and a **CNAME** or **A record** for `www`). Copy the exact
   values from hPanel — do not use values from guides or forums.
3. **Do not delete existing email records** (`MX`, and `TXT` records for SPF/DKIM/DMARC). Your
   `inquiry@srivofy.com` mailbox depends on them.
4. **Wait for propagation** (minutes to up to 24–48 hours). Check with https://dnschecker.org for
   `srivofy.com` and `www.srivofy.com`.
5. **Enable SSL:** hPanel → **Security** → **SSL** → install the free SSL certificate for
   `srivofy.com` (include `www`). Wait until it shows **Active**.
6. **Canonical domain:** the site's `.htaccess` redirects `http://` and `srivofy.com` to
   **`https://www.srivofy.com`**. If you prefer the non-www version instead, change
   `siteConfig.website` in `src/config/site.ts` and the redirect rule in `public/.htaccess`.
7. **Test** `http://srivofy.com`, `https://srivofy.com`, `http://www.srivofy.com` — all should end
   at `https://www.srivofy.com/`.

---

## Part F — Post-deployment checklist

| Check | How |
| --- | --- |
| Homepage loads | https://www.srivofy.com |
| All five service pages | Services menu → each item |
| About, Contact | Main navigation |
| Portfolio is disabled | https://www.srivofy.com/portfolio/ shows the 404 page |
| Nested page refresh | Open a service page, press refresh — it reloads (no 404) |
| Social icons | Top bar and footer — Facebook/LinkedIn still placeholders until replaced |
| Email & phone links | Click them — mail app / dialer opens |
| Demo placeholders | Each service page shows "Demo coming soon" until URLs are added |
| WhatsApp button | Bottom-right; opens WhatsApp chat with +91-7207382886 |
| Mobile navigation | Phone or narrow browser: menu opens, Services expands, links work |
| Responsive layout | No sideways scrolling on phone, tablet, desktop |
| Contact form | Send a test enquiry → it arrives at inquiry@srivofy.com (check spam once) |
| SEO | Browser tab titles differ per page; https://www.srivofy.com/sitemap.xml and /robots.txt load |
| HTTPS | Padlock shows; http redirects to https |
| Broken links | Click through menus, footer and buttons |
| Console errors | Browser → F12 → Console: no red errors |

### Rolling back

If a change breaks the site, undo the last commit and push — the pipeline redeploys the previous
version:

```bash
git log --oneline          # find the bad commit
git revert <commit-id>     # creates a new commit that undoes it
git push
```

---

## Part G — Making updates later

```bash
npm run dev                         # 1. edit and preview locally
npm run lint && npm run build       # 2. confirm it builds
git add .
git commit -m "Update Srivofy website"
git push                            # 3. triggers build → deploy branch → Hostinger
```

Then check the **Actions** tab turns green and refresh the live site (hard refresh:
Ctrl + Shift + R). Automatic deployment happens only if D4 (webhook) is configured; otherwise
press **Deploy** in Hostinger's GIT page after the Action finishes.

Common edits: contact details, social links, demo URLs, booking link and the Portfolio switch are
all in `src/config/site.ts`.

---

## Part H — Troubleshooting

| Problem | What to do |
| --- | --- |
| **Build fails locally or in Actions** | Read the first error message (file + line). Run `npm run build` locally until it passes, then push. |
| **Actions run is red at "Publish"** | GitHub → repo **Settings** → **Actions** → **General** → **Workflow permissions** → choose **Read and write permissions** → Save → re-run the job. |
| **Missing environment variables** | None are needed. If you added one, set it under GitHub **Settings → Secrets and variables → Actions** and reference it in the workflow. |
| **Git authentication errors on push** | Sign in again when prompted, or create a Personal Access Token (GitHub → Settings → Developer settings) and use it as the password. |
| **Hostinger can't access the repo** | Private repo: use the SSH address and add Hostinger's deploy key (D3). |
| **Wrong branch deployed / site shows code files** | Hostinger must deploy **`deploy`**, not `main`. |
| **Hostinger says the directory isn't empty** | Empty `public_html` (back it up first), then deploy again. |
| **404 on nested pages after refresh** | Confirm `.htaccess` exists in `public_html` (enable "show hidden files"). Page folders such as `services/ai-voice-agents/index.html` must be present. |
| **SSL or redirect loop** | Wait for SSL to become Active before relying on the HTTPS redirect. If a loop persists, temporarily comment out the HTTPS rule in `public/.htaccess` and contact Hostinger support. |
| **DNS not resolving** | Check nameservers/records match hPanel exactly; allow propagation time. |
| **Images or styles missing** | The `_next/` folder must be uploaded too. With manual upload, extract the zip directly inside `public_html`. |
| **"Unsupported Node.js runtime"** | Not applicable to this static site on Hostinger. Locally, install Node.js 20.9+ (22 LTS recommended). |
| **Contact form shows an error** | Check `public/api/contact-config.php`: `from` must be a mailbox that exists in hPanel → Emails. Check spam. Rate limit is 5 messages per visitor per 10 minutes. |
| **Form works locally? No — expected** | PHP runs only on the server; test the form on the live site. |
| **AI features look "live"** | They are demonstrations. Voice agents, WhatsApp AI, document OCR and database writes each need a real integration and backend before launch. |
