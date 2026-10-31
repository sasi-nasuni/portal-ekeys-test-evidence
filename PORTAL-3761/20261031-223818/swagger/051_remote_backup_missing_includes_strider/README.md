# 051 — remote_backup_missing_includes_strider

**PASS — HTTP 200**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?backup_key=missing&sort_by=appliance_name&sort_direction=asc&limit=25`

Intended query: `{"backup_key": ["missing"]}`

## Assertions

- Exact parent membership and order
- Current filtered total_items
- Current total_pages
- Page and appliance limit metadata
- Exact account-wide independently gated readiness counts
- Appliance identity and volume role
- Complete matching child set and order
- Backup summary visibility
- Independent assigned-backup summary
- Passphrase fields, status and tasks visibility
- Actual passphrase presence
- Exact active/unacknowledged task membership
- Appliance task rollup
- Child id
- Child name
- Child fingerprint
- Child origin
- Child used
- Child is_stub
- Child type from assigned backup pointer
- Child permission/license field omission
- Child escrow fact
- Child backup fact
- Child task status rollup

## Response

```json
{
  "items": [
    {
      "id": "b2538a13-3639-44ee-a1ce-f717ee2d8643",
      "name": "PORTAL3761TEST-20261031-223818-A-Gamma Strider",
      "volume_role": "remote_only",
      "keys": [
        {
          "id": "518611ec-f932-4816-9582-0bfc938613f1",
          "name": "PORTAL3761TEST-20261031-223818-A-Strider Uploaded",
          "fingerprint": "A3D5A7092BFD453B9097241C21C8C422ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": false,
          "is_backup_key": false
        }
      ],
      "backup_key": null,
      "has_escrow_passphrase": false,
      "status": "synced",
      "tasks": []
    }
  ],
  "metadata": {
    "iterator_id": null,
    "page_size": 25,
    "total_pages": 1,
    "total_items": 1,
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

- [remote_backup_missing_includes_strider_parameters_01.png](remote_backup_missing_includes_strider_parameters_01.png)
- [remote_backup_missing_includes_strider_parameters_02.png](remote_backup_missing_includes_strider_parameters_02.png)
- [remote_backup_missing_includes_strider_response_01.png](remote_backup_missing_includes_strider_response_01.png)
- [remote_backup_missing_includes_strider_response_02.png](remote_backup_missing_includes_strider_response_02.png)

[Machine result](result.json)
