# Express.js Backend Application

This is a backend application built using Node.js and Express.js, featuring Sequelize ORM for database management. It is designed to provide a RESTful API with robust features for managing resources.

---

## Table of Contents
- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [Database Management](#database-management)
- [Scripts](#scripts)
- [License](#license)
- [Contact](#contact)

---

## About the Project

This project provides a backend API with authentication, resource management, and database support using Sequelize. It is optimized for development and production environments.

---

## Tech Stack

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework
- **Sequelize**: ORM for database interactions
- **Database**: (Specify database, e.g., PostgreSQL, MySQL)
- **Babel**: ES6+ transpilation
- **Nodemon**: Auto-restart for development
- **cross-env**: Environment variable management

---

## Prerequisites

Before running the application, ensure you have:

1. **Node.js** (v14 or higher)
2. **npm** (or **yarn**)
3. A database server (e.g., PostgreSQL, MySQL)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/cedrotech1/taskforce-wallet-backend.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd your-repo-name
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Open the `.env` file and configure your database and other environment variables. For example:
     ```plaintext
     NODE_ENV=development
     DB_HOST=localhost
     DB_USERNAME=yourusername
     DB_PASSWORD=yourpassword
     DB_DATABASE=yourdatabase
     PORT=5000
     ```

5. **Run database migrations**:
   ```bash
   npm run migrate
   ```

6. **(Optional) Seed the database with initial data**:
   ```bash
   npm run seed
   ```

7. **Start the development server**:
   ```bash
   npm run start:dev
   ```

8. Access the application at `http://localhost:5000`.

---

## How to Run

### Development Mode
1. Ensure your `.env` file is properly configured.
2. Start the development server:
   ```bash
   npm run start:dev
   ```

### Production Mode
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the application in production mode:
   ```bash
   npm run start
   ```

---

## Database Management

The application uses Sequelize for managing the database schema and data.

- **Apply migrations**:
  ```bash
  npm run migrate
  ```

- **Undo all migrations**:
  ```bash
  npm run down
  ```

- **Run seeders**:
  ```bash
  npm run seed
  ```

- **Undo seeders**:
  ```bash
  npm run undo-seed
  ```

---

## Scripts

The `package.json` includes the following scripts:

- **Start the application (production)**:
  ```bash
  npm run start
  ```
- **Start the application in development mode**:
  ```bash
  npm run start:dev
  ```
- **Build the application**:
  ```bash
  npm run build
  ```
- **Run database migrations**:
  ```bash
  npm run migrate
  ```
- **Undo all database migrations**:
  ```bash
  npm run down
  ```
- **Run seeders**:
  ```bash
  npm run seed
  ```
- **Undo seeders**:
  ```bash
  npm run undo-seed
  ```

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Contact

For questions or feedback, contact:

- **Name**: Hakuzimana Cedrick
- **Email**: cedrick@example.com

