import * as path from 'path';
import * as Dotenv from 'dotenv';
Dotenv.config({ path: '.env' });
//print process.env.NODE_ENV
console.log('process.env.NODE_ENV', process.env.PG_PORT);
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.PG_DB,
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
    },
    migrations: {
      extension: 'ts',
      tableName: 'migrations',
      directory: path.join(__dirname, 'migrations'),
      stub: path.join(__dirname, 'migrations', 'migration.stub'),
      timezone: 'UTC',
    },
    seeds: {
      directory: path.join(__dirname, '/seeds'),
      loadExtensions: ['.ts'],
      stub: path.join(__dirname, '/seeds/seed.stub'),
    },
  },
  staging: {
    client: 'postgresql',
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
    },
  },
}[process.env.NODE_ENV || 'development'];
