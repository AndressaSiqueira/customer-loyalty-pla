-- Customer Loyalty Platform Database Schema

-- KPI Data Table
CREATE TABLE IF NOT EXISTS kpi_data (
    id VARCHAR(50) PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    value VARCHAR(50) NOT NULL,
    change VARCHAR(20) NOT NULL,
    trend VARCHAR(10) NOT NULL CHECK (trend IN ('up', 'down')),
    target VARCHAR(50) NOT NULL,
    progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
    color VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Operational Health Table
CREATE TABLE IF NOT EXISTS operational_health (
    id VARCHAR(50) PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    health VARCHAR(20) NOT NULL CHECK (health IN ('excellent', 'good', 'warning', 'critical')),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed KPI Data
INSERT INTO kpi_data (id, label, value, change, trend, target, progress, color) VALUES
    ('active-members', 'Active Members', '847,293', '+12.4%', 'up', '1M', 85, 'var(--ai-agents)'),
    ('engagement-rate', 'Engagement Rate', '11.2%', '+3.2%', 'up', '12%', 93, 'var(--microservices)'),
    ('redemption-rate', 'Redemption Rate', '24.8%', '+5.1%', 'up', '30%', 83, 'var(--data-platform)'),
    ('avg-transaction', 'Avg Transaction', '$127.50', '-2.3%', 'down', '$135', 94, 'var(--security)')
ON CONFLICT (id) DO UPDATE SET
    value = EXCLUDED.value,
    change = EXCLUDED.change,
    trend = EXCLUDED.trend,
    target = EXCLUDED.target,
    progress = EXCLUDED.progress,
    color = EXCLUDED.color,
    updated_at = CURRENT_TIMESTAMP;

-- Seed Operational Health Data
INSERT INTO operational_health (id, label, status, health) VALUES
    ('system-uptime', 'System Uptime', '99.94%', 'excellent'),
    ('api-latency', 'API Latency', '142ms', 'good'),
    ('active-campaigns', 'Active Campaigns', '23', 'excellent'),
    ('support-tickets', 'Open Tickets', '47', 'good')
ON CONFLICT (id) DO UPDATE SET
    status = EXCLUDED.status,
    health = EXCLUDED.health,
    updated_at = CURRENT_TIMESTAMP;
