# Cleanup paths — source audit only

No write commands were executed. This addendum clarifies [target-assessment.md](target-assessment.md).

## Uploaded key → escrow → deletion

1. `configuration.encryption_keys.upload` imports into `secring-noescrow.gpg` (`nasuni/gpg.py:copy_imported_keyring`, line 1065). A fresh unused nonbackup uploaded key is suitable for the escrow success path.
2. `configuration.encryption_keys.escrow` calls `make-key-escrowable.sh`. Under `escrow-lock`, the script exports the selected key from `secring-noescrow.gpg`, imports it into `secring-escrow.gpg`, deletes the old noescrow copy, creates the `need-escrow` marker, and starts the normal worker asynchronously.
3. `configuration.encryption_keys.delete` checks all volume associations, calls `gpg.delete_key`, then returns the key list. `delete_key` invokes GPG secret-key deletion followed by public-key deletion. The target's GPG configuration includes `secring-escrow.gpg`, `secring-noescrow.gpg`, `secring-generated.gpg`, and `secring-shared.gpg`. Therefore the configured command is intended to remove the selected escrow-ring key too. However, the same function retains an old warning that escrow deletion is broken; source alone does not settle whether that comment is stale. Verify the dedicated fingerprint is absent from **all rings** after the live delete. A list-response omission alone is insufficient.
4. The delete handler **does not** create `need-escrow` and **does not** upload an updated escrow bundle. Even if local deletion succeeds, the last uploaded NOC bundle may still contain the disposable key.

The normal `/usr/bin/escrow-keys.sh` worker can re-escrow remaining keys **without changing or exposing the existing passphrase**. It reads the cached passphrase internally, creates a protected temporary bundle under `/dev/shm`, uploads it with `webclient.py --api escrow --put`, then removes temporary files. Do not use its `--debug` option: that enables shell tracing and keeps temporary files.

The worker is marker-gated: calling it when `/var/nasuni/notify/need-escrow` is absent returns success without uploading anything. The marker was absent at this audit. Existing product writers create the marker under `/var/lock/nasuni/escrow-lock`. A cleanup action can request the existing mechanism by creating that marker under the same lock, then invoking the normal worker after releasing the lock; this is a real appliance maintenance write, not a passphrase update. No public Portal/NBN “refresh escrow after deletion” API was found in the searched routes. Root must decide whether that maintenance action belongs in the test cleanup scope before creating the escrow fixture.

Required cleanup evidence: disposable fingerprint absent from all local rings; all pre-existing fingerprints/volume associations/backup designation unchanged; normal worker actually performed and completed its upload (not marker-absent no-op); marker absent after success; no pending fixture tasks. Do not read, record, or print the passphrase or unencrypted bundle.

This can restore the **current logical escrow bundle** to the remaining key set. It is **not an erasure guarantee**. NOC `EscrowHandler.handle_update` writes a fixed per-serial S3 object and adds account history. `store_file_on_s3` uses `Object.put` and does not delete old versions. Bucket versioning/retention was not inspected. Account-history entries and any retained S3 versions containing the disposable key may remain. No route for deleting historical escrow versions was found. Those external historical artifacts must be disclosed rather than reported as “zero remnants.” Existing customer keys and passphrase are preserved, but an escrow test necessarily records real escrow activity.

## Dedicated volume creation and disposal

Supported Unity routes exist on the installed filer:

- `/usr/bin/run-route.py volumes.create` uses the real `volumes.create` route → `filer_shims.volumes.create_volume` → `control.volume_create.construct_volume`.
- `/usr/bin/run-route.py volumes.delete --guid=<exact-new-guid>` uses the real `volumes.delete` route → `control.volumes.delete_volume`.
- `volumes.encryption_keys.add` adds new associated keys through the real product control path.

These are supported legacy route entry points, **not Portal REST endpoints**. Current Portal `routes/volumes.py` has list/get, rename and snapshot routes, but no volume creation/deletion route. NBN daemon has `CreateVolumeCommand` → `volumes.create`; it has a `_volume_deleted` lifecycle-event adapter, but no corresponding delete command route in the searched registry. Setup/cleanup through legacy routes must therefore be labeled separately from the native Swagger API under test.

