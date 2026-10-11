# SK Magic Homes — GitHub Pages package

A responsive static website for a nine-bedroom vacation home in Florida. Includes seven real property photos from the supplied Airbnb listing, storybook blue, blush pink and gold styling, calligraphy headings, animated sparkles, pool/arcade/bedroom sections, accessible navigation and reduced-motion support. No build process or installation needed.

## Publish to GitHub Pages

1. Unzip this package.
2. Open your GitHub repository, choose **Add file → Upload files**, and upload the **contents** of the `sk-magic-homes` folder. `index.html` must be at the repository root, alongside `styles.css`, `script.js`, `.nojekyll` and `assets/`. GitHub's web uploader may omit `.nojekyll`; this simple site works without it too.
3. Commit the uploaded files.
4. Go to **Settings → Pages**. Under Build and deployment select **Deploy from a branch**.
5. Choose **main** and **/(root)**, then Save. GitHub will show the published URL when deployment finishes.

All asset paths are relative, so the page works on both user sites and repository project sites. You can preview locally by opening `index.html` in your browser.

## Add your booking link

In `script.js`, change the `BOOKING_URL` value to your actual HTTPS booking URL. The button opens the supplied Airbnb listing; reservations are handled on Airbnb.

## Customize

- Edit the text in `index.html`.
- Change palette variables at the top of `styles.css`.
- Add real property photography to `assets/` and replace the illustrative scenes when ready. The page now displays real listing photos, a hero photo collage, themed bedroom gallery, verified amenities and guest-review excerpts.
- Fonts load from Google Fonts (Great Vibes, Cormorant Garamond, Montserrat). System font fallbacks work when offline. All other assets are included locally.
- Room details and amenities were checked against Airbnb on October 11, 2026. Reconfirm operating details before publishing after a change of ownership.
- The website uses original fairytale artwork and does not imply Disney affiliation.

Files: index.html, styles.css, script.js, assets/enchanted-estate.svg, assets/favicon.svg, .nojekyll, README.md.

## Updated design
Headline: Where every stay begins with magic.

Source: https://www.airbnb.com/rooms/689805654769199319
All seven property photos are included locally. Review excerpts preserve original words, with names and dates. Rating is a dated snapshot. Selected reviews include stays under the prior host.


## Two guest journeys

The header opens Plan your stay or My stay. The existing marketing experience is retained with dates-and-rates links, upcoming-offer sections, and an official Orlando events-calendar link. Promotions are clearly inactive until the owner provides confirmed terms.

Use https://skmagichomes.com/#my-stay to open the public guest guide directly. Guests can search topics and prepare arrival updates, early-check-in or late-checkout requests, and feedback. The site copies a draft for the guest to paste and send through the Airbnb reservation; it does not send messages or approve reservation changes. No messages or personal information are stored by this site.

Add verified item locations, appliance model instructions, parking limits, house rules, and checkout details to GUEST_GUIDES in script.js. Keep Wi-Fi passwords, door/gate codes, private reservation information, and service credentials out of this public repository. A secure service is needed for authenticated guest access or direct message delivery.
