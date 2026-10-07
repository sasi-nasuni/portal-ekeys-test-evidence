# PORTAL-3184 — Get a single encryption key: Swagger evidence

**46 scenarios passed; 262 assertions passed; 46 actual Swagger screenshots.**

Portal PR: [nasuni/portal#2836](https://github.com/nasuni/portal/pull/2836). Tested revision: `b57776e90a7fb2b532009aab71332d5c5bf93aa9`. Captured **2026-10-08, 02:25:40–02:28:11 IST** against the running local API. The recorded revision matches Portal HEAD and the PR head during capture; no application source changed during testing.

Requests for `GET /encryption-keys/{key_id}` were sent through Swagger UI **Try it out / Execute** and compared with the displayed live server response. Each screenshot includes the operation, key ID, request URL, HTTP status, response body and headers. Long response bodies were expanded before capture. Authorization credentials are redacted in screenshots and JSON. All test accounts, users, appliances, keys, volumes, associations and tasks are synthetic.

## Coverage

- Authentication: missing, malformed, invalid-signature, expired and wrong-audience tokens; unknown users.
- Access controls: feature flag and base permission; identical 404 responses for unknown keys, another tenant’s keys and backup keys hidden by permission.
- Data and visibility: complete metadata; backup access; permission/license combinations; null/stub fields; used/unused keys; enabled/disabled associations; deterministic volume ordering; same fingerprint on separate appliances.
- Task behavior: independent key and association states; all six supported actions; pending/failed/creating/synced precedence; safe error projection; completion/dismissal; deterministic ordering; action/resource/tenant/ID isolation.
- Read-only behavior: before/after fixture-row hashes and message counts matched for every GET. No appliance commands were queued.

| HTTP response | Passing scenarios |
| --- | ---: |
| 200 | 33 |
| 401 | 6 |
| 403 | 3 |
| 404 | 3 |
| 422 | 1 |

Case 10 uses Swagger’s native `specActions.execute` with operation metadata because its form rejects a malformed UUID before sending. This bypasses only the browser’s UUID validation; the request reached the real endpoint and returned the displayed server-side **422**. The result and manifest flag this mechanism.

[Machine-readable results](results.json) · [Screenshot SHA-256 manifest](screenshot-manifest.json) · [Cleanup verification](cleanup-verification.json) · [HTML gallery](index.html) (download this directory and open locally)

## Environment and cleanup

The running API used real PostgreSQL/IAM/tenant sessions and Redis. Dedicated account cache entries controlled feature flags and licenses; live NOC/PostHog entitlement retrieval was not tested. Before testing, the local database’s skipped upstream migration `b7d4e2f9a1c6` was applied and the normal upgrade-to-head completed. No migration source or endpoint code was changed for the run.

Temporary fixtures were removed, with zero remaining rows across eleven checked tables and zero fixture cache entries for both capture runs. Swagger authentication was cleared and the isolated browser context closed. Existing repository edits were preserved.

Forced **408/429/500** infrastructure failures, live appliance dispatch, real key material and production-scale query performance were outside this run.

## Scenario screenshots

Only the validated final screenshots and results are published. Earlier capture-driver preparation failures are excluded; case 10’s successful separate capture is identified by its source run.

| # | Scenario | HTTP | Screenshot | Result |
| ---: | --- | ---: | --- | --- |
| 001 | Missing bearer | 401 | [View](001_missing_bearer/01_401_missing-bearer.png) | [PASS](001_missing_bearer/result.json) |
| 002 | Malformed bearer | 401 | [View](002_malformed_bearer/02_401_malformed-bearer.png) | [PASS](002_malformed_bearer/result.json) |
| 003 | Invalid signature | 401 | [View](003_invalid_signature/03_401_invalid-signature.png) | [PASS](003_invalid_signature/result.json) |
| 004 | Expired bearer | 401 | [View](004_expired_bearer/04_401_expired-bearer.png) | [PASS](004_expired_bearer/result.json) |
| 005 | Wrong token audience | 401 | [View](005_wrong_token_audience/05_401_wrong-token-audience.png) | [PASS](005_wrong_token_audience/result.json) |
| 006 | Unknown user | 401 | [View](006_unknown_user/06_401_unknown-user.png) | [PASS](006_unknown_user/result.json) |
| 007 | Missing base permission | 403 | [View](007_missing_base_permission/07_403_missing-base-permission.png) | [PASS](007_missing_base_permission/result.json) |
| 008 | Backup/escrow permissions do not replace base permission | 403 | [View](008_backup_escrow_permissions_do_not_replace_base_permission/08_403_backup-escrow-permissions-do-not-replace-base-permission.png) | [PASS](008_backup_escrow_permissions_do_not_replace_base_permission/result.json) |
| 009 | Feature flag disabled | 403 | [View](009_feature_flag_disabled/09_403_feature-flag-disabled.png) | [PASS](009_feature_flag_disabled/result.json) |
| 010 | Malformed key UUID | 422 | [View](010_malformed_key_uuid/10_422_malformed-key-uuid.png) | [PASS](010_malformed_key_uuid/result.json) |
| 011 | Unknown key UUID | 404 | [View](011_unknown_key_uuid/11_404_unknown-key-uuid.png) | [PASS](011_unknown_key_uuid/result.json) |
| 012 | Other tenant key hidden | 404 | [View](012_other_tenant_key_hidden/12_404_other-tenant-key-hidden.png) | [PASS](012_other_tenant_key_hidden/result.json) |
| 013 | Backup key hidden without permission | 404 | [View](013_backup_key_hidden_without_permission/13_404_backup-key-hidden-without-permission.png) | [PASS](013_backup_key_hidden_without_permission/result.json) |
| 014 | Full metadata, sorted mixed associations, offline old appliance readable | 200 | [View](014_full_metadata_sorted_mixed_associations_offline_old_appliance_readable/14_200_full-metadata-sorted-mixed-associations-offline-old-appliance-readable.png) | [PASS](014_full_metadata_sorted_mixed_associations_offline_old_appliance_readable/result.json) |
| 015 | Backup key visible with permission | 200 | [View](015_backup_key_visible_with_permission/15_200_backup-key-visible-with-permission.png) | [PASS](015_backup_key_visible_with_permission/result.json) |
| 016 | Unused uploaded ElGamal key and false escrow flag | 200 | [View](016_unused_uploaded_elgamal_key_and_false_escrow_flag/16_200_unused-uploaded-elgamal-key-and-false-escrow-flag.png) | [PASS](016_unused_uploaded_elgamal_key_and_false_escrow_flag/result.json) |
| 017 | Disabled-only association still means used | 200 | [View](017_disabled_only_association_still_means_used/17_200_disabled-only-association-still-means-used.png) | [PASS](017_disabled_only_association_still_means_used/result.json) |
| 018 | Same fingerprint on second appliance stays isolated | 200 | [View](018_same_fingerprint_on_second_appliance_stays_isolated/18_200_same-fingerprint-on-second-appliance-stays-isolated.png) | [PASS](018_same_fingerprint_on_second_appliance_stays_isolated/result.json) |
| 019 | Upload stub retains null metadata and creating status | 200 | [View](019_upload_stub_retains_null_metadata_and_creating_status/19_200_upload-stub-retains-null-metadata-and-creating-status.png) | [PASS](019_upload_stub_retains_null_metadata_and_creating_status/result.json) |
| 020 | Non-stub key supports unknown algorithm/length | 200 | [View](020_non_stub_key_supports_unknown_algorithm_length/20_200_non-stub-key-supports-unknown-algorithm-length.png) | [PASS](020_non_stub_key_supports_unknown_algorithm_length/result.json) |
| 021 | Field visibility: full, escrow license True | 200 | [View](021_field_visibility_full_escrow_license_true/21_200_field-visibility-full-escrow-license-true.png) | [PASS](021_field_visibility_full_escrow_license_true/result.json) |
| 022 | Field visibility: base, escrow license True | 200 | [View](022_field_visibility_base_escrow_license_true/22_200_field-visibility-base-escrow-license-true.png) | [PASS](022_field_visibility_base_escrow_license_true/result.json) |
| 023 | Field visibility: base_backup, escrow license True | 200 | [View](023_field_visibility_base_backup_escrow_license_true/23_200_field-visibility-base-backup-escrow-license-true.png) | [PASS](023_field_visibility_base_backup_escrow_license_true/result.json) |
| 024 | Field visibility: base_escrow, escrow license True | 200 | [View](024_field_visibility_base_escrow_escrow_license_true/24_200_field-visibility-base-escrow-escrow-license-true.png) | [PASS](024_field_visibility_base_escrow_escrow_license_true/result.json) |
| 025 | Field visibility: full, escrow license False | 200 | [View](025_field_visibility_full_escrow_license_false/25_200_field-visibility-full-escrow-license-false.png) | [PASS](025_field_visibility_full_escrow_license_false/result.json) |
| 026 | Field visibility: base, escrow license False | 200 | [View](026_field_visibility_base_escrow_license_false/26_200_field-visibility-base-escrow-license-false.png) | [PASS](026_field_visibility_base_escrow_license_false/result.json) |
| 027 | Field visibility: base_backup, escrow license False | 200 | [View](027_field_visibility_base_backup_escrow_license_false/27_200_field-visibility-base-backup-escrow-license-false.png) | [PASS](027_field_visibility_base_backup_escrow_license_false/result.json) |
| 028 | Field visibility: base_escrow, escrow license False | 200 | [View](028_field_visibility_base_escrow_escrow_license_false/28_200_field-visibility-base-escrow-escrow-license-false.png) | [PASS](028_field_visibility_base_escrow_escrow_license_false/result.json) |
| 029 | Key failed while volume association pending | 200 | [View](029_key_failed_while_volume_association_pending/29_200_key-failed-while-volume-association-pending.png) | [PASS](029_key_failed_while_volume_association_pending/result.json) |
| 030 | Uncurated failed task keeps null error message | 200 | [View](030_uncurated_failed_task_keeps_null_error_message/30_200_uncurated-failed-task-keeps-null-error-message.png) | [PASS](030_uncurated_failed_task_keeps_null_error_message/result.json) |
| 031 | In-progress wins over failure; association stays independently failed | 200 | [View](031_in_progress_wins_over_failure_association_stays_independently_failed/31_200_in-progress-wins-over-failure-association-stays-independently-failed.png) | [PASS](031_in_progress_wins_over_failure_association_stays_independently_failed/result.json) |
| 032 | Task scopes exclude completed, dismissed, wrong action/resource/tenant/ID | 200 | [View](032_task_scopes_exclude_completed_dismissed_wrong_action_resource_tenant_id/32_200_task-scopes-exclude-completed-dismissed-wrong-action-resource-tenant-id.png) | [PASS](032_task_scopes_exclude_completed_dismissed_wrong_action_resource_tenant_id/result.json) |
| 033 | Equal task timestamps use deterministic UUID ordering | 200 | [View](033_equal_task_timestamps_use_deterministic_uuid_ordering/33_200_equal-task-timestamps-use-deterministic-uuid-ordering.png) | [PASS](033_equal_task_timestamps_use_deterministic_uuid_ordering/result.json) |
| 034 | Completion and dismissal immediately return resources to synced | 200 | [View](034_completion_and_dismissal_immediately_return_resources_to_synced/34_200_completion-and-dismissal-immediately-return-resources-to-synced.png) | [PASS](034_completion_and_dismissal_immediately_return_resources_to_synced/result.json) |
| 035 | Failed upload stub | 200 | [View](035_failed_upload_stub/35_200_failed-upload-stub.png) | [PASS](035_failed_upload_stub/result.json) |
| 036 | In-progress upload stub wins over failed task | 200 | [View](036_in_progress_upload_stub_wins_over_failed_task/36_200_in-progress-upload-stub-wins-over-failed-task.png) | [PASS](036_in_progress_upload_stub_wins_over_failed_task/result.json) |
| 037 | Stub remains creating after inactive tasks excluded | 200 | [View](037_stub_remains_creating_after_inactive_tasks_excluded/37_200_stub-remains-creating-after-inactive-tasks-excluded.png) | [PASS](037_stub_remains_creating_after_inactive_tasks_excluded/result.json) |
| 038 | Association stub independently creating | 200 | [View](038_association_stub_independently_creating/38_200_association-stub-independently-creating.png) | [PASS](038_association_stub_independently_creating/result.json) |
| 039 | Association stub failed | 200 | [View](039_association_stub_failed/39_200_association-stub-failed.png) | [PASS](039_association_stub_failed/result.json) |
| 040 | Association stub in-progress wins over failure | 200 | [View](040_association_stub_in_progress_wins_over_failure/40_200_association-stub-in-progress-wins-over-failure.png) | [PASS](040_association_stub_in_progress_wins_over_failure/result.json) |
| 041 | Key action supported: upload_encryption_key | 200 | [View](041_key_action_supported_upload_encryption_key/41_200_key-action-supported-upload-encryption-key.png) | [PASS](041_key_action_supported_upload_encryption_key/result.json) |
| 042 | Key action supported: escrow_encryption_key | 200 | [View](042_key_action_supported_escrow_encryption_key/42_200_key-action-supported-escrow-encryption-key.png) | [PASS](042_key_action_supported_escrow_encryption_key/result.json) |
| 043 | Key action supported: delete_encryption_key | 200 | [View](043_key_action_supported_delete_encryption_key/43_200_key-action-supported-delete-encryption-key.png) | [PASS](043_key_action_supported_delete_encryption_key/result.json) |
| 044 | Association action supported: add_volume_encryption_keys | 200 | [View](044_association_action_supported_add_volume_encryption_keys/44_200_association-action-supported-add-volume-encryption-keys.png) | [PASS](044_association_action_supported_add_volume_encryption_keys/result.json) |
| 045 | Association action supported: enable_volume_encryption_keys | 200 | [View](045_association_action_supported_enable_volume_encryption_keys/45_200_association-action-supported-enable-volume-encryption-keys.png) | [PASS](045_association_action_supported_enable_volume_encryption_keys/result.json) |
| 046 | Association action supported: disable_volume_encryption_keys | 200 | [View](046_association_action_supported_disable_volume_encryption_keys/46_200_association-action-supported-disable-volume-encryption-keys.png) | [PASS](046_association_action_supported_disable_volume_encryption_keys/result.json) |
