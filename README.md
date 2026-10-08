# DropMate Lite website

A responsive marketing website for DropMate Lite, the Windows app for local file transfers between phones and PCs. The official download destination is the [Microsoft Store](https://apps.microsoft.com/detail/9MSSHHFC8D3R). The website contains a homepage, privacy policy, and support page.

The website lives in `website/` alongside the desktop application. It has its own dependencies and can be deployed independently. It does not build or publish the Windows application.

## Stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS 4 and lightweight CSS transitions
- Lucide icons and a locally bundled Manrope font
- Next.js Image, metadata, sitemap, and robots routes
- Playwright and axe for browser verification
- Normal Next.js deployment on Vercel; no static export

Use Node.js 22 or newer and npm. Dependency versions are captured in `package-lock.json`.

## Run locally

From PowerShell on this machine:

```powershell
Set-Location 'C:\Users\hp\Desktop\DropMate\website'
npm.cmd install --cache .npm-cache
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables or account are needed to run the website.

For a production build and local production server:

```powershell
npm.cmd run build
npm.cmd start
```

For a clean install after cloning the repository, use `npm.cmd ci --cache .npm-cache`. The local npm cache is excluded from Git. The `.cmd` suffix works in Windows PowerShell without changing script-execution policy; on macOS or Linux, use `npm`.

## Checks

The browser tests use Microsoft Edge when it is installed at the standard Windows location. On another machine, first run `npx.cmd playwright install chromium` (use `npx` on macOS/Linux), or provide `PLAYWRIGHT_EXECUTABLE_PATH` for an installed Chromium-based browser.

```powershell
npm.cmd run typecheck
npm.cmd run build
npm.cmd run test:e2e
```

Check `/`, `/privacy`, `/support`, `/robots.txt`, and `/sitemap.xml`. Exercise mobile navigation, FAQ expansion, the screenshot viewer, keyboard focus, and all Microsoft Store links. Review phone, tablet, and desktop widths. An empty local sitemap is intentional until a real production origin is available; see “SEO and domain configuration.”

## Verification completed October 8, 2026

- Dependency installation, `npm run build`, and `npm run typecheck` passed.
- All 17 browser checks passed: 16 in the full run, then the tablet check passed after allowing more time for its first optimized image to load. The saved test now includes that allowance.
- Tested all three pages at 375, 768, and 1440 pixels, plus Store links, mobile navigation, keyboard FAQ/gallery behavior, modal focus, browser Back scrolling, metadata, image assets, and automated WCAG A/AA scans.
- Page browsing made no third-party resource requests and produced no JavaScript runtime errors.
- `npm audit --omit=dev` reported zero runtime dependency vulnerabilities at verification time.
- Isolated mobile Lighthouse: performance **97**, accessibility **100**, best practices **100**; FCP **1.3 s**, LCP **2.2 s**, TBT **150 ms**, CLS **0**. These are local lab results, not deployed field measurements.
- Local Lighthouse SEO was **66** because local builds intentionally block indexing without a known production origin. Robots syntax passed. Recheck SEO after the Vercel production deployment has its actual domain.

Local Lighthouse reports are saved under `verification/`, which is ignored by Git. Browser test screenshots are under `test-results/` and are also ignored. Automated accessibility checks supplement manual keyboard and visual review; they are not a full accessibility certification.

## Publish a website-only GitHub repository

The current workspace has no parent Git repository, so the website can have its own repository. Run these commands inside the website folder. If you later add it to an existing parent repository instead, use the monorepo option below without initializing another repository.

```powershell
Set-Location 'C:\Users\hp\Desktop\DropMate\website'
git init -b main
git add .
git commit -m "Build DropMate Lite marketing website"
```

On GitHub, create an empty repository named `dropmate-lite-website`, without adding a README, license, or `.gitignore`. Replace `YOUR_GITHUB_USERNAME` below with the repository owner's username:

```powershell
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/dropmate-lite-website.git
git push -u origin main
```

Alternatively, if GitHub CLI is installed and authenticated, the repository creation and push can be done with:

```powershell
gh repo create dropmate-lite-website --private --source=. --remote=origin --push
```

Choose one publishing method. Do not run the GitHub CLI command after you already created and added `origin` manually. This project has not been pushed or deployed automatically.

If you prefer to keep the website in the existing DropMate repository, commit the `website/` directory using that repository's normal workflow; do not run `git init` inside it. Configure Vercel to build only `website/` as described below.

## Deploy on Vercel

1. Sign in to Vercel and choose **Add New → Project**.
2. Connect GitHub, grant access to your chosen repository, and import it.
3. Choose the **Next.js** framework preset.
4. Set **Root Directory** to `./` for a repository containing only the website. If importing the existing DropMate repository, set it to `website`.
5. Use Node.js 22 or newer, build command `npm run build`, and the default Next.js output setting. Do not select `out` or enable static export. Vercel can install dependencies with its default npm behavior.
6. No user-defined environment variables are required. Leave Vercel's access to **System Environment Variables** enabled so production URLs and preview detection are available.
7. Select **Deploy**. After the build succeeds, open the production URL and check all three pages, the Store buttons, and the image gallery.
8. Future pushes to the production branch deploy production updates; other branches and pull requests can receive preview deployments.

See the official [Git import guide](https://vercel.com/docs/git) and [Next.js on Vercel documentation](https://vercel.com/docs/frameworks/full-stack/nextjs).

## Screenshots and brand assets

The supplied screenshots show the actual local application's interface with illustrative files, devices, and transfer state. They are development previews, not verified captures of the Microsoft Store release. The phone image shows the actual phone-page interface rendered offline with example state. Replace all seven with approved captures of the shipping app before launch; the hero may reuse the approved Send screenshot.

See [ASSETS.md](./ASSETS.md) for provenance, sizes, replacement requirements, and the optional local capture script. That Python script uses the desktop repository and is not needed to build or deploy this standalone website. Keep the development-preview captions until the screenshots are replaced with approved release captures.

Screenshots are kept at stable paths so they can be replaced without restructuring the page. Keep each image's aspect ratio consistent with its component; update the dimensions in the screenshot data if necessary.

| File in `public/` | Purpose | Current size |
| --- | --- | --- |
| `screenshots/hero-app.png` | Main hero app image | 1200 × 830 |
| `screenshots/home.png` | Desktop home screen and product preview | 1200 × 830 |
| `screenshots/send.png` | Send screen | 1200 × 830 |
| `screenshots/qr.png` | Desktop QR Connect screen | 1200 × 830 |
| `screenshots/mobile-transfer.png` | Phone transfer screen | 390 × 844 |
| `screenshots/transfer.png` | Active transfer progress | 1200 × 830 |
| `screenshots/history.png` | Transfer history | 1200 × 830 |
| `logo.png` | Original raster brand mark | 512 × 512 |
| `logo.svg` | Original vector brand mark | 128 × 128 view box |
| `favicon.ico` | Original browser favicon | Multi-size ICO |
| `og/dropmate-og.png` | Social sharing image | 1200 × 630 |

Use real screenshots of the shipping application for final marketing images. Remove names, addresses, personal filenames, and active connection QR codes before publishing. The gallery should clearly identify any illustrative placeholders until replaced.

Replace images at the same filenames to keep references working. Use PNG for app screenshots, export at a readable resolution, and optimize file size. After replacing assets, rebuild the site and review the mobile layout and expanded images. The social image should show the real logo, the tagline “Your files. Your devices. Instantly.”, and an app visual.

The logo and favicon files were copied unchanged from the desktop application's `assets/icons/dropmate.svg`, `dropmate.png`, and `dropmate.ico`. No new logo assets are required unless DropMate Lite has a different approved mark. Do not redraw or significantly alter these assets. The Open Graph image already contains the original logo, tagline, and a development app preview; update its app visual when final screenshots are approved.

To use an official Microsoft Store badge later, update the reusable `MicrosoftStoreButton` component while retaining its Store URL and accessible label.

## Edit content and download links

- `lib/site.ts`: brand details, support email, metadata defaults, final domain, and `STORE_URL`.
- `lib/content.ts`: feature cards, use cases, and all eleven FAQ answers.
- `components/`: homepage sections, shared navigation/footer, screenshot display, and Store button.
- `app/privacy/page.tsx`: privacy policy, effective October 4, 2026.
- `app/support/page.tsx`: troubleshooting and clickable support contact.
- `app/globals.css`: visual system, layout, responsive styles, and reduced-motion behavior.

All primary download buttons use `STORE_URL` from `lib/site.ts`. Change it once there if the official Store listing changes. Do not add an installer download endpoint to this marketing site.

## SEO and domain configuration

`lib/site.ts` resolves the public origin from the optional `siteConfig.url` first, then from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`. This Vercel variable is supplied by the platform and has no `https://` prefix; the helper adds it. The website does not need a manually configured `.env` file. See Vercel's [system environment variable documentation](https://vercel.com/docs/environment-variables/system-environment-variables).

For a production deployment with a known origin, the site emits route-specific canonical URLs, Open Graph and Twitter/X image metadata, and a sitemap containing `/`, `/privacy`, and `/support`. Preview and development deployments are marked `noindex` and disallowed in robots. Without a real origin, canonical and absolute social-image URLs are omitted and the sitemap remains empty; no production URL is invented.

If hosting outside Vercel, set `siteConfig.url` to your actual HTTPS origin before making a production build. Do not use a preview URL as the permanent production origin.

## Connect a custom domain

1. In the Vercel project, open **Settings → Domains**, add the domain you own, and connect it to production.
2. At your domain's DNS provider, add the exact records Vercel displays for that project. The apex usually uses an A record and a subdomain such as `www` uses a CNAME; use Vercel's displayed values rather than copying a generic IP or hostname.
3. Add both the apex and `www` if you use both, and redirect the secondary address to your preferred address. Keep existing email DNS records intact.
4. Wait for Vercel to report a valid configuration and certificate.
5. Set `siteConfig.url` in `lib/site.ts` to your preferred HTTPS origin, commit, and redeploy. This pins canonical URLs to your chosen domain. Leaving it empty also works when Vercel selects the intended production domain automatically.
6. Check the canonical tag, social image URL, `/robots.txt`, and `/sitemap.xml` on the custom domain after the new production deployment completes.

Vercel's current [custom domain setup guide](https://vercel.com/docs/domains/working-with-domains/add-a-domain) covers DNS verification and redirects.

## Analytics and privacy

No Google Analytics, advertising trackers, Vercel Analytics, or other analytics packages are enabled. `components/AnalyticsSlot.tsx` is an intentionally empty extension point mounted by the root layout. If analytics are added later, keep integration code there, consider a privacy-conscious option, document any environment variables in an example file without secrets, and update the privacy policy to describe actual behavior.

Local environment files, `node_modules`, `.next`, Vercel project settings, and browser test artifacts are ignored by Git. Never commit local secrets.

## Before launch

- Replace any remaining illustrative screenshots with approved application captures.
- Review the privacy and support copy against the released app, including QR expiry and certificate-verification guidance.
- Run the build and browser checks, then inspect the production deployment at phone, tablet, and desktop widths.
- Configure a production domain for canonical URLs and sharing metadata.

The website does not send files, create accounts, or provide support through a server form. Its purpose is to explain the Windows app, link to the Microsoft Store, and provide help. No transfer-speed measurements, end-to-end encryption guarantees, review counts, or ratings are invented.

© 2026 Christian Kwame. DropMate Lite is independently developed and is not affiliated with or endorsed by Microsoft.
