-- Read-only PostgreSQL evidence query; account IDs are in the matching JSON file.
SELECT a.account_id::text, a.id::text AS association_id,
       a.key_id::text, k.name AS key_name, a.volume_id,
       v.name AS volume_name, a.state, a.is_stub,
       k.appliance_id::text AS owning_appliance_id,
       EXISTS (
         SELECT 1 FROM volume_connections AS c
         WHERE c.account_id = a.account_id AND c.volume_id = a.volume_id
           AND c.edge_id = k.appliance_id AND c.is_master
       ) AS key_owned_by_volume_master
FROM volume_encryption_key_associations AS a
JOIN encryption_keys AS k ON k.id = a.key_id AND k.account_id = a.account_id
JOIN volumes_v2 AS v ON v.volume_id = a.volume_id AND v.account_id = a.account_id
WHERE a.account_id = ANY(%s::uuid[])
ORDER BY a.account_id, v.name, k.name NULLS LAST, a.id;
