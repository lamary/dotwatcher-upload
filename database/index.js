import { Pool } from 'pg';

const config = {
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: 'require',
  user: process.env.PGUSER,
};

const pool = new Pool(config);

export default {
  query: (text, params) => pool.query(text, params),
};
