# 069 — unknown_query

**PASS — HTTP 422**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?sort_by=appliance_name&sort_direction=asc&limit=25&unknown_filter=true`

Intended query: `{"unknown_filter": "true"}`

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
      "type": "extra_forbidden",
      "loc": [
        "query",
        "unknown_filter"
      ],
      "msg": "Extra inputs are not permitted",
      "input": "true"
    }
  ]
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [unknown_query_parameters_01.png](unknown_query_parameters_01.png)
- [unknown_query_parameters_02.png](unknown_query_parameters_02.png)
- [unknown_query_response.png](unknown_query_response.png)

[Machine result](result.json)
