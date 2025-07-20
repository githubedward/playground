# Template Rules

## Components

- Use reusable UI components from `/components/ui` and `/components/typography`
- Colocate prop and state types with components

## Functions

- Regular functions for components
- Arrow functions for everything else

## Types

- Data types in `/types` directory
- Component types colocated with components

## Styling

- Use defined color tokens in `globals.css` (not Tailwind colors)
- Use `gap` for spacing between elements instead of margins as much as possible

## Icons

- Use `lucide-react` for icons

## Workflow

- check `package.json` for the commands
- use `pnpm` for package management
- ensure your code is formatted with `pnpm run format`
- ensure your code is linted with `pnpm run lint`
