# Remaining PORTAL-3299 real-filer testing

This follow-up was requested after the local run of 284 Swagger scenarios and 782 automated tests. No additional real-filer success is claimed.

## Confirmed prerequisites

- `10.84.2.115:222` is reachable and reports `10.5-6327`; these Portal commands require 10.6+.
- The appliance already has an escrow passphrase, 58 keys and two volumes. No existing filer resources were changed.
- Cached `portal-dev` AWS SSO credentials are usable. Required NBN credential, NOC role and inbound decryption-secret access passed read-only probes; no secret values were saved.
- The current API still uses invalid default credentials, and the existing local EventHub poller exited with no response queues configured.
- A separate local API on 127.0.0.1:18000 and two dedicated account-filtered response queues are prepared for review; none were started or created.

## Choices needed

1. Use a 10.6+ filer, upgrade this filer, or explicitly authorize a documented local version override for this patched POC appliance. The override would not prove normal version eligibility.
2. Preserve the current global passphrase, reuse it from a secure owner-provided source, or authorize replacement on a disposable appliance. Updating it re-escrows every key and may generate a backup key.
3. Approve the prepared temporary runtime and exact resource cleanup before startup, as required by repository service-lifecycle instructions.

## Evidence and preparation

- [Filer inventory](filer-inventory.json)
- [Target assessment](target-assessment.md)
- [AWS and transport readiness](aws-transport-readiness.json)
- [Six-flow harness plan](harness-plan.json)
- [Cleanup-path analysis](cleanup-path-analysis.md)
- [Temporary runtime plan](runtime/runtime-plan.json)
- [Runtime preflight](runtime/preflight.json)

No commands, database fixtures, cloud queues, or service lifecycle changes were performed during this preflight. Cleanup risk is documented: volume deletion is asynchronous, and escrow history may remain in NOC/S3 even after current resources are removed.
