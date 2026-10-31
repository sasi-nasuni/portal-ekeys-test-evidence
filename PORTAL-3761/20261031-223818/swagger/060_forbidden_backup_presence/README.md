# 060 — forbidden_backup_presence

**PASS — HTTP 403**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `view_0`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?backup_key=missing&sort_by=appliance_name&sort_direction=asc&limit=25`

Intended query: `{"backup_key": ["missing"]}`

## Assertions

- Expected HTTP status
- Swagger displayed response matches actual network response

## Response

```json
{
  "message": "Filtering by backup keys requires View Backup Keys permission",
  "detail": null
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [forbidden_backup_presence_parameters_01.png](forbidden_backup_presence_parameters_01.png)
- [forbidden_backup_presence_parameters_02.png](forbidden_backup_presence_parameters_02.png)
- [forbidden_backup_presence_response.png](forbidden_backup_presence_response.png)

[Machine result](result.json)
