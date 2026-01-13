// Database configuration
export const config = {
  database: {
    // Support both Azure SQL and PostgreSQL
    type: process.env.DB_TYPE || 'postgres', // 'mssql' or 'postgres'
    
    // Azure SQL configuration
    mssql: {
      server: process.env.DB_SERVER || '',
      database: process.env.DB_NAME || '',
      user: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
      options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: false
      }
    },
    
    // PostgreSQL configuration
    postgres: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'loyalty_platform',
      user: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    }
  },
  
  server: {
    port: parseInt(process.env.PORT || '3000'),
    corsOrigin: process.env.CORS_ORIGIN || '*'
  }
};

// Validate required configuration
export function validateConfig() {
  const dbType = config.database.type;
  
  if (dbType === 'mssql') {
    if (!config.database.mssql.server || !config.database.mssql.user || !config.database.mssql.password) {
      throw new Error('Missing required Azure SQL configuration: DB_SERVER, DB_USER, and DB_PASSWORD must be set');
    }
  } else if (dbType === 'postgres') {
    if (!config.database.postgres.user || !config.database.postgres.password) {
      throw new Error('Missing required PostgreSQL configuration: DB_USER and DB_PASSWORD must be set');
    }
  }
}
