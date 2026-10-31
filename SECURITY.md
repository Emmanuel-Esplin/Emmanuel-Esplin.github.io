# Security Policy

This repository holds a static personal website. It has no server, database, user accounts or forms.

## Reporting a vulnerability

Please report security issues privately through GitHub's
[private vulnerability reporting](https://github.com/Emmanuel-Esplin/Emmanuel-Esplin.github.io/security/advisories/new).
Do not open a public issue. Expect an acknowledgement within 7 days.

## Safeguards in place

- Content Security Policy on every page; only this site's own hashed scripts and styles and Google Fonts may load.
- `main` is protected: changes land through pull requests that must pass CI (type-check, `npm audit`, build).
- GitHub Actions run with least-privilege permissions and are pinned to commit SHAs.
- Dependabot alerts and weekly update PRs for npm packages and GitHub Actions.
- Secret scanning with push protection.
