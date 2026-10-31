# 042 — generated

**PASS — HTTP 200**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `full`. Fixture tenant: `A`. Escrow license control: `True`. Feature flag control: `True`.

## Actual request

`GET http://127.0.0.1:8000/edges/encryption-keys?origin=generated&sort_by=appliance_name&sort_direction=asc&limit=25`

Intended query: `{"origin": ["generated"]}`

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
- Task state and action
- Acknowledgement capability respects management permission

## Response

```json
{
  "items": [
    {
      "id": "ee7f6da2-9958-450c-b995-22f12befd15b",
      "name": "PORTAL3761TEST-20261031-223818-A-100%_Path\\Name",
      "volume_role": null,
      "keys": [
        {
          "id": "6569459f-6fe8-4692-870e-744b5082db7c",
          "name": "PORTAL3761TEST-20261031-223818-A-Literal 100%_Path\\Name",
          "fingerprint": "6F383093DDA34647B13505B847994ED7ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": true,
          "is_backup_key": false
        }
      ],
      "backup_key": null,
      "has_escrow_passphrase": true,
      "status": "synced",
      "tasks": []
    },
    {
      "id": "312eac4c-bcd6-4576-971b-3e99e5fe509d",
      "name": "PORTAL3761TEST-20261031-223818-A-Alpha Owner",
      "volume_role": "owner",
      "keys": [
        {
          "id": "c31df2f9-bdd6-4b88-9397-4edd9f207679",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 00",
          "fingerprint": "C12CC572D7B9424D97F090093F9177B6ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": true,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": true,
          "is_backup_key": false
        },
        {
          "id": "bef923d9-b7e7-4840-8aa1-f30d3b2025c5",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 02",
          "fingerprint": "AC7CEDDF873F4670A8443FCAFE649FCEABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": false,
          "is_backup_key": false
        },
        {
          "id": "ea67bc06-af21-4958-9057-944064ae72b3",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 04",
          "fingerprint": "9D5D2B634A87424FA57F8F5347E87AA5ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": true,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": false,
          "is_backup_key": false
        },
        {
          "id": "a2b8521a-a6f3-4a0c-bffa-1cd2f305f341",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 06",
          "fingerprint": "7FB8CC522173479EB3D5B0D2AE5E4CB7ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": true,
          "is_backup_key": false
        },
        {
          "id": "bd4bcadd-7896-434b-a026-6a3aff608796",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 08",
          "fingerprint": "F289BC6F53824108A065A02B12972F39ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": true,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": false,
          "is_backup_key": false
        },
        {
          "id": "2c393505-0791-46e1-9de9-3fc8f3c45a44",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 10",
          "fingerprint": "1B2D509B086149B28ED282579BD82C02ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": false,
          "is_backup_key": false
        },
        {
          "id": "cc333165-1d67-4dff-8333-5a566e827a8b",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 12",
          "fingerprint": "5685B9D66C054473B7821DC3582B704FABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": true,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": true,
          "is_backup_key": false
        },
        {
          "id": "f3bb7ee7-18a2-4e23-bd39-8cebaed86345",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 14",
          "fingerprint": "BAD2091164C943758584A12E6B9AC5B9ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": false,
          "is_backup_key": false
        },
        {
          "id": "4a66058e-c84c-4353-8eeb-c8e1b5d88b1d",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 16",
          "fingerprint": "128F7B1E209B46BF9018C87C969E67F9ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": true,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": false,
          "is_backup_key": false
        },
        {
          "id": "7744f2e4-69cb-481b-a7af-74ca081a0b92",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 18",
          "fingerprint": "C30EE4D2F8F34D8B81574B6E4887376EABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": true,
          "is_backup_key": false
        },
        {
          "id": "bb7cb656-8a00-43d2-8db2-41b52e8fef99",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 20",
          "fingerprint": "FD8D5B79E0434988B4E50E88B12111E1ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": true,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": false,
          "is_backup_key": false
        },
        {
          "id": "8ed71bda-1284-4d3b-abe1-6f0ef2a1f5e2",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 22",
          "fingerprint": "1500670F9FD04B43BCE6CF812F5FA201ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": false,
          "is_backup_key": false
        },
        {
          "id": "86d8cdf5-339a-4a6c-8c0e-5ebe8778da6c",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 24",
          "fingerprint": "7D78AB67267D49228B70C2264E8EC13AABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": true,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": true,
          "is_backup_key": false
        },
        {
          "id": "4e94aae7-6953-4ce6-b639-df6e76b68aa1",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 26",
          "fingerprint": "9D326A2F314845EF8D3F3A278D16D180ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "generated",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": [],
          "is_escrowed": false,
          "is_backup_key": false
        }
      ],
      "backup_key": null,
      "has_escrow_passphrase": true,
      "status": "synced",
      "tasks": []
    },
    {
      "id": "3cf60c57-2f0a-4c3b-96be-1db1e8e713fa",
      "name": "PORTAL3761TEST-20261031-223818-A-Beta Remote",
      "volume_role": "remote_only",
      "keys": [
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
    "total_items": 3,
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

- [generated_parameters_01.png](generated_parameters_01.png)
- [generated_parameters_02.png](generated_parameters_02.png)
- [generated_response_01.png](generated_response_01.png)
- [generated_response_02.png](generated_response_02.png)
- [generated_response_03.png](generated_response_03.png)
- [generated_response_04.png](generated_response_04.png)
- [generated_response_05.png](generated_response_05.png)
- [generated_response_06.png](generated_response_06.png)
- [generated_response_07.png](generated_response_07.png)
- [generated_response_08.png](generated_response_08.png)
- [generated_response_09.png](generated_response_09.png)
- [generated_response_10.png](generated_response_10.png)
- [generated_response_11.png](generated_response_11.png)
- [generated_response_12.png](generated_response_12.png)
- [generated_response_13.png](generated_response_13.png)

[Machine result](result.json)
