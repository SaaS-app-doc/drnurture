# Consultant handover — Dr. Nurture

## Recommended first release

A small, fast company website is appropriate for this brief. Focus on three visitor questions: who is this company, what products are in its portfolio, and how do I contact it? The supplied content supports a company introduction, product catalogue, literature section and direct contact links. It does not yet support claims about manufacturing facilities, certifications, clinical superiority, distribution scale, or company history.

The preview uses five separate HTML pages and a spacious ivory canvas, deep green typography, restrained orange accents, glass-like layers and soft shadows. It retains the existing logo. Product imagery comes from the client's artwork; the visual is not dependent on external stock photos, fonts or scripts.

## Content decisions and what the client must confirm

| Item | Included in the preview | Needed before launch |
|---|---|---|
| Legal company name | Dr. Nurture Pharmaceutical Pvt. Ltd. | Confirm exact legal spelling and incorporation details if they will be published. |
| Address | Shop S-24, Second Floor, GNS Plaza, Block 7/1, Site IV, Greater Noida, Gautam Buddha Nagar, U.P. 201310 | Confirm current office address and the exact map listing/pin. The map link currently searches for GNS Plaza rather than claiming a verified business pin. |
| Contacts | +91 98188 11650; dr.nurtureindia@gmail.com | Confirm the person monitoring enquiries and agree an internal response process. |
| Identifiers | GSTIN 09AAJCD9715B1ZM; drug licences UP1620B000777 and UP1621B000768; FSSAI 22723441000512; Schedule X UP1620G000029 | Transcribed from the invoice header, not independently validated. Obtain current copies and confirm spelling, scope, validity, and whether each should appear publicly. |
| ESULIP | Capsule; esomeprazole 40 mg + levosulpiride 75 mg; pack shows ER 40 mg + SR 75 mg | Current approved prescribing information, exact labeling, pack size and artwork. |
| ZEROMIVA | Injection; cefepime 1000 mg + tazobactam 125 mg; 1.125 gm; supplied pack says I.M./I.V. | Current approved product information, exact labeling and artwork. |
| MACTOL CD3 | Tablet; supplied ingredient names reproduced in the product dialog | Confirm exact composition, strengths, product category and pack images. No strengths guessed. |
| COENZ | Brand, nutrition grouping and Coenzyme Q10 reference | Original high-resolution artwork, complete composition, strength and dosage form. Current source is only 192 × 256 pixels. |
| FENUR | Brand, tablet form and provisional nutrition grouping | Current composition, strengths, product category and separate literature. Only listed on the small overview sheet. |
| PANUR DSR / PANUR 40 | Brands; capsule/tablet forms and provisional gastrointestinal grouping | Current compositions, strengths, exact product categories and separate literature. Smaller text on the overview is too blurred for dependable transcription. |
| Company story | Short, proposed brand copy | An approved 80–150 word company profile, actual founding year, business model and two or three specific differentiators. |
| Artwork | All seven supplied images retained and used | Confirm image/stock-photo rights, supply a vector logo and clean original pack photos on white backgrounds. |

## Priorities by value

1. **Approve the product content first.** Ask the company's qualified medical/regulatory reviewer to review product categories, compositions, names, all original literature, claims and audience before public use. The UCPMP requires promotion to align with marketing approval and information to be balanced, verifiable, up to date, and substantiated. The uploaded posters contain treatment, dosage and comparative statements; inclusion in this private preview is not approval for public promotion. A checkbox or disclaimer does not make a public static site compliant.
2. **Get better assets.** Request a vector logo, original PDFs and clear product pack images. In particular, replace both 192 × 256 images. Enlarging them will not recover the lost detail. These assets will improve perceived credibility more than adding animation.
3. **Add facts that establish trust.** Obtain a short company profile, names/roles of approved spokespeople where useful, verified office photography, business type, operating regions and valid registrations. Add manufacturer/certification statements only when supported by evidence and within their actual scope.
4. **Own the domain and email.** Have the client register the final domain in their own account and provide delegated access. Use a business mailbox on that domain, with a named owner and backup owner. Preserve the supplied Gmail address until a replacement is verified.
5. **Keep enquiries simple.** Call and email are enough for version one. If lead volume later justifies a form, use an approved processing service or a small backend with spam controls, server-side validation and a matching privacy notice. Never put mail-service secrets in browser JavaScript. Request business information, not prescriptions or sensitive patient records. Add a WhatsApp link only after the client confirms that the supplied phone supports business WhatsApp and approves its use.
6. **Launch with sound local search basics.** Confirm the actual Google Business Profile, use a consistent name/address/phone, approve page title/description and social preview, then add the final canonical URL, verified Organization/business data, sitemap and Search Console. The preview deliberately remains noindex. These are setup recommendations, not ranking guarantees.
7. **Agree maintenance and ownership.** Include a short monthly check for broken contact links, changed products, revised prescribing literature, domain renewal and dependency-free browser compatibility. Keep a versioned source backup and specify who approves and publishes content. A browser draft editor is included for company text, products, images and resources. For independent client publishing, connect a Git-backed CMS with named editor access and a defined approval workflow; see CMS-HANDOVER.md.

## Hosting and scope

For sharing a static design preview, the folder can be served directly on GitHub Pages without a build. Keep `index.html` at the repository root and enable Pages from `main` → `/ (root)`. For the final company site, confirm the host's current usage terms, custom-domain ownership, access needs, support and publishing responsibilities. A browser-only enquiry form cannot deliver submissions on its own.

This release does not include checkout, prescriptions, online medicine ordering, a CRM, authenticated distributor access, or patient data collection. Those should be separate scopes only if a concrete business need and the applicable review process justify them.

## Practical phased delivery

- **Preview review:** Agree visual direction and company wording; obtain missing content and high-resolution assets.
- **Launch preparation:** Confirm all product and registration information, approve literature/audience, configure domain/email, replace provisional metadata and review privacy/contact handling.
- **After launch:** Verify real enquiries reach the right person, monitor common business questions, and add product pages or a CMS only when the content and update process justify them.

## References checked 23 October 2026

- GitHub Pages creation and static-site entry files: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- Department of Pharmaceuticals, UCPMP 2024 including 2025 amendment material: https://ucmp.pharma-dept.gov.in/Pharma/UCPMP%202024%20for%20website_0.pdf
- Government update dated 24 July 2026 confirming the September 2025 amendment: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2288768&lang=1&reg=3

The client should use its qualified reviewer to determine the requirements for the actual products, business model, audience and launch date.


## Added in this version

- Home, Company, Products, Resources and Contact are separate documents with real navigation.
- admin.html provides local draft editing, product/resource management, image selection, draft preview and update export.
- Public publishing and secure editor login remain unconnected. Publishing now uses exported content files and an authorized website manager; the CMS handover explains the one-time setup for direct client publishing.
