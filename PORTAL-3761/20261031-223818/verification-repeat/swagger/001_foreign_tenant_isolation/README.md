# 026 — foreign_tenant_isolation

**PASS — HTTP 200**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `B`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?sort_by=appliance_name&sort_direction=asc&limit=25`

Intended query: `{}`

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
      "id": "6056bd0e-d29b-4ab8-a0d8-1b3af01aa554",
      "name": "PORTAL3761TEST-20261031-223818-B-FOREIGN-SENTINEL",
      "volume_role": "remote_only",
      "keys": [
        {
          "id": "d67de4ed-da4a-4996-a57d-f40464905bf6",
          "name": "PORTAL3761TEST-20261031-223818-B-FOREIGN-KEY",
          "fingerprint": "73F834EF7B9641628C9BD163A84F6844ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": true,
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
    "appliances_without_passphrase": 1,
    "remote_appliances_without_backup_key": 1,
    "not_escrowed": 1
  }
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [foreign_tenant_isolation_parameters_01.png](foreign_tenant_isolation_parameters_01.png)
- [foreign_tenant_isolation_parameters_02.png](foreign_tenant_isolation_parameters_02.png)
- [foreign_tenant_isolation_response_01.png](foreign_tenant_isolation_response_01.png)
- [foreign_tenant_isolation_response_02.png](foreign_tenant_isolation_response_02.png)

[Machine result](result.json)
