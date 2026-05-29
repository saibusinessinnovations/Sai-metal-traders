# Sai Metal Traders Website

Static Vercel-ready website with an RFQ email API for Sai Metal Traders.

## Important Vercel settings

Use these settings in Vercel:

- Framework Preset: Other
- Root Directory: ./
- Build Command: leave blank
- Output Directory: leave blank
- Install Command: npm install or leave default

Do not set Output Directory to `public` for this package. The main `index.html` is placed at the repository root so the homepage loads at `/`.

## Required environment variables for RFQ email

Add these in Vercel Project > Settings > Environment Variables:

```text
EMAIL_USER=saimetaltraders@gmail.com
EMAIL_APP_PASSWORD=your_16_digit_gmail_app_password
TO_EMAIL=saimetaltraders@gmail.com
```

Then redeploy.

## Image locations

Place product images here:

```text
images/products/aluminum-scrap.jpg
images/products/copper-scrap.jpg
images/products/stainless-steel-scrap.jpg
images/products/brass-scrap.jpg
images/products/nickel-scrap.jpg
images/products/hms-steel-scrap.jpg
images/products/battery-scrap.jpg
images/products/mixed-scrap.jpg
images/products/container-ready-scrap.jpg
```

Place logistics images here:

```text
images/logistics/container-export-support.jpg
images/logistics/warehouse-loading.jpg
images/logistics/shipping-containers.jpg
images/logistics/scrap-warehouse.jpg
images/logistics/global-logistics-network.jpg
images/logistics/world-map.jpg
```

If an image is missing, the website uses SVG placeholder fallback images in `images/placeholders`.

## Quick test after deployment

Open:

```text
https://saimetaltraders.vercel.app/index.html
```

Then open:

```text
https://saimetaltraders.vercel.app/images/placeholders/aluminum-scrap.svg
```

If both open, routing and assets are working.
