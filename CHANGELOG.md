# auth-service

## v0.3.11

[compare changes](https://github.com/shba007/unauth-api/compare/v0.3.10...v0.3.11)

### 🚀 Enhancements

- Add JWT token refresh endpoint with error handling ([66deff7](https://github.com/shba007/unauth-api/commit/66deff7))

### ❤️ Contributors

- Shba007 ([@shba007](https://github.com/shba007))

## v0.3.10

[compare changes](https://github.com/shba007/unauth-api/compare/v0.3.9...v0.3.10)

### 🚀 Enhancements

- Implement JWT token handling and refresh logic; update dependencies and fix deployment script ([7d0370a](https://github.com/shba007/unauth-api/commit/7d0370a))

### 🩹 Fixes

- [skip ci] correct version formatting in docker-compose file ([1dffc20](https://github.com/shba007/unauth-api/commit/1dffc20))

### ❤️ Contributors

- Shba007 ([@shba007](https://github.com/shba007))

## v0.3.9

[compare changes](https://github.com/shba007/unauth-api/compare/v0.3.8...v0.3.9)

### 🩹 Fixes

- Update deployment command and improve pre-commit script; adjust CORS settings in Nitro config ([3d90c55](https://github.com/shba007/unauth-api/commit/3d90c55))

### ❤️ Contributors

- Shba007 ([@shba007](https://github.com/shba007))

## v0.3.8

[compare changes](https://github.com/shba007/unauth-api/compare/v0.3.7...v0.3.8)

### 🚀 Enhancements

- Add authentication and user management routes, update ignore files for Prisma ([59fdd7b](https://github.com/shba007/unauth-api/commit/59fdd7b))

### 🩹 Fixes

- Remove unused environment variable and correct NUXT_APP_VERSION to NITRO_APP_VERSION ([cd540df](https://github.com/shba007/unauth-api/commit/cd540df))

### ❤️ Contributors

- Shba007 ([@shba007](https://github.com/shba007))

## v0.3.7

[compare changes](https://github.com/shba007/unauth-api/compare/v0.3.6...v0.3.7)

### 💅 Refactors

- Changeset -> changelogen, node -> bun, docker compose -> docker swarm ([a6bedde](https://github.com/shba007/unauth-api/commit/a6bedde))

### ❤️ Contributors

- Shba007 ([@shba007](https://github.com/shba007))

## 0.3.6

### Patch Changes

- f45ef0a: chore: update pnpm setup and dependencies in workflow and package.json

## 0.3.5

### Patch Changes

- 8dbaa0d: chore: update environment file handling and dependencies in Docker and package configuration

## 0.3.4

### Patch Changes

- 6d9ce72: chore: update ignore files and Dockerfile for improved build process

## 0.3.3

### Patch Changes

- 5d73156: chore: update project configuration and improve code quality

## 0.3.2

### Patch Changes

- 738f482: chore: formatting & housekeeping
- 2adb199: chore: migrate from npm to pnpm and remove ofetch dependency

  Migrates the project from npm to pnpm to leverage its performance
  benefits and improved dependency management. Removes the `ofetch`
  dependency in favor of the built-in `$fetch` helper provided by
  Nuxt, streamlining the codebase and reducing external dependencies.
  Updates Dockerfile to reflect these changes. Adds `.data` to
  `.gitignore` to exclude persistent data. Improves type safety by
  specifying compatibility date in `nitro.config.ts`. Simplifies
  CORS settings in `nitro.config.ts`.

## 0.3.1

### Patch Changes

- e3eaea6: fix: port updated, health updated

## 0.3.0

### Minor Changes

- a3cc9bf: chore: containerized

## 0.2.3

### Patch Changes

- cc7b577: chore: pkgs updated & ci/cd updated

## 0.2.2

### Patch Changes

- 2735122: chore: pkgs updated

## 0.2.1

### Patch Changes

- 9f23803: chore: pkgs upgraded

## 0.2.0

### Minor Changes

- 114f0ed: feat: anonymous login added
