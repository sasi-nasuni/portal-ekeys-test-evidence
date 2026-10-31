# 084 — cursor_tenant_isolation

**PASS — HTTP 400**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `B`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?sort_by=appliance_name&sort_direction=asc&iterator_id=804cd90c-e591-43a0-9159-99f4ec5eedf0&limit=2`

Intended query: `{"limit": 2, "iterator_id": "804cd90c-e591-43a0-9159-99f4ec5eedf0"}`

## Assertions

- Expected HTTP status
- Swagger displayed response matches actual network response

## Response

```json
{
  "message": "Iterator expired or not found",
  "detail": null
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [cursor_tenant_isolation_parameters_01.png](cursor_tenant_isolation_parameters_01.png)
- [cursor_tenant_isolation_parameters_02.png](cursor_tenant_isolation_parameters_02.png)
- [cursor_tenant_isolation_response.png](cursor_tenant_isolation_response.png)

[Machine result](result.json)
