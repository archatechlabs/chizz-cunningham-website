# Chizz Cunningham - Personal Brand Website

A premium personal-brand landing page built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 Premium dark/light contrast design
- 📱 Fully responsive (mobile-first)
- ⚡ Optimized with Next.js App Router
- 🔤 Custom Google Fonts (Playfair Display + Inter)
- 🖼️ Image optimization with Next/Image
- 🎭 Subtle animations and micro-interactions

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Add your portrait image:**

   Place your portrait photo at:
   ```
   /public/portrait.jpg
   ```
   
   **Image requirements:**
   - Recommended size: 800x1000px or higher
   - Aspect ratio: Portrait orientation works best
   - Format: JPG, PNG, or WebP
   - The image will be automatically converted to grayscale via CSS

3. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open the site:**

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles and Tailwind
│   ├── layout.tsx       # Root layout with fonts
│   └── page.tsx         # Landing page
├── components/
│   ├── Nav.tsx          # Navigation component
│   └── HeroCard.tsx     # Hero card component
├── public/
│   └── portrait.jpg     # Your portrait image (add this!)
├── tailwind.config.ts   # Tailwind configuration
└── package.json         # Dependencies
```

## Customization

### Colors

Edit `tailwind.config.ts` to modify the color palette:

```typescript
colors: {
  'off-white': '#F6F6F4',        // Page background
  'card-bg-start': '#0B0B0C',    // Card gradient start
  'card-bg-end': '#1A1A1C',      // Card gradient end
  'headline-white': '#F3F1ED',   // Headline color
  'muted-gray': '#B8B8B8',       // Subheadline color
  'button-bg': '#EFEDE7',        // Button background
}
```

### Content

Edit the text content in:
- `components/HeroCard.tsx` - Headline, subheadline, and CTA
- `components/Nav.tsx` - Navigation links and location tag
- `app/layout.tsx` - Meta tags and SEO information

### Fonts

The site uses:
- **Playfair Display** (serif) - Headlines
- **Inter** (sans-serif) - Body text and UI

To change fonts, update `app/layout.tsx`.

## Production Build

```bash
npm run build
npm run start
```

## Deployment

This site can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **Any Node.js hosting**

### Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## License

MIT License - Feel free to use this template for your personal brand.

---

Built with ❤️ for Chizz Cunningham

