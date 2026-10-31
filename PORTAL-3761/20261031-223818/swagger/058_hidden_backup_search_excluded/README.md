# 058 — hidden_backup_search_excluded

**PASS — HTTP 200**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `view_0`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?search=Backup%20Secret&sort_by=appliance_name&sort_direction=asc&limit=25`

Intended query: `{"search": "Backup Secret"}`

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
  "dr_counts": {}
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [hidden_backup_search_excluded_parameters_01.png](hidden_backup_search_excluded_parameters_01.png)
- [hidden_backup_search_excluded_parameters_02.png](hidden_backup_search_excluded_parameters_02.png)
- [hidden_backup_search_excluded_response.png](hidden_backup_search_excluded_response.png)

[Machine result](result.json)
