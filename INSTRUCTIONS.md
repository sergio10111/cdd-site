## Setting Up a SvelteKit Project with MySQL and Prisma

This guide will walk you through the process of setting up a SvelteKit project with MySQL as the database and Prisma as the ORM.

### Prerequisites

- Node.js (version 14 or later) installed on your machine
- MySQL server installed and running
- Visual Studio Code (or any code editor) installed

### Step 1: Extract the project files

1. Download the project zip file.
2. Extract the contents of the zip file to a directory on your local machine.

### Step 2: Open the project in Visual Studio Code

1. Open Visual Studio Code.
2. Click on "File" in the top menu and select "Open Folder".
3. Navigate to the extracted project folder and click "Open".

### Step 3: Import the database

1. In the project folder, locate the "database" folder.
2. Inside the "database" folder, look for a file named `db.query.sql`. This file contains the database queries.
3. Open your preferred MySQL client (e.g., MySQL Workbench, phpMyAdmin).
4. Create a new database using the MySQL client.
5. Run the contents of the `db.query.sql` file against the newly created database to import the necessary tables and data.

### Step 4: Install dependencies and configure Prisma

1. In Visual Studio Code, navigate to the "site" folder within the project.
2. Open a terminal within the "site" folder.
3. Run the following command to install project dependencies:
   ```bash
   npm install
   ```
4. Once the installation is complete, run the following command to synchronize Prisma with the database:
   ```bash
   npx prisma db pull
   ```

### Step 5: Start the development server

1. In the same terminal within the "site" folder, start the development server by running the following command:
   ```bash
   npm run dev -- --open
   ```
   This command starts the SvelteKit development server and automatically opens your default web browser to view the project.

Congratulations! You have set up the SvelteKit project with MySQL and Prisma. You can now begin developing and modifying the project according to your requirements.

**Note:** Make sure to handle security concerns such as environment variable protection and securing database connections when deploying your project to production.

That's it! You're ready to start building your SvelteKit application with MySQL and Prisma. Happy coding!