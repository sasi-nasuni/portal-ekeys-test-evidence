-- Read-only PostgreSQL evidence query; account IDs are in the matching JSON file.
SELECT k.account_id::text, k.id::text, k.name, k.fingerprint,
       k.appliance_id::text, e.name AS appliance_name,
       k.algorithm, k.length, k.origin, k.is_escrowed, k.is_stub,
       COALESCE(e.backup_key_id = k.id, false) AS is_backup_key,
       k.created_at, k.updated_at
FROM encryption_keys AS k
JOIN edges_v2 AS e ON e.id = k.appliance_id AND e.account_id = k.account_id
WHERE k.account_id = ANY(%s::uuid[])
ORDER BY k.account_id, k.is_stub DESC, k.name NULLS LAST, k.id;
