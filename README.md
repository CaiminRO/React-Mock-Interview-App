# Setup
Open a terminal with the current working directory being the root, and run these in order:
- ``npm install``
  - installs `concurrently` package
- ``npm run setup``
  - installs packages for frontend THEN backend
  - applies the available database migrations THEN seeds the tables

Then you have the option of starting the server and client using `concurrently`
- ``npm run start:all``

or by making two separate terminals and running these commands individually in them
- ``npm run start:frontend``
- ``npm run start:backend``

## Database Seeding
Adds an **Admin-level** account with credentials:
- `username:` admin
- `email:` admin@example.com
- `password:` 123456