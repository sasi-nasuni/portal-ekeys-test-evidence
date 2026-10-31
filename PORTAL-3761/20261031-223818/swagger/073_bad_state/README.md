# 073 — bad_state

**PASS — HTTP 422**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?sort_by=appliance_name&sort_direction=asc&limit=25&state=invalid`

Intended query: `{"state": ["invalid"]}`

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
        "state",
        0
      ],
      "msg": "Input should be 'in_use' or 'unused'",
      "input": "invalid",
      "ctx": {
        "expected": "'in_use' or 'unused'"
      }
    }
  ]
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [bad_state_parameters_01.png](bad_state_parameters_01.png)
- [bad_state_parameters_02.png](bad_state_parameters_02.png)
- [bad_state_response.png](bad_state_response.png)

[Machine result](result.json)
