
# Documentation

This repository is a back-end app management for to-do list. It is created using Node.js, Express.js, and MongoDB. It provides not only CRUD APIs for task management, but as well as user management.

## Table Of Contents

- [Installation](#installation)
- [Running the Server](#running-the-server)
- [User API Endpoints](#user-api-endpoints)
  - [POST /users/signup]()
  - [POST /users/signin]()
  - [GET /users]()
  - [DELETE /users]()
- [User API Examples]()
- [Task API Endpoints](#task-api-endpoints)
  - [GET /todos](#get-todos)
  - [GET /todos/:id](#get-todosid)
  - [POST /todos](#post-todos)
  - [PATCH /todos/:id](#patch-todosid)
  - [DELETE /todos/:id](#delete-todosid)
  - [DELETE /todos](#delete-todos)
- [Task API Examples](#task-api-examples)

## installation

1. Clone this repository:

   ```bash
   git clone https://github.com/syahba/todo-api.git
   ```

2. Change to the repository's directory:

   ```bash
   cd todo-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Make sure you've installed and configured connection to MongoDB in `.env` file.

## Running the Server

To run the server, use this command:

```bash
npm start
```

## User API Endpoints

Here is a list of available API endpoints:

### POST /users/signup

**Description:** This endpoint is for registering new user. 

**Request:**

- **Method:** POST
- **URL:** `/users/signup`
- **Body Request:** Data that will be formatted to JSON.
- **Body Request Sample:**

  ```json
  {
    "username": "janedoe",
    "password": "1234"
  }
  ```

**Response:**

- **Status 201 Created:** If user successfully registered.
- **Status 400 Bad Request:** If data from body request is invalid.
- **Status 409 Conflict:** If user already exists.
- **Status 500 Internal Server Error:** If server has an error.

### POST /users/signin

**Description:** This endpoint is for user login. 

**Request:**

- **Method:** POST
- **URL:** `/users/signin`
- **Body Request:** Data that will be formatted to JSON.
- **Body Request Sample:**

  ```json
  {
    "username": "janedoe",
    "password": "1234"
  }
  ```

**Response:**

- **Status 200 OK:** If user successfully logged in.
- **Success Response Sample:**

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWZkN2MxNzc4YzA0NDQ1NTJiM2QyOCIsInVzZXJuYW1lIjoic3lhaGJhIiwicGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNzA0OTc2ODEzfQ.SFTAdM7JzfsZgA9U0Re6F1BTQqeEW5SRDJL6TA23wz8"
  }
  ```

- **Status 401 Unauthorized:** If user token is missing or invalid.
- **Status 500 Internal Server Error:** If server has an error.

### GET /users

**Description:** This endpoint is for fetching user's details using ID from token.

**Request:**

- **Method:** GET
- **URL:** `/users`

**Response:**

- **Status 200 OK:** Returns user's information based on ID in JSON format.
- **Success Response Sample:**

  ```json
  {
    "_id": "659fc684b40f899d31601a3c",
    "username": "janedoe",
    "password": "$2b$10$/l7c4uGL6CzphNzipAqHWeFYe2JrXvxfEXxYBQuwiXqDu83zSyIQG",
    "createdAt": "2024-01-11T10:44:20.365Z",
    "updatedAt": "2024-01-11T10:44:20.365Z"
  }
  ```

- **Status 404 Not Found:** If ID is not found.
- **Status 500 Internal Server Error:** If server has an error.

### DELETE /users

**Description:** This endpoint is for deleting user using ID from token.

**Request:**

- **Method:** DELETE
- **URL:** `/users`

**Response:**

- **Status 200 OK:** If data is successfully deleted.
- **Status 404 Not Found:** If ID is not found.
- **Status 500 Internal Server Error:** If server has an error.

## User API Examples

Here are examples of user API endpoints using [Postman](https://www.postman.com/):

- Register user: `POST http://localhost:8000/users/signup`
- Login user: `POST http://localhost:8000/users/signin`
- Get detail user: `POST http://localhost:8000/users`
- Delete user: `POST http://localhost:8000/users`

## Task API Endpoints

Here is a list of available API endpoints:

### GET /todos

**Description:** This endpoint is for fetching every task in to-do list.

**Request:**

- **Method:** GET
- **URL:** `/todos`
- **Header Authorization:** User token from login response.

**Response:**

- **Status 200 OK:** Returns task list in JSON format.
- **Success Response Sample:**

  ```json
  [
    {
      "id": "659fd7d3778c0444552b3d2b",
      "title": "meeting with client",
      "isCompleted": false
    },
    {
      "id": "659fd7f0778c0444552b3d2d",
      "title": "eat breakfast",
      "isCompleted": false
    }
  ]
  ```

- **Status 404 Not Found:** If no task was created.
- **Status 500 Internal Server Error:** If server has an error.

### GET /todos/:id

**Description:** This endpoint is for fetching task's details using ID.

**Request:**

- **Method:** GET
- **URL:** `/todos/:id`
- **Parameter URL:** `id` (todo ID)
- **Header Authorization:** User token from login response.

**Response:**

- **Status 200 OK:** Returns a task based on ID in JSON format.
- **Success Response Sample:**

  ```json
  {
    "_id": "659fd7d3778c0444552b3d2b",
    "title": "meeting with client",
    "description": "need to prepare presentation",
    "isCompleted": false,
    "userId": "659fd7c1778c0444552b3d28",
    "createdAt": "2024-01-11T11:58:11.741Z",
    "updatedAt": "2024-01-11T11:58:11.741Z"
  }
  ```

- **Status 404 Not Found:** If ID is not found or data doesn't exist.
- **Status 500 Internal Server Error:** If server has an error.

### POST /todos

**Description:** This endpoint is for creating new task. 

**Request:**

- **Method:** POST
- **URL:** `/todos`
- **Header Authorization:** User token from login response.
- **Body Request:** Data that will be formatted to JSON.
- **Body Request Sample:**

  ```json
  {
    "title": "meeting with client",
    "description": "need to prepare presentation",
  }
  ```

**Response:**

- **Status 201 Created:** If data is successfully created.
- **Status 400 Bad Request:** If data from body request is invalid.
- **Status 500 Internal Server Error:** If server has an error.

### PATCH /todos/:id

**Description:** This endpoint is for changing task field using ID.

**Request:**

- **Method:** PATCH
- **URL:** `/todos/:id`
- **Parameter URL:** `id` (todo ID)
- **Header Authorization:** User token from login response.
- **Body Request:** Data that will be formatted to JSON.
- **Body Request Sample:**

  ```json
  {
    "isCompleted": true
  }
  ```

**Response:**

- **Status 200 OK:** If data is successfully updated.
- **Status 404 Not Found:** If ID is not found.
- **Status 500 Internal Server Error:** If server has an error.

### DELETE /todos/:id

**Description:** This endpoint is for deleting task using ID.

**Request:**

- **Method:** DELETE
- **URL:** `/todos/:id`
- **Parameter URL:** `id` (todo ID)
- **Header Authorization:** User token from login response.

**Response:**

- **Status 200 OK:** If data is successfully deleted.
- **Status 404 Not Found:** If ID is not found.
- **Status 500 Internal Server Error:** If server has an error.

### DELETE /todos

**Description:** This endpoint is for deleting every task owned by a user.

**Request:**

- **Method:** DELETE
- **URL:** `/todos`
- **Header Authorization:** User token from login response.

**Response:**

- **Status 200 OK:** If data is successfully deleted.
- **Status 404 Not Found:** If ID is not found.
- **Status 500 Internal Server Error:** If server has an error.

## Task API Examples

Here are examples of to-do list API endpoints using [Postman](https://www.postman.com/):

- Get all tasks: `GET http://localhost:8000/todos`
- Get task by ID: `GET http://localhost:8000/todos/:id`
- Create new task: `POST http://localhost:8000/todos`
- Update task by ID: `PATCH http://localhost:8000/todos/:id`
- Delete task by ID: `DELETE http://localhost:8000/todos/:id`
- Delete all tasks: `DELETE http://localhost:8000/todos`