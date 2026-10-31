# 078 — bad_backup_presence

**PASS — HTTP 422**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?sort_by=appliance_name&sort_direction=asc&limit=25&backup_key=invalid`

Intended query: `{"backup_key": ["invalid"]}`

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
        "backup_key",
        0
      ],
      "msg": "Input should be 'present' or 'missing'",
      "input": "invalid",
      "ctx": {
        "expected": "'present' or 'missing'"
      }
    }
  ]
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [bad_backup_presence_parameters_01.png](bad_backup_presence_parameters_01.png)
- [bad_backup_presence_parameters_02.png](bad_backup_presence_parameters_02.png)
- [bad_backup_presence_response.png](bad_backup_presence_response.png)

[Machine result](result.json)
