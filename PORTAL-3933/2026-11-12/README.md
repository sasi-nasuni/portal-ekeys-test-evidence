# PORTAL-3933 — Encryption key picker and drawer UX

- Ticket: https://nasuni.atlassian.net/browse/PORTAL-3933
- Application commit: `f321bcd69ab67b8a8696b4621b9fd4502e6f4a3e`
- Application branch: `sbhushan/PORTAL-3933_picker_drawer_ux`
- Base: `feature/PM-1957-EKEYS_MVI_4` (`18e32c227e` at verification)
- Captured: November 12, 2026, Chromium at 1440 × 1000, local app with Portal Dev Tools MSW scenarios.
- All after images were captured from the committed app. The before image is retained from the original UX review of the shared MSW deployment; it is historical review evidence, not a fresh checkout of the PR base.
- Mock login and mock data only. The bulk flow used a disposable OpenPGP key generated in memory; no key contents, credentials, or browser session files are included.

## Validation

- 113 browser integration tests passed across the shared FileSelector, Volume Keys, DR bulk actions, escrow, and passphrase test files.
- 9 FileSelector Storybook checks passed.
- 5 add-key form unit tests passed.
- Commit hooks passed: formatting/lint, TypeScript and UI package build, lock checks, secret and conflict checks.
- Rebase onto the fetched remote MVI-4 base reported up to date; no conflicts.

Commands from `frontend/`:

```sh
pnpm exec vitest run --project=int --browser.headless=true tests/int/components/lib/forms/FileSelector.test.tsx tests/int/routes/_authed.encryption-keys/VolumeKeysPage.test.tsx tests/int/routes/_authed.encryption-keys/dr-readiness-bulk-actions.test.tsx tests/int/routes/_authed.encryption-keys/dr-readiness-escrow-keys.test.tsx tests/int/routes/_authed.encryption-keys/dr-readiness-set-passphrase.test.tsx
pnpm test:storybook packages/ui/component-docs/forms/FileSelector.stories.tsx
pnpm exec vitest run --project=unit tests/unit/routes/_authed.encryption-keys/add-key-form.test.ts
```

## Screenshot scenarios

| Image | Scenario and observation |
| --- | --- |
| [Before: Add key](before-add-key-original-review.png) | Original UX-review capture; old title, field, helper placement and checked Disable current keys. |
| [After: Add key](after-add-key.png) | Volume Keys actions → Engineering-Share → Add Key. Volume-only subtitle, shared card, requirements above, unchecked disable option. |
| [Upload validation](after-upload-validation.png) | Select a non-OpenPGP file; inline error stays next to the selected file with Change and Remove controls. |
| [Empty existing keys](after-empty-existing-keys.png) | Select Existing (empty) → Research-Data → Select existing keys. Disabled Select explains the reason on hover. |
| [Existing-key list](after-existing-keys-list.png) | Select Existing (26 keys) → archive. Search and selection count sit directly above the rows. |
| [Search with no results](after-picker-no-results.png) | Search for no-such-key; centered message and Clear search action. |
| [Selection limit](after-picker-25-selected.png) | Choose 25 keys, then search for Test Key 26; the 26th key is disabled while 25 selected remains visible. |
| [Selected volume help](after-bulk-selected-help.png) | Bulk Add Key Partial Failure → select all eligible volumes → Add Key (10). Info icon explains full-name disclosure. |
| [Volumes requiring attention](after-bulk-requiring-attention.png) | Submit the generated mock key; two rejected volumes remain with per-volume reason tooltips. |
| [Bulk escrow](after-bulk-escrow.png) | DR Bulk Escrow → select all → Escrow Keys (7). Selected and excluded keys appear together with heading info icons. |
| [Escrow policy](after-escrow-policy.png) | Same escrow drawer scrolled to the policy; checkbox aligns with the first line of the wrapped label. |
| [Bulk passphrase](after-bulk-passphrase.png) | DR Bulk Escrow → Update Passphrase (4). Selected appliances precede the explanatory text. |

Follow-up operation-error/passphrase copy is tracked separately under PORTAL-3934, and table/readiness changes under PORTAL-3935. Existing wording visible in those areas is not evidence of completion of those tickets.
