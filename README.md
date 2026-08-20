# Pocket Ledger

A personal portfolio project that delivers a modern, intuitive expense tracking application. Pocket Ledger helps users take control of their finances through comprehensive expense monitoring, detailed spending analysis, and actionable insights into financial habits - all wrapped in a sleek, user-friendly interface.

## 🌐 Live Demo

[View Live Application](https://pocket-ledger-peach.vercel.app)

## 📸 Snippet

![Pocket Ledger Overview](public/screenshot-overview.png)
![Pocket Ledger Budgets and Recent Expenses](public/screenshot-overview-expenses.png)

## ✨ Features

### Comprehensive Expense Management

- 🧾 Easy expense entry with detailed categorization
- 📋 View, edit, and delete expense records
- 🏷️ Diverse categorization system with 16 preset categories
- 💼 Multi-currency support with 18 major currencies, each formatted to its own real-world convention (lakh grouping for INR/PKR, comma-decimal for EUR/RUB/BRL, etc.)
- 📤 One-click CSV export

### Budgets

- 🎯 Set a monthly limit per category
- 📊 Live progress bars with under/over-budget coloring
- 📌 At-a-glance snapshot on the Overview page, full management on its own page

### Advanced Analytics

- 📊 Interactive charts and visualizations
- 📈 Monthly spending patterns analysis
- 🎯 Category-wise expense breakdown
- 💡 Smart insights on spending habits

### User Experience

- 🎨 Ink & Gold design system — a glass-panel, green-accent interface with a dedicated command palette (⌘K / Ctrl+K) for quick navigation and actions
- 📱 Fully responsive design for all devices
- 🌗 Light/dark theme toggle
- ⚡ Real-time updates and smooth transitions
- 🔍 Advanced filtering and sorting capabilities
- 📲 Installable as a Progressive Web App (PWA)

### Settings & Account

- 👤 Editable profile and currency/appearance preferences
- 📤 Export all expenses to CSV
- 🗑️ Permanent account deletion (with confirmation)

### Security & Authentication

- 🔒 Secure authentication via Google and GitHub
- 🔐 Protected routes and data privacy
- 👤 Personalized user profiles

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- A modern web browser

### Installation

1. Clone the repository:

```bash
git clone https://github.com/thisisfaizanali/pocket-ledger.git
```

2. Navigate to the project directory:

```bash
cd pocket-ledger
```

3. Install dependencies

```bash
npm install
# or
yarn install
```

4. Set up environment variables:

Create a `.env.local` file in the root directory and add the following variables:

```bash
# Auth Providers
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret

# Database
DATABASE_URL=your_database_url

# Auth
AUTH_SECRET=your_auth_secret
```

5. Run the development server

```bash
npm run dev
# or
yarn dev
```

6. Open http://localhost:3000 in your browser.

## 🛠️ Tech Stack

### Frontend

- **Next.js** - React framework for production
- **React** - UI library
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Recharts** - Chart library for data visualization
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend & Database

- **Prisma ORM** - Type-safe database toolkit
- **PostgreSQL (Neon)** - Serverless cloud database

### Authentication

- **Auth.js (NextAuth)** - Authentication and session management
- Support for Google and GitHub providers

### Deployment

- **Vercel** - Application hosting and deployment
- **PWA** - Progressive Web App support

### Development Tools

- ESLint - Code linting
- PostCSS - CSS processing

## 📱 Responsive Design

Pocket Ledger is built with a desktop-first approach, ensuring a seamless experience across all devices.

## 🎨 Customization

### Theme Configuration

The app uses semantic CSS variables (defined once in `src/styles/globals.css`, re-exposed as Tailwind color names) so light and dark mode share the same source of truth. The dark palette — the primary look:

```css
.dark {
  --paper: #0b0b0f;   /* app background */
  --panel: #16161a;   /* card surface */
  --ink: #f2f2f5;     /* primary text */
  --brand: #22b573;   /* accent / money highlight */
  --success: #4cc38a; /* under budget */
  --danger: #f0655a;  /* over budget */
}
```

Money figures render in Geist Mono with tabular numerals; everything else uses Inter.

## 📝 Project Structure

```text
pocket-ledger/
├── src/
│   ├── app/                             # Next.js app directory
│   ├── components/                      # React components
│   │   ├── feature/                     # Feature-specific components
│   │   │   ├── analytics/               # Analytics page components
│   │   │   ├── budgets/                 # Budgets page components
│   │   │   ├── expenses/                # Expenses page components
│   │   │   ├── overview/                # Overview page components
│   │   │   └── settings/                # Settings page components
│   │   ├── layout/                      # Layout components
│   │   └── ui/                          # Reusable UI components
│   │       ├── shadcn/                  # shadcn/ui components
│   ├── fonts/                           # Custom font files
│   ├── lib/                             # Core utility functions
│   ├── styles/                          # Styling files
│   └── utils/                           # Helper functions
```
