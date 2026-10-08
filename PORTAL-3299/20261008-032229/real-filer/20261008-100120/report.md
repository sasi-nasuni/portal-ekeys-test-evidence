# PORTAL-3299 Real-Filer Completion

All six remaining write flows passed against the approved POC filer. **24 native Swagger requests passed; all 9 real tasks and their steps completed.** This includes passphrase restoration and two cleanup deletes. Eight expected mutation audit entries match the test actor.

| Flow | Result | Evidence |
|---|---|---|
| Download | PASS; 2 generated keys in manifest | [Task and artifact](download/flow-result.json) |
| Passphrase | PASS; original restored | [Change and restoration](passphrase/flow-result.json) |
| Bulk escrow | PASS; task plus ordered rejection | [Result](escrow-delete/escrow-flow-result.json) |
| Delete | PASS; absent from filer and Portal | [Result](escrow-delete/delete-flow-result.json) |
| Disable | PASS; baseline remained enabled | [Result](volume-operations/disable-flow-result.json) |
| Enable | PASS; both keys enabled | [Result](volume-operations/enable-flow-result.json) |

[Scenario gallery](index.html) | [Verified scenarios](verified-scenarios.json) | [Task/step/message rows](all-task-evidence.json) | [Audit](activity-audit.json)

## Controls

- Temporarily lowered source minimum from 10.6 to 10.5 for the approved POC filer; now restored
- Local account/user/permissions and license/feature cache; not real IdP or entitlement validation
- Readiness timestamp from a successful SSH probe; normal heartbeat ingestion not validated
- Genuine filer key/volume metadata bootstrapped into local PostgreSQL; legacy routes used only for fixture setup/volume cleanup
- Temporary API with lifespan disabled and guarded SQS worker invoking production response handlers; no synthetic completion events

## Cleanup

Original passphrase restored. The 58-key and two-volume baseline is unchanged; disposable fingerprints are absent from all four private keyrings. The disposable volume is absent from active/disabled inventory. No local fixture rows or new account cache entries remain. Both temporary processes, two queues and four subscriptions are gone; port 18000 is free. The source minimum is restored to 10.6 and unrelated workspace changes are preserved.

[Filer cleanup](filer-cleanup.json) | [Private keyrings](private-keyring-cleanup.json) | [Local cleanup](local-cleanup.json) | [Runtime cleanup](runtime-cleanup-verification.json) | [Version restoration](temporary-version-change.json)

## Limitations

- Public download status/content endpoint remains unimplemented (PORTAL-3190); verified generation and Redis ciphertext metadata only
- Independent NOC volume lookup returned 401; external NOC record removal was not independently confirmed
- Current filer inventory/private keyrings and current escrow refresh verified; historical NOC escrow activity or retained storage versions were not erased
- No production-scale query/load testing; no new CI run or evidence publication performed

## Prior Results

The earlier saved 284 local Swagger scenarios and 782 automated tests, including 201 PostgreSQL tests, are retained and were not rerun in this continuation. See [original run](../../report.md) and [automated commands/results](../../automated/summary.json).

## Setup Recovery

- Initial disposable key rejected because it lacked an encryption subkey; rejected fingerprint verified absent
- Initial volume creation rejected because legacy selector expects key name rather than fingerprint; no volume created by that attempt
- Runtime cleanup first check rejected expected SIGTERM exit -15; original result retained and actual absence verified

## Scenario Index

