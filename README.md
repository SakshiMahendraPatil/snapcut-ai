# SnapCut AI

SnapCut AI is a web app that removes the background from images quickly and efficiently. Upload a photo and get a clean, transparent-background version back — no manual masking or editing software required.

## Features

- **AI background removal** — upload an image and instantly remove its background
- **Modern UI kit** — built on [shadcn/ui](https://ui.shadcn.com/) and Radix UI primitives for accessible, composable components (dialogs, dropdowns, tabs, accordions, tooltips, and more)
- **Client-side routing** — powered by React Router
- **Data fetching & caching** — via TanStack Query
- **Form handling & validation** — React Hook Form + Zod schemas
- **Styling** — Tailwind CSS with `tailwindcss-animate` and the Typography plugin
- **Charts** — data visualization with Recharts
- **Dark mode support** — via `next-themes`
- **Type-safe** — written in TypeScript throughout

## Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **UI Components:** shadcn/ui, Radix UI
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State/Data:** TanStack Query
- **Forms:** React Hook Form, Zod
- **Testing:** Vitest, Testing Library
- **Linting:** ESLint

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/SakshiMahendraPatil/snapcut-ai.git
cd snapcut-ai

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

This starts the Vite dev server (default: `http://localhost:5173`).

### Building for Production

```bash
npm run build
npm run preview
```

For a development-mode build:

```bash
npm run build:dev
```

### Testing

```bash
npm run test        # run tests once
npm run test:watch  # run tests in watch mode
```

### Linting

```bash
npm run lint
```

## Project Structure

```
snapcut-ai/
├── src/
│   ├── components/   # Reusable UI components (shadcn/ui-based)
│   ├── pages/          # Route-level components
│   ├── hooks/          # Custom React hooks
│   └── lib/             # Utilities and helpers
├── public/             # Static assets
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```



## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.


