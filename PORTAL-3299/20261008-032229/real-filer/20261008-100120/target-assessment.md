# Real-filer target assessment — read-only

Observed by SSH on 2026-10-08. No commands that mutate the filer, restart services, create resources, delete resources, change keys, or read the escrow secret were run. The repeatable inventory reader (local harness file omitted from publication) stores only identifiers, names, flags, and version metadata in [filer-inventory.json](filer-inventory.json). GPG keyring file sizes/mtimes were identical before and after metadata listing. This is not a whole-filesystem change audit.

The requested remaining tests are authorized in principle. This assessment identifies resource and restoration prerequisites, rather than requesting blanket testing permission again.

## Verified target

| Field | Observed value |
| --- | --- |
| Host | `DEV-E-KEYS-POC`, SSH `10.84.2.115:222` |
| Account GUID | `f902fd2c-796c-403b-837b-89d5625319a9` |
| Filer/instance GUID | `0a1d5257-81d2-4bfd-ab67-06f6d9d12a3f` |
| Serial | `31d629af-30b3-413e-a583-d5d3da651eb9` |
| Actual software | `UNITY_VERSION=10.5`, `UNITY_BUILD=6327`; RPM `nasuni-filer-10.5-6327.os8.x86_64` |
| NBN daemon | RPM `nasuni-nbnd-1.6-3.el8.x86_64`; installed route registry contains all six encryption write routes |
| Escrow passphrase | Present; verified by `keyctl search` existence only, value never read |
| Public key inventory | 58 keys: 2 generated, 6 escrow-enabled, 52 uploaded/unescrowed; 52 unused nonbackup keys. All pre-exist this run and must be preserved. |
| Actual backup key | `94C67F945AB131418B070BB8BA740113340EB9F2`, named `E-Keys-EdgeConsole-D9C531CA`. The name `config-backup-key` does not identify the current backup designation. |
| Local volume | `E-Keys-Test-01`, GUID `0a1d5257-81d2-4bfd-ab67-06f6d9d12a3f_0`: 4 enabled keys and 1 disabled key |
| Remote volume | `test-aws-03`, GUID `28de65c4-2a93-493b-886f-3a71dc3ec5e3_3`: 5 enabled keys and 1 disabled key; owner `28de65c4-2a93-493b-886f-3a71dc3ec5e3` |

Portal's current minimum for these write routes is **10.6**. The target reports **10.5**. Installed command handlers do not by themselves satisfy that API readiness gate. A supported target/build is needed for representative successful Portal writes. Reporting fabricated 10.6 metadata would be a controlled gate bypass and must not be represented as untouched, supported production behavior.

## Proposed success scenarios and restoration

| Operation | Isolated input and required evidence | Restoration / specific prerequisite |
| --- | --- | --- |
| Delete | Import a new uniquely named, unused, nonbackup key dedicated to this run. Dispatch `delete_encryption_key` through the real Swagger endpoint; correlate task/step, command, filer handling and terminal event; confirm fingerprint absent. | This test intentionally destroys only its disposable key. Confirm absence from every relevant keyring, Portal key rows and any active tasks. Do not select an existing unused key merely because its name looks like a test. |
| Escrow | A separate freshly uploaded unused key starts in `secring-noescrow.gpg`; dispatch `escrow_encryption_key`; verify the same fingerprint moves to the escrow ring and the terminal event reconciles Portal. | Generated keys are unsuitable for initial escrow success: `secring-generated.gpg` already counts as escrow-enabled. The operation also asynchronously updates an appliance-wide encrypted NOC bundle. Local deletion alone does not establish NOC cleanup; record that external state explicitly. Existing code contains an escrow-key deletion warning, so cleanup must verify rings rather than assume response success proves erasure. |
| Disable | A newly created disposable local volume, with two disposable associated enabled keys. Dispatch disable for the secondary key only; baseline remains enabled. Verify actual state plus correlated terminal task/event. | Existing volume keys must be preserved. Additions cannot later be removed from a volume: cleanup requires fully deleting this new disposable volume and its cloud data before deleting its keys. Creation/cloud credential scope and complete cleanup path must be established first. |
| Enable | On the same disposable volume, enable the secondary key disabled by the prior test. Verify both enabled again and correlated terminal completion. | Restores test association state; final removal still requires disposing of the entire test volume. Never disable the last enabled key. |
| Download | Dispatch `download_encryption_keys` with a transient recipient public key; correlate the actual encrypted event and task completion. Existing generated fingerprints can be compared as identifiers. | API passes `fingerprints=null`, so the filer exports **all generated keys**, including existing keys. Keep private recipient key and any decrypted bundle in memory; never print or persist raw private key material. Preserve all existing keys. The advertised custom status/download URL remains unimplemented in Portal, so separate task/event verification from bundle retrieval. |
| Passphrase | `update_escrow_passphrase` modifies the appliance-wide passphrase and initiates re-escrow of all keys. Its success is not fixture-scoped. | Present value is unknown. Need the owner-known original/restoration value or an explicitly disposable appliance/global replacement scope. Do not extract the secret or substitute a new phrase merely to gain coverage. The public setter rejects empty values, so it cannot restore an originally absent phrase either. |

Each successful API `202` is acceptance only. Require matching task ID / `trace_id`, command name, destination account/serial/instance, filer handling, a terminal event, task/step completion, and an authoritative post-action state read. Polling alone or unrelated log lines do not prove delivery. Retain a pre/post inventory of all pre-existing resources and compare them exactly where relevant.

## Verified legacy execution paths

Portal FIFO commands map through installed NBN daemon route registry to Unity handlers:

| Portal command | Unity route | Relevant implementation |
| --- | --- | --- |
| `escrow_encryption_key` | `configuration.encryption_keys.escrow` | `filer_shims/configuration.py:escrow_key` → `gpg.make_escrowable` → `make-key-escrowable.sh`; moves uploaded key and schedules full bundle escrow |
| `delete_encryption_key` | `configuration.encryption_keys.delete` | `configuration.py:encryption_key_delete` rejects associations, then `gpg.delete_key` |
| `enable_volume_encryption_keys` | `volumes.encryption_keys.enable` | `filer_shims/volumes.py:encryption_key_enable` |
| `disable_volume_encryption_keys` | `volumes.encryption_keys.disable` | `volumes.py:encryption_key_disable` preserves at least one enabled key |
| `update_escrow_passphrase` | `configuration.encryption_keys.escrow_passphrase.update` | daemon decrypts encrypted phrase → `configuration.py:escrow_passphrase_update` → `gpg.set_escrow_passphrase` |
| `download_encryption_keys` | `configuration.encryption_keys.download` | `configuration.py:download_keys` exports generated bundle; daemon encrypts to supplied recipient |

Installed `/usr/bin/run-route.py`, `/usr/bin/voltool`, `/usr/bin/make-key.sh`, and `/usr/bin/make-volume-key.sh` exist. These were **not executed**. `run-route.py` logs parameters, so it is unsuitable for passing unredacted secret arguments. The current volume constructor supports `protocols=[]` and `fsaccess=False` to avoid shares, but still creates cloud-backed volume state and requires valid provider/credential/license configuration. These flags do not make volume creation or disposal impact-free. New resources should use only a separately established test cloud scope.

## Search coverage

| Source/repo | Search terms or paths checked | Result | Gap/notes |
| --- | --- | --- | --- |
| Portal keys-5 | Root/backend `AGENTS.md`; prior endpoint inventory; encryption service and edge gate contracts | Nine API routes and six write-command mappings established; minimum 10.6 | No production edits or requests during this task |
| Unity local checkout | `python/filer/nasuni/nmc/filer_shims/{configuration,volumes}.py`; `python/common/nasuni/{gpg,keyring,volumelib,unityxml}.py`; `control/{gpg_keys,volume_create}.py`; `core/tools/{make-key,make-volume-key,make-key-escrowable}.sh`; `python/common/bin/run-route.py` | Creation/import, association permanence, escrow global effects, delete guards and download scope traced | Local source is behavior evidence; selected installed files checked, no full installed/local tree comparison |
| Live filer | Allowlisted identity/version config; `cloudvolume.xml` identifiers and key states; gpg1 metadata listing; keyctl existence check; selected installed file hashes and route presence | Inventory saved; metadata reads leave keyring file size/mtime unchanged | No secret values read; no cloud credential validation or resource creation attempted |
| nbn-daemon | `src/nbnd/control_path_nea/routes.py`, installed `/opt/nasuni/nbnd/venv/lib/python3.11/site-packages/nbnd/control_path_nea/routes.py` | Six routes present, phrase decryption and bundle recipient encryption traced | Presence alone does not prove working dispatch/event completion |
| python-noc | `python-noc/nasuni/apps/api_escrow/handlers.py:EscrowHandler` | PUT stores latest per-serial encrypted bundle and account history; GET reads it | No deletion/restoration API established here; NOC not called |
| nbn-appliance/client | Installed `.../site-packages/nbn` identified; NBN control-path skill reference read | Client exists on target | Standalone local nbn-appliance checkout absent; full transport/AWS inspection delegated to root/team |
| Jira/Confluence/GitHub/web | Not called for this focused appliance audit | No remote context used | Read-only source and runtime evidence sufficient for present safety prerequisites; no web permission requested |

## Evidence

| Claim | Evidence label | Source locator | Confidence | Gap/search coverage |
| --- | --- | --- | --- | --- |
| Actual target is 10.5 build 6327 | Verified from code/runtime | Live `/usr/share/nasuni/version.conf`; RPM metadata; saved inventory | High | API cached version may differ; must not conflate it with actual firmware |
| Existing passphrase is set | Verified from code/runtime | `keyctl search %:nasuni user escrow_passphrase` exit success; `gpg.py:has_escrow_passphrase` | High | Value deliberately unknown |
| Passphrase update re-escrows all keys and can create backup key | Verified from code | Unity `gpg.py:set_escrow_passphrase` lines 1168–1233 | High | Background upload success must be checked separately |
| Volume key addition is permanent until volume deletion | Verified from code | Unity `filer_shims/volumes.py:encryption_key_add`, especially comment near line 829; delete route association guard | High | Dedicated volume cleanup not attempted |
| Fresh imports can exercise initial escrow | Verified from code | `gpg.py:copy_imported_keyring` → `secring-noescrow.gpg`; `make-key-escrowable.sh` | High | Actual upload/escrow not run |
| Generated-key download includes existing keys | Verified from code | Portal download command `fingerprints=null`; Unity `configuration.py:download_keys`; daemon `_extract_bundle` | High | Successful dispatch and protected bundle delivery pending |
| Successful isolated enable/disable is possible after dedicated cloud volume setup | Inferred from code | `control/volume_create.py:construct_volume`; volume key enable/disable helpers | Medium | Test cloud provisioning/cleanup suitability not yet verified |
| NOC escrow state cannot be assumed restored by local key deletion | Verified from code / inferred consequence | `api_escrow/handlers.py:handle_update`; separate local `gpg.delete_key` | High | No remote escrow-state cleanup contract found in searched handler |

## Recommendation

Continue infrastructure and task/event readiness checks in parallel. Resolve the actual firmware/API gate before claiming supported successful dispatch. Use newly imported keys for independent delete and escrow, and a dedicated disposable volume for enable/disable only after its complete cloud cleanup is defined. Download can be observed with encrypted evidence and no key mutation. Keep global passphrase success pending the precise restoration prerequisite. No existing key, volume, backup designation, or passphrase was changed by this audit.
