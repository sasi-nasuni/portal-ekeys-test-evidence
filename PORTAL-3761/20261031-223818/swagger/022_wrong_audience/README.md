# 022 — wrong_audience

**PASS — HTTP 401**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?sort_by=appliance_name&sort_direction=asc&limit=25`

Intended query: `{}`

## Assertions

- Expected HTTP status
- Swagger displayed response matches actual network response

## Response

```json
{
  "message": "Token not valid for this service",
  "detail": null
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [wrong_audience_parameters_01.png](wrong_audience_parameters_01.png)
- [wrong_audience_parameters_02.png](wrong_audience_parameters_02.png)
- [wrong_audience_response.png](wrong_audience_response.png)

[Machine result](result.json)
