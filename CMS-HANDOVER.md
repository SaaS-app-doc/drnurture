# Client editing and production CMS handover

## What has been delivered

A five-page website and a functional browser content editor at `admin.html`. The editor handles company/home copy, contact details, product additions/removals, images and product literature. It can save/restore local drafts, preview all pages, import/export backups, and produce a content update ZIP.

Drafts are isolated from published content. Opening `admin.html` does not authenticate a person or grant server access; it only provides an editing interface for local copies of public content. There is no password in JavaScript, hidden shared login, repository token, backend or automatic public publishing.

## Recommended production route

For this small catalogue, **Decap CMS + the final Git repository** is a reasonable next step. Retain the HTML/CSS design and `content.json` model. Decap provides a client-friendly interface and Git-backed content writes; authentication and repository access must be configured.

One-time developer setup:

1. Establish the final client-owned GitHub repository, branch and domain/hosting destination.
2. Choose and configure a supported authentication provider or external OAuth service from the current Decap documentation. Keep client secrets on that service, outside this static repository.
3. Give named editors the required repository/CMS permissions using the chosen backend. Verify that unauthorized visitors cannot write. A GitHub-backend editor generally needs appropriate access to the target repository; if the client must have no repository membership, use a backend/access model that supports that requirement.
4. Install a pinned, reviewed Decap bundle under `/admin/` and configure the supplied example collection against the real repository. Keep this prototype editor at a separate staging path or remove its public footer link after the production CMS is ready.
5. Add validation to the publishing workflow: enforce schema version 2, unique stable ids, supported categories, existing resource references and valid image paths. The preview validates these on load; production validation should reject bad changes before publishing. The example collection alone is not a complete validation pipeline.
6. Decide who reviews product copy before publication. For this pharma website, a draft/review process with an authorized medical/regulatory approver is useful. Direct public edits should follow the agreed approval process.
7. Test an actual content change and image upload from an editor account; confirm the commit, deployment, rollback and visibility from a separate browser. Then train the client with a short real workflow.

After connection, the client edits content in a form; the CMS writes approved updates to the repository and hosting publishes those files. The full site does not need to be rebuilt in React or converted to a large application.

## Simple alternative

If the client changes products only occasionally, use the delivered draft editor and a managed update service. The client edits and exports a content update; the developer reviews it and publishes it. Agree who responds to update requests, what is included, and the response window. This has a lower setup burden, but a person still performs publication.

## What the client can change

| Content | Draft editor now | Connected production CMS |
|---|---|---|
| Home/company text | Yes | Yes, after setup |
| Contact/address/registrations | Yes | Yes, after setup |
| Add/edit/remove products | Yes | Yes, after setup |
| Product/logo/literature images | Local file selected and embedded in draft | Uploaded media managed through the configured backend |
| Product resources | Yes | Yes, after setup |
| Preview changes | This browser only | Depends on configured preview workflow |
| Publish for all visitors | Export, then authorized manager uploads two files | Authorized CMS publish/approval workflow |
| Secure editor accounts | Not included in this preview | Requires authentication and access configuration |
| Arbitrary pages/layouts | Developer change | Additional collection/template work |

## Files in a content update

- `content.json`: published data read by the hosted website.
- `content-data.js`: matching snapshot for offline viewing/fallback.
- `PUBLISHING-INSTRUCTIONS.txt`: short handover instructions.

When a connected CMS writes uploaded files to `uploads/`, those must be committed alongside the JSON. The current browser editor embeds small raster images as data URLs; use proper media files for a larger production catalogue.

## SEO and accessibility considerations

The current pages contain an HTML snapshot and hydrate CMS-managed fields from the shared content file. After major content changes, regenerate the relevant static HTML snapshot if non-JavaScript visitors and search engines must receive the exact latest copy without client-side rendering. The public site remains noindex during review. A future build step can prerender the same JSON into HTML without changing the visual design.

## Current primary references

- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- Decap GitHub backend: https://decapcms.org/docs/github-backend/
- Decap backend overview: https://decapcms.org/docs/backends-overview/
- Decap configuration: https://decapcms.org/docs/configuration-options/

These explain the static-hosting boundary and the authentication/repository connection required for live editing. No provider plan, external account, paid service or live CMS connection has been created as part of this preview.
