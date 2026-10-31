# 076 — bad_sort_by

**PASS — HTTP 422**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?sort_direction=asc&limit=25&sort_by=key_name`

Intended query: `{"sort_by": "key_name"}`

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
      "type": "literal_error",
      "loc": [
        "query",
        "sort_by"
      ],
      "msg": "Input should be 'appliance_name'",
      "input": "key_name",
      "ctx": {
        "expected": "'appliance_name'"
      }
    }
  ]
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [bad_sort_by_parameters_01.png](bad_sort_by_parameters_01.png)
- [bad_sort_by_parameters_02.png](bad_sort_by_parameters_02.png)
- [bad_sort_by_response.png](bad_sort_by_response.png)

[Machine result](result.json)
