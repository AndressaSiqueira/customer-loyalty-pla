-- Customer Loyalty Platform Database Schema (Azure SQL / SQL Server)

-- KPI Data Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'kpi_data')
BEGIN
    CREATE TABLE kpi_data (
        id VARCHAR(50) PRIMARY KEY,
        label VARCHAR(100) NOT NULL,
        value VARCHAR(50) NOT NULL,
        change VARCHAR(20) NOT NULL,
        trend VARCHAR(10) NOT NULL CHECK (trend IN ('up', 'down')),
        target VARCHAR(50) NOT NULL,
        progress INT NOT NULL CHECK (progress >= 0 AND progress <= 100),
        color VARCHAR(50) NOT NULL,
        updated_at DATETIME2 DEFAULT GETUTCDATE()
    );
END
GO

-- Operational Health Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'operational_health')
BEGIN
    CREATE TABLE operational_health (
        id VARCHAR(50) PRIMARY KEY,
        label VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL,
        health VARCHAR(20) NOT NULL CHECK (health IN ('excellent', 'good', 'warning', 'critical')),
        updated_at DATETIME2 DEFAULT GETUTCDATE()
    );
END
GO

-- Seed KPI Data
MERGE INTO kpi_data AS target
USING (VALUES
    ('active-members', 'Active Members', '847,293', '+12.4%', 'up', '1M', 85, 'var(--ai-agents)'),
    ('engagement-rate', 'Engagement Rate', '11.2%', '+3.2%', 'up', '12%', 93, 'var(--microservices)'),
    ('redemption-rate', 'Redemption Rate', '24.8%', '+5.1%', 'up', '30%', 83, 'var(--data-platform)'),
    ('avg-transaction', 'Avg Transaction', '$127.50', '-2.3%', 'down', '$135', 94, 'var(--security)')
) AS source (id, label, value, change, trend, target, progress, color)
ON target.id = source.id
WHEN MATCHED THEN
    UPDATE SET 
        label = source.label,
        value = source.value,
        change = source.change,
        trend = source.trend,
        target = source.target,
        progress = source.progress,
        color = source.color,
        updated_at = GETUTCDATE()
WHEN NOT MATCHED THEN
    INSERT (id, label, value, change, trend, target, progress, color)
    VALUES (source.id, source.label, source.value, source.change, source.trend, source.target, source.progress, source.color);
GO

-- Seed Operational Health Data
MERGE INTO operational_health AS target
USING (VALUES
    ('system-uptime', 'System Uptime', '99.94%', 'excellent'),
    ('api-latency', 'API Latency', '142ms', 'good'),
    ('active-campaigns', 'Active Campaigns', '23', 'excellent'),
    ('support-tickets', 'Open Tickets', '47', 'good')
) AS source (id, label, status, health)
ON target.id = source.id
WHEN MATCHED THEN
    UPDATE SET 
        label = source.label,
        status = source.status,
        health = source.health,
        updated_at = GETUTCDATE()
WHEN NOT MATCHED THEN
    INSERT (id, label, status, health)
    VALUES (source.id, source.label, source.status, source.health);
GO
