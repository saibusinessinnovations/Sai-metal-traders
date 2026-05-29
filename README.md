# Sai Metal Traders Website

## Important deployment fix
This version removes the catch-all rewrite that was causing image URLs to return `index.html` instead of image files.

## Required image locations
Upload your real image files with these exact names:

### Product images
public/images/products/aluminum-scrap.jpg
public/images/products/copper-scrap.jpg
public/images/products/stainless-steel-scrap.jpg
public/images/products/brass-scrap.jpg
public/images/products/nickel-scrap.jpg
public/images/products/hms-steel-scrap.jpg
public/images/products/battery-scrap.jpg
public/images/products/mixed-scrap.jpg
public/images/products/container-ready-scrap.jpg

### Logistics images
public/images/logistics/container-export-support.jpg
public/images/logistics/warehouse-loading.jpg
public/images/logistics/shipping-containers.jpg
public/images/logistics/scrap-warehouse.jpg
public/images/logistics/global-logistics-network.jpg
public/images/logistics/world-map.jpg

If any image is missing, the site will show a fallback placeholder instead of a broken blank box.

## Vercel settings
Framework Preset: Other
Build Command: leave blank
Output Directory: public
