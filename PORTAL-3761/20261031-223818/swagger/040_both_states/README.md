# Retained attempt — both_states

Original result: FAIL. HTTP: None. Network verified: False.

Harness finding: Swagger has one dropdown for state

The corrected passing attempt appears in the main scenario index. Multi-select attempts without a network response stopped before HTTP. The tenant-B HTTP 200 response matched PostgreSQL but exposed incorrect expected fixture-role metadata.

[Original result](result.json)

## Captured native Swagger UI

- [both_states_parameters_01.png](both_states_parameters_01.png)
- [both_states_parameters_02.png](both_states_parameters_02.png)