Creation accepts a unique `name`, provider/region/credential selection, explicit disposable key, `protocols=[]` and `fsaccess=False`; the latter avoids creating shares. The wrapper receives `protocol=[]` and derives `protocols=[]`. It still provisions actual cloud-backed volume state. The target's unsigned license has `max_volumes=8`, and the observed inventory contains one local-owned volume plus one remote volume, so the observed count does not exhaust that limit. Cloud credentials/provider/region and successful provisioning were **not** validated by this audit.

Deletion is asynchronous and broader than dropping a local row. The real handler removes that volume's mounts/configuration, stops its unityfs instance, marks it disabled, and schedules `/usr/bin/run-delete_volume.sh`. That runner launches `delete_volume -a`, scanning all disabled local volumes. Before invoking it, verify there are no unrelated pre-existing disabled volumes or deletion jobs. The later worker scrubs cloud contents, updates NOC/lock services, and only then removes the disabled volume from `cloudvolume.xml`. Some NOC cleanup is explicitly best-effort in source.

For disable/enable testing, create one uniquely named disposable local volume with a disposable baseline key and a disposable secondary key. Disable only the secondary key, then re-enable it. Do not add a test key to either existing volume: associations cannot be removed independently. Final cleanup requires complete volume/cloud disposal, absence from active **and disabled** XML inventories, no outstanding deletion job, then deletion of its now-unused keys. NOC/lock-server cleanup must be checked independently rather than inferred from a deletion route ACK. No direct database fixtures are required or proposed for real filer setup.

## Source locators

| Source/repo | Search terms or paths checked | Result | Gap/notes |
| --- | --- | --- | --- |
| Unity | `core/tools/{make-key-escrowable,escrow-keys,run-delete_volume}.sh`; `core/init/escrow-keys.service`; `python/common/nasuni/{gpg,control/volumes,control/volume_create}.py`; `python/filer/nasuni/nmc/routes/filer/volumes.py`; `python/filer/bin/delete_volume` | Real maintenance, create and asynchronous cleanup paths found | No writes or secret reads executed |
| Live filer | Installed routes/scripts existence, selected SHA256, configured GPG keyring names, marker existence, allowlisted `max_volumes` | Same marker-gated worker and volume route names exist; max8; marker absent | Source warning prevents assuming escrow deletion without live metadata verification |
| python-noc | `api_escrow/handlers.py`; `utils/aws/s3.py:store_file_on_s3` | Latest object PUT and account history established | S3 retention/versioning and historical deletion unknown |
| Portal / nbn-daemon | `routes/volumes.py`; `control_path_nea/routes.py` create/delete searches | No Portal create/delete REST route; NBN create command and delete lifecycle event | Provisioning/cleanup must be reported as separate legacy setup actions |

| Claim | Evidence label | Source locator | Confidence | Gap/search coverage |
| --- | --- | --- | --- | --- |
| Key delete does not refresh NOC bundle | Verified from code | Unity `configuration.py:encryption_key_delete`; `gpg.py:delete_key` | High | Any external periodic refresh independent of this handler not relied on |
| Re-escrow can reuse cached phrase without setting it | Verified from code | `escrow-keys.sh`, marker check and keyctl pipe before upload | High | Successful actual upload pending |
| Local escrow key deletion is intended but must be verified | Inferred from code | Configured secret rings + `gpg.delete_key`; retained warning | Medium | No destructive probe performed |
| Latest bundle restoration does not erase history | Verified from code / inferred consequence | NOC `EscrowHandler.handle_update`; `Object.put` | High for history, unknown for bucket versions | No S3 retention inspection |
| Volume setup/cleanup can use real legacy routes | Verified from code/runtime | Installed `volumes.create` / `volumes.delete` registrations | High | Actual provider readiness and full disposal pending |
| Volume deletion can touch other already-disabled volumes via background scan | Verified from code | `control.volumes._delete_volume` → `run-delete_volume.sh` → `delete_volume -a` | High | Check contemporaneous pending-deletion inventory before execution |
