# Eric Shoes and Business Enterprise

Editorial landing page for **Eric Shoes and Business Enterprise** — an authentic-sneaker retailer based in Accra, Ghana.

Built with Vite, React, Tailwind CSS, GSAP (ScrollTrigger), and Lenis smooth scroll.

## Stack

- **Vite + React** — build tooling
- **Tailwind CSS** — utility styling
- **GSAP + ScrollTrigger** — scroll-driven motion
- **Lenis** — smooth scroll bridged to GSAP's ticker
- **JetBrains Mono / Inter Tight / Syne** — typography

## Sections

1. **Studio** — monumental headline, featured product portrait
2. **Selected Work** — numbered index of in-stock silhouettes with cursor-following hover preview
3. **Story** — motivational paragraph + founder byline
4. **Contact** — phone hero (`+233 30 274 1100`), WhatsApp / Email / Studio channels, simple message form

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to ./dist
npm run preview  # preview the production build
```

## Configure

Placeholders to swap before going live:

- `info@ericshoes.gh` — email address (`src/sections/Contact.jsx`)
- "Accra · Ghana" — replace with full street address if desired
- Featured product image / brand list — `src/sections/Studio.jsx` and `src/sections/SelectedWork.jsx`

## Contact

`+233 30 274 1100` · Accra, Ghana
