# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Vite + React + TypeScript frontend project using Chakra UI v3 as the UI framework, integrated with Zustand state management, TanStack Query (React Query), React Router, and Preact Signals.

## Development Commands

### Start Development Server
```bash
npm run dev
```
- Starts Vite in development mode, default port 3000 (configurable via `VITE_PORT` in `.env.development`)
- Automatically opens browser

### Build Project
```bash
npm run build
```
- Runs TypeScript compilation check then builds for production
- Output to `dist/` directory

### Preview Production Build
```bash
npm run preview
```

### Code Quality Checks
```bash
npm run lint              # ESLint checks
npm run type-check        # TypeScript type checking
npm run knip              # Check for unused files and dependencies
```

### Testing
```bash
npm run test              # Run Vitest tests (watch mode)
npm run test:coverage     # Run tests with coverage report
```

## Project Architecture

### Core Tech Stack
- **Build Tool**: Vite 5
- **Framework**: React 18 + TypeScript
- **UI Framework**: Chakra UI v3 (using defaultSystem)
- **State Management**:
  - Zustand (global state)
  - Preact Signals (reactive state with auto-tracking enabled)
- **Data Fetching**: TanStack Query v5
- **Routing**: React Router v6 (using HashRouter)
- **Testing**: Vitest + Testing Library

### Directory Structure
```
src/
├── pages/          # Page components (auto-generated routes by vite-plugin-pages)
├── components/
│   ├── ui/        # Chakra UI components (ignored by knip)
│   └── page/      # Page-level components
├── stores/        # Zustand stores
├── hook/          # Custom React hooks
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
├── assets/        # Static assets
└── main.tsx       # Application entry point
```

### Auto-Import Mechanism
Project uses `unplugin-auto-import` to automatically import the following APIs without manual imports:
- React hooks: `useState`, `useEffect`, `useMemo`, `useCallback`, etc.
- Preact Signals: `useSignal`, `signal`, `computed`, `effect`, `batch`
- TanStack Query: `useQuery`, `useMutation`, `useQueryClient`, etc.
- React Router: `useNavigate`, `useParams`, `useLocation`, etc.

Type definitions for auto-imports are in `auto-imports.d.ts`.

### Routing System
- Uses `vite-plugin-pages` for file-system based route generation
- Pages are placed in `src/pages/` directory
- Uses `createHashRouter` (hash mode)
- All routes are wrapped in `<Outlet>` from `App.tsx`
- `[...all].tsx` handles 404 pages

### Path Aliases
- `@/*` maps to `src/*` (configured in `tsconfig.json` and `vite.config.ts`)

### Chakra UI Configuration
- Uses `defaultSystem` (v3 default color system)
- Theme is forced to `light` mode
- UI components located in `src/components/ui/`, including:
  - `color-mode.tsx` - Color mode switcher
  - `toaster.tsx` - Toast notifications
  - `dialog.tsx` - Dialog/Modal
  - `avatar.tsx` - Avatar component
  - `tooltip.tsx` - Tooltip component
  - `close-button.tsx` - Close button

### TanStack Query Default Configuration
```typescript
{
  staleTime: 5 * 60 * 1000,      // Data freshness time: 5 minutes
  gcTime: 10 * 60 * 1000,        // Cache time: 10 minutes
  refetchOnWindowFocus: true,    // Refetch when window gains focus
  refetchOnReconnect: true       // Refetch on network reconnect
}
```

### Zustand Store Pattern
Store example structure (see `useCounterStore.ts`):
```typescript
import { create } from 'zustand'

interface StoreType {
  data: any
  actions: () => void
}

export const useStore = create<StoreType>((set) => ({
  // state
  data: initialValue,
  // actions
  actions: () => set((state) => ({ ... })),
}))
```

## Styling Rules
- Always use **Tailwind CSS** utility classes and **Chakra UI** components for styling
- Do NOT write inline styles (`style={{ }}`) in HTML/JSX — always use Tailwind classes or Chakra UI props instead
- Prefer Tailwind utility classes via `className` for layout and custom styling
- Use Chakra UI component props (e.g., `colorScheme`, `size`, `variant`) for component-level theming

## Code Style Guidelines

### ESLint Key Rules
- **Indentation**: 2 spaces (including JSX)
- **Quotes**: Single quotes (strings), double quotes (JSX attributes)
- **Semicolons**: No semicolons
- **Objects**: 3+ properties require newlines
- **Empty Lines**: Maximum 1 blank line
- **JSX**:
  - First prop on new line when multiline
  - Maximum 3 props per line
  - Space before self-closing tag
  - Tag alignment enforced

### TypeScript Rules
- `strict: true`
- `any` allowed but warns
- Unused variables warn

## Environment Variables
- `.env.development` - Development environment
- `.env.production` - Production environment
- `.env.example` - Example file

Required variables:
- `VITE_API_URL` - API endpoint URL
- `VITE_PORT` - Dev server port (optional)

## Important Notes

### Preact Signals
- `@preact/signals-react-transform` is enabled for automatic signal tracking
- Use signals directly in components for automatic reactivity, no need for `.value`

### Knip Configuration
- Entry points: `main.tsx` and all pages
- Ignored: `src/components/ui/**/*` and `App.tsx`
- Use `npm run knip` to check for unused files and dependencies

### Creating New Pages
1. Create `.tsx` file in `src/pages/`
2. Default export a React component
3. Route is auto-generated (based on filename)
4. Dynamic routes use `[param].tsx` format
5. Catch-all routes use `[...all].tsx` format