| Suite / scenario | Method and path | Expected | Actual | Evidence |
|---|---|---:|---:|---|
| download/download_generated_keys | `POST /edges/{appliance_id}/encryption-keys/downloads` | 202 | 202 | [JSON](download/001_download_generated_keys/result.json) [image 1](download/001_download_generated_keys/download_generated_keys_parameters_01.png) [image 2](download/001_download_generated_keys/download_generated_keys_response.png) |
| download/download_terminal | `GET /tasks/{task_id}` | 200 | 200 | [JSON](download/002_download_terminal/result.json) [image 1](download/002_download_terminal/download_terminal_parameters_01.png) [image 2](download/002_download_terminal/download_terminal_response.png) |
| passphrase/set_temporary_passphrase | `POST /edges/{appliance_id}/escrow-passphrase` | 202 | 202 | [JSON](passphrase/001_set_temporary_passphrase/result.json) [image 1](passphrase/001_set_temporary_passphrase/set_temporary_passphrase_parameters_01.png) [image 2](passphrase/001_set_temporary_passphrase/set_temporary_passphrase_response.png) |
| passphrase/set_temporary_passphrase_terminal | `GET /tasks/{task_id}` | 200 | 200 | [JSON](passphrase/002_set_temporary_passphrase_terminal/result.json) [image 1](passphrase/002_set_temporary_passphrase_terminal/set_temporary_passphrase_terminal_parameters_01.png) [image 2](passphrase/002_set_temporary_passphrase_terminal/set_temporary_passphrase_terminal_response.png) |
| passphrase/restore_original_passphrase | `POST /edges/{appliance_id}/escrow-passphrase` | 202 | 202 | [JSON](passphrase/003_restore_original_passphrase/result.json) [image 1](passphrase/003_restore_original_passphrase/restore_original_passphrase_parameters_01.png) [image 2](passphrase/003_restore_original_passphrase/restore_original_passphrase_response.png) |
| passphrase/restore_original_passphrase_terminal | `GET /tasks/{task_id}` | 200 | 200 | [JSON](passphrase/004_restore_original_passphrase_terminal/result.json) [image 1](passphrase/004_restore_original_passphrase_terminal/restore_original_passphrase_terminal_parameters_01.png) [image 2](passphrase/004_restore_original_passphrase_terminal/restore_original_passphrase_terminal_response.png) |
| escrow-delete/escrow_disposable_key | `POST /encryption-keys/escrow` | 202 | 202 | [JSON](escrow-delete/001_escrow_disposable_key/result.json) [image 1](escrow-delete/001_escrow_disposable_key/escrow_disposable_key_parameters_01.png) [image 2](escrow-delete/001_escrow_disposable_key/escrow_disposable_key_response.png) |
| escrow-delete/escrow_terminal | `GET /tasks/{task_id}` | 200 | 200 | [JSON](escrow-delete/002_escrow_terminal/result.json) [image 1](escrow-delete/002_escrow_terminal/escrow_terminal_parameters_01.png) [image 2](escrow-delete/002_escrow_terminal/escrow_terminal_response.png) |
| escrow-delete/escrow_key_readback | `GET /encryption-keys` | 200 | 200 | [JSON](escrow-delete/003_escrow_key_readback/result.json) [image 1](escrow-delete/003_escrow_key_readback/escrow_key_readback_parameters_01.png) [image 2](escrow-delete/003_escrow_key_readback/escrow_key_readback_parameters_02.png) [image 3](escrow-delete/003_escrow_key_readback/escrow_key_readback_response_01.png) [image 4](escrow-delete/003_escrow_key_readback/escrow_key_readback_response_02.png) |
| escrow-delete/delete_disposable_key | `DELETE /encryption-keys/{key_id}` | 202 | 202 | [JSON](escrow-delete/004_delete_disposable_key/result.json) [image 1](escrow-delete/004_delete_disposable_key/delete_disposable_key_parameters_01.png) [image 2](escrow-delete/004_delete_disposable_key/delete_disposable_key_response.png) |
| escrow-delete/delete_terminal | `GET /tasks/{task_id}` | 200 | 200 | [JSON](escrow-delete/005_delete_terminal/result.json) [image 1](escrow-delete/005_delete_terminal/delete_terminal_parameters_01.png) [image 2](escrow-delete/005_delete_terminal/delete_terminal_response.png) |
| escrow-delete/deleted_key_readback | `GET /encryption-keys` | 200 | 200 | [JSON](escrow-delete/006_deleted_key_readback/result.json) [image 1](escrow-delete/006_deleted_key_readback/deleted_key_readback_parameters_01.png) [image 2](escrow-delete/006_deleted_key_readback/deleted_key_readback_parameters_02.png) [image 3](escrow-delete/006_deleted_key_readback/deleted_key_readback_response.png) |
| volume-operations/disable_secondary_key | `POST /volumes/{volume_id}/encryption-keys/{key_id}/disable` | 202 | 202 | [JSON](volume-operations/001_disable_secondary_key/result.json) [image 1](volume-operations/001_disable_secondary_key/disable_secondary_key_parameters_01.png) [image 2](volume-operations/001_disable_secondary_key/disable_secondary_key_response.png) |
| volume-operations/disable_terminal | `GET /tasks/{task_id}` | 200 | 200 | [JSON](volume-operations/002_disable_terminal/result.json) [image 1](volume-operations/002_disable_terminal/disable_terminal_parameters_01.png) [image 2](volume-operations/002_disable_terminal/disable_terminal_response.png) |
| volume-operations/disable_volume_readback | `GET /volumes/{volume_id}/encryption-keys` | 200 | 200 | [JSON](volume-operations/003_disable_volume_readback/result.json) [image 1](volume-operations/003_disable_volume_readback/disable_volume_readback_parameters_01.png) [image 2](volume-operations/003_disable_volume_readback/disable_volume_readback_response.png) |
| volume-operations/enable_secondary_key | `POST /volumes/{volume_id}/encryption-keys/{key_id}/enable` | 202 | 202 | [JSON](volume-operations/004_enable_secondary_key/result.json) [image 1](volume-operations/004_enable_secondary_key/enable_secondary_key_parameters_01.png) [image 2](volume-operations/004_enable_secondary_key/enable_secondary_key_response.png) |
| volume-operations/enable_terminal | `GET /tasks/{task_id}` | 200 | 200 | [JSON](volume-operations/005_enable_terminal/result.json) [image 1](volume-operations/005_enable_terminal/enable_terminal_parameters_01.png) [image 2](volume-operations/005_enable_terminal/enable_terminal_response.png) |
| volume-operations/enable_volume_readback | `GET /volumes/{volume_id}/encryption-keys` | 200 | 200 | [JSON](volume-operations/006_enable_volume_readback/result.json) [image 1](volume-operations/006_enable_volume_readback/enable_volume_readback_parameters_01.png) [image 2](volume-operations/006_enable_volume_readback/enable_volume_readback_response.png) |
| real-reads/real_fixture_key_list | `GET /encryption-keys` | 200 | 200 | [JSON](real-reads/001_real_fixture_key_list/result.json) [image 1](real-reads/001_real_fixture_key_list/real_fixture_key_list_parameters_01.png) [image 2](real-reads/001_real_fixture_key_list/real_fixture_key_list_parameters_02.png) [image 3](real-reads/001_real_fixture_key_list/real_fixture_key_list_response_01.png) [image 4](real-reads/001_real_fixture_key_list/real_fixture_key_list_response_02.png) [image 5](real-reads/001_real_fixture_key_list/real_fixture_key_list_response_03.png) |
| real-reads/real_appliance_summary | `GET /edges/{appliance_id}/encryption-keys/summary` | 200 | 200 | [JSON](real-reads/002_real_appliance_summary/result.json) [image 1](real-reads/002_real_appliance_summary/real_appliance_summary_parameters_01.png) [image 2](real-reads/002_real_appliance_summary/real_appliance_summary_response.png) |
| key-cleanup/delete_volume-base | `DELETE /encryption-keys/{key_id}` | 202 | 202 | [JSON](key-cleanup/001_delete_volume-base/result.json) [image 1](key-cleanup/001_delete_volume-base/delete_volume-base_parameters_01.png) [image 2](key-cleanup/001_delete_volume-base/delete_volume-base_response.png) |
| key-cleanup/volume-base_terminal | `GET /tasks/{task_id}` | 200 | 200 | [JSON](key-cleanup/002_volume-base_terminal/result.json) [image 1](key-cleanup/002_volume-base_terminal/volume-base_terminal_parameters_01.png) [image 2](key-cleanup/002_volume-base_terminal/volume-base_terminal_response.png) |
| key-cleanup/delete_volume-secondary | `DELETE /encryption-keys/{key_id}` | 202 | 202 | [JSON](key-cleanup/003_delete_volume-secondary/result.json) [image 1](key-cleanup/003_delete_volume-secondary/delete_volume-secondary_parameters_01.png) [image 2](key-cleanup/003_delete_volume-secondary/delete_volume-secondary_response.png) |
| key-cleanup/volume-secondary_terminal | `GET /tasks/{task_id}` | 200 | 200 | [JSON](key-cleanup/004_volume-secondary_terminal/result.json) [image 1](key-cleanup/004_volume-secondary_terminal/volume-secondary_terminal_parameters_01.png) [image 2](key-cleanup/004_volume-secondary_terminal/volume-secondary_terminal_response.png) |
