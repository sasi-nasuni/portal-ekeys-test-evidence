# 064 — unlicensed_filter_passphrase

**PASS — HTTP 403**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `False`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?has_escrow_passphrase=false&sort_by=appliance_name&sort_direction=asc&limit=25`

Intended query: `{"has_escrow_passphrase": [false]}`

## Assertions

- Expected HTTP status
- Swagger displayed response matches actual network response

## Response

```json
{
  "message": "Filtering by passphrase presence requires View Escrow Passphrase permission and an enabled Key Escrow license",
  "detail": null
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [unlicensed_filter_passphrase_parameters_01.png](unlicensed_filter_passphrase_parameters_01.png)
- [unlicensed_filter_passphrase_parameters_02.png](unlicensed_filter_passphrase_parameters_02.png)
- [unlicensed_filter_passphrase_response.png](unlicensed_filter_passphrase_response.png)

[Machine result](result.json)
