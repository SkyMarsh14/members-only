#!/usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");
const { argv } = require("node:process");

const USER = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) UNIQUE,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    password VARCHAR (255),
    "hasMembership" BOOLEAN
)`;

const MESSAGE = `CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    userId INTEGER,
    text VARCHAR (255),
    FOREIGN KEY (userId) REFERENCES users(id)
)`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: argv[2] || process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(USER);
  await client.query(MESSAGE);
  await client.end();
  console.log("Completed.");
}

main();
