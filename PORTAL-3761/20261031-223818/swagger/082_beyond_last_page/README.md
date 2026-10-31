# 082 — beyond_last_page

**PASS — HTTP 200**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?sort_by=appliance_name&sort_direction=asc&page=50&limit=2`

Intended query: `{"limit": 2, "page": 50}`

## Assertions

- Exact parent membership and order
- Current filtered total_items
- Current total_pages
- Page and appliance limit metadata
- Exact account-wide independently gated readiness counts

## Response

```json
{
  "items": [],
  "metadata": {
    "iterator_id": null,
    "page_size": 2,
    "total_pages": 4,
    "total_items": 7,
    "page": 50
  },
  "dr_counts": {
    "appliances_without_passphrase": 3,
    "remote_appliances_without_backup_key": 1,
    "not_escrowed": 12
  }
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [beyond_last_page_parameters_01.png](beyond_last_page_parameters_01.png)
- [beyond_last_page_parameters_02.png](beyond_last_page_parameters_02.png)
- [beyond_last_page_response.png](beyond_last_page_response.png)

[Machine result](result.json)
