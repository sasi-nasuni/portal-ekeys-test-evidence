-- Read-only PostgreSQL evidence query; account IDs are in the matching JSON file.
SELECT e.account_id::text, e.id::text AS appliance_id, e.name,
       e.is_stub AS appliance_is_stub, e.has_escrow_passphrase,
       e.backup_key_id::text, backup.name AS backup_key_name,
       backup.fingerprint AS backup_key_fingerprint,
       backup.is_escrowed AS backup_key_is_escrowed,
       count(k.id) FILTER (WHERE NOT k.is_stub) AS total,
       count(k.id) FILTER (WHERE NOT k.is_stub AND k.origin = 'generated') AS generated_count,
       count(k.id) FILTER (WHERE NOT k.is_stub AND k.is_escrowed) AS escrowed,
       count(k.id) FILTER (WHERE NOT k.is_stub AND NOT k.is_escrowed) AS not_escrowed
FROM edges_v2 AS e
LEFT JOIN encryption_keys AS k ON k.appliance_id = e.id AND k.account_id = e.account_id
LEFT JOIN encryption_keys AS backup ON backup.id = e.backup_key_id AND backup.account_id = e.account_id
WHERE e.account_id = ANY(%s::uuid[])
GROUP BY e.account_id, e.id, e.name, e.is_stub, e.has_escrow_passphrase,
         e.backup_key_id, backup.name, backup.fingerprint, backup.is_escrowed
ORDER BY e.account_id, e.name, e.id;
