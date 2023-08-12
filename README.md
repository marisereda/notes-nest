# notes-nest

## Description

Notes API allows the user to add, edit, remove notes. There is also a statistical presentation of active and archived notes by category.

## Technology stack

- Node.js
- TypeScript
- Nest.js

## Endpoints

- `POST /notes` - Create a note object.
- `DELETE /notes/:id` - Remove item.
- `PATCH /notes/:id` - Edit item.
- `GET /notes/:id` - Retrieve item.
- `GET /notes` - Get all notes.
- `GET /notes/stats` - Get aggregated data statistics.

## Run Server

### Clone repository

```bash
git clone https://github.com/marisereda/notes-nest.git
```

## Run in Docker

```bash
# run containers
docker-compose up
```

Server will be started on `http://localhost:3000`

```bash
# stop containers
docker-compose down
```
