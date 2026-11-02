# PORTAL-3641 WebBFF DR Readiness Swagger evidence

Result: **PASS — 11/11 scenarios**

- Tested application commit: `1698fcf43a59eeccb084bfe98aa2424d3d4616f7`
- Branch: `sbhushan/PORTAL-3641_dr_readiness_webbff`
- Endpoint: `GET /encryption-keys/dr-readiness`
- Transport: served WebBFF Swagger UI **Try it out / Execute** at `127.0.0.1:8001`
- Evidence: 118 native Swagger PNGs, with SHA-256 hashes in [`png-sha256.json`](png-sha256.json)

## Environment and controls

`make run` was requested first. Docker Desktop failed on the checkout-wide bind mounts with `EMFILE` / `No file descriptors available`. The same Compose services and tested images were then started with a source-only staging mount excluding local virtual environments and caches. WebAPI and WebBFF Swagger were healthy before capture.

The requested account `f902fd2c-796c-403b-837b-89d5625319a9` existed in the normal local database but had no current inventory rows. Testing therefore read the preserved isolated account snapshot `portal3763_e2e_20261101_182817`: four appliances, nine volumes, and 87 encryption keys. See [`inventory.json`](inventory.json). The snapshot was not mutated.

Authentication used a locally signed JWT for an existing persisted full-permission test user, carried only in memory as WebBFF's same-origin `access_token` cookie. This does not test external IdP login. The account's local feature and license cache controls were enabled for the run and restored to their original absent state; Redis TTL verification returned `-2` for both keys after cleanup.

## Assertions

For every successful non-continuation request, the complete WebBFF body was compared field-for-field with a fresh grouped WebAPI response projected through the WebBFF contract. Independently created opaque cursor UUIDs were allowed to differ while cursor presence had to match. Assertions also verified that every displayed child key was either in use or a backup key.

The continuation cursor is single-use, so page 2 was not replayed against WebAPI. Instead, the test verified page number and total preservation, no parent overlap, and that pages 1 and 2 together exactly matched the default parent set. Full machine-readable checks are in [`assertions.json`](assertions.json).

| # | Scenario | Result | Contract assertion |
|---|---|---:|---|
| 001 | Missing authentication | 401 | Cookie authentication required |
| 002 | Default full-access read | 200 | 3 parents and 26 used/backup keys; complete projection matched |
| 003 | Descending appliance sort | 200 | Complete projection and descending names matched |
| 004 | Page 1, limit 2 | 200 | 2 of 3 parents; continuation returned |
| 005 | Page 2 with iterator | 200 | Remaining parent; no overlap; combined pages matched default set |
| 006 | Appliance-ID filter | 200 | Only `DEV-E-KEYS-POC`; complete projection matched |
| 007 | Exact appliance-name search | 200 | One matching parent; complete projection matched |
| 008 | Backup key present | 200 | Valid empty result for this owner-only selected population |
| 009 | Backup key missing | 200 | Valid empty result for this owner-only selected population |
| 010 | Escrowed keys | 200 | 3 parents and 20 used/backup keys; complete projection matched |
| 011 | Duplicate appliance filter | 422 | WebBFF rejected duplicate values |

## Selected native Swagger evidence

- [Default response, first segment](swagger/002_default_full_access/002_default_full_access_response_01.png)
- [Default response, metadata and readiness counts](swagger/002_default_full_access/002_default_full_access_response_18.png)
- [Page 1 request controls](swagger/004_page_one_limit_two/004_page_one_limit_two_parameters_02.png)
- [Page 2 response, metadata and readiness counts](swagger/005_page_two_iterator/005_page_two_iterator_response_08.png)
- [Escrowed filter controls](swagger/010_filter_escrowed/010_filter_escrowed_parameters_02.png)
- [Duplicate-filter validation response](swagger/011_duplicate_appliance_filter_validation/011_duplicate_appliance_filter_validation_response.png)

Each scenario directory contains its native parameter/control screenshots, every response segment, and a sanitized `result.json`. The dark gray areas in screenshots are intentional masking of Swagger's curl/authentication UI.

## Limitations

- This was a read-only local Swagger test against a preserved account snapshot, not a live NOC refresh or filer execution.
- The selected grouped population contains owners only, so `backup_key=present` and `backup_key=missing` correctly returned empty parent sets; positive remote-only backup-filter matches are covered by automated tests rather than this snapshot.
- The test verifies WebBFF cookie authentication with a local signed token, not external login or refresh-token issuance.
- Two earlier unpublished attempts are retained locally: one exposed an evidence assertion that compared independently generated cursor IDs; another exposed the driver's lack of boolean-array dropdown support. Neither was an application failure and neither is included in this publication.
