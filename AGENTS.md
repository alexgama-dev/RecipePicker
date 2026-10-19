# Recipe Roulette

SvelteKit + Svelte 5 (runes only) + TypeScript. Package manager: pnpm.

## Commands

- `pnpm dev` / `pnpm check` / `pnpm lint` / `pnpm test`

## Rules

- Propose changes with code samples; implement only after approval.
- Keep it simple: no speculative abstractions or edge-case handling until needed.
- Search for an existing helper before writing a new one.
- Features live in `src/lib/features/<feature>/`; routes stay thin.
- Comments only for a non-obvious "why".
- No magic strings for states: use an `as const` object (TypeScript enums don't work inside Svelte components).
- Run `pnpm check`, `pnpm lint` and `pnpm test` before calling work done, plus `pnpm test:mobile` when `mobile/` changes.

## mobile/

- Expo (Expo Router) + React + TypeScript. Android only for now.
- `pnpm --filter mobile start` / `pnpm test:mobile`
- Features live in `mobile/src/features/<feature>/`; screens in `mobile/app/` stay thin.
- Shared data and logic go in `packages/food-data`, not copied into the app.
- The `as const` rule for states applies here too.
- Colours come from `useColors()` in `src/theme.ts`; no hardcoded colours in components.
- Tests are `*.test.tsx` next to the component (jest-expo + React Native Testing Library).
- Merges to `main` that touch the app run `mobile/.eas/workflows/release.yml`: an OTA update for JS-only changes, a new APK when native parts change (Expo emails the install link).

## Workflow

- Work is tracked in Linear (team `FOOD`). One branch per issue, named with Linear's branch name (e.g. `alex/food-12-envelope-animation`), or `claude/food-12-<slug>` for work done by the ticket-flow routine.
- Post the proposal as a comment on the Linear issue; implement after it's approved there.
- Rules agreed during a ticket go into AGENTS.md in the same PR, called out in the PR description. Standalone rule changes get their own ticket.
- Never commit to `main` directly. Open a PR titled `FOOD-12: <title>` as ready for review, not a draft. Branch protection blocks merging until CI passes.

## Ticket flow

- Moving a ticket to Needs Proposal, Approved or Changes Requested starts a cloud routine run for it (Linear webhook → `/api/linear-webhook` → routine). The routine follows the `ticket-flow` skill.
- Claude works in Linear as its own "Claude" account in every session, local or cloud, so comments by that account are Claude's and everyone else's are feedback.

## Testing

- A test should break when the behaviour breaks, not when unrelated data changes: don't rely on the order or contents of static data unless that is what's being tested.
- Component tests are `*.svelte.spec.ts` files. They run in real Chromium with reduced motion forced on. Run `pnpm exec playwright install chromium` once per machine.
