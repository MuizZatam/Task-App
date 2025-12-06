CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'In-Progress', 'Completed')),
    priority VARCHAR(20) DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High')),
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);

INSERT INTO tasks (title, description, status, priority, due_date) VALUES
('Complete project documentation', 'Write comprehensive API documentation', 'Pending', 'High', '2024-12-31'),
('Fix bug in authentication', 'Users unable to login with special characters', 'In-Progress', 'High', '2024-12-15'),
('Update dependencies', 'Update npm packages to latest versions', 'Pending', 'Medium', '2024-12-20'),
('Code review', 'Review pull requests from team', 'Completed', 'Medium', '2024-12-10');
