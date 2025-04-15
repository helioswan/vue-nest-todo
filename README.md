
# Todo App

A Trello-style web application built as part of a technical test. Users can create boards and manage tasks within each board.

## Built With

This section highlights the core technologies that are used in this project.

- ![Vue.js](https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
- ![NestJS](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## Additional Technical Features

- Github action workflow
- Dockerization (Prod + Dev)
- API Documentation with Swagger OpenAPI


## Installation

### Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or later)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### Clone the repository

1. Clone the repo
   ```sh
   git clone https://github.com/helioswan/vue-nest-todo.git
   cd vue-nest-todo
   ```
2. Copy the example environment file

   ```bash
   cp .env.example .env
   ```

3. Edit the `.env` file with your own API keys and environment settings.


## Running Docker Compose for Dev and Prod

This project uses **Docker Compose** to run both development and production environments.

### Development Environment

To run the application in **development** mode, use the following command:

```bash
docker-compose -f 'docker-compose.dev.yml' up --build -d
```

This will start the frontend and backend services in development mode, with hot-reloading enabled.

### Production Environment

To build and run the application in **production** mode, use this command:

```bash
docker-compose -f 'docker-compose.prod.yml' up --build -d
```

In production mode, optimizations are made for better performance, and services will run in detached mode.

> **Note:** Ensure you have the correct environment variables set for production before running.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `DB_URI` – The MongoDB connection string

- `DB_NAME` – The name of the database

- `MONGO_INITDB_ROOT_USERNAME` – The MongoDB root username for initialization

- `MONGO_INITDB_ROOT_PASSWORD` – The MongoDB root password for initialization

- `BACKEND_PORT` – The port for the backend service

- `FRONTEND_PORT` – The port for the frontend service

- `JWT_SECRET` – Secret key used for signing JWT tokens

- `VITE_API_URL` – The URL for the backend API (used in frontend)

- `VITE_BASE_URL` – The base URL for the frontend (used in frontend)

Make sure to replace any sensitive information such as passwords or secrets with the appropriate values for your environment.