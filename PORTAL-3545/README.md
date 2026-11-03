# PORTAL-3545 — Encryption keyring SSE evidence

End-to-end validation was performed in the `dvista1` development environment on
November 4, 2026 (IST). Commands were sent through Edge Console using Portal's
normal task path, and Redis was observed with a live subscriber on the account's
`edge` channel.

## Test target

- Account: `f902fd2c-796c-403b-837b-89d5625319a9` (`sbhushan1`)
- Edge: `31d629af-30b3-413e-a583-d5d3da651eb9` (`DEV-E-KEYS-POC`)
- Supplied volume: `28de65c4-2a93-493b-886f-3a71dc3ec5e3_3`

The supplied volume is a remote mount on this Edge. Volume-key associations are
owned and reported by the volume owner, `42ba8551-4fb1-41da-98e3-cf40b1c328d8`
(`test-filer-01`). Therefore the positive event validation used a reversible key
upload/delete lifecycle on the supplied Edge.

## Positive flow

1. Uploaded temporary key `E-Keys-PORTAL-3545-4876D3A4` through Edge Console.
2. Portal created task `79a0b665-4169-4df8-9405-d21a17ed23d6`.
3. Eventhub processed the returned `encryption_key_uploaded` event and published
   `edge.encryption_keyring_change` with event ID
   `e1ede80c-263e-43da-a565-3df44e8b362c` to one live subscriber.
4. The Redis subscriber received the same event on
   `portal_events:edge:f902fd2c-796c-403b-837b-89d5625319a9`.

## Cleanup

The temporary key was deleted through task
`c399baf6-11bc-4157-81f6-40a4369f7b21`. Redis received a second
`edge.encryption_keyring_change` event with ID
`d9e5134c-524b-432e-996e-8f3d7d1d9fb8`. A database check confirmed that zero
keys with the test name remained.

## Evidence

- [`01-upload-command-sent.png`](01-upload-command-sent.png): outbound upload,
  acknowledgement, and returned `encryption_key_uploaded` event in Edge Console.
- [`02-sse-event-received.png`](02-sse-event-received.png): Redis Pub/Sub payload
  and Eventhub publisher log showing one subscriber.
- [`03-cleanup-delete-command.png`](03-cleanup-delete-command.png): compensating
  delete, returned `encryption_key_deleted` event, and acknowledgement.
- [`redis-keyring-events.log`](redis-keyring-events.log): exact Redis payloads for
  upload and cleanup.
- [`eventhub-upload.log`](eventhub-upload.log): Eventhub processing and publish log.
