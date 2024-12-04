# Backend API Documentation
This API provides endpoints for user authentication, to-do management, and admin functionalities. This document outlines the available endpoints, request/response formats, authentication mechanisms, and other essential details to help you interact with the API effectively.

---

## Table of Contents

- [Getting Started](#getting-started)
  - [Base URL](#base-url)
  - [Authentication](#authentication)
    - [JSON Web Tokens (JWT)](#json-web-tokens-jwt)
    - [Headers](#headers)
- [Endpoints](#endpoints)
  - [Account Routes](#account-routes)
    - [Register User](#register-user)
    - [Login User](#login-user)
    - [Get User Info](#get-user-info)
    - [Refresh Token](#refresh-token)
  - [To-Do Routes](#to-do-routes)
    - [Get All To-Dos](#get-all-to-dos)
    - [Create a To-Do](#create-a-to-do)
    - [Update a To-Do](#update-a-to-do)
    - [Delete a To-Do](#delete-a-to-do)
  - [Admin Routes](#admin-routes)
    - [Get All Users](#get-all-users)
    - [Update User Admin Status](#update-user-admin-status)
- [Data Models](#data-models)
  - [User Object](#user-object)
  - [To-Do Object](#to-do-object)
- [Error Handling](#error-handling)

---

## Getting Started

### Base URL
All API endpoints are relative to the base URL:
```
http://localhost:5000/api
```

### Authentication
#### JSON Web Tokens (JWT)
The API uses JWT for authentication and authorization. Tokens are issued upon successful login, and must be included in the `Authorization` header of requests to protected endpoints.

#### Headers
Include the following header in your requests to authenticated endpoints:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### Account Routes

#### Register User
- Endpoint: `/account/register`
- Method: `POST`
- Description: Registers a new user.

**Request Body:**
```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "your_password"
}
```

**Response:**
- Status Code: `201 Created`
- Body:
  ```json
  {
    "message": "Registration successful. Please log in."
  }
  ```


#### Login User
- Endpoint: `/account/login`
- Method: `POST`
- Description: Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "username": "john",
  "password": "your_password"
}
```

**Response:**
- Status Code: `200 OK`
- Body:
  ```json
  {
    "accessToken": "<your_jwt_token>"
  }
  ```


#### Get User Info
- Endpoint: `/auth/user`
- Method: `GET`
- Description: Retrieves the authenticated user's information.
- Authentication Required: Yes

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
- Status Code: `200 OK`
- Body:
  ```json
  {
    "id": 1,
    "username": "johndoe",
    "email": "johndoe@example.com",
    "is_admin": false
  }
  ```


#### Refresh Token
- Endpoint: `/auth/refresh-token`
- Method: `POST`
- Description: Refreshes the JWT token to reflect any changes in user status.
- Authentication Required: Yes

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
- Status Code: `200 OK`
- Body:
  ```json
  {
    "accessToken": "<new_jwt_token>"
  }
  ```


### To-Do Routes

#### Get All To-Dos
- Endpoint: `/todos`
- Method: `GET`
- Description: Retrieves all to-dos for the authenticated user.
- Authentication Required: Yes

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
- Status Code: `200 OK`
- Body:
  ```json
  [
    {
      "id": 1,
      "user_id": 1,
      "text": "Buy groceries",
      "completed": false,
      "created_at": "2023-10-01T12:00:00Z"
    },
    {
      "id": 2,
      "user_id": 1,
      "text": "Attend meeting",
      "completed": true,
      "created_at": "2023-10-02T09:30:00Z"
    }
  ]
  ```


#### Create a To-Do
- Endpoint: `/todos`
- Method: `POST`
- Description: Creates a new to-do item.
- Authentication Required: Yes

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "Call the doctor"
}
```

**Response:**
- Status Code: `201 Created`
- Body:

  ```json
  {
    "id": 3,
    "user_id": 1,
    "text": "Call the doctor",
    "completed": false,
    "created_at": "2023-10-03T15:45:00Z"
  }
  ```


#### Update a To-Do
- Endpoint: `/todos/:id`
- Method: `PUT`
- Description: Updates an existing to-do item.
- Authentication Required: Yes

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "Call the dentist",
  "completed": true
}
```

**Response:**
- Status Code: `200 OK`
- Body:
  ```json
  {
    "id": 3,
    "user_id": 1,
    "text": "Call the dentist",
    "completed": true,
    "created_at": "2023-10-03T15:45:00Z"
  }
  ```


#### Delete a To-Do
- Endpoint: `/todos/:id`
- Method: `DELETE`
- Description: Deletes a to-do item.
- Authentication Required: Yes

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
- Status Code: `200 OK`
- Body:
  ```json
  {
    "message": "To-Do item deleted successfully"
  }
  ```


### Admin Routes
**Note:** All admin routes require the user to have `is_admin` set to `true`.

#### Get All Users
- Endpoint: `/admin/users`
- Method: `GET`
- Description: Retrieves a list of all users.
- Authentication Required: Yes (Admin only)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
- Status Code: `200 OK`
  - Body:
    ```json
    [
        {
        "id": 1,
        "username": "john",
        "email": "john@example.com",
        "is_admin": false,
        "total_tasks": 5,
        "completed_tasks": 3
      },
      {
        "id": 2,
        "username": "jane",
        "email": "jane@example.com",
        "is_admin": true,
        "total_tasks": 2,
        "completed_tasks": 2
      }
    ]
    ```


#### Update User Admin Status
- Endpoint: `/admin/users/:id/admin`
- Method: `PUT`
- Description: Updates a user's admin status.
- Authentication Required: Yes (Admin only)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "is_admin": true
}
```

**Response:**
- Status Code: `200 OK`
- Body:
  ```json
  {
    "message": "User admin status updated successfully"
  }
  ```

---

## Data Models

### User Object
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "johndoe@example.com",
  "is_admin": false
}
```
- **id**: Integer, unique identifier for the user.
- **username**: String, the user's username.
- **email**: String, the user's email address.
- **is_admin**: Boolean, indicates if the user has admin privileges.


### To-Do Object
```json
{
  "id": 3,
  "user_id": 1,
  "text": "Do something",
  "completed": false
}
```
- **id**: Integer, unique identifier for the to-do item.
- **user_id**: Integer, the ID of the user who owns the to-do.
- **text**: String, the content of the to-do item.
- **completed**: Boolean, indicates if the to-do is completed.
- **created_at**: String (ISO 8601 date), timestamp of when the to-do was created.

---

## Error Handling
The API uses standard HTTP status codes to indicate the success or failure of an API request. Errors include a message explaining the reason for the error.

**Example Error Response:**
- Status Code: `400 Bad Request`
- Body:
  ```json
  {
    "message": "Invalid credentials"
  }
  ```
