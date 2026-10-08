-- Read-only PostgreSQL evidence query; account IDs are in the matching JSON file.
SELECT v.account_id::text, v.id::text AS volume_row_id, v.volume_id,
       v.name AS volume_name, v.is_stub AS volume_is_stub,
       c.id::text AS connection_id, c.edge_id::text AS appliance_id,
       c.is_master, e.name AS appliance_name
FROM volumes_v2 AS v
LEFT JOIN volume_connections AS c ON c.volume_id = v.volume_id AND c.account_id = v.account_id
LEFT JOIN edges_v2 AS e ON e.id = c.edge_id AND e.account_id = v.account_id
WHERE v.account_id = ANY(%s::uuid[])
ORDER BY v.account_id, v.name, c.id;
