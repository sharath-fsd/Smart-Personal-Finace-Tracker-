# Smart Personal Finance Tracker

A React.js single-page application for tracking expenses in Indian rupees. All application code uses JavaScript and JSX; no TypeScript setup is required.

## Run locally

Install Node.js 22 or newer with npm, then run these commands from this directory:

```sh
npm install
npm run dev
```

Open http://localhost:8080. Vite prints an alternative port if 8080 is already in use.

## Commands

```sh
npm run dev        # Development server with hot reload
npm run build      # Production files in dist/
npm run preview    # Preview the production build locally
npm run lint       # Check all JavaScript and JSX files
```

After installing dependencies, use `npm ci` for reproducible installs from `package-lock.json`.

## Features

- Add expenses with an amount, category, description, and date.
- View totals, monthly spending, category breakdowns, and daily charts.
- Search, filter, sort, and delete transactions in the expense history.
- Keep expenses between reloads using browser local storage. New browsers start with sample transactions.

Data stays in the current browser. There is no backend, account system, or cross-device sync.

## Project structure

```text
src/
  main.jsx               React entry point
  App.jsx                App providers and routes
  pages/                 Main tracker and not-found page
  components/            Expense form, history, and dashboard
    ui/                  Reusable shadcn/Radix components
  hooks/                 React hooks
  lib/                   Shared utilities
  assets/                Images
  index.css              Global styles and theme
```

The stack is React 18, Vite, React Router, Tailwind CSS, shadcn/Radix UI, and Recharts. The `@/` import alias points to `src/` in both `vite.config.js` and `jsconfig.json`. `components.json` is configured to generate JavaScript/JSX components.

## Deployment

Run `npm run build` and serve `dist/` with a static host. Configure the host to serve `index.html` for application routes so React Router can handle direct navigation and the not-found page.
