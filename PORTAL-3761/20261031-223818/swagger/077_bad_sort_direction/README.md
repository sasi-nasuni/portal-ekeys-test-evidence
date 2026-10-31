# 077 — bad_sort_direction

**PASS — HTTP 422**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?sort_by=appliance_name&limit=25&sort_direction=sideways`

Intended query: `{"sort_direction": "sideways"}`

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
      "type": "enum",
      "loc": [
        "query",
        "sort_direction"
      ],
      "msg": "Input should be 'asc' or 'desc'",
      "input": "sideways",
      "ctx": {
        "expected": "'asc' or 'desc'"
      }
    }
  ]
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [bad_sort_direction_parameters_01.png](bad_sort_direction_parameters_01.png)
- [bad_sort_direction_parameters_02.png](bad_sort_direction_parameters_02.png)
- [bad_sort_direction_response.png](bad_sort_direction_response.png)

[Machine result](result.json)
