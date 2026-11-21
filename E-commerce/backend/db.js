const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'foodexpress',
    port: Number(process.env.DB_PORT) || 3307,
    // Most cloud MySQL providers require SSL
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
async function testConnection() {
    try {
        const connection = await db.getConnection();
        console.log('FoodExpress MySQL connected successfully!');
        connection.release();
    } catch (error) {
        console.error('MySQL connection failed:', error.message);
    }
}

testConnection();

module.exports = db;
