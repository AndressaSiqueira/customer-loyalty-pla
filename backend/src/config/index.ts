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
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    }
  },
  
  server: {
    port: parseInt(process.env.PORT || '3000'),
    corsOrigin: process.env.CORS_ORIGIN || '*'
  }
};
