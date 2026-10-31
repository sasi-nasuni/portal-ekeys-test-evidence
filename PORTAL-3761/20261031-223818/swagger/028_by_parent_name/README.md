# 028 — by_parent_name

**PASS — HTTP 200**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?search=Beta%20Remote&sort_by=appliance_name&sort_direction=asc&limit=25`

Intended query: `{"search": "Beta Remote"}`

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
- Task state and action
- Acknowledgement capability respects management permission
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
      "id": "3cf60c57-2f0a-4c3b-96be-1db1e8e713fa",
      "name": "PORTAL3761TEST-20261031-223818-A-Beta Remote",
      "volume_role": "remote_only",
      "keys": [
        {
          "id": "9a6b5a08-838e-45c2-83f6-3fe976eecff0",
          "name": "PORTAL3761TEST-20261031-223818-A-Backup Secret",
          "fingerprint": "BB6F7247174F4290826E6D7BDBE302ACABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "backup",
          "origin": "uploaded",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": false,
          "is_backup_key": true
        },
        {
          "id": "55e7841e-e3b1-4d50-a13d-9d3eda5a3b4c",
          "name": "PORTAL3761TEST-20261031-223818-A-Other Generated",
          "fingerprint": "73A7B3E015184A9FB22313F799B0B525ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": false,
          "is_stub": false,
          "status": "pending",
          "tasks": [
            {
              "task_id": "648cac1c-2697-420b-a3fa-c2e8c85dd52d",
              "action": "escrow_encryption_key",
              "executor_id": "3cf60c57-2f0a-4c3b-96be-1db1e8e713fa",
              "state": "in_progress",
              "error": null,
              "can_acknowledge": false
            }
          ],
          "is_escrowed": true,
          "is_backup_key": false
        },
        {
          "id": "6df10b5b-cb88-4e9a-84a5-7bb60ebceb50",
          "name": "PORTAL3761TEST-20261031-223818-A-Used Uploaded",
          "fingerprint": "8023E986028840F590CD89A5342639CCABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": true,
          "is_stub": false,
          "status": "failed",
          "tasks": [
            {
              "task_id": "e251caec-f788-4482-b295-27a10f1633d6",
              "action": "delete_encryption_key",
              "executor_id": "3cf60c57-2f0a-4c3b-96be-1db1e8e713fa",
              "state": "failed",
              "error": {
                "message": "Synthetic test failure",
                "detected_at": "2026-10-31T22:39:01.263958Z"
              },
              "can_acknowledge": true
            }
          ],
          "is_escrowed": false,
          "is_backup_key": false
        }
      ],
      "backup_key": {
        "id": "9a6b5a08-838e-45c2-83f6-3fe976eecff0",
        "name": "PORTAL3761TEST-20261031-223818-A-Backup Secret",
        "fingerprint": "BB6F7247174F4290826E6D7BDBE302ACABCDEF12",
        "is_escrowed": false
      },
      "has_escrow_passphrase": false,
      "status": "failed",
      "tasks": [
        {
          "task_id": "037c5658-b05f-455e-9dd8-8430e4006dc8",
          "action": "update_escrow_passphrase",
          "executor_id": "3cf60c57-2f0a-4c3b-96be-1db1e8e713fa",
          "state": "failed",
          "error": {
            "message": "Synthetic test failure",
            "detected_at": "2026-10-31T22:39:01.263958Z"
          },
          "can_acknowledge": true
        }
      ]
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

- [by_parent_name_parameters_01.png](by_parent_name_parameters_01.png)
- [by_parent_name_parameters_02.png](by_parent_name_parameters_02.png)
- [by_parent_name_response_01.png](by_parent_name_response_01.png)
- [by_parent_name_response_02.png](by_parent_name_response_02.png)
- [by_parent_name_response_03.png](by_parent_name_response_03.png)
- [by_parent_name_response_04.png](by_parent_name_response_04.png)
- [by_parent_name_response_05.png](by_parent_name_response_05.png)

[Machine result](result.json)
