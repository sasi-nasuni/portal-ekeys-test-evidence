# PORTAL-3933 — Encryption key picker and drawer UX (review-round retest)

- Ticket: https://nasuni.atlassian.net/browse/PORTAL-3933
- Pull request: https://github.com/nasuni/portal/pull/3148
- Application commit: `3bac71cf180803431536127b9cb17c02378419ad` plus an uncommitted fix (described below) that closes stale tooltips on Done and Select after a refresh
- Application branch: `sbhushan/PORTAL-3933_picker_drawer_ux`
- Base: `feature/PM-1957-EKEYS_MVI_4` (`226ab1affc`, includes PORTAL-3934 #3149)
- Captured: November 17, 2026. App: Chromium at 1440 × 1000, local frontend with Portal Dev Tools MSW scenarios and mock login. Storybook: 760 × 420 at 2× scale.
- Mock login and mock data only. The bulk upload used a disposable OpenPGP key generated in memory; no key contents, credentials, or browser session files are included.

## Validation

Commands from `frontend/`:

```sh
pnpm vitest run --project=int --browser.headless=true tests/int/routes/_authed.encryption-keys/VolumeKeysPage.test.tsx
pnpm vitest run --project=int --browser.headless=true tests/int/routes/_authed.encryption-keys tests/int/components/lib/forms/FileSelector.test.tsx tests/int/components/lib/forms/Checkbox.test.tsx tests/int/webbff/mutations/encryption-keys.test.tsx
pnpm test:storybook packages/ui/component-docs/buttons/PrimaryButton.stories.tsx packages/ui/component-docs/buttons/OutlinedButton.stories.tsx packages/ui/component-docs/forms/FileSelector.stories.tsx packages/ui/component-docs/forms/Checkbox.stories.tsx
pnpm ts:build --noEmit
pnpm lint --fix <changed files>
```

- `VolumeKeysPage.test.tsx` alone: 69/69 passed, twice.
- All 17 related files at once: 297/300 passed. The 3 failures were in long `VolumeKeysPage` picker tests that pass on their own: two hit the 5 s timeout and one couldn't find an element. They appear only with 17 browser files running in parallel.
- Storybook: 38/38 passed across the 4 story files.
- Type-check and lint passed.

## Screenshot scenarios

| Image | Scenario and observation |
| --- | --- |
| [01 Add key](01-add-key.png) | Volume Keys actions → Engineering-Share → Add key. "Add key" heading with the volume and owner below it, the file card with requirements above, and Disable current keys unchecked. |
| [02 Upload validation](02-upload-validation-long-filename.png) | Choose a non-OpenPGP file with a long name. Inline error below the card, name cut off with "…", Change and Remove controls. |
| [03 Long filename on keyboard focus](03-long-filename-keyboard-tooltip.png) | Shift+Tab from Change to the cut-off filename: a tooltip shows the full name. |
| [04 Empty existing keys](04-empty-existing-keys.png) | Select Existing (empty) → Research-Data. Select is greyed out but focusable (shared `OutlinedButton` with `aria-disabled`) and explains why on focus. |
| [05 25-key limit](05-picker-25-limit.png) | Select Existing (26 keys) → select 25, search for the 26th: it can't be selected and the count reads "25 selected · Maximum 25 keys". |
| [06 Done while refreshing](06-done-refreshing-tooltip.png) | Select Existing (key disappears) → select Key A–D and focus Done. During the keyring refresh Done is greyed out (shared `PrimaryButton` with `aria-disabled`), keeps focus, and explains why. |
| [07 Key no longer available](07-key-no-longer-available.png) | After the refresh, Key C is listed under "Keys no longer available" with its reason, A, B and D stay selected, Done is enabled again, and the refreshing tooltip has closed. |
| [08 All keys no longer available](08-all-keys-no-longer-available.png) | Select Existing (all keys disappear) → save Key A–D, reopen Change, wait for the refresh. All four are listed; "No other keys are available. Closing keeps your previous selection." Done is greyed out. |
| [09 Closing keeps the saved selection](09-closing-keeps-selection-server-rejects.png) | Close the picker: the drawer still shows 4 keys selected. Add key → the server rejects the keys that are no longer available, and the drawer shows the message. |
| [10 Bulk Add key selection](10-bulk-add-selected-volumes.png) | Bulk Add Key Partial Failure → select all → Add key (10). "10 volumes" below the heading, the Selected volumes help tooltip, and the button "Add key to 10 volumes". |
| [11 Bulk Add key partial failure](11-bulk-add-partial-failure.png) | Upload a generated key: "Key submitted for processing for 8 of 10 volumes. 2 failed…". The scope and button now read 2 volumes, and the failed volumes show their reason tooltip. |
| [12 Bulk escrow](12-bulk-escrow.png) | DR Bulk Escrow → select all → Escrow keys (7). Selected and excluded keys, plus "Appliances receiving an escrow passphrase" (PORTAL-3934 wording). |
| [13 Escrow policy](13-escrow-policy-and-passphrase.png) | Same drawer scrolled to the policy: the checkbox lines up with the first line of the wrapped label. |
| [14 Bulk escrow partial failure](14-bulk-escrow-partial-failure.png) | Submit: "Unable to escrow 3 of 7 keys. 4 keys were submitted for processing…", plus Keys requiring attention. |
| [15 Bulk passphrase](15-bulk-passphrase.png) | DR Bulk Partial Failure → Bulk Edge 01, 02, 07 → Update passphrase (3). The selected appliances come before the explanation; the button reads "Update passphrase on 3 appliances". |
| [16 Bulk passphrase partial failure](16-bulk-passphrase-partial-failure.png) | Submit: "Unable to update … on 2 of 3 appliances. 1 appliance was submitted for processing…", and an appliance pill tooltip shows its reason. The button now reads "Update passphrase on 2 appliances". |
| [17 PrimaryButton story](17-story-primary-button-disabled-with-reason.png) | Storybook `DisabledWithReason`: a focusable `aria-disabled` button styled like a natively disabled one, with its tooltip. |
| [18 OutlinedButton story](18-story-outlined-button-disabled-with-reason.png) | The same for `OutlinedButton`. |
| [19 FileSelector story](19-story-file-selector-long-name-focus.png) | `LongFileName`: Tab to the cut-off filename to see its full name. |
| [20 Checkbox story](20-story-checkbox-multiline-label.png) | `MultilineLabel`: the check lines up with the first line of a wrapped label. |

### Stale-tooltip fix (uncommitted)

While capturing, Done kept showing "Available keys are refreshing…" after the refresh finished, and keyboard-focused Select kept "No existing keys…" after keys arrived. Both tooltips in `ExistingKeysSelection` now control their open state, so they close when their reason no longer applies. New `VolumeKeysPage` assertions fail without the fix and pass with it. Shots 06 and 07 include the fix.
