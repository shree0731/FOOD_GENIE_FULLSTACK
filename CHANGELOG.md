# Changelog

All notable changes to the Food Genie project will be documented in this file.

## [1.1.0] - 2026-10-28
### Added
- Interactive ingredient checklist with click-to-check styling.
- Recipe print stylesheet support (`@media print`).
- Clipboard copy recipe button with confirmation toast.
- Preset ingredient suggestions for quick selection.
- Character counter indicator on ingredients input.
- Uptime and timestamp reporting on `/api/health`.
- Graceful shutdown listeners (`SIGINT`, `SIGTERM`) on backend.
- Comprehensive CONTRIBUTING.md, LICENSE, and API status codes table.

### Changed
- Improved error feedback when backend service is unreachable.
- Optimized whitespace normalization for ingredients.

## [1.0.0] - 2026-10-27
- Initial release of Food Genie AI Recipe Maker.
- Fullstack architecture with React + Vite frontend and Node.js + Express backend.
- Groq AI (LLaMA 3.1 8B Instant) integration.
