# PORTAL-3642 Unassigned Keys Swagger evidence

Result: **PASS — 36/36 scenarios**

- Tested application commit: `7d937f40340e881a60a9c396039a02e3923021b4`.
- Branch: `sbhushan/PORTAL-3642_unassigned_keys_webbff`; draft PR [#3059](https://github.com/nasuni/portal/pull/3059).
- Endpoint: `GET /encryption-keys/unassigned`.
- Evidence: **196 native Swagger PNGs**, verified against the [SHA-256 manifest](png-sha256.json).
- Account: `f902fd2c-796c-403b-837b-89d5625319a9` (`sbhushan1`).

## Source data and runtime

The normal local `portal` database currently has no appliance or volume inventory for this account. This run therefore reads the same preserved isolated snapshot used for PORTAL-3641: `portal3763_e2e_20261101_182817`, containing **4 appliances, 9 volumes, and 87 keys**, including test/fixture records. This is not a fresh NOC sync or live-filer test. See [inventory](inventory.json) and [run metadata](run-metadata.json).

The appliances are `DEV-E-KEYS-POC`, `DEV-ENCR-KEYS-2`, `test-filer-01`, and stub `test-filer-02`. The default response contains all three eligible non-stub parents and **61 unused volume keys** (57, 3, and 1 respectively). The designated backup keys are excluded by WebAPI's canonical `type=volume` classification, and associated keys are excluded by `state=unused`.

The existing Docker services were reused with the source-only bind-mount workaround established for PORTAL-3641. The running Unassigned route, repository, DTOs, and converters match the tested committed source byte-for-byte; see [source verification](source-verification.json).

Authentication used the existing persisted full-permission test user and a locally signed JWT held only in memory as WebBFF's `access_token` cookie. External IdP login and refresh issuance were not tested. Temporary local feature/license cache controls were restored after the run; see [cache restoration](cache-restoration.json).

## Assertions and results

Every recorded request originated from the served WebBFF Swagger UI's **Try it out / Execute** controls. The displayed status, request URL, and complete body were checked against the browser's actual HTTP response. Unknown or malformed query values that Swagger cannot expose normally were supplied through its documented `requestInterceptor`; these cases are marked in their result and assertion records. Responses were never intercepted or rewritten.

Successful non-continuation responses were compared field-for-field with an independently read grouped WebAPI response using fixed `type=volume` and `state=unused`. Independent opaque cursor IDs were allowed to differ, with matching cursor presence required. Continuation cursors are single-use: the three captured pages were instead checked against the full descending baseline, including every child key, metadata page number/totals, ordering, and cursor termination.

PostgreSQL checks independently verified complete default parent/child sets, key ownership, fingerprint/name/stub facts, unused state, and backup exclusion. All successful responses omit `dr_counts` and exclude empty parents. Source account rows in ten relevant tables have identical counts and ordered row digests before and after testing; see [database verification](database-verification.json), [before](database-before.json), and [after](database-after.json).

The license-disabled case verifies omission of escrow/passphrase fields while preserving backup availability and all unused keys. The feature-disabled case returns 403. See [all assertions](assertions.json).

| Scenario | HTTP | Parents returned | Child keys | Matching parent total |
|---|---:|---:|---:|---:|
| [001_missing_authentication](swagger/001_missing_authentication/result.json) | 401 | — | — | — |
| [002_default_full_access](swagger/002_default_full_access/result.json) | 200 | 3 | 61 | 3 |
| [003_descending_appliance_sort](swagger/003_descending_appliance_sort/result.json) | 200 | 3 | 61 | 3 |
| [004_iterator_page_1](swagger/004_iterator_page_1/result.json) | 200 | 1 | 1 | 3 |
| [005_iterator_page_2](swagger/005_iterator_page_2/result.json) | 200 | 1 | 3 | 3 |
| [006_iterator_page_3](swagger/006_iterator_page_3/result.json) | 200 | 1 | 57 | 3 |
| [007_selected_appliance](swagger/007_selected_appliance/result.json) | 200 | 1 | 1 | 1 |
| [008_repeated_appliance_ids](swagger/008_repeated_appliance_ids/result.json) | 200 | 2 | 4 | 2 |
| [009_search_appliance_name](swagger/009_search_appliance_name/result.json) | 200 | 1 | 1 | 1 |
| [010_search_unused_key_fingerprint](swagger/010_search_unused_key_fingerprint/result.json) | 200 | 1 | 1 | 1 |
| [011_search_used_key_selects_parent](swagger/011_search_used_key_selects_parent/result.json) | 200 | 1 | 1 | 1 |
| [012_search_and_appliance_intersection_empty](swagger/012_search_and_appliance_intersection_empty/result.json) | 200 | 0 | 0 | 0 |
| [013_literal_search_no_match](swagger/013_literal_search_no_match/result.json) | 200 | 0 | 0 | 0 |
| [014_unknown_appliance_empty](swagger/014_unknown_appliance_empty/result.json) | 200 | 0 | 0 | 0 |
| [015_page_beyond_last_empty](swagger/015_page_beyond_last_empty/result.json) | 200 | 0 | 0 | 3 |
| [016_reject_type_volume](swagger/016_reject_type_volume/result.json) | 422 | — | — | — |
| [017_reject_type_backup](swagger/017_reject_type_backup/result.json) | 422 | — | — | — |
| [018_reject_state_unused](swagger/018_reject_state_unused/result.json) | 422 | — | — | — |
| [019_reject_state_in_use](swagger/019_reject_state_in_use/result.json) | 422 | — | — | — |
| [020_reject_origin_uploaded](swagger/020_reject_origin_uploaded/result.json) | 422 | — | — | — |
| [021_reject_is_escrowed_false](swagger/021_reject_is_escrowed_false/result.json) | 422 | — | — | — |
| [022_reject_has_escrow_passphrase_false](swagger/022_reject_has_escrow_passphrase_false/result.json) | 422 | — | — | — |
| [023_reject_backup_key_missing](swagger/023_reject_backup_key_missing/result.json) | 422 | — | — | — |
| [024_reject_limit_0](swagger/024_reject_limit_0/result.json) | 422 | — | — | — |
| [025_reject_limit_26](swagger/025_reject_limit_26/result.json) | 422 | — | — | — |
| [026_reject_page_0](swagger/026_reject_page_0/result.json) | 422 | — | — | — |
| [027_reject_sort_by_key_name](swagger/027_reject_sort_by_key_name/result.json) | 422 | — | — | — |
| [028_reject_iterator_id_invalid](swagger/028_reject_iterator_id_invalid/result.json) | 422 | — | — | — |
| [029_reject_unknown_1](swagger/029_reject_unknown_1/result.json) | 422 | — | — | — |
| [030_reject_duplicate_appliance_ids](swagger/030_reject_duplicate_appliance_ids/result.json) | 422 | — | — | — |
| [031_unknown_iterator](swagger/031_unknown_iterator/result.json) | 400 | — | — | — |
| [032_cursor_for_mismatch_check](swagger/032_cursor_for_mismatch_check/result.json) | 200 | 1 | 1 | 3 |
| [033_reject_changed_iterator_limit](swagger/033_reject_changed_iterator_limit/result.json) | 400 | — | — | — |
| [034_feature_disabled](swagger/034_feature_disabled/result.json) | 403 | — | — | — |
| [035_license_disabled_optional_fields_omitted](swagger/035_license_disabled_optional_fields_omitted/result.json) | 200 | 1 | 1 | 1 |
| [036_restored_full_access](swagger/036_restored_full_access/result.json) | 200 | 1 | 1 | 1 |

Each scenario directory contains sanitized `result.json`, native parameter/control screenshots, and every response segment. Use the [PNG manifest](png-sha256.json) to find all response segments. Dark gray regions intentionally mask Swagger curl/authentication UI. The browser was closed after capture; see [browser cleanup](browser-cleanup.json).

## Limits

- This run verifies the local HTTP contract against a preserved account snapshot; it does not claim current NOC inventory, external login, or real appliance execution.
- The existing full-permission identity was reused. Feature gating and license-shaped omission were exercised in Swagger; individual permission combinations are covered by the automated tests in this PR rather than by new user/role fixtures in this run.
- All selected parents in this snapshot are volume owners. Remote-only backup availability cases remain covered by automated tests.
- The read-only feed creates ordinary iterator/cache entries. Source account records were unchanged; no filer commands, uploads, deletes, or other resource mutations were sent.
