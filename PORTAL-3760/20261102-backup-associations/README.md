# PORTAL-3760 — Legacy backup-key association correction

Tested application commit: `2473f33ef41c1badf4479075e310f783d7af36db`. Client date: 2 November 2026.

Existing master-owned backup-key associations reported by legacy filers remain visible and searchable; Portal rejects adding a backup key as a new volume association before task creation.

## Behavior verified

- Existing enabled and disabled master-owned backup-key associations are returned by grouped and single-volume reads.
- Associated backup keys participate in name/fingerprint search, origin/state filters, parent counts and pagination.
- Backup designation by itself does not make a key appear under an unassociated volume; remote-owned associations remain excluded.
- Portal Add rejects backup-key requests before creating a task, including mixed regular/backup requests and both disable-existing options.
- Adding a regular key remains allowed when the master appliance has a different designated backup key.

## Validation

The regression cases reproduced two missing-key failures and four missing-validation failures before the correction. All suites passed after the fix.

| Suite | Passed | Evidence |
| --- | ---: | --- |
| Portal-data service and focused unit tests | 186 | [JUnit](data-unit.xml), [log](data-unit.log), [command](data-unit-command.json) |
| WebAPI encryption-key route tests | 136 | [JUnit](webapi-unit.xml), [log](webapi-unit.log), [command](webapi-unit-command.json) |
| PostgreSQL volume-key integration tests | 25 | [JUnit](postgres.xml), [log](postgres.log), [command](postgres-command.json) |

**347 tests passed.** Ruff, formatting, Pyright, OpenAPI generation and all required pre-commit hooks passed. [Summary](summary.json) · [Pre-commit log](pre-commit.log) · [Run metadata and source hashes](run-metadata.json).

PostgreSQL tests used an isolated temporary local cluster; no application database or Docker service was targeted. [Owned cluster cleanup](postgres-cleanup.json).

## Historical Swagger evidence

Swagger was not rerun for this correction because local application services were stopped. The earlier [69-scenario Swagger report](https://github.com/sasi-nasuni/portal-ekeys-test-evidence/blob/674651b2ca46e4e3d618ed04febc93f3f4364f99/PORTAL-3760/20261031-205157/README.md) applies to application commit `c1b35ab01f`. Its backup-key exclusion expectation is superseded by this correction. Its raw captures remain unchanged; this report does not claim updated browser evidence.
