# DECISIONS - Frontend

➜ Launch the app: `npm run dev`
➜ Build: `npm run build`
➜ Testing: `npm test`

## How does it work

You can create a point on the radar with the form, and then send an attack by choosing protocols

## Technical Stack

### Framework and Build Tool

**Choice**: React 19 + Vite + TypeScript

**Reasons**:

- React 19: Modern framework with native Server Components support and performance improvements
- Vite: Fast build tool with HMR (Hot Module Replacement) for development
- TypeScript: Strict typing for type safety and better DX

### Styling

**Choice**: Tailwind CSS 4 + shadcn/ui

**Reasons**:

- Tailwind CSS: Utility-first CSS for fast and consistent development
- shadcn/ui: Accessible UI components based on Radix UI, copied into the project (no external dependency)

### Form Management

**Choice**: React Hook Form + Zod + @hookform/resolvers

**Reasons**:

- React Hook Form: Optimal performance with non-blocking validation
- Zod: TypeScript-first schema validation with automatic type inference
- @hookform/resolvers: Seamless integration between React Hook Form and Zod

### Real-time Communication

**Choice**: WebSocket via `react-use-websocket`

**Reasons**:

- Unidirectionnal communication for real-time cannon status updates
- Dedicated React hook to simplify connection management
- Automatic reconnection on disconnection (5 second interval)
- Connection sharing between components (`share: true`) to avoid multiple connections

**Implementation**:

- `useCannonStatus` hook that encapsulates WebSocket logic
- WebSocket URL automatically built from API URL (`http://` → `ws://`, `https://` → `wss://`)
- Error handling with secure JSON message parsing

## Component Architecture

### Structure

```
src/
├── components/
│   ├── dashboard/          # Main dashboard component
│   ├── cannon/             # Ion cannon display
│   ├── forms/              # Forms (attack, scan point)
│   ├── radar/              # Radar visualization
│   ├── scan/               # Scan overlay
│   ├── ui/                 # Reusable UI components (shadcn)
│   └── ...
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and configuration
├── types/                  # TypeScript definitions
└── ...
```

### Environment Variables

**Choice**: Environment variables via `import.meta.env` (Vite)

**Configuration**:

- `VITE_API_URL`: Backend API base URL (default: `http://localhost:3000`)

**Implementation** (`src/lib/config.ts`):

- `getAttackUrl()` function: Builds URL for `/attack` endpoint
- `getCannonsStatusWsUrl()` function: Builds WebSocket URL for `/cannons/status`
- Automatic conversion `http://` → `ws://` and `https://` → `wss://`

### Test Framework

**Choice**: Vitest + React Testing Library

**Reasons**:

- Vitest: Compatible with Vite, fast and modern
- React Testing Library: User-oriented tests, React best practice
- `@testing-library/jest-dom`: Additional matchers for DOM assertions

**Test structure**:

- Tests next to components: `*.test.tsx`
- Schema tests: `*.schema.test.tsx`
