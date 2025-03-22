#!/usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");
const { argv } = require("node:process");
const bcrypt = require("bcryptjs");

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
    title VARCHAR (255),
    text VARCHAR (255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
)`;

// Sample data for seeding
const users = [
  {
    username: "Sarah_Johnson28",
    firstName: "Sarah",
    lastName: "Johnson",
    password: "p@ssw0rd123",
    hasMembership: true,
  },
  {
    username: "TechGuy_Mike",
    firstName: "Mike",
    lastName: "Williams",
    password: "t3chL0ver!",
    hasMembership: true,
  },
  {
    username: "BookwormEllie",
    firstName: "Ellie",
    lastName: "Thompson",
    password: "b00kL0v3r",
    hasMembership: false,
  },
  {
    username: "FitnessFanatic92",
    firstName: "Jordan",
    lastName: "Lee",
    password: "Str0ngP@ss!",
    hasMembership: true,
  },
  {
    username: "CoffeeAddict_Sam",
    firstName: "Sam",
    lastName: "Garcia",
    password: "c0ff33B3@n$",
    hasMembership: false,
  },
  {
    username: "WanderlustAlex",
    firstName: "Alex",
    lastName: "Rivera",
    password: "Tr@v3l2025!",
    hasMembership: true,
  },
  {
    username: "CookingWithJoy",
    firstName: "Joy",
    lastName: "Kim",
    password: "Ch3fJoy123!",
    hasMembership: true,
  },
  {
    username: "NightOwl_Programmer",
    firstName: "Taylor",
    lastName: "Chen",
    password: "C0d3All_N1ght",
    hasMembership: false,
  },
  {
    username: "PlantParentPat",
    firstName: "Pat",
    lastName: "Johnson",
    password: "Gr33nThumb!",
    hasMembership: false,
  },
  {
    username: "MovieBuff_Taylor",
    firstName: "Taylor",
    lastName: "Smith",
    password: "F1lmL0v3r!",
    hasMembership: true,
  },
];

const messages = [
  {
    title: "Air Purifier Recommendations",
    text: "Does anyone have recommendations for a good air purifier? My allergies have been terrible this spring.",
  },
  {
    title: "New GPU Installation",
    text: "Just upgraded my gaming rig with the new RTX 5080. The performance boost is insane!",
  },
  {
    title: "Book Review: The Midnight Library",
    text: "Finished 'The Midnight Library' yesterday and I can't stop thinking about it. Has anyone else read it?",
  },
  {
    title: "Workout Progress",
    text: "Day 30 of my new workout routine and I'm already seeing results! Consistency really is key.",
  },
  {
    title: "Coffee Discovery",
    text: "Discovered this small batch roaster near my office. Their Ethiopian blend has changed my mornings forever.",
  },
  {
    title: "Southeast Asia Trip Planning",
    text: "Planning a 2-week trip to Southeast Asia this summer. Any must-see places in Thailand or Vietnam?",
  },
  {
    title: "Homemade Pasta Success",
    text: "Made homemade pasta for the first time yesterday. So much work but totally worth it!",
  },
  {
    title: "Late Night Coding Woes",
    text: "Why is debugging code I wrote at 2am always such a nightmare? Past me is my worst enemy.",
  },
  {
    title: "Plant Growth Update",
    text: "My monstera just sprouted a new leaf and I'm unreasonably excited about it.",
  },
  {
    title: "Movie Review",
    text: "Just watched that new sci-fi film everyone's talking about. The visuals were amazing but the plot had so many holes.",
  },
  {
    title: "Hiking Trail Question",
    text: "Has anyone hiked the Eagle Peak trail recently? Wondering about current conditions.",
  },
  {
    title: "Recipe Modification Help",
    text: "Trying to modify a cake recipe to be gluten-free. Any suggestions for flour substitutes that won't affect texture?",
  },
  {
    title: "New Podcast Recommendation",
    text: "Started listening to this amazing science podcast. They explain complex topics in such an accessible way.",
  },
  {
    title: "Home Office Setup",
    text: "Finally upgraded my home office with a standing desk and proper lighting. What a difference it makes!",
  },
  {
    title: "Language Learning Progress",
    text: "Six months into learning Spanish and I just had my first conversation with a native speaker!",
  },
];

// Function to generate a random date within the past 30 days
function getRandomDate() {
  const now = new Date();
  // Random number of days ago (0-30)
  const daysAgo = Math.floor(Math.random() * 30);
  // Random number of hours (0-23)
  const hoursAgo = Math.floor(Math.random() * 24);
  // Random number of minutes (0-59)
  const minutesAgo = Math.floor(Math.random() * 60);

  const date = new Date(now);
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  date.setMinutes(date.getMinutes() - minutesAgo);

  return date.toISOString();
}

async function seedUsers(client) {
  console.log("Seeding users...");

  // Insert each user
  for (const user of users) {
    // Hash the password (in a real application)
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await client.query(
      `INSERT INTO users (username, "firstName", "lastName", password, "hasMembership") 
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (username) DO NOTHING`,
      [
        user.username,
        user.firstName,
        user.lastName,
        hashedPassword,
        user.hasMembership,
      ]
    );
  }

  console.log(`${users.length} users seeded.`);
}

async function seedMessages(client) {
  console.log("Seeding messages...");

  // Get all user IDs
  const userResult = await client.query("SELECT id FROM users");
  const userIds = userResult.rows.map((row) => row.id);

  if (userIds.length === 0) {
    console.log("No users found. Cannot seed messages.");
    return;
  }

  // Insert messages with random user IDs and timestamps
  let messageCount = 0;
  for (const message of messages) {
    // Assign to random user
    const randomUserIndex = Math.floor(Math.random() * userIds.length);
    const userId = userIds[randomUserIndex];
    const randomDate = getRandomDate();

    await client.query(
      `INSERT INTO messages (userId, title, text, created_at) 
       VALUES ($1, $2, $3, $4)`,
      [userId, message.title, message.text, randomDate]
    );
    messageCount++;
  }

  // Add some additional random messages to random users
  for (let i = 0; i < 10; i++) {
    const randomUserIndex = Math.floor(Math.random() * userIds.length);
    const userId = userIds[randomUserIndex];
    const randomMessageIndex = Math.floor(Math.random() * messages.length);
    const message = messages[randomMessageIndex];
    const randomDate = getRandomDate();

    await client.query(
      `INSERT INTO messages (userId, title, text, created_at) 
       VALUES ($1, $2, $3, $4)`,
      [
        userId,
        `RE: ${message.title}`,
        `This is a response to: ${message.text}`,
        randomDate,
      ]
    );
    messageCount++;
  }

  console.log(`${messageCount} messages seeded.`);
}

async function main() {
  console.log("Setting up database and seeding data...");
  const client = new Client({
    connectionString: argv[2] || process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    // Create tables
    await client.query(USER);
    await client.query(MESSAGE);

    // Seed data
    await seedUsers(client);
    await seedMessages(client);

    console.log("Database setup and seeding completed successfully.");
  } catch (error) {
    console.error("Error during database setup and seeding:", error);
  } finally {
    await client.end();
  }
}

main();
