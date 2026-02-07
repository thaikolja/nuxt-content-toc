# Changelog

All notable changes to this project will be documented in this file.

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
