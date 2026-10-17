# SHREYVERSE — Gaming Store Frontend Demo

A futuristic dark-neon gaming e-commerce **frontend-only** demonstration built with HTML, CSS and vanilla JavaScript. Created as a portfolio project concept by Shrey Dubey.

## Features

- Responsive dark-neon storefront with custom SV logo and neon-inspired controller artwork
- Product catalogue with search, category filters and sorting
- Product detail modal
- Shopping cart with quantity controls, remove buttons and subtotal calculation
- Wishlist with saved items
- Cart and wishlist persistence via `localStorage`
- Simulated checkout form and demo order confirmation
- Keyboard-friendly controls, empty states and mobile layouts
- Realistic product imagery loaded from Unsplash (internet required for those images)

## Tech stack

- HTML5
- CSS3 (responsive layouts, gradients, transitions and reduced-motion support)
- Vanilla JavaScript
- Browser `localStorage`

No backend, database, user authentication, or real payment processing is included. The checkout is only a UI simulation and does not send the form to a server.

## Run in VS Code

1. Extract `SHREYVERSE-Frontend-Project.zip`.
2. Open the `SHREYVERSE` folder in Visual Studio Code.
3. Open `index.html` in a browser by double-clicking it, or use the **Live Server** extension in VS Code and select **Open with Live Server**.
4. Try search, filters, product details, wishlist, cart quantity controls and demo checkout.

No `npm install` or build command is required.

## Project structure

```text
SHREYVERSE/
├── index.html
├── styles.css
├── app.js
├── README.md
└── .gitignore
```

## Quick test checklist

- Search for “headset”; confirm the catalogue filters.
- Choose Accessories; confirm only accessories appear.
- Sort low to high; confirm prices are ascending.
- Open a product detail modal and add the product to the cart.
- Add the same product twice and check the quantity increments.
- Close and reopen the cart; check the total and quantity controls.
- Save a wishlist item and refresh the page; confirm it remains saved.
- Complete the demo checkout; confirm the order message states that no real payment occurred.
- Test at desktop and mobile widths.

## GitHub and free static deployment

### Publish to GitHub

1. Create a new repository called `shreyverse-gaming-store`.
2. Upload `index.html`, `styles.css`, `app.js`, `README.md` and `.gitignore`.
3. Confirm no private credentials or personal information are included. This project has no secrets or backend keys.

### Deploy with GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under the build source, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`, then save.
5. Wait for the Pages URL to appear. The site is static and should work from the repository root.

Alternative static hosting options include Netlify and Cloudflare Pages free tiers; check their current limits before deploying.

## Resume description

Use this only after testing the implementation:

**SHREYVERSE — Responsive Gaming E-Commerce UI Demo**  
*HTML, CSS, JavaScript, localStorage*

- Built a responsive gaming storefront with product search, category filters, price sorting and product detail modals.
- Implemented interactive cart and wishlist features with quantity management and browser-based persistence.
- Created a simulated checkout flow with order confirmation UI and custom futuristic dark-neon branding.

## Limitations

- Product prices, descriptions and ratings are sample demo content.
- Product images are remote and need internet access.
- Cart/wishlist are stored only in the current browser.
- No real accounts, backend, inventory, order processing or payment integration.
- Do not present the checkout as real e-commerce processing.
