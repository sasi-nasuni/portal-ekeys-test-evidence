# 008 — permission_matrix_2_license_False

**PASS — HTTP 200**

Source: Served Swagger UI Try it out / Execute. Swagger displayed status, Request URL, and complete body matched the actual network response.

Permission profile: `view_2`. Fixture tenant: `A`. Escrow license control: `False`. Feature flag control: `True`.

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
- Passphrase fields, status and tasks visibility
- Child id
- Child name
- Child fingerprint
- Child origin
- Child used
- Child is_stub
- Child type from assigned backup pointer
- Child permission/license field omission
- Exact active/unacknowledged task membership
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
          "tasks": []
        }
      ]
    },
    {
      "id": "312eac4c-bcd6-4576-971b-3e99e5fe509d",
      "name": "PORTAL3761TEST-20261031-223818-A-Alpha Owner",
      "volume_role": "owner",
      "keys": [
        {
          "id": "77075460-20ce-48f3-8f4c-f7be6b4cd98a",
          "name": "PORTAL3761TEST-20261031-223818-A-Failed Upload",
          "fingerprint": "27DF297A3B97468B98400BC55A4FCC6FABCDEF12",
          "algorithm": null,
          "length": null,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": true,
          "status": "failed",
          "tasks": [
            {
              "task_id": "e2aa5016-c1fb-4ed0-9094-56190e6af39a",
              "action": "upload_encryption_key",
              "executor_id": "3cf60c57-2f0a-4c3b-96be-1db1e8e713fa",
              "state": "failed",
              "error": {
                "message": "Synthetic test failure",
                "detected_at": "2026-10-31T22:39:01.263958Z"
              },
              "can_acknowledge": false
            }
          ]
        },
        {
          "id": "0cfc6af7-fa04-4f39-814a-3f4a6717c0b3",
          "name": null,
          "fingerprint": "CF30605E74C348A78B05A4AF8FCBA223ABCDEF12",
          "algorithm": null,
          "length": null,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": true,
          "status": "creating",
          "tasks": [
            {
              "task_id": "aa80a492-4751-47cc-a2ce-dfbaa252db6e",
              "action": "upload_encryption_key",
              "executor_id": "3cf60c57-2f0a-4c3b-96be-1db1e8e713fa",
              "state": "in_progress",
              "error": null,
              "can_acknowledge": false
            }
          ]
        },
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
          "tasks": []
        },
        {
          "id": "fafb817f-2f4d-4ecf-8f01-ae3f8dd1eb01",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 01",
          "fingerprint": "857D0791D6EB4F43929990EDD1EF679EABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": []
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
          "tasks": []
        },
        {
          "id": "1dbe47d1-1a96-4171-a9d8-1fdabc0a96fa",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 03",
          "fingerprint": "CE56DC4E88974111A23AAD0A06F41491ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": []
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
          "tasks": []
        },
        {
          "id": "27d48a83-bca2-4123-9835-a8784dd4cc24",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 05",
          "fingerprint": "61788EB37E2E473080E136746D4FEA1AABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": []
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
          "tasks": []
        },
        {
          "id": "ee493e72-dff2-4026-9905-d18ee1a14390",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 07",
          "fingerprint": "89C546ED941142C3A63C015398275DDEABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": []
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
          "tasks": []
        },
        {
          "id": "eefd42d2-9e35-4923-af22-b6fe51d5252a",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 09",
          "fingerprint": "B567B59347C84B38828BD3A5C6683C5FABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": []
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
          "tasks": []
        },
        {
          "id": "c46af739-108f-43e1-b617-dafb9fe89e0a",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 11",
          "fingerprint": "51B0B121F71149AA8B0B30D2A01DBAFBABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": []
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
          "tasks": []
        },
        {
          "id": "97a9f4a4-321a-410c-a004-f4487da54429",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 13",
          "fingerprint": "C8252EB6E07E4F8A94FB2D65934CE16CABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": []
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
          "tasks": []
        },
        {
          "id": "fa00fa9c-37f3-4470-a9e1-a820eaecc84d",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 15",
          "fingerprint": "7787738E57134369ABA89333843F8D34ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": []
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
          "tasks": []
        },
        {
          "id": "c387136b-cc86-404b-8c06-56b749fbcf92",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 17",
          "fingerprint": "133AA9A3648D411EB32C09F636E4C2C1ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": []
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
          "tasks": []
        },
        {
          "id": "5626592f-d57a-41a4-98a4-16f284e1cbeb",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 19",
          "fingerprint": "0AD0A2486E354499BCB81FF13A4F519EABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": []
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
          "tasks": []
        },
        {
          "id": "21737952-b056-417f-9e82-5ca0d9e6f571",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 21",
          "fingerprint": "A4C2AC428EC640B4AAE05B9F59FDC660ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": []
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
          "tasks": []
        },
        {
          "id": "eb84a78c-cfcf-4be8-92d7-a5209446686e",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 23",
          "fingerprint": "DFE30F0E285A4E7F9EEBD10EC2ADBBC0ABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": []
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
          "tasks": []
        },
        {
          "id": "86edeb21-ded5-48e2-9662-6ccbc8b62d1f",
          "name": "PORTAL3761TEST-20261031-223818-A-Owner Key 25",
          "fingerprint": "D4FB313051B74E7EA3F13AF3CFFE5E8EABCDEF12",
          "algorithm": "rsa",
          "length": 2048,
          "type": "volume",
          "origin": "uploaded",
          "used": false,
          "is_stub": false,
          "status": "synced",
          "tasks": []
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
          "tasks": []
        }
      ]
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
          ]
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
              "can_acknowledge": false
            }
          ]
        }
      ]
    },
    {
      "id": "b17f9c3d-7010-47c9-a225-dd53b870b167",
      "name": "PORTAL3761TEST-20261031-223818-A-Delta Empty",
      "volume_role": null,
      "keys": []
    },
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
          "tasks": []
        }
      ]
    },
    {
      "id": "7a25c17a-0ebf-4446-a2ab-11366e3f5e30",
      "name": "PORTAL3761TEST-20261031-223818-A-Same Name",
      "volume_role": null,
      "keys": []
    },
    {
      "id": "eee84f3e-1c55-4d28-ac3d-c4e63bd1170d",
      "name": "PORTAL3761TEST-20261031-223818-A-Same Name",
      "volume_role": null,
      "keys": []
    }
  ],
  "metadata": {
    "iterator_id": null,
    "page_size": 25,
    "total_pages": 1,
    "total_items": 7,
    "page": 1
  },
  "dr_counts": {}
}
```

## Native Swagger screenshots

All parts of long responses are linked in capture order. The curl/authorization controls are masked.

- [permission_matrix_2_license_False_parameters_01.png](permission_matrix_2_license_False_parameters_01.png)
- [permission_matrix_2_license_False_parameters_02.png](permission_matrix_2_license_False_parameters_02.png)
- [permission_matrix_2_license_False_response_01.png](permission_matrix_2_license_False_response_01.png)
- [permission_matrix_2_license_False_response_02.png](permission_matrix_2_license_False_response_02.png)
- [permission_matrix_2_license_False_response_03.png](permission_matrix_2_license_False_response_03.png)
- [permission_matrix_2_license_False_response_04.png](permission_matrix_2_license_False_response_04.png)
- [permission_matrix_2_license_False_response_05.png](permission_matrix_2_license_False_response_05.png)
- [permission_matrix_2_license_False_response_06.png](permission_matrix_2_license_False_response_06.png)
- [permission_matrix_2_license_False_response_07.png](permission_matrix_2_license_False_response_07.png)
- [permission_matrix_2_license_False_response_08.png](permission_matrix_2_license_False_response_08.png)
- [permission_matrix_2_license_False_response_09.png](permission_matrix_2_license_False_response_09.png)
- [permission_matrix_2_license_False_response_10.png](permission_matrix_2_license_False_response_10.png)
- [permission_matrix_2_license_False_response_11.png](permission_matrix_2_license_False_response_11.png)
- [permission_matrix_2_license_False_response_12.png](permission_matrix_2_license_False_response_12.png)
- [permission_matrix_2_license_False_response_13.png](permission_matrix_2_license_False_response_13.png)
- [permission_matrix_2_license_False_response_14.png](permission_matrix_2_license_False_response_14.png)
- [permission_matrix_2_license_False_response_15.png](permission_matrix_2_license_False_response_15.png)
- [permission_matrix_2_license_False_response_16.png](permission_matrix_2_license_False_response_16.png)
- [permission_matrix_2_license_False_response_17.png](permission_matrix_2_license_False_response_17.png)
- [permission_matrix_2_license_False_response_18.png](permission_matrix_2_license_False_response_18.png)
- [permission_matrix_2_license_False_response_19.png](permission_matrix_2_license_False_response_19.png)
- [permission_matrix_2_license_False_response_20.png](permission_matrix_2_license_False_response_20.png)
- [permission_matrix_2_license_False_response_21.png](permission_matrix_2_license_False_response_21.png)
- [permission_matrix_2_license_False_response_22.png](permission_matrix_2_license_False_response_22.png)

[Machine result](result.json)
