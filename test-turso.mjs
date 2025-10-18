import 'dotenv/config';
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

try {
  const result = await client.execute('SELECT 1+1 AS result');
  console.log('✅ Connected successfully:', result.rows);
} catch (err) {
  console.error('❌ Connection failed:', err);
}
