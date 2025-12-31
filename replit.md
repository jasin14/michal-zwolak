# Michał Zwolak Personal Website

## Overview

This is a personal portfolio and charity website for Michał Zwolak, an endurance athlete and charity activist. The site showcases his extreme challenges, fundraising efforts, and provides a contact form for visitors. Built as a modern single-page application with a dark, energetic design theme featuring navy blue backgrounds with red accent colors.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for scroll animations and page transitions
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **Build Tool**: Vite for frontend, esbuild for server bundling
- **API Structure**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains table definitions
- **Migrations**: Drizzle Kit for schema migrations (`db:push` command)

### Project Structure
```
├── client/          # React frontend
│   └── src/
│       ├── components/   # UI components including shadcn
│       ├── pages/        # Route pages
│       ├── hooks/        # Custom React hooks
│       └── lib/          # Utilities
├── server/          # Express backend
│   ├── routes.ts    # API route handlers
│   ├── storage.ts   # Database operations
│   └── db.ts        # Database connection
├── shared/          # Shared code between client/server
│   ├── schema.ts    # Drizzle table schemas
│   └── routes.ts    # API route definitions with Zod
└── migrations/      # Database migration files
```

### Design System
- **Color Palette**: Dark theme with navy blue (#0A0E27) background, red (#FF2D55) accents
- **Typography**: Oswald for display headings, Inter for body text
- **Component Style**: shadcn/ui "new-york" variant with custom border radius

### Key Patterns
- Type-safe API contracts using Zod schemas shared between client and server
- Drizzle-Zod integration for automatic form validation schemas from database tables
- Component composition with Radix UI primitives wrapped by shadcn/ui

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Query builder and schema management

### UI Libraries
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, forms, etc.)
- **Framer Motion**: Animation library for scroll effects and transitions
- **react-countup**: Animated number counters for statistics display
- **Embla Carousel**: Carousel/slider component

### Development Tools
- **Vite**: Frontend dev server with HMR
- **Replit Plugins**: Dev banner, cartographer, runtime error overlay for Replit environment