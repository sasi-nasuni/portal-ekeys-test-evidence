# PORTAL-3189 — Generated encryption key download trigger

Live verification performed on **6 October 2026** for [nasuni/portal PR #2792](https://github.com/nasuni/portal/pull/2792), [PORTAL-3189](https://nasuni.atlassian.net/browse/PORTAL-3189).

**25 HTTP checks passed; 66 screenshots; no unresolved test failures.** The 33 recorded attempts include seven corrected fixture errors and one Swagger UI limitation. Passing checks include reruns; this is not a count of unique scenarios.

## Scope

Tested `POST /edges/{appliance_id}/encryption-keys/downloads?public_key=...` through the served Swagger **Try it out / Execute** controls. The live request returned `202`; its command was dispatched, acknowledged and routed by the filer; the task completed; and an `encryption_keys_downloaded` event reported **2 included keys**.

**Download status and artifact endpoints were not tested.** Those routes belong to [PORTAL-3190](https://nasuni.atlassian.net/browse/PORTAL-3190) and were absent on the tested branch. Task completion was checked through Edge Console and database evidence. This does not establish status polling, artifact retrieval, decryption, expiry, single-use behavior, or download retries.

## Environment and test method

- Product revision: [`beac6fbde997d79fdb31a26bfe3b6b67e7bc7e24`](https://github.com/nasuni/portal/commit/beac6fbde997d79fdb31a26bfe3b6b67e7bc7e24), branch `sbhushan/PORTAL-3189_download_generated_keys`, stacked on `sbhushan/PORTAL-3182_post_escrow_passphrase`.
- Local development Portal with real Swagger responses; live appliance **DEV-E-KEYS-POC**, version **10.5**.
- Recorded the expected `405` with the normal **10.6** minimum. With user approval, temporarily lowered the local minimum to **10.5** for live dispatch, restored the original source and runtime setting, then verified `405` again. See [version restoration](version-override.json) and attempt 33.
- Browser request routing supplied development authentication locally. No response stubs were used. Swagger's single-line key input required its request interceptor to preserve exact multiline armor. Browser transport and database digest checks verified the recipient key was unchanged.
- Missing-query and invalid-UUID server checks used documented interception after Swagger client validation. The original UUID attempt was blocked by Swagger and is classified as a UI limitation, not a backend response.
- Eligibility, permission, feature-flag, duplicate-task and quota cases used isolated synthetic records. Feature-flag controls for this run used the synthetic account's Redis cache; they did not change real user roles. The quota case used a synthetic user-key token.
- [Cleanup](cleanup.json) confirms removal of the run-owned synthetic records and two cache controls. Its zero counts refer only to those synthetic records, not the entire database. Temporary authentication files were cleared; the real completed test task was retained.

## Results and limitations

Verified response codes: **202, 400, 401, 403, 404, 405, 409, 422, 429, 503**. See the complete [machine-readable summary](test-summary.json), [results](test-results.json), and scenario table below.

- Seven initial fixture attempts returned `500` before the endpoint because a raw SQL role fixture omitted the ORM default `sso_group_names=[]`. The fixture was corrected and all eight fixture scenarios rerun successfully. Original captures remain labeled **FIXTURE ERROR** for traceability.
- No dedicated `500` fault injection was performed; those setup errors are not successful endpoint error-path coverage.
- Edge Console displays the outbound command as **inbound** because its direction classifier recognizes origin `portal`, while this development environment uses `dvista1`. [Database evidence](database-evidence.json) verifies `origin=dvista1`, `target=edge`; [Edge Console evidence](edge-evidence.json) preserves the actual UI label and explains the issue. No Edge Console code was changed.
- The version override enables this development integration exercise; it does not demonstrate live behavior on a version 10.6 appliance.

## Live dispatch correlation

Task: `c4f9073e-e563-40c4-9d4e-ef59f995e90a`, created `2026-10-06T07:25:00.931468Z`, completed `2026-10-06T07:25:21.660639Z`.

| Observation | Evidence |
| --- | --- |
| Swagger `202`, task ID and returned status URL | [Response screenshot](swagger/32_live_download_dispatch/live_download_dispatch_response.png), [JSON](live-dispatch.json) |
| Command and result event correlated by task ID | [Edge Console screenshot](edge-console-messages.png), [JSON](edge-evidence.json) |
| Task and download step completed | [Task screenshot](task-detail.png) |
| Outbound message, matching recipient key digest, result `included_count=2` | [Database evidence](database-evidence.json) |
| Filer acknowledged command and routed it to `configuration.encryption_keys.download` | [Log screenshot](filer-log.png), [filtered original log lines](filer-log.txt), [JSON](filer-log-evidence.json) |

The filer screenshot is an HTML rendering of the filtered original log lines, not a terminal screenshot. Filer timestamps are preserved as emitted; the routing line was found adjacent to the exact task-ID match.

## Scenario index

Screenshot links retain capture order. Each JSON record includes the response and any interceptor or fixture notes.

| Attempt | Scenario | Expected HTTP | Actual HTTP | Outcome | Result | Screenshots |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `missing_credentials` | 401 | 401 | PASS | [01-no-credentials.json](01-no-credentials.json) | [1](01-swagger-no-credentials.png) |
| 2 | `authenticated_invalid_public_key` | 400 | 400 | PASS | [02-authenticated-validation.json](02-authenticated-validation.json) | [1](02-swagger-authenticated-validation.png) |
| 3 | `invalid_bearer` | 401 | 401 | PASS | [result.json](swagger/03_invalid_bearer/result.json) | [1](swagger/03_invalid_bearer/invalid_bearer_inputs.png) / [2](swagger/03_invalid_bearer/invalid_bearer_response.png) |
| 4 | `invalid_public_key` | 400 | 400 | PASS | [result.json](swagger/04_invalid_public_key/result.json) | [1](swagger/04_invalid_public_key/invalid_public_key_inputs.png) / [2](swagger/04_invalid_public_key/invalid_public_key_response.png) |
| 5 | `signing_only_public_key` | 400 | 400 | PASS | [result.json](swagger/05_signing_only_public_key/result.json) | [1](swagger/05_signing_only_public_key/signing_only_public_key_inputs.png) / [2](swagger/05_signing_only_public_key/signing_only_public_key_response.png) |
| 6 | `private_key_rejected` | 400 | 400 | PASS | [result.json](swagger/06_private_key_rejected/result.json) | [1](swagger/06_private_key_rejected/private_key_rejected_inputs.png) / [2](swagger/06_private_key_rejected/private_key_rejected_response.png) |
| 7 | `invalid_armor_checksum` | 400 | 400 | PASS | [result.json](swagger/07_invalid_armor_checksum/result.json) | [1](swagger/07_invalid_armor_checksum/invalid_armor_checksum_inputs.png) / [2](swagger/07_invalid_armor_checksum/invalid_armor_checksum_response.png) |
| 8 | `multiple_public_key_blocks` | 400 | 400 | PASS | [result.json](swagger/08_multiple_public_key_blocks/result.json) | [1](swagger/08_multiple_public_key_blocks/multiple_public_key_blocks_inputs.png) / [2](swagger/08_multiple_public_key_blocks/multiple_public_key_blocks_response.png) |
| 9 | `malformed_packet_order` | 400 | 400 | PASS | [result.json](swagger/09_malformed_packet_order/result.json) | [1](swagger/09_malformed_packet_order/malformed_packet_order_inputs.png) / [2](swagger/09_malformed_packet_order/malformed_packet_order_response.png) |
| 10 | `malformed_packet_body` | 400 | 400 | PASS | [result.json](swagger/10_malformed_packet_body/result.json) | [1](swagger/10_malformed_packet_body/malformed_packet_body_inputs.png) / [2](swagger/10_malformed_packet_body/malformed_packet_body_response.png) |
| 11 | `missing_public_key` | 422 | 422 | PASS | [result.json](swagger/11_missing_public_key/result.json) | [1](swagger/11_missing_public_key/missing_public_key_inputs.png) / [2](swagger/11_missing_public_key/missing_public_key_response.png) |
| 12 | `invalid_appliance_uuid` | — | No request | UI LIMITATION | [result.json](swagger/12_invalid_appliance_uuid/result.json) | [1](swagger/12_invalid_appliance_uuid/invalid_appliance_uuid_inputs.png) |
| 13 | `invalid_uuid_server_validation` | 422 | 422 | PASS | [result.json](swagger/13_invalid_uuid_server_validation/result.json) | [1](swagger/13_invalid_uuid_server_validation/invalid_uuid_server_validation_inputs.png) / [2](swagger/13_invalid_uuid_server_validation/invalid_uuid_server_validation_response.png) |
| 14 | `unknown_appliance` | 404 | 404 | PASS | [result.json](swagger/14_unknown_appliance/result.json) | [1](swagger/14_unknown_appliance/unknown_appliance_inputs.png) / [2](swagger/14_unknown_appliance/unknown_appliance_response.png) |
| 15 | `live_appliance_below_minimum` | 405 | 405 | PASS | [result.json](swagger/15_live_appliance_below_minimum/result.json) | [1](swagger/15_live_appliance_below_minimum/live_appliance_below_minimum_inputs.png) / [2](swagger/15_live_appliance_below_minimum/live_appliance_below_minimum_response.png) |
| 16 | `feature_flag_disabled` | 403 | 500 | FIXTURE ERROR | [result.json](swagger/16_feature_flag_disabled/result.json) | [1](swagger/16_feature_flag_disabled/feature_flag_disabled_inputs.png) / [2](swagger/16_feature_flag_disabled/feature_flag_disabled_response.png) |
| 17 | `missing_download_permission` | 403 | 403 | PASS | [result.json](swagger/17_missing_download_permission/result.json) | [1](swagger/17_missing_download_permission/missing_download_permission_inputs.png) / [2](swagger/17_missing_download_permission/missing_download_permission_response.png) |
| 18 | `cross_tenant_appliance` | 404 | 500 | FIXTURE ERROR | [result.json](swagger/18_cross_tenant_appliance/result.json) | [1](swagger/18_cross_tenant_appliance/cross_tenant_appliance_inputs.png) / [2](swagger/18_cross_tenant_appliance/cross_tenant_appliance_response.png) |
| 19 | `wrong_appliance_family` | 405 | 500 | FIXTURE ERROR | [result.json](swagger/19_wrong_appliance_family/result.json) | [1](swagger/19_wrong_appliance_family/wrong_appliance_family_inputs.png) / [2](swagger/19_wrong_appliance_family/wrong_appliance_family_response.png) |
| 20 | `synthetic_below_version` | 405 | 500 | FIXTURE ERROR | [result.json](swagger/20_synthetic_below_version/result.json) | [1](swagger/20_synthetic_below_version/synthetic_below_version_inputs.png) / [2](swagger/20_synthetic_below_version/synthetic_below_version_response.png) |
| 21 | `offline_appliance` | 503 | 500 | FIXTURE ERROR | [result.json](swagger/21_offline_appliance/result.json) | [1](swagger/21_offline_appliance/offline_appliance_inputs.png) / [2](swagger/21_offline_appliance/offline_appliance_response.png) |
| 22 | `download_already_in_progress` | 409 | 500 | FIXTURE ERROR | [result.json](swagger/22_download_already_in_progress/result.json) | [1](swagger/22_download_already_in_progress/download_already_in_progress_inputs.png) / [2](swagger/22_download_already_in_progress/download_already_in_progress_response.png) |
| 23 | `daily_rate_limit` | 429 | 500 | FIXTURE ERROR | [result.json](swagger/23_daily_rate_limit/result.json) | [1](swagger/23_daily_rate_limit/daily_rate_limit_inputs.png) / [2](swagger/23_daily_rate_limit/daily_rate_limit_response.png) |
| 24 | `feature_flag_disabled` | 403 | 403 | PASS | [result.json](swagger/24_feature_flag_disabled/result.json) | [1](swagger/24_feature_flag_disabled/feature_flag_disabled_inputs.png) / [2](swagger/24_feature_flag_disabled/feature_flag_disabled_response.png) |
| 25 | `missing_download_permission` | 403 | 403 | PASS | [result.json](swagger/25_missing_download_permission/result.json) | [1](swagger/25_missing_download_permission/missing_download_permission_inputs.png) / [2](swagger/25_missing_download_permission/missing_download_permission_response.png) |
| 26 | `cross_tenant_appliance` | 404 | 404 | PASS | [result.json](swagger/26_cross_tenant_appliance/result.json) | [1](swagger/26_cross_tenant_appliance/cross_tenant_appliance_inputs.png) / [2](swagger/26_cross_tenant_appliance/cross_tenant_appliance_response.png) |
| 27 | `wrong_appliance_family` | 405 | 405 | PASS | [result.json](swagger/27_wrong_appliance_family/result.json) | [1](swagger/27_wrong_appliance_family/wrong_appliance_family_inputs.png) / [2](swagger/27_wrong_appliance_family/wrong_appliance_family_response.png) |
| 28 | `synthetic_below_version` | 405 | 405 | PASS | [result.json](swagger/28_synthetic_below_version/result.json) | [1](swagger/28_synthetic_below_version/synthetic_below_version_inputs.png) / [2](swagger/28_synthetic_below_version/synthetic_below_version_response.png) |
| 29 | `offline_appliance` | 503 | 503 | PASS | [result.json](swagger/29_offline_appliance/result.json) | [1](swagger/29_offline_appliance/offline_appliance_inputs.png) / [2](swagger/29_offline_appliance/offline_appliance_response.png) |
| 30 | `download_already_in_progress` | 409 | 409 | PASS | [result.json](swagger/30_download_already_in_progress/result.json) | [1](swagger/30_download_already_in_progress/download_already_in_progress_inputs.png) / [2](swagger/30_download_already_in_progress/download_already_in_progress_response.png) |
| 31 | `daily_rate_limit` | 429 | 429 | PASS | [result.json](swagger/31_daily_rate_limit/result.json) | [1](swagger/31_daily_rate_limit/daily_rate_limit_inputs.png) / [2](swagger/31_daily_rate_limit/daily_rate_limit_response.png) |
| 32 | `live_download_dispatch` | 202 | 202 | PASS | [result.json](swagger/32_live_download_dispatch/result.json) | [1](swagger/32_live_download_dispatch/live_download_dispatch_inputs.png) / [2](swagger/32_live_download_dispatch/live_download_dispatch_response.png) |
| 33 | `original_minimum_restored` | 405 | 405 | PASS | [result.json](swagger/33_original_minimum_restored/result.json) | [1](swagger/33_original_minimum_restored/original_minimum_restored_inputs.png) / [2](swagger/33_original_minimum_restored/original_minimum_restored_response.png) |

## Offline gallery and integrity

Open [index.html](index.html) from a local checkout of this evidence directory for an offline gallery. GitHub displays the HTML source; the scenario links above work directly in GitHub. Keep the directory layout intact for relative image links.

[SHA256SUMS](SHA256SUMS) records every published file except the checksum file itself. [Publication metadata](publication-metadata.json) identifies the product revision, scope and packaging changes.

All 66 PNGs are unchanged from the local evidence captures. JSON screenshot paths were converted to portable relative paths, and the gallery was rebuilt from those records. Key inputs and request URL/cURL regions were masked during capture. The package excludes key material, credentials, executable test helpers, bytecode and machine-specific runtime metadata. The original local evidence remains unchanged.
