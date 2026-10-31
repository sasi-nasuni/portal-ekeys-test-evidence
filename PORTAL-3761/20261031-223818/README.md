# PORTAL-3761 — grouped appliance encryption-key Swagger evidence

Endpoint: **GET `/edges/encryption-keys`**. Application commit: **`0b2ab3df90bcfce281f59460cdd5b85a85848e80`**. PR: [nasuni/portal #3052](https://github.com/nasuni/portal/pull/3052).

Run directory uses UTC: `20261031-223818`. Started: 2026-10-31T22:41:28.632933+00:00. Finished: 2026-10-31T22:56:00.517921+00:00.

**95 of 95 post-repair scenarios passed; 0 failed.** 1169 PNG screenshots are hashed in [png-sha256.json](png-sha256.json). Every requested query value was checked against its actual HTTP Request URL; every displayed response was checked against the actual network response.

[Final summary](summary.final.json), [complete verified results](verified-results.json), and [runtime details](environment.json) record the run.

The run produced 96 post-repair endpoint HTTP requests for these unique scenarios, plus 5 retained control-only attempts that stopped before HTTP. The initial HTTP 500 described below preceded the schema repair.

## Execution and controls

Every endpoint request in this report originated from the served Swagger UI's native **Try it out / Execute** button at `http://127.0.0.1:8000/docs`. The test driver used the served OpenAPI response to locate the operation and filled its native controls. Explicit malformed inputs used Swagger's request interceptor, labeled in each scenario; response bodies were never intercepted or replaced.

The API, PostgreSQL, Redis, stored IAM roles and permission lookups were real local services. Three dedicated synthetic accounts were created. Local access JWTs were minted for persisted fixture users using the running API's signing configuration, passed only in memory, and never saved. This does not test external login or token refresh.

Feature flags and escrow licensing were controlled only in those fixture accounts' Redis cache entries with a 7,200-second TTL, refreshed during the run. This does not verify live PostHog/NOC entitlements. The route handler, service, repository and task projections were production code, without HTTP-response stubs.

## Verified behavior

- All eight combinations of backup, escrow and passphrase View permissions, with licensing enabled and disabled (16 cases); omitted fields and independently omitted readiness metrics; `dr_counts: {}` when no metric is visible; authorized zero counts remain present.
- Required permission, feature flag, missing/malformed/expired/wrong-audience authentication; restricted filters require their matching access. License denial applies to escrow/passphrase filters.
- Exact tenant-scoped appliance and key membership, stub-appliance exclusion, owner/remote-only/no-volume roles, empty groups, and Strider inclusion. A foreign tenant task uses an exact tenant-A resource ID to check task isolation.
- Complete children: the owner has 29 keys, returned with an appliance limit of one. Uploaded stubs remain visible with task status, but are excluded from `not_escrowed`. Generated keys are also excluded from that count.
- Parent search matches appliance name, key name or fingerprint without narrowing children. Percent, underscore and backslash searches are literal. Hidden backups cannot select parents through search.
- Repeated filter values use OR; different child predicates must match the same key and remove unmatched parents before pagination. Disabled associations still count as key use.
- Assigned backup summaries are independent of child filtering. Backup presence selects remote-only appliances. Account readiness totals remain independent of search, filters, and pages.
- Pending and failed task statuses, acknowledged/completed-task exclusion, gated escrow/passphrase tasks, and management-permission-dependent acknowledgement capabilities. No acknowledgement action was executed.
- Ascending/descending name ordering with UUID ties, absolute page jumps, cursor continuation/backwards navigation, normalized repeated sets, tenant/parameter/visibility mismatch rejection, missing/consumed iterators, and input validation.
- Dynamic pagination: inserting one parent before and another after the saved boundary changes total_items from seven to nine; continuation preserves the saved name/ID boundary and skips the earlier insertion. There is no creation-time cutoff for edges.

The detailed [scenario index](#scenario-index) links every complete response and all screenshot segments. [Actual PostgreSQL snapshot](database-snapshot.json) , [final database check before cleanup](database-final-before-cleanup.json), and [rendered readiness result](database-readiness.png) provide supporting database evidence. The database image is rendered from actual SQL results, **not** a pgAdmin or Swagger screenshot.

## Startup findings and retained failed attempt

1. `make run` initially failed because `portal-encr-keys-4-db-1` occupied port 5432. The user authorized stopping that earlier test database; its data was preserved.
2. Migration services could start before PostgreSQL existed on the Compose network. The local [Compose change](startup-compose.diff) adds a healthy-database dependency to both migration services. It remains optional for the existing backend-only profile, which uses separately started resources. Both full-stack and backend-only Compose configurations validate. Both migrations then exited successfully, and the API served Swagger.
3. The first authenticated Swagger request returned HTTP 500 because local `tasks.params` was absent. The database recorded Alembic head `f3c9a1e7b2d4` even though both `tasks.params` and `volume_connections.volume_ref_id` from `e1a7c3f9b2d6` were missing. The existing additive migration's upgrade was replayed locally after verifying both columns absent; [schema-repair.json](schema-repair.json) records verification. No application query workaround was added. This repair changes the local test database, not the endpoint source.

The [initial failed response](initial-smoke-result.json) and [native Swagger screenshot](initial-smoke/initial_full_read_response.png) are retained. That precondition failure is separate from the post-repair scenario count above.

The tested endpoint source matches the application commit above. `docker-compose.yml` has the local startup change recorded in the diff; it is uncommitted. The API imported this checkout's mounted `/app/libs` and `/app/portal-webapi` sources.

## Retained test-harness corrections

The first [tenant-B attempt](swagger/026_foreign_tenant_isolation/result.json) returned HTTP 200 with the correct remote-only role and counts, but failed an incorrect fixture expectation that declared no volume role. The saved SQL snapshot already showed its remote mount. [Correction details](verification-repeat/correction.json) and the passing [native Swagger rerun](verification-repeat/swagger/001_foreign_tenant_isolation/README.md) are retained. No application or database changes were needed for this correction.

The reused driver also assumed enum dropdowns were single-select, but the served Swagger controls use `SELECT multiple=true`. These multi-value attempts stopped before HTTP. [Multi-select correction](multiselect-repeat/correction.json) records the change to native `selectOption(values)` and the passing reruns. The result table counts unique scenarios after corrections; all original attempts and captures remain available in their scenario directories.

- [swagger/026_foreign_tenant_isolation/README.md](swagger/026_foreign_tenant_isolation/README.md)
- [swagger/037_both_types/README.md](swagger/037_both_types/README.md)
- [swagger/040_both_states/README.md](swagger/040_both_states/README.md)
- [swagger/043_both_origins/README.md](swagger/043_both_origins/README.md)
- [swagger/052_both_backup_presence_states/README.md](swagger/052_both_backup_presence_states/README.md)
- [swagger/091_normalized_cursor_first/README.md](swagger/091_normalized_cursor_first/README.md)

## Limits and cleanup

- Read endpoint only: no appliance write, dispatch, real-filer completion, external login, external entitlement, performance benchmark, or new full automated-suite coverage is claimed.
- The event poller exited because no local SQS queues were configured. AWS secret lookup reported invalid local credentials and PostHog had no API key during startup; neither provided the controlled test entitlements. Normal API startup/lifespan was retained.
- This database had the schema drift described above. No database was dropped or truncated. A pre-existing temporary database was left untouched.
- User-approved cleanup removed only the three named fixture accounts and their cascading records, then removed their Redis cache entries. [cleanup-verification.json](cleanup-verification.json) confirms zero remaining scoped rows and cache entries. The [owned browser closed normally](browser-cleanup.json). Application services remain running.
- [Artifact verification](artifact-verification.json) checks complete actual queries, JSON assertions, customer-facing task fields, PNG signatures/dimensions and hashes. Text-secret scanning and selected visual mask checks are recorded separately. Those checks do not guarantee detection of every possible secret pattern.

## Scenario index

| # | Native Swagger scenario | HTTP | Result |
| --- | --- | --- | --- |
| 001 | [full_default](swagger/001_full_default/README.md) | 200 | PASS |
| 002 | [one_parent_complete_children](swagger/002_one_parent_complete_children/README.md) | 200 | PASS |
| 003 | [permission_matrix_0_license_True](swagger/003_permission_matrix_0_license_True/README.md) | 200 | PASS |
| 004 | [permission_matrix_0_license_False](swagger/004_permission_matrix_0_license_False/README.md) | 200 | PASS |
| 005 | [permission_matrix_1_license_True](swagger/005_permission_matrix_1_license_True/README.md) | 200 | PASS |
| 006 | [permission_matrix_1_license_False](swagger/006_permission_matrix_1_license_False/README.md) | 200 | PASS |
| 007 | [permission_matrix_2_license_True](swagger/007_permission_matrix_2_license_True/README.md) | 200 | PASS |
| 008 | [permission_matrix_2_license_False](swagger/008_permission_matrix_2_license_False/README.md) | 200 | PASS |
| 009 | [permission_matrix_3_license_True](swagger/009_permission_matrix_3_license_True/README.md) | 200 | PASS |
| 010 | [permission_matrix_3_license_False](swagger/010_permission_matrix_3_license_False/README.md) | 200 | PASS |
| 011 | [permission_matrix_4_license_True](swagger/011_permission_matrix_4_license_True/README.md) | 200 | PASS |
| 012 | [permission_matrix_4_license_False](swagger/012_permission_matrix_4_license_False/README.md) | 200 | PASS |
| 013 | [permission_matrix_5_license_True](swagger/013_permission_matrix_5_license_True/README.md) | 200 | PASS |
| 014 | [permission_matrix_5_license_False](swagger/014_permission_matrix_5_license_False/README.md) | 200 | PASS |
| 015 | [permission_matrix_6_license_True](swagger/015_permission_matrix_6_license_True/README.md) | 200 | PASS |
| 016 | [permission_matrix_6_license_False](swagger/016_permission_matrix_6_license_False/README.md) | 200 | PASS |
| 017 | [permission_matrix_7_license_True](swagger/017_permission_matrix_7_license_True/README.md) | 200 | PASS |
| 018 | [permission_matrix_7_license_False](swagger/018_permission_matrix_7_license_False/README.md) | 200 | PASS |
| 019 | [no_auth](swagger/019_no_auth/README.md) | 401 | PASS |
| 020 | [malformed_token](swagger/020_malformed_token/README.md) | 401 | PASS |
| 021 | [expired_token](swagger/021_expired_token/README.md) | 401 | PASS |
| 022 | [wrong_audience](swagger/022_wrong_audience/README.md) | 401 | PASS |
| 023 | [no_view_permission](swagger/023_no_view_permission/README.md) | 403 | PASS |
| 024 | [feature_disabled](swagger/024_feature_disabled/README.md) | 403 | PASS |
| 025 | [empty_tenant_authorized_zero_counts](swagger/025_empty_tenant_authorized_zero_counts/README.md) | 200 | PASS |
| 026 | [foreign_tenant_isolation](verification-repeat/swagger/001_foreign_tenant_isolation/README.md) | 200 | PASS |
| 027 | [foreign_appliance_id](swagger/027_foreign_appliance_id/README.md) | 200 | PASS |
| 028 | [by_parent_name](swagger/028_by_parent_name/README.md) | 200 | PASS |
| 029 | [by_key_name_preserves_all_children](swagger/029_by_key_name_preserves_all_children/README.md) | 200 | PASS |
| 030 | [by_fingerprint](swagger/030_by_fingerprint/README.md) | 200 | PASS |
| 031 | [literal_search](swagger/031_literal_search/README.md) | 200 | PASS |
| 032 | [wildcards_are_literal](swagger/032_wildcards_are_literal/README.md) | 200 | PASS |
| 033 | [hidden_backup_search](swagger/033_hidden_backup_search/README.md) | 200 | PASS |
| 034 | [no_match](swagger/034_no_match/README.md) | 200 | PASS |
| 035 | [volume_keys](swagger/035_volume_keys/README.md) | 200 | PASS |
| 036 | [backup_keys](swagger/036_backup_keys/README.md) | 200 | PASS |
| 037 | [both_types](multiselect-repeat/swagger/001_both_types/README.md) | 200 | PASS |
| 038 | [in_use_includes_disabled](swagger/038_in_use_includes_disabled/README.md) | 200 | PASS |
| 039 | [unused](swagger/039_unused/README.md) | 200 | PASS |
| 040 | [both_states](multiselect-repeat/swagger/002_both_states/README.md) | 200 | PASS |
| 041 | [uploaded](swagger/041_uploaded/README.md) | 200 | PASS |
| 042 | [generated](swagger/042_generated/README.md) | 200 | PASS |
| 043 | [both_origins](multiselect-repeat/swagger/003_both_origins/README.md) | 200 | PASS |
| 044 | [escrowed](swagger/044_escrowed/README.md) | 200 | PASS |
| 045 | [not_escrowed](swagger/045_not_escrowed/README.md) | 200 | PASS |
| 046 | [both_escrow_states](swagger/046_both_escrow_states/README.md) | 200 | PASS |
| 047 | [passphrase_present](swagger/047_passphrase_present/README.md) | 200 | PASS |
| 048 | [passphrase_missing](swagger/048_passphrase_missing/README.md) | 200 | PASS |
| 049 | [both_passphrase_states](swagger/049_both_passphrase_states/README.md) | 200 | PASS |
| 050 | [remote_backup_present](swagger/050_remote_backup_present/README.md) | 200 | PASS |
| 051 | [remote_backup_missing_includes_strider](swagger/051_remote_backup_missing_includes_strider/README.md) | 200 | PASS |
| 052 | [both_backup_presence_states](multiselect-repeat/swagger/004_both_backup_presence_states/README.md) | 200 | PASS |
| 053 | [same_key_AND](swagger/053_same_key_AND/README.md) | 200 | PASS |
| 054 | [backup_summary_ignores_child_filter](swagger/054_backup_summary_ignores_child_filter/README.md) | 200 | PASS |
| 055 | [backup_summary_not_matching_origin](swagger/055_backup_summary_not_matching_origin/README.md) | 200 | PASS |
| 056 | [search_parent_AND_child](swagger/056_search_parent_AND_child/README.md) | 200 | PASS |
| 057 | [repeated_parent_ids](swagger/057_repeated_parent_ids/README.md) | 200 | PASS |
| 058 | [hidden_backup_search_excluded](swagger/058_hidden_backup_search_excluded/README.md) | 200 | PASS |
| 059 | [forbidden_backup_type](swagger/059_forbidden_backup_type/README.md) | 403 | PASS |
| 060 | [forbidden_backup_presence](swagger/060_forbidden_backup_presence/README.md) | 403 | PASS |
| 061 | [forbidden_escrow](swagger/061_forbidden_escrow/README.md) | 403 | PASS |
| 062 | [forbidden_passphrase](swagger/062_forbidden_passphrase/README.md) | 403 | PASS |
| 063 | [unlicensed_filter_escrow](swagger/063_unlicensed_filter_escrow/README.md) | 403 | PASS |
| 064 | [unlicensed_filter_passphrase](swagger/064_unlicensed_filter_passphrase/README.md) | 403 | PASS |
| 065 | [limit_zero](swagger/065_limit_zero/README.md) | 422 | PASS |
| 066 | [limit_over_max](swagger/066_limit_over_max/README.md) | 422 | PASS |
| 067 | [page_zero](swagger/067_page_zero/README.md) | 422 | PASS |
| 068 | [page_not_number](swagger/068_page_not_number/README.md) | 422 | PASS |
| 069 | [unknown_query](swagger/069_unknown_query/README.md) | 422 | PASS |
| 070 | [bad_appliance_uuid](swagger/070_bad_appliance_uuid/README.md) | 422 | PASS |
| 071 | [bad_iterator_uuid](swagger/071_bad_iterator_uuid/README.md) | 422 | PASS |
| 072 | [bad_type](swagger/072_bad_type/README.md) | 422 | PASS |
| 073 | [bad_state](swagger/073_bad_state/README.md) | 422 | PASS |
| 074 | [bad_origin](swagger/074_bad_origin/README.md) | 422 | PASS |
| 075 | [bad_boolean](swagger/075_bad_boolean/README.md) | 422 | PASS |
| 076 | [bad_sort_by](swagger/076_bad_sort_by/README.md) | 422 | PASS |
| 077 | [bad_sort_direction](swagger/077_bad_sort_direction/README.md) | 422 | PASS |
| 078 | [bad_backup_presence](swagger/078_bad_backup_presence/README.md) | 422 | PASS |
| 079 | [missing_iterator](swagger/079_missing_iterator/README.md) | 400 | PASS |
| 080 | [sort_descending](swagger/080_sort_descending/README.md) | 200 | PASS |
| 081 | [absolute_page_jump](swagger/081_absolute_page_jump/README.md) | 200 | PASS |
| 082 | [beyond_last_page](swagger/082_beyond_last_page/README.md) | 200 | PASS |
| 083 | [cursor_first](swagger/083_cursor_first/README.md) | 200 | PASS |
| 084 | [cursor_tenant_isolation](swagger/084_cursor_tenant_isolation/README.md) | 400 | PASS |
| 085 | [cursor_filter_mismatch](swagger/085_cursor_filter_mismatch/README.md) | 400 | PASS |
| 086 | [cursor_limit_mismatch](swagger/086_cursor_limit_mismatch/README.md) | 400 | PASS |
| 087 | [cursor_backup_visibility_mismatch](swagger/087_cursor_backup_visibility_mismatch/README.md) | 400 | PASS |
| 088 | [cursor_continuation](swagger/088_cursor_continuation/README.md) | 200 | PASS |
| 089 | [consumed_cursor](swagger/089_consumed_cursor/README.md) | 400 | PASS |
| 090 | [cursor_backwards](swagger/090_cursor_backwards/README.md) | 200 | PASS |
| 091 | [normalized_cursor_first](multiselect-repeat/swagger/005_normalized_cursor_first/README.md) | 200 | PASS |
| 092 | [dynamic_before_insert](swagger/092_dynamic_before_insert/README.md) | 200 | PASS |
| 093 | [dynamic_recount_saved_boundary](swagger/093_dynamic_recount_saved_boundary/README.md) | 200 | PASS |
| 094 | [final_read_account_counts](swagger/094_final_read_account_counts/README.md) | 200 | PASS |
| 095 | [normalized_repeated_sets](multiselect-repeat/swagger/006_normalized_repeated_sets/README.md) | 200 | PASS |
