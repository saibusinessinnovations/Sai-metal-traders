# Sai Metal Traders Website

Static Vercel-ready website for Sai Metal Traders, a global metal scrap trading company.

## How to run locally
Open `index.html` in your browser.

## Image replacement
Current preview uses local SVG placeholders in `/assets/` so the site works immediately.
For final production photos, download product images and store them here:

- `/public/images/products/aluminum-scrap.jpg`
- `/public/images/products/copper-scrap.jpg`
- `/public/images/products/stainless-steel-scrap.jpg`
- `/public/images/products/brass-scrap.jpg`
- `/public/images/products/nickel-alloy-scrap.jpg`
- `/public/images/products/ferrous-steel-scrap.jpg`
- `/public/images/products/battery-lead-scrap.jpg`
- `/public/images/products/mixed-industrial-scrap.jpg`
- `/public/images/products/container-ready-material.jpg`

Logistics images:

- `/public/images/logistics/container-loading.jpg`
- `/public/images/logistics/shipping-containers.jpg`
- `/public/images/logistics/warehouse-material.jpg`

After adding real JPG/WebP images, update the image paths in `index.html` from `assets/product-*.svg` to the matching `/public/images/...` path or move images into `/assets/` using the same names.

## Forms
The RFQ/contact form uses `mailto:saimetaltraders@gmail.com`. This opens the user's email app. For a production backend, connect the form to Vercel serverless function, Formspree, Resend, SendGrid, or EmailJS.

## Market dashboard
The trend graphs are indicative static visuals. They are not live trading feeds. To make them live, connect to a paid/authorized metals pricing API such as LME data licensing, MetalpriceAPI, Trading Economics, or another licensed commodity data provider.

## Deploying to Vercel
1. Create a GitHub repository.
2. Upload all files from this folder to the repository root.
3. Go to Vercel and select **Add New Project**.
4. Import the GitHub repository.
5. Framework preset: **Other** or leave as static.
6. Build command: leave blank.
7. Output directory: leave blank or use `.`.
8. Click **Deploy**.
