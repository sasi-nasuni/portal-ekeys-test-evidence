# 079 — missing_iterator

**PASS — HTTP 400**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?sort_by=appliance_name&sort_direction=asc&iterator_id=8d394060-bca9-431d-8aa7-66a571e230b1&limit=25`

Intended query: `{"iterator_id": "8d394060-bca9-431d-8aa7-66a571e230b1"}`

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

- [missing_iterator_parameters_01.png](missing_iterator_parameters_01.png)
- [missing_iterator_parameters_02.png](missing_iterator_parameters_02.png)
- [missing_iterator_response.png](missing_iterator_response.png)

[Machine result](result.json)
