# Actual Swagger screenshots

Captured from the running PORTAL-3857 WebAPI through native Swagger **Try it out / Execute**. These are browser screenshots, not report renderings. Response status, URL and body were verified against the corresponding network response before capture.

This capture performed 15 GET requests: eight current read responses and the seven completed tasks retained from the original real-appliance run. The write commands were not replayed. The original export content was already consumed; its status readback is included, but no binary-download or original 202-response screenshot is claimed.

Credentials, request URLs containing identifiers, parameter inputs, UUIDs and key fingerprints are masked at screenshot time. Native response text was not substituted. Local feature/license cache controls were refreshed for this inspection; production entitlement is outside scope.

The earlier `images/` report renders are superseded by these screenshots for PR evidence. The original test results remain available in the parent directory.

## summary

`GET /edges/{edge_id}/encryption-keys/summary` → **200**

![summary](summary_response.png)

Controls: [summary_parameters_01.png](summary_parameters_01.png)

## public-key

`GET /edges/{edge_id}/public-key` → **200**

![public-key](public-key_response.png)

Controls: [public-key_parameters_01.png](public-key_parameters_01.png)

## passphrase-status

`GET /edges/{edge_id}/escrow-passphrase` → **200**

![passphrase-status](passphrase-status_response.png)

Controls: [passphrase-status_parameters_01.png](passphrase-status_parameters_01.png)

## key-list

`GET /encryption-keys` → **200**

![key-list](key-list_response_01.png)

![key-list](key-list_response_02.png)

Controls: [key-list_parameters_01.png](key-list_parameters_01.png), [key-list_parameters_02.png](key-list_parameters_02.png)

## key-detail

`GET /encryption-keys/{key_id}` → **200**

![key-detail](key-detail_response_01.png)

![key-detail](key-detail_response_02.png)

Controls: [key-detail_parameters_01.png](key-detail_parameters_01.png)

## volume-key-detail

`GET /volumes/{volume_id}/encryption-keys/{key_id}` → **200**

![volume-key-detail](volume-key-detail_response.png)

Controls: [volume-key-detail_parameters_01.png](volume-key-detail_parameters_01.png)

## task-upload_encryption_key

`GET /tasks/{task_id}` → **200**

![task-upload_encryption_key](task-upload_encryption_key_response.png)

Controls: [task-upload_encryption_key_parameters_01.png](task-upload_encryption_key_parameters_01.png)

## task-escrow_encryption_key

`GET /tasks/{task_id}` → **200**

![task-escrow_encryption_key](task-escrow_encryption_key_response.png)

Controls: [task-escrow_encryption_key_parameters_01.png](task-escrow_encryption_key_parameters_01.png)

## task-enable_volume_encryption_keys

`GET /tasks/{task_id}` → **200**

![task-enable_volume_encryption_keys](task-enable_volume_encryption_keys_response.png)

Controls: [task-enable_volume_encryption_keys_parameters_01.png](task-enable_volume_encryption_keys_parameters_01.png)

## task-disable_volume_encryption_keys

`GET /tasks/{task_id}` → **200**

![task-disable_volume_encryption_keys](task-disable_volume_encryption_keys_response.png)

Controls: [task-disable_volume_encryption_keys_parameters_01.png](task-disable_volume_encryption_keys_parameters_01.png)

## task-download_encryption_keys

`GET /tasks/{task_id}` → **200**

![task-download_encryption_keys](task-download_encryption_keys_response.png)

Controls: [task-download_encryption_keys_parameters_01.png](task-download_encryption_keys_parameters_01.png)

## task-update_escrow_passphrase

`GET /tasks/{task_id}` → **200**

![task-update_escrow_passphrase](task-update_escrow_passphrase_response.png)

Controls: [task-update_escrow_passphrase_parameters_01.png](task-update_escrow_passphrase_parameters_01.png)

## task-delete_encryption_key

`GET /tasks/{task_id}` → **200**

![task-delete_encryption_key](task-delete_encryption_key_response.png)

Controls: [task-delete_encryption_key_parameters_01.png](task-delete_encryption_key_parameters_01.png)

## download-status

`GET /edges/{edge_id}/encryption-keys/downloads/{task_id}` → **200**

![download-status](download-status_response.png)

Controls: [download-status_parameters_01.png](download-status_parameters_01.png)

## volume-key-list

`GET /volumes/{volume_id}/encryption-keys` → **200**

![volume-key-list](volume-key-list_response_01.png)

![volume-key-list](volume-key-list_response_02.png)

![volume-key-list](volume-key-list_response_03.png)

![volume-key-list](volume-key-list_response_04.png)

![volume-key-list](volume-key-list_response_05.png)

![volume-key-list](volume-key-list_response_06.png)

![volume-key-list](volume-key-list_response_07.png)

![volume-key-list](volume-key-list_response_08.png)

![volume-key-list](volume-key-list_response_09.png)

Controls: [volume-key-list_parameters_01.png](volume-key-list_parameters_01.png)

