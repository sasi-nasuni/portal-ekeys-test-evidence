# PORTAL-3190 — Swagger and live appliance evidence

Test date: **2026-10-06**. Feature PR: [nasuni/portal#2794](https://github.com/nasuni/portal/pull/2794).
Tested feature commit: [`ee84f7b1fd9f070f45376f43e10a1e73057e60ed`](https://github.com/nasuni/portal/commit/ee84f7b1fd9f070f45376f43e10a1e73057e60ed).

**15 HTTP assertions passed; the raw downloaded file format failed.** The record contains 16 Swagger attempts, including one separately labeled setup reload-delay attempt. It contains **31 screenshots: 16 Swagger captures, 2 Edge Console captures, and 13 renders of recorded JSON evidence**.

## Remaining artifact-format failure

The first content request returned `200` and a 10,028-byte `.gpg` attachment, but the attachment contains base64 transport text. PGPy cannot parse the raw file, and GnuPG reports no valid OpenPGP data (exit 2). After an in-memory base64 decode, the 7,519-byte encrypted OpenPGP message decrypts with the disposable recipient key into **two private primary keys and two subkeys**, matching `included_count=2`. Direct use of the downloaded `.gpg` therefore fails; this is **not a fully passing end-to-end export**.

See [artifact verification JSON](artifact-verification.json) and its [rendered screenshot](27-artifact-validation-json.png). No fix was applied during evidence publication. Neither ciphertext nor decrypted key material is published.

## Run and correlation

- Target: **DEV-E-KEYS-POC**, appliance ID `31d629af-30b3-413e-a583-d5d3da651eb9`.
- Task ID: `bb355c00-a3fe-4c87-a82c-fa48e55dfa48`.
- Download ID: `e2d73634-dbe4-4257-9d09-54f05ddf3df6`.
- Real Swagger UI **Try it out / Execute** requests against the running local WebAPI; real database/message records, Edge Console observations, and filer SSH log verification. No synthetic database rows were created.
- The appliance reports **10.5**. The original **10.6** minimum returned `405`; an explicitly approved temporary local **10.5** override enabled live dispatch. The original source and running API setting were restored, and the final request returned `405` again. The source repository was clean after restoration.
- The task and step completed. Database origin/target show `dvista1 -> edge` command dispatch and `edge -> dvista1` result delivery. Edge Console incorrectly labels the outbound command as inbound in this environment; its arrows alone are not dispatch proof.
- Sanitized metadata from `/var/log/nasuni/broadcast_network.log` records the accepted acknowledgment with the exact task ID on line 22033. The routing entry is on adjacent line 22034 and is correlated by context within three lines; it does not itself contain the task ID. Raw log lines were not retained. Filer timestamps retain the original filer clock.
- The database task acknowledgment and message `acked_at` values are null; filer acceptance is independently confirmed by the log record.
- Repeated status polls preserve the manifest and expiry. First content retrieval succeeds; a second retrieval returns `404`; subsequent status keeps download ID, count, and expiry with `content_url=null`. The final audit query returns exactly one download audit with appliance name **DEV-E-KEYS-POC**. The initial verification snapshot did not query audits (`audits_checked=false`), so its empty list does not establish zero earlier audit rows.

## HTTP scenario index

Passing status counts: `202`: 1, `200`: 6, `401`: 2, `404`: 4, `405`: 2. The extra setup attempt returned `405` before the runtime reloaded and dispatched no task; it is not counted among the 15 passing assertions.

| Scenario | HTTP | Outcome | Recorded JSON | Screenshot |
| --- | --- | --- | --- | --- |
| 01. Original 10.6 version gate | 405 | PASS | [JSON](01-version-gate.json) | [View](01-version-gate.png) |
| 02. Expired export keeps completed metadata | 200 | PASS | [JSON](02-expired-export-status.json) | [View](02-expired-export-status.png) |
| 03. Status request without authentication | 401 | PASS | [JSON](03-status-without-auth.json) | [View](03-status-without-auth.png) |
| 04. Expired artifact unavailable | 404 | PASS | [JSON](04-expired-artifact.json) | [View](04-expired-artifact.png) |
| 05. Unknown task | 404 | PASS | [JSON](05-unknown-job.json) | [View](05-unknown-job.png) |
| 06. Task paired with a different appliance | 404 | PASS | [JSON](06-job-wrong-appliance.json) | [View](06-job-wrong-appliance.png) |
| 07. Content request without authentication | 401 | PASS | [JSON](07-content-without-auth.json) | [View](07-content-without-auth.png) |
| 08. Setup retry before runtime reload | 405 | SETUP_RELOAD_DELAY | [JSON](08-live-trigger.json) | [View](08-live-trigger.png) |
| 09. Accepted live export trigger | 202 | PASS | [JSON](09-live-trigger.json) | [View](09-live-trigger.png) |
| 10. First status: in progress | 200 | PASS | [JSON](10-first-status.json) | [View](10-first-status.png) |
| 12. Completed status with two included keys | 200 | PASS | [JSON](12-status-after-filer.json) | [View](12-status-after-filer.png) |
| 13. Repeat polling preserves manifest | 200 | PASS | [JSON](13-repeat-status-before-download.json) | [View](13-repeat-status-before-download.png) |
| 14. First artifact retrieval | 200 | PASS | [JSON](14-first-artifact-download.json) | [View](14-first-artifact-download.png) |
| 15. Second artifact retrieval rejected | 404 | PASS | [JSON](15-second-artifact-download.json) | [View](15-second-artifact-download.png) |
| 16. Consumed export retains metadata without content URL | 200 | PASS | [JSON](16-status-after-consumption.json) | [View](16-status-after-consumption.png) |
| 17. Restored 10.6 version gate | 405 | PASS | [JSON](17-restored-version-gate.json) | [View](17-restored-version-gate.png) |

The artifact check's `PASS` is the **HTTP assertion**, not the file-format check. The initial automation response-body capture was empty; the actual 10,028-byte file was subsequently saved through Swagger's **Download file** blob link without a second API retrieval. The recorded result includes this capture correction.

## Edge Console captures

| Observation | Screenshot |
| --- | --- |
| Dispatch observation | [View](11-edge-console-dispatch.png) |
| Completed command/result observation | [View](18-edge-console-completed.png) |

Both captures are actual Edge Console observations. See the direction-label caveat above.

## Rendered JSON evidence

These screenshots are **renders of recorded JSON evidence, not terminal, browser, or database UI captures**. Each image identifies its source and selected fields. The full JSON snapshots are preserved alongside the renders. HTTP response JSON has corresponding original Swagger screenshots above.

| Record | Source JSON | Rendered screenshot |
| --- | --- | --- |
| Database task and step / initial snapshot | [JSON](verification-bb355c00-a3fe-4c87-a82c-fa48e55dfa48-20261006T094251893714Z.json) | [View](19-initial-task-step-json.png) |
| Database command and result messages / initial snapshot | [JSON](verification-bb355c00-a3fe-4c87-a82c-fa48e55dfa48-20261006T094251893714Z.json) | [View](20-initial-messages-json.png) |
| Database retrieval audit / initial snapshot | [JSON](verification-bb355c00-a3fe-4c87-a82c-fa48e55dfa48-20261006T094251893714Z.json) | [View](21-initial-audit-json.png) |
| Filer acknowledgment and routing / initial snapshot | [JSON](verification-bb355c00-a3fe-4c87-a82c-fa48e55dfa48-20261006T094251893714Z.json) | [View](22-initial-filer-json.png) |
| Database task and step / final snapshot | [JSON](verification-bb355c00-a3fe-4c87-a82c-fa48e55dfa48-20261006T094443484932Z.json) | [View](23-final-task-step-json.png) |
| Database command and result messages / final snapshot | [JSON](verification-bb355c00-a3fe-4c87-a82c-fa48e55dfa48-20261006T094443484932Z.json) | [View](24-final-messages-json.png) |
| Database retrieval audit / final snapshot | [JSON](verification-bb355c00-a3fe-4c87-a82c-fa48e55dfa48-20261006T094443484932Z.json) | [View](25-final-audit-json.png) |
| Filer acknowledgment and routing / final snapshot | [JSON](verification-bb355c00-a3fe-4c87-a82c-fa48e55dfa48-20261006T094443484932Z.json) | [View](26-final-filer-json.png) |
| Artifact validation / unresolved format failure | [JSON](artifact-verification.json) | [View](27-artifact-validation-json.png) |
| Approved version override and restoration | [JSON](version-override.json) | [View](28-version-restoration-json.png) |
| Cleanup verification | [JSON](cleanup.json) | [View](29-cleanup-json.png) |
| Run summary / HTTP passes and artifact failure | [JSON](test-summary.json) | [View](30-run-summary-json.png) |
| Run metadata | [JSON](run-metadata.json) | [View](31-run-metadata-json.png) |

## Limits and cleanup

Not exercised live: native 10.6 appliance behavior, permission removal, feature-flag-off behavior, cross-account authentication, fresh empty/failed exports, or timeout/cancellation behavior. Expiry was verified against a previously completed export; the fresh export exercised consumption rather than waiting for its TTL.

Temporary bearer and disposable private-key files were cleared; decrypted material remained only in process memory. No synthetic records were created, and the real completed task and audit were retained. This published copy removes local runtime/evidence/private-artifact paths. Credentials, key inputs, request URL/Curl regions, key bundles, runtime scripts, and environment files are masked or excluded. Source evidence was preserved separately.

## Complete records

- [Machine-readable HTTP results](test-results.json)
- [Run summary](test-summary.json)
- [Run metadata](run-metadata.json)
- [Publication metadata and render provenance](publication-metadata.json)
- [Artifact verification](artifact-verification.json)
- [Version override and restoration](version-override.json)
- [Cleanup](cleanup.json)
- [Standalone HTML gallery](report.html) — download/open locally with the adjacent evidence files
- [SHA-256 manifest](SHA256SUMS) — covers every published file except the manifest itself

Verify after downloading this directory:

```sh
shasum -a 256 -c SHA256SUMS
```
