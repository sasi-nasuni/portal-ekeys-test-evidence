# 023 — no_view_permission

**PASS — HTTP 403**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `no_permission`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?sort_by=appliance_name&sort_direction=asc&limit=25`

Intended query: `{}`

## Assertions

- Expected HTTP status
- Swagger displayed response matches actual network response

## Response

```json
{
  "message": "User does not have the required permissions: View Volume Encryption Keys",
  "detail": null
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [no_view_permission_parameters_01.png](no_view_permission_parameters_01.png)
- [no_view_permission_parameters_02.png](no_view_permission_parameters_02.png)
- [no_view_permission_response.png](no_view_permission_response.png)

[Machine result](result.json)
