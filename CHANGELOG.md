# Changelog

All notable changes to this project will be documented in this file.

## v3.1.0


### 🚀 Enhancements

- V3.0.0-beta-1 ([a2d687f](https://github.com/thaikolja/nuxt-content-toc/commit/a2d687f))

### 📖 Documentation

- Update generated documentation with new SQL dump content. ([bdfcd2c](https://github.com/thaikolja/nuxt-content-toc/commit/bdfcd2c))

### 🏡 Chore

- Clean up build artifacts, add Bun lockfile, and update testing configuration to Vitest. ([0e26c77](https://github.com/thaikolja/nuxt-content-toc/commit/0e26c77))

### ❤️ Contributors

- Kolja Nolte ([@pasathai-org](https://github.com/pasathai-org))

## v3.0.0 - 2026-02-08

### Major Changes

-   **Compatibility**: Full support for Nuxt Content v3 while maintaining v2 compatibility.
-   **Architecture**: Updated module structure to follow Nuxt Module best practices.

### Features

-   **Universal Fetching**: Automatically uses `queryCollection` (v3) or `queryContent` (v2) based on environment.
-   **Optimized Dependencies**: Moved `better-sqlite3` to devDependencies.
-   **Documentation**: Comprehensive new documentation site and refined README.

### Fixes

-   **Testing**: Resolved integration test failures with `happy-dom` and path resolution.
-   **CI/CD**: Fixed GitHub Actions build by generating static docs to `docs/` folder.
