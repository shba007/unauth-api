---
'api-auth': patch
---

chore: migrate from npm to pnpm and remove ofetch dependency

Migrates the project from npm to pnpm to leverage its performance
benefits and improved dependency management.  Removes the `ofetch`
dependency in favor of the built-in `$fetch` helper provided by
Nuxt, streamlining the codebase and reducing external dependencies.
Updates Dockerfile to reflect these changes.  Adds `.data` to
`.gitignore` to exclude persistent data. Improves type safety by
specifying compatibility date in `nitro.config.ts`.  Simplifies
CORS settings in `nitro.config.ts`.
