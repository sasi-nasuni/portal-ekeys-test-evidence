# 068 — page_not_number

**PASS — HTTP 422**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?sort_by=appliance_name&sort_direction=asc&limit=25&page=NaN`

Intended query: `{"page": "NaN"}`

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
      "type": "int_parsing",
      "loc": [
        "query",
        "page"
      ],
      "msg": "Input should be a valid integer, unable to parse string as an integer",
      "input": "NaN"
    }
  ]
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [page_not_number_parameters_01.png](page_not_number_parameters_01.png)
- [page_not_number_parameters_02.png](page_not_number_parameters_02.png)
- [page_not_number_response.png](page_not_number_response.png)

[Machine result](result.json)
