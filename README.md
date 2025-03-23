# Members Only

An exclusive clubhouse web application where members can write anonymous posts. Inside the clubhouse, members can see who authored each post, but outside they can only see the story and wonder who wrote it.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Overview

Members Only is a NodeJS web application featuring authentication, user roles, and content creation. This project demonstrates important concepts in web development including user authentication, authorization with different permission levels, and database management.

## Features

- **User Authentication**: Sign up, log in, and secure password management
- **Membership Levels**: Regular users and members with special privileges
- **Admin Functionality**: Special admin users can moderate content
- **Anonymous Posting**: Author information is only visible to members
- **Message Board**: Users can create and view messages
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: Passport.js, bcrypt
- **Validation**: express-validator
- **Frontend**: EJS templating, CSS, JavaScript
- **Deployment**: Heroku/Render/Railway

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SkyMarsh14/members-only.git
   cd members-only
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables) section)

4. Set up the database (see [Database Setup](#database-setup) section)

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Visit `http://localhost:3000` in your browser

## Database Setup

1. Install PostgreSQL if you haven't already
2. Create a new PostgreSQL database:
   ```bash
   createdb members_only
   ```
3. Run the database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=postgres://username:password@localhost:5432/members_only
SECRET=your_session_secret_here
```

## Usage

### User Registration

1. Navigate to the sign-up page
2. Fill out the form with first name, last name, username, and password
3. Account will be created as a regular user (non-member)

### Becoming a Member

1. Log in to your account
2. Navigate to the /membership page
3. Enter the secret passcode to gain member status

### Creating Messages

1. Log in to your account
2. Click on "Create a new message"
3. Fill out the title and content of your message
4. Submit to post your message

### Admin Functions

1. Log in with an admin account
2. Navigate to any message
3. Use the delete button to remove inappropriate content

## Project Structure

```
members-only/
├── config/                 # Configuration files
├── controllers/            # Route controllers
├── db/                     # Database models
├── public/                 # Static files (CSS, JS, images)
├── routes/                 # Application routes
├── views/                  # EJS templates
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── app.js                  # Application entry point
├── package.json            # Package configuration
└── README.md               # Project documentation
```

## API Endpoints

### Authentication

- `GET /sign-up` - Sign up page
- `POST /sign-up` - Create new user
- `GET /sing-in` - Login page
- `POST /sign-in` - Authenticate user
- `GET /logout` - Log out user
- `GET /membership` - Club membership page
- `POST /membership` - Process club membership

### Messages

- `GET /posts` - View all messages
- `POST /posts` - Submit new message
- `POST /posts/delete` - Delete message (admin only)

## Authentication

This project uses Passport.js for authentication with the following strategies:

- Local strategy for username/password login
- Session-based authentication for persistent login
- bcrypt for secure password hashing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
