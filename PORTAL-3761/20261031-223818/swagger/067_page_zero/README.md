# 067 — page_zero

**PASS — HTTP 422**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?sort_by=appliance_name&sort_direction=asc&limit=25&page=0`

Intended query: `{"page": 0}`

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
      "type": "greater_than_equal",
      "loc": [
        "query",
        "page"
      ],
      "msg": "Input should be greater than or equal to 1",
      "input": "0",
      "ctx": {
        "ge": 1
      }
    }
  ]
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [page_zero_parameters_01.png](page_zero_parameters_01.png)
- [page_zero_parameters_02.png](page_zero_parameters_02.png)
- [page_zero_response.png](page_zero_response.png)

[Machine result](result.json)
