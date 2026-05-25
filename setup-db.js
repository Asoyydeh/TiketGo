const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'Kenji890aaa.',
  host: 'localhost',
  port: 5432,
  database: 'postgres'
});

async function main() {
  await client.connect();
  try {
    await client.query('CREATE DATABASE db_tiket_go');
    console.log('Database created successfully');
  } catch (e) {
    if (e.code === '42P04') {
        console.log('Database already exists');
    } else {
        console.error(e);
    }
  }
  await client.end();
}

main();
