# 027 — foreign_appliance_id

**PASS — HTTP 200**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?appliance_ids=6056bd0e-d29b-4ab8-a0d8-1b3af01aa554&sort_by=appliance_name&sort_direction=asc&limit=25`

Intended query: `{"appliance_ids": ["6056bd0e-d29b-4ab8-a0d8-1b3af01aa554"]}`

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
    "page_size": 25,
    "total_pages": 0,
    "total_items": 0,
    "page": 1
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

- [foreign_appliance_id_parameters_01.png](foreign_appliance_id_parameters_01.png)
- [foreign_appliance_id_parameters_02.png](foreign_appliance_id_parameters_02.png)
- [foreign_appliance_id_response.png](foreign_appliance_id_response.png)

[Machine result](result.json)
