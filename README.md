# Smart Personal Finance Tracker

A React.js expense tracker for recording daily spending, exploring category breakdowns, and reviewing transaction history. Amounts are displayed in Indian rupees (₹), and expenses are saved in the browser between visits.

The project uses **JavaScript and JSX** with Vite. It runs entirely in the browser and does not require a backend, database, API key, or environment variables.

## Features

- **Expense entry:** Record an amount, category, description, and date, with required-field and positive-amount validation.
- **Dashboard:** View total spending, spending for the current month, change from the previous month, transaction count, and average expense.
- **Charts:** Explore spending by category, the top five categories, and daily spending trends.
- **History:** Search by description or category, filter by category, and sort by date, amount, or category.
- **Delete expenses:** Remove transactions and update the dashboard totals automatically.
- **Local persistence:** Keep expenses after a page reload using `localStorage`.
- **Responsive layout:** Use the dashboard and forms across different screen sizes.

Available categories: Food & Dining, Transportation, Entertainment, Shopping, Bills & Utilities, Healthcare, and Other.

## Tech stack

| Technology | Purpose |
| --- | --- |
| React 18 and JavaScript/JSX | Components, state, and user interactions |
| Vite 5 with React SWC | Development server and production builds |
| React Router 6 | Application routing and the not-found page |
| Tailwind CSS 3 | Styling, responsive layouts, and theme utilities |
| shadcn/ui and Radix UI | Reusable interface components |
| Recharts | Pie, bar, and line charts |
| date-fns | Date formatting and spending-period calculations |
| Lucide React | Interface icons |
| ESLint | JavaScript and React code checks |

## Getting started

Development has been verified with Node.js 22 and npm 10. Install Node.js with npm before continuing.

1. Clone or download this repository.
2. Open a terminal in the project directory containing `package.json`.
3. Install the dependencies from the committed lockfile:

   ```sh
   npm ci
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Open [http://localhost:8080](http://localhost:8080).

If port 8080 is occupied, Vite chooses another available port and prints its address in the terminal. Stop the server with `Ctrl+C`.

Use `npm install` when intentionally updating dependencies and the lockfile. Run only one dependency installation at a time.

## Using the app

1. Open **Dashboard** to review your spending totals and charts. The first launch includes six sample transactions.
2. Choose **Add Expense**, complete all fields, and submit the form. Amounts must be greater than zero.
3. Open **History** to find transactions using the search field and category filter. Select a sort order to organize the results.
4. Use the trash button beside a transaction to delete it. The totals and saved data update immediately; there is no undo action.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Generate a production build in `dist/` |
| `npm run build:dev` | Generate a build using Vite's development mode |
| `npm run preview` | Serve the built `dist/` directory for local inspection |
| `npm run lint` | Check JavaScript and JSX files with ESLint |

To check the code and preview a production build:

```sh
npm run lint
npm run build
npm run preview
```

Open the preview URL printed in the terminal. The repository does not currently include an automated test script. After changing app behavior, manually check expense creation, search, filtering, sorting, deletion, and persistence after reload.

## Project structure

```text
.
├── public/                     Static assets served directly
├── src/
│   ├── assets/                 Images bundled with the app
│   ├── components/
│   │   ├── ExpenseDashboard.jsx Spending summaries and charts
│   │   ├── ExpenseForm.jsx      Expense entry and validation
│   │   ├── ExpenseList.jsx      Search, filtering, sorting, and deletion
│   │   └── ui/                 Reusable shadcn/Radix components
│   ├── hooks/                  Toast and mobile-detection hooks
│   ├── lib/                    Shared utilities
│   ├── pages/
│   │   ├── Index.jsx           Tracker tabs, expense state, and persistence
│   │   └── NotFound.jsx        Fallback page for unknown routes
│   ├── App.jsx                 Providers and routing
│   ├── main.jsx                React entry point
│   └── index.css               Global styles and theme variables
├── components.json             shadcn configuration for JavaScript/JSX
├── eslint.config.js            JavaScript and React lint rules
├── index.html                  HTML entry point
├── jsconfig.json               Editor settings and import aliases
├── package.json                Dependencies and npm scripts
├── package-lock.json           Locked dependency versions
├── postcss.config.js           PostCSS plugins
├── tailwind.config.js          Tailwind theme and source scanning
└── vite.config.js              React plugin, server, and import aliases
```

## Data storage and limitations

Expenses are serialized as JSON under the `expense-tracker-expenses` key in browser `localStorage`. Each expense has an `id`, `amount`, `category`, `description`, and `date`.

Storage belongs to the current browser profile and site address, including its port. Opening the app in another browser or at a different address uses separate data. Clearing the site's browser storage removes saved expenses, and the next launch starts with the sample transactions again.

The current app has no account system, server database, cross-device sync, bank integration, or export/backup feature. It tracks expenses; it does not manage income or budgets.

## Customization

- Update theme colors and CSS variables in `src/index.css`, and Tailwind utilities in `tailwind.config.js`.
- Change sample transactions in `src/pages/Index.jsx`.
- Keep the category definitions in `ExpenseForm.jsx`, `ExpenseList.jsx`, and `ExpenseDashboard.jsx` aligned when adding or renaming categories.
- Add routes in `src/App.jsx` before the catch-all `*` route.
- Use `@/` imports to reference `src/`. Keep the alias consistent in `vite.config.js` and `jsconfig.json`.

## Deployment

Build the app and publish the generated `dist/` directory to a static web host:

```sh
npm ci
npm run build
```

Use `npm run build` as the host's build command and `dist` as its output directory. Configure a fallback to `index.html` for application routes so React Router can handle direct navigation and unknown URLs. The default configuration assumes the app is hosted at the site's root path.

`npm run preview` is for checking the build locally; use a static host for production deployment.

## Troubleshooting

- **`vite` is not recognized or a package cannot be found:** Run `npm ci` in the directory containing `package.json`, let it finish successfully, and then restart the development server.
- **The expected local address does not load:** Check the terminal for the port Vite actually selected and confirm the server is still running.
- **Expenses appear different in another tab or browser:** Confirm both pages use the same browser profile, hostname, and port. Expense state does not synchronize automatically between open tabs.
- **A deployed route returns a hosting-provider 404:** Configure the host's single-page-app fallback to `index.html`.
