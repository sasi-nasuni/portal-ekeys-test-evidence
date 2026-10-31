# 070 — bad_appliance_uuid

**PASS — HTTP 422**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?sort_by=appliance_name&sort_direction=asc&limit=25&appliance_ids=bad-uuid`

Intended query: `{"appliance_ids": ["bad-uuid"]}`

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
      "type": "uuid_parsing",
      "loc": [
        "query",
        "appliance_ids",
        0
      ],
      "msg": "Input should be a valid UUID, invalid character: expected an optional prefix of `urn:uuid:` followed by [0-9a-fA-F-], found `u` at 5",
      "input": "bad-uuid",
      "ctx": {
        "error": "invalid character: expected an optional prefix of `urn:uuid:` followed by [0-9a-fA-F-], found `u` at 5"
      }
    }
  ]
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [bad_appliance_uuid_parameters_01.png](bad_appliance_uuid_parameters_01.png)
- [bad_appliance_uuid_parameters_02.png](bad_appliance_uuid_parameters_02.png)
- [bad_appliance_uuid_response.png](bad_appliance_uuid_response.png)

[Machine result](result.json)
