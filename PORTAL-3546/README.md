# PORTAL-3546 frontend screenshot evidence

Pull request: [nasuni/portal#3099](https://github.com/nasuni/portal/pull/3099).
Portal source: [`2f2971ddab91703c29d307c31fef2e32e00e7fe7`](https://github.com/nasuni/portal/commit/2f2971ddab91703c29d307c31fef2e32e00e7fe7).
Captured on 2026-11-06 using Chromium at a 1440 × 980 CSS-pixel viewport.

## Scope

These are unedited screenshots of the actual Portal route components exercised through the browser integration runner, using the existing MSW scenarios and synthetic data. They are UI evidence, not evidence of live appliance or backend success. No customer data or key contents are included. The screenshot harness was temporary and is not part of the Portal change.

## Scenarios

| Screenshot | Observed UI |
| --- | --- |
| [Volume Keys: expanded children](2026-11-06-2f2971ddab/01-volume-keys-expanded.png) | Parent volumes and individual key rows appear together; reachable appliances have no reachability dot. |
| [Add Key: required file](2026-11-06-2f2971ddab/02-add-key-file-validation.png) | Submitting without a file shows the validation message below the file selector. |
| [Unreachable appliance](2026-11-06-2f2971ddab/03-unreachable-last-seen-tooltip.png) | The icon follows the appliance name. The tooltip has two lines and uses the notifications date format in the user timezone (UTC in this capture). |
| [Bulk upload: partial failure](2026-11-06-2f2971ddab/04-bulk-upload-partial-failure.png) | Eight volumes accepted and two failed; the drawer presents only the remaining targets for retry. |
| [Enable Key: pending refresh](2026-11-06-2f2971ddab/05-enable-progress-through-refresh.png) | The association row shows progress while the accepted operation waits for the list refresh. |
| [Volume operation error](2026-11-06-2f2971ddab/06-volume-error-details.png) | The failed collection exposes its error details and acknowledgement control. |
| [Destination flags: both disabled](2026-11-06-2f2971ddab/07-destination-links-disabled.png) | Volume and appliance names remain visible as plain text. |
| [Destination flags: volumes only](2026-11-06-2f2971ddab/08-volume-links-only.png) | Volume names link independently of appliance destination availability. |
| [Destination flags: appliances only](2026-11-06-2f2971ddab/09-appliance-links-only.png) | Appliance names link independently of volume destination availability. |
| [DR Readiness: expanded children](2026-11-06-2f2971ddab/10-dr-readiness-expanded.png) | The grouped table shows appliance readiness and its key rows. |
| [DR escrow: selected key becomes blocked](2026-11-06-2f2971ddab/11-dr-retained-blocked-key.png) | A previously selected key remains in the selection and appears as a skipped target when the drawer opens. |
| [DR passphrase: selected appliance becomes blocked](2026-11-06-2f2971ddab/12-dr-retained-blocked-appliance.png) | A previously selected appliance remains visible as a skipped target; the eligible appliance can proceed. |
| [Escrow policy validation](2026-11-06-2f2971ddab/13-escrow-policy-validation.png) | Submitting without policy acceptance shows an inline validation error. |
| [Passphrase confirmation validation](2026-11-06-2f2971ddab/14-passphrase-confirmation-validation.png) | Mismatching passphrases show an inline error; entered values are masked dummy data. |
| [Unassigned Keys: task states](2026-11-06-2f2971ddab/15-unassigned-key-task-states.png) | Expanded rows show the seeded success, pending and failed states. |
| [Delete Key: confirmation](2026-11-06-2f2971ddab/16-delete-key-confirmation.png) | The dialog identifies the key, fingerprint and appliance and requires the confirmation phrase. |
| [Delete Key: request failure](2026-11-06-2f2971ddab/17-delete-key-request-error.png) | A simulated synchronous failure stays inside the confirmation dialog as an error alert. |
| [Volume Keys: pagination](2026-11-06-2f2971ddab/18-volume-keys-page-two.png) | Route navigation selects page two and renders the next set of parent volumes. |
| [CSV export after leaving Encryption Keys](2026-11-06-2f2971ddab/19-csv-export-after-navigation.png) | The global handler shows the download-started notification on Cloud Credentials after navigation. |
| [Generated keys: collection started](2026-11-06-2f2971ddab/20-generated-keys-collecting.png) | The download action sends the initiation request and displays the collecting notification. |

## Gallery

### Volume Keys: expanded children

Parent volumes and individual key rows appear together; reachable appliances have no reachability dot.

![Volume Keys: expanded children](2026-11-06-2f2971ddab/01-volume-keys-expanded.png)

### Add Key: required file

Submitting without a file shows the validation message below the file selector.

![Add Key: required file](2026-11-06-2f2971ddab/02-add-key-file-validation.png)

### Unreachable appliance

The icon follows the appliance name. The tooltip has two lines and uses the notifications date format in the user timezone (UTC in this capture).

![Unreachable appliance](2026-11-06-2f2971ddab/03-unreachable-last-seen-tooltip.png)

### Bulk upload: partial failure

Eight volumes accepted and two failed; the drawer presents only the remaining targets for retry.

![Bulk upload: partial failure](2026-11-06-2f2971ddab/04-bulk-upload-partial-failure.png)

### Enable Key: pending refresh

The association row shows progress while the accepted operation waits for the list refresh.

![Enable Key: pending refresh](2026-11-06-2f2971ddab/05-enable-progress-through-refresh.png)

### Volume operation error

The failed collection exposes its error details and acknowledgement control.

![Volume operation error](2026-11-06-2f2971ddab/06-volume-error-details.png)

### Destination flags: both disabled

Volume and appliance names remain visible as plain text.

![Destination flags: both disabled](2026-11-06-2f2971ddab/07-destination-links-disabled.png)

### Destination flags: volumes only

Volume names link independently of appliance destination availability.

![Destination flags: volumes only](2026-11-06-2f2971ddab/08-volume-links-only.png)

### Destination flags: appliances only

Appliance names link independently of volume destination availability.

![Destination flags: appliances only](2026-11-06-2f2971ddab/09-appliance-links-only.png)

### DR Readiness: expanded children

The grouped table shows appliance readiness and its key rows.

![DR Readiness: expanded children](2026-11-06-2f2971ddab/10-dr-readiness-expanded.png)

### DR escrow: selected key becomes blocked

A previously selected key remains in the selection and appears as a skipped target when the drawer opens.

![DR escrow: selected key becomes blocked](2026-11-06-2f2971ddab/11-dr-retained-blocked-key.png)

### DR passphrase: selected appliance becomes blocked

A previously selected appliance remains visible as a skipped target; the eligible appliance can proceed.

![DR passphrase: selected appliance becomes blocked](2026-11-06-2f2971ddab/12-dr-retained-blocked-appliance.png)

### Escrow policy validation

Submitting without policy acceptance shows an inline validation error.

![Escrow policy validation](2026-11-06-2f2971ddab/13-escrow-policy-validation.png)

### Passphrase confirmation validation

Mismatching passphrases show an inline error; entered values are masked dummy data.

![Passphrase confirmation validation](2026-11-06-2f2971ddab/14-passphrase-confirmation-validation.png)

### Unassigned Keys: task states

Expanded rows show the seeded success, pending and failed states.

![Unassigned Keys: task states](2026-11-06-2f2971ddab/15-unassigned-key-task-states.png)

### Delete Key: confirmation

The dialog identifies the key, fingerprint and appliance and requires the confirmation phrase.

![Delete Key: confirmation](2026-11-06-2f2971ddab/16-delete-key-confirmation.png)

### Delete Key: request failure

A simulated synchronous failure stays inside the confirmation dialog as an error alert.

![Delete Key: request failure](2026-11-06-2f2971ddab/17-delete-key-request-error.png)

### Volume Keys: pagination

Route navigation selects page two and renders the next set of parent volumes.

![Volume Keys: pagination](2026-11-06-2f2971ddab/18-volume-keys-page-two.png)

### CSV export after leaving Encryption Keys

The global handler shows the download-started notification on Cloud Credentials after navigation.

![CSV export after leaving Encryption Keys](2026-11-06-2f2971ddab/19-csv-export-after-navigation.png)

### Generated keys: collection started

The download action sends the initiation request and displays the collecting notification.

![Generated keys: collection started](2026-11-06-2f2971ddab/20-generated-keys-collecting.png)

## Limits and follow-ups

- Escrow setup and standalone escrow-passphrase WebBFF routes remain 501 stubs, tracked by PORTAL-3648 and PORTAL-3647. Their screenshots exercise frontend behavior with MSW.
- Duplicate uploads when multiple volumes share an owning appliance remain tracked by PORTAL-3568. The partial-failure screenshot does not demonstrate a fix for that issue.
- The generated-keys image shows collection initiation only. It does not demonstrate completed file retrieval or decryption.
- The export scenario prevents the native file save after observing the download action. The image demonstrates the notification after route navigation.
- The separate select-all CI selector correction was checked locally with all 7 tests in the affected page suite passing, without a timeout increase. It was uncommitted at capture time and changes only the test, not the product shown here.

The manifest records source commit, image dimensions and SHA-256 checksums for these artifacts.
