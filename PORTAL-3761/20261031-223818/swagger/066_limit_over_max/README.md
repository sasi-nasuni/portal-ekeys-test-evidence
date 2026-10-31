# 066 — limit_over_max

**PASS — HTTP 422**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?sort_by=appliance_name&sort_direction=asc&limit=26`

Intended query: `{"limit": 26}`

Swagger requestInterceptor: explicit malformed input; response unmodified

## Assertions

- Expected HTTP status
- Swagger displayed response matches actual network response

## Response

```json
{
  "message": "Validation Error",
  "detail": [
    {
      "type": "less_than_equal",
      "loc": [
        "query",
        "limit"
      ],
      "msg": "Input should be less than or equal to 25",
      "input": "26",
      "ctx": {
        "le": 25
      }
    }
  ]
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [limit_over_max_parameters_01.png](limit_over_max_parameters_01.png)
- [limit_over_max_parameters_02.png](limit_over_max_parameters_02.png)
- [limit_over_max_response.png](limit_over_max_response.png)

[Machine result](result.json)
