# Dr. Nurture — corrected image paths

This version keeps all website files and images in the SAME folder. You do not need to create an assets folder.

## Apply this fix to the existing GitHub repository

1. Extract this ZIP.
2. Open your existing repository, then Add file → Upload files.
3. Click Choose your files and select every file INSIDE the extracted folder. All items in this download are individual files.
4. Commit the upload to the branch used by GitHub Pages. Files with matching names replace the old versions.
5. Wait for the Pages deployment to finish, then reload the website with Ctrl + F5.

Keep index.html, products.html, resources.html, styles.css, script.js, content.json, content-data.js, cms-core.js, admin files and the image files at the repository root. Do not upload the ZIP itself. No new repository or Pages settings are needed.

## What changed

- Image and favicon references now point to image files beside the pages.
- Company/product/resource image values in content.json and the offline snapshot use the same layout.
- Image validation accepts these relative filenames, so the editor and product dialogs work with the fix.
- Older browser drafts and imported backups with an assets/ prefix remain usable.
- The design, separate pages and browser draft editor are preserved.

## Editing content

Choose Content editor in the website footer. It supports company/contact text, products, literature, image selection, local draft preview and exported content updates. Save browser draft stores data in this browser. Publishing a change still requires uploading the exported content.json and content-data.js through an authorized repository account. This fix does not add login or automatic live publishing.

See CMS-HANDOVER.md and decap-config.example.yml for the optional future CMS setup. The example configuration is documentation; it is not an active connection.
