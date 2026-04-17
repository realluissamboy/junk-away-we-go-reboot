# Agent System

A small web agency simulated in Claude Code subagents. One PM, five leads, each lead runs stochastic consensus over 2 to 3 personas.

## How to initiate a request

Invoke `project-manager`. Nothing else. PM is the only agent you talk to. PM routes work to the designer, developer, qa-tester, copywriter, and seo-specialist as needed.

## What you get back

PM presents viable options with tradeoffs, dissenting views, and scope flags. PM does not recommend one path. You decide. PM cites which leads were consulted. Each lead cites which personas it consulted.

## Where decisions are logged

Approved decisions go in `project-memory/decisions-log.md` (append-only). Open questions live in `project-memory/open-questions.md`. Client behavior notes live in `project-memory/client-history.md`.

## Updating scope

`project-memory/scope.md` only changes when you explicitly approve. Tell PM. PM edits the file and logs the change in its change-log table and in `decisions-log.md`.

## Client-facing drafts

PM drafts client emails and messages. PM never sends. Drafts live in `project-memory/client-comms/drafts/YYYY-MM-DD-<topic>.md`. After you send, PM moves the file to `project-memory/client-comms/sent/` and appends the exchange to `client-history.md`.

## Voice matching

Paste 2 to 3 examples of your own writing into `project-memory/voice-guide.md` so PM's drafts sound like you.
