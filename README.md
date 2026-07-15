# SuelosAR

Production-ready website for **SuelosAR**, an independent GIS application for Android and Windows focused on soil cartography for Buenos Aires Province.

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer
- Visual Studio Code (recommended)

## Run locally

Open this folder in Visual Studio Code, open the integrated terminal, and run:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

No environment variables, external services, database, deployment account, or additional setup are required.

## Commands

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Run the production build
npm run lint     # Run ESLint
npm test         # Run project structure tests
```

## Project structure

```text
app/          Next.js routes, legal pages, metadata, and global CSS
components/   Reusable product, layout, legal, i18n, and theme components
lib/          Shared configuration, downloads, translations, and metadata
public/       Static files
styles/       Design tokens for color and typography
tests/        Lightweight project tests
```

## Included features

- Next.js App Router and TypeScript
- Tailwind CSS
- React and Framer Motion
- Lucide React icons
- Responsive Material Design 3-inspired interface
- Persistent light and dark modes
- Accessible landmarks, labels, focus styles, and reduced-motion support
- SEO metadata and semantic HTML
- Legal and data-source information
- Graceful installer availability handling
