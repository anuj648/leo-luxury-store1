# La Cinderae Luxury Fashion Store

React + Vite storefront for the La Cinderae luxury fashion demo.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Updated storefront features

- Editorial Collections landing page with four visual collection themes and ten featured product images.
- Individual collection pages with Product Type, conditional apparel Size, Price and Colour filters.
- Dedicated product detail page with image thumbnails, colour/size selection, Add to Bag, Buy Now, product details, shipping and care accordions, and recommendations.
- Shop All, Jewellery and Apparel pages with the requested filter and price sorting structure.
- Responsive desktop and mobile layouts using the La Cinderae porcelain, stone and charcoal palette.
- White header and white main canvas; alternate surfaces #F5F4F0; collection surfaces #EAE8E2.
- Charcoal typography/buttons/footer (#292929), body text #625E58 and subtle accents #B5A99A.
- Product and collection imagery uses the locally bundled AI-generated fashion and jewellery editorial assets in `public/images/`.

The checkout remains a front-end demo and does not process real payments.


Brand pages: About Us and Contact Us are separate routes managed by the React page state and are accessible from the header and footer. Brand palette refreshed to white, soft stone, charcoal and muted taupe.

- Refreshed About and Contact pages with distinct editorial layouts, palettes and responsive form styling.
- Shop All, Jewellery and Apparel banners now span wider; Collections hero uses a full-bleed layout.
- Home remains available as its own independent Home page with the original design.


## La Cinderae luxury refresh
- Minimal contemporary fashion-house palette: white, soft stone, charcoal and muted taupe.
- AI-generated campaign/editorial image crops are stored locally in `public/images/`.
- Expanded catalogue: 36 products, 4-column desktop / 2-column mobile grids, filters, sorting and Load More.
- Sticky centered wordmark, glass-effect header and reveal-on-scroll transitions.
- Cart and wishlist are browser-local demo features. Checkout is a front-end demo only; no payment gateway, order API, inventory service or backend credentials were supplied/configured.
