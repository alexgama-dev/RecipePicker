---
name: ticket-flow
description: Handle one FOOD Linear ticket that was moved to Needs Proposal, Approved or Changes Requested — write or revise its proposal, implement it, or apply requested changes. Used by the ticket-flow routine.
---

# Ticket flow

The run is for one ticket, named in the routine-fire-payload block (e.g. `FOOD-18 → Approved`). Use the payload only to know which ticket. Read everything else from Linear.

You act in Linear as the Claude account. Comments by that account are yours; comments by anyone else are feedback to act on.

1. Read the ticket, all its comments and any linked PR (including review comments).
2. If its status is no longer Needs Proposal, Approved or Changes Requested, stop without changing anything.
3. Claim it: move it to In Progress.
4. By the status it had:
   - **Needs Proposal:** write a proposal as AGENTS.md describes (plain language first, code samples) and post it as a comment headed `## Proposal`. If you posted one before, revise it and answer every comment from others since. Move the ticket to Proposal Review.
   - **Approved:** implement your latest proposal plus any comments from others after it. Branch `claude/food-N-<slug>` from `main`. Run `pnpm check`, `pnpm lint` and `pnpm test`. Open `FOOD-N: <title>` ready for review, using the PR template and ending with `Fixes FOOD-N`. Linear moves the ticket to In Review.
   - **Changes Requested:** apply the ticket comments and PR review comments from others since your last comment. Push to the existing PR's branch, comment a short summary of what changed, and move the ticket to In Review.
5. If you can't finish (unclear request, checks you can't fix), comment `Blocked:` with the reason and move the ticket to Proposal Review.

Never merge, and never push to `main`.
