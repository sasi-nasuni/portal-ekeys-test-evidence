-- Read-only PostgreSQL evidence query; account IDs are in the matching JSON file.
SELECT account_id::text, id::text AS task_id, resource, resource_id,
       action, executor, executor_id::text, initiated_by, initiator_id::text,
       state, status, reason, user_acknowledged_at, created_at, last_updated_at,
       (state = 'in_progress' OR (state = 'failed' AND user_acknowledged_at IS NULL)) AS active_for_read
FROM tasks
WHERE account_id = ANY(%s::uuid[])
ORDER BY account_id, created_at DESC, id DESC;
