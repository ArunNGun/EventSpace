# PostgreSQL Database Setup for EventSpace

This document provides instructions for working with the PostgreSQL database for the EventSpace application.

## Database Information

- **Database Name**: `eventspace_dev`
- **Username**: `eventspace_user`
- **Password**: `eventspace_password`
- **Host**: `localhost`
- **Port**: `5432`
- **Connection URL**: `postgresql://eventspace_user:eventspace_password@localhost:5432/eventspace_dev`

## Starting and Stopping the Database

The database is set up using Docker Compose. To manage it:

```bash
# Start the database
docker-compose up -d

# Stop the database
docker-compose down

# Stop the database and remove volumes (this will delete all data)
docker-compose down -v
```

## Connecting to the Database

### Using psql CLI

```bash
# Connect to the database from the host machine (if psql is installed)
psql -h localhost -p 5432 -U eventspace_user -d eventspace_dev

# Connect to the database from inside the container
docker exec -it eventspace_postgres psql -U eventspace_user -d eventspace_dev
```

### Using Prisma

The connection string is already set up in the `.env` file. To use Prisma:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio
```

### Using GUI Tools

You can connect using tools like:
- pgAdmin
- DBeaver
- Postico 2 (that's what i use)

Use the connection details provided above.

## Common PostgreSQL Commands

```sql
-- List all databases
\l

-- Connect to a database
\c eventspace_dev

-- List all tables
\dt

-- Describe a table
\d table_name

-- Execute a query
SELECT * FROM table_name;

-- Create a new table
CREATE TABLE table_name (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Insert data
INSERT INTO table_name (name) VALUES ('example');
```

## Backup and Restore

```bash
# Backup the database
docker exec -t eventspace_postgres pg_dump -U eventspace_user eventspace_dev > backup.sql

# Restore the database
cat backup.sql | docker exec -i eventspace_postgres psql -U eventspace_user -d eventspace_dev
```

## Troubleshooting

- If you can't connect to the database, make sure the container is running: `docker ps`
- If the port is already in use, you may need to stop other PostgreSQL instances or change the port in docker-compose.yml
- Check logs: `docker logs eventspace_postgres`