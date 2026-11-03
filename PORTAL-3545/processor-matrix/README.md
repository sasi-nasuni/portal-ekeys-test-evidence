# PORTAL-3545 processor coverage

This evidence supplements the original key-upload/delete proof in the parent
folder. It covers every processor family changed by PORTAL-3545. Volume deletion
was intentionally not exercised against the live appliance; it remains covered
by the focused integration tests.

## Live end-to-end coverage

Every live case followed the production command path:

`Edge Console -> Portal TaskService -> appliance -> Eventhub -> Redis Pub/Sub`

The Redis subscriber listened on
`portal_events:edge:f902fd2c-796c-403b-837b-89d5625319a9`.

| Processor | Command / appliance event | Task / trace | Redis SSE event |
| --- | --- | --- | --- |
| `HeartbeatProcessor` | `heartbeat` / `HeartbeatEvent` | `b14956ed-8176-4416-b3fb-b950662b7756` | `7d402d78-aaf8-433c-995e-7457465fd854` |
| `FullDumpProcessor` | `full_dump` / `FullDumpEvent` | `0b3e237c-fa20-444d-8628-cdce6f9e3e5b` | `b170b4e6-de1c-4ca5-9b5e-86a4b814700b` |
| `EncryptionKeyListProcessor` | `list_encryption_keys` / `EncryptionKeyListEvent` | `b66abed1-9c6b-4b23-afea-df59bef789a7` | `64a387c5-5722-4288-9b50-408e41d4705f` |
| `VolumeListProcessor` | `list_volumes` / `VolumeListEvent` | `2c5c014b-57d4-45db-afe1-a4378cddbc7e` | `f37a5de1-ba9f-42af-9dd1-0219919f6737` |
| `VolumeEncryptionKeysEnabledProcessor` | `enable_volume_encryption_keys` / `VolumeEncryptionKeysEnabledEvent` | `aecd9009-d2de-45c0-9c35-81166e95b162` | `0a400265-3285-4d59-9991-2557b5ed0ff3` |
| `VolumeEncryptionKeysDisabledProcessor` | `disable_volume_encryption_keys` / `VolumeEncryptionKeysDisabledEvent` | `77bf1480-3611-4366-ac6f-ae718d2f6841` | `cb6f11ec-1c62-42c3-97b9-98aa3d07e1b9` |
| `EscrowPassphraseUpdatedProcessor` | `update_escrow_passphrase` / `EscrowPassphraseUpdatedEvent` | `7f48d409-366f-4722-9e98-f619bd73ddf0` | `f4232ff7-5058-4d27-8f82-9e86be535a87` |
| `EncryptionKeyEscrowedProcessor` | `escrow_encryption_key` / `EncryptionKeyEscrowedEvent` | `e7d603d6-680a-4e86-ab12-be47d091edb6` | `c4297bf1-6b13-4d18-97fa-49b988a63dd6` |
| `BackupEncryptionKeySetProcessor` | `set_backup_encryption_key` / `BackupEncryptionKeySetEvent` | `967255ff-bd73-4095-aa03-9054571ba347` | `142935ca-3640-424e-8817-4e3d026f4c23` |
| `BackupEncryptionKeySetProcessor` cleanup | restore original backup | `82f8b2d4-20dc-4d61-b49a-9fd986642b54` | `2fe7cadf-8320-4f6e-b829-c2c53af16b17` |
| `EncryptionKeyUploadedProcessor` | temporary upload | `79a0b665-4169-4df8-9405-d21a17ed23d6` | `e1ede80c-263e-43da-a565-3df44e8b362c` |
| `EncryptionKeyDeletedProcessor` | cleanup delete | `c399baf6-11bc-4157-81f6-40a4369f7b21` | `d9e5134c-524b-432e-996e-8f3d7d1d9fb8` |

For heartbeat, full dump, keyring list, and volume list, a controlled Portal DB
divergence was introduced before the command. The appliance response restored
appliance truth and emitted exactly one keyring-change event. This proves the
processor's change gate rather than merely observing a periodic no-op snapshot.

The supplied volume is remote-mounted on `DEV-E-KEYS-POC`; its owner is an older
appliance that does not support the encryption-key command contract. The direct
enable/disable test therefore used owned test volume
`0a1d5257-81d2-4bfd-ab67-06f6d9d12a3f_0` on the supplied filer. The original
association state and original backup fingerprint were restored.

The passphrase test was a real rotation, so the appliance now uses the
PORTAL-3545 test passphrase. The escrow test used the previously unassociated
test key `E-Keys-EdgeConsole-0A203180`; that key is now escrowed. No volume was
created, deleted, mounted, or unmounted.

## Automated coverage

Focused tests were rerun after the live tests:

- Portal Eventhub: **347 passed** — passphrase, key lifecycle, backup, keyring,
  association mutations, heartbeat, full dump, volume lifecycle, volume list,
  stale/replay/no-change gates, and volume deletion.
- Portal Data: **191 passed, 6 skipped** — edge write results, locking/freshness,
  keyring reconciliation, and association reconciliation.
- Portal Events: **41 passed** — event serialization, routing, and account-scoped
  Redis delivery.
- Portal WebAPI: **185 passed** — explicit acknowledgement policies, refresh
  events, permissions, cleanup, and replay behavior.

Total focused result: **764 passed, 6 skipped**.

The snapshot-bearing volume lifecycle processors share
`VolumeListProcessor.process_single_datum`; their live reconciliation path is
represented by the volume-list case, while the concrete lifecycle event classes
are covered by the 347-test Eventhub run. Volume deletion was not performed live.

## Evidence files

- `04-snapshot-processors-sse.png`: snapshot/reconciliation processor events.
- `05-mutation-processors-sse.png`: direct mutation processor events.
- `06-focused-regression-tests.png`: focused test results by package.
- `eventhub-processors.log`: exact Eventhub dispatch and publish lines.
- `redis-keyring-events.log`: the target event IDs observed by the live Redis
  subscriber.
- `test-results.log`: focused test totals.
