# FoodThing

SvelteKit + Svelte 5 (runes only) + TypeScript. Package manager: pnpm.

## Commands

- `pnpm dev` / `pnpm check` / `pnpm lint` / `pnpm test`

## Rules

- Propose changes with code samples; implement only after approval.
- Keep it simple: no speculative abstractions or edge-case handling until needed.
- Search for an existing helper before writing a new one.
- Features live in `src/lib/features/<feature>/`; routes stay thin.
- Comments only for a non-obvious "why".
- Run `pnpm check`, `pnpm lint` and `pnpm test` before calling work done.

## Testing

- A test should break when the behaviour breaks, not when unrelated data changes: don't rely on the order or contents of static data unless that is what's being tested.
