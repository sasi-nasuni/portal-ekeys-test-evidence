-- Actual query forms used by the extra runner snapshot helper. Account UUIDs are recorded in evidence JSON.
SELECT row_to_json(t) FROM (SELECT * FROM tasks WHERE account_id=ANY(%s::uuid[]) ORDER BY id) t;
SELECT row_to_json(t) FROM (SELECT * FROM task_steps WHERE account_id=ANY(%s::uuid[]) ORDER BY id) t;
SELECT row_to_json(t) FROM (SELECT * FROM messages WHERE account_id=ANY(%s::uuid[]) ORDER BY id) t;
