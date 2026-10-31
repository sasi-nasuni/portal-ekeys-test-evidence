# Retained attempt — foreign_tenant_isolation

Original result: FAIL. HTTP: 200. Network verified: True.

Harness finding: Exact account-wide independently gated readiness counts

The corrected passing attempt appears in the main scenario index. Multi-select attempts without a network response stopped before HTTP. The tenant-B HTTP 200 response matched PostgreSQL but exposed incorrect expected fixture-role metadata.

[Original result](result.json)

## Captured native Swagger UI

- [foreign_tenant_isolation_parameters_01.png](foreign_tenant_isolation_parameters_01.png)
- [foreign_tenant_isolation_parameters_02.png](foreign_tenant_isolation_parameters_02.png)
- [foreign_tenant_isolation_response_01.png](foreign_tenant_isolation_response_01.png)
- [foreign_tenant_isolation_response_02.png](foreign_tenant_isolation_response_02.png)
