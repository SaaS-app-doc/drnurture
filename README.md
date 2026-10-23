# Dr. Nurture — multipage website + mini content editor

Plain HTML, CSS, JavaScript and a content file. No framework, build step or API keys are needed for the preview.

## Website pages

- `index.html` — Home
- `about.html` — Company
- `products.html` — searchable/filterable product catalogue
- `resources.html` — product literature
- `contact.html` — company contacts and FAQs
- `admin.html` — browser draft editor

Navbar links load real HTML pages in the current tab. Product details and literature continue to use dialogs within their relevant pages.

## Publish the website on GitHub Pages

1. Extract this ZIP.
2. Upload the extracted website files and `assets/` to your repository root. `index.html` must be at the root, alongside the other HTML pages, JavaScript, stylesheets, `content.json`, `content-data.js`, and `.nojekyll`.
3. Enable Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
4. Open the Pages URL shown by GitHub. All website paths are relative and support project subdirectories.

Do not upload the ZIP as the website. The `cms-setup/` folder and Markdown guides are developer documentation; they do not activate a production CMS.

GitHub guide: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Mini editor: what works now

Open `admin.html`, or choose **Content editor** in the website footer.

- Edit homepage copy, company introduction, phone, email, address and registration fields.
- Add, edit or remove products; choose categories and homepage featured products.
- Replace product/logo/literature images using PNG, JPEG or WebP files up to 700 KB.
- Add/remove literature resources and link them to products.
- Save a browser draft, reload it, and preview it across the separate pages.
- Import/export a JSON backup and download an update ZIP.

**This is a working browser draft editor. It has no login, server write access or direct Publish action.** Save browser draft saves only on this browser and domain. Ordinary visitors continue to see published content. The `?draft=1` preview reads only the saved draft in your browser; it does not broadcast the draft or expose it to other visitors.

### Publish an editor update today

1. Edit, save and preview the draft.
2. Get approval for the changed content, particularly product information.
3. Click **Download update**. Extract its ZIP.
4. An authorized website manager replaces `content.json` and `content-data.js` at the repository root and commits them. Keep the existing website files and assets.
5. Once hosting redeploys, check the normal page URL without `?draft=1`.

Images selected in the editor are embedded in those content files. They do not need a separate upload. Export a backup before clearing browser data, changing devices, or switching domains. The editor limits total content size to about 3.6 MB; larger catalogues should use a connected media service/CMS.

## Production client CMS

For a nontechnical client who needs independent publishing, connect a Git-backed CMS such as **Decap CMS** to the final repository and configure authentication once. The intended client flow is **sign in → edit → preview/review → publish**.

Read `CMS-HANDOVER.md` and `cms-setup/decap-config.example.yml`. The example is not connected to a real repository, OAuth provider or editor account. No credentials are embedded. Hosting the static editor file alone cannot provide protected server writes.

## Content architecture

- `content.json`: authoritative published content, loaded by hosted pages.
- `content-data.js`: saved snapshot used for offline/file previews and as a visibly flagged fallback if loading published content fails. The mini editor exports both files together.
- `cms-core.js`: schema validation, safe image handling, local draft support and update ZIP creation.
- `script.js`: shared page rendering, navigation, product search and literature dialogs.
- `admin.js` / `admin.css`: draft editor.
- `styles.css`: original visual design and responsive layouts.

The website snapshot allows the initial preview to open from local files. For an accurate preview after external CMS edits to `content.json`, serve the folder through a local static server or view the hosted site; regenerate `content-data.js` when keeping an offline copy current. A connected CMS can update the JSON directly without a website framework or rebuild. It should also regenerate the offline snapshot through its publishing workflow if offline copies are required.

The editor manages existing page content and catalogue entries. Arbitrary new pages, layout changes, orders, medical records and customer accounts are separate development work.

## Preview and launch status

The pages remain `noindex, nofollow` until content is approved. A checkbox before literature viewing is an acknowledgement, not verified professional access. All static assets remain publicly accessible if the site is publicly hosted. Retain the client review access until a qualified reviewer approves the actual public content and audience.

No manufacturing status, GMP/ISO certification, customer statistics, testimonials or clinical efficacy claims have been invented. COENZ and the product-range overview remain low resolution. Current identifiers and product specifications need client confirmation; see `CONSULTANT-NOTES.md`.

Keep the final domain, repository and authentication provider under client ownership, with delegated developer access and an agreed backup/content-approval process.
