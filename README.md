## API Documentation

The following API endpoints are available:

### Create User Account

- **Endpoint**: `/account/create/:name/:email/:password`
- **Method**: GET
- **Description**: Creates a new user account with the provided name, email, and password.
- **Parameters**:
  - `name` (path parameter): User's name (string, required).
  - `email` (path parameter): User's email address (string, required).
  - `password` (path parameter): User's password (string, required).
- **Responses**:
  - `200 OK`: User account created successfully. Returns the created user object.
  - `500 Internal Server Error`: Error occurred while creating the user account.

### Get All User Accounts

- **Endpoint**: `/account/all`
- **Method**: GET
- **Description**: Retrieves all user accounts.
- **Responses**:
  - `200 OK`: Returns an array of user objects representing all user accounts.
  - `500 Internal Server Error`: Error occurred while retrieving user accounts.

### Update User Account

- **Endpoint**: `/account/update/:email/:amount`
- **Method**: GET
- **Description**: Updates the balance of a user account with the provided email address.
- **Parameters**:
  - `email` (path parameter): User's email address (string, required).
  - `amount` (path parameter): Amount to be updated (number, required).
- **Responses**:
  - `200 OK`: User account updated successfully. Returns the updated user object.
  - `500 Internal Server Error`: Error occurred while updating the user account.

### Find User Account

- **Endpoint**: `/account/find/:email`
- **Method**: GET
- **Description**: Finds a user account with the provided email address.
- **Parameters**:
  - `email` (path parameter): User's email address (string, required).
- **Responses**:
  - `200 OK`: Returns an array of user objects matching the provided email address.
  - `500 Internal Server Error`: Error occurred while finding the user account.

### Delete User Account

- **Endpoint**: `/account/delete/:email`
- **Method**: DELETE
- **Description**: Deletes a user account with the provided email address.
- **Parameters**:
  - `email` (path parameter): User's email address (string, required).
- **Responses**:
  - `200 OK`: User account deleted successfully.
  - `500 Internal Server Error`: Error occurred while deleting the user account.

### Check User Credentials

- **Endpoint**: `/account/check/:email/:password`
- **Method**: GET
- **Description**: Checks the credentials (email and password) of a user account.
- **Parameters**:
  - `email` (path parameter): User's email address (string, required).
  - `password` (path parameter): User's password (string, required).
- **Responses**:
  - `200 OK`: Valid credentials. Returns the user's email and password.
  - `401 Unauthorized`: Invalid credentials (no matching email or incorrect password).
  - `500 Internal Server Error`: Error occurred while checking the user credentials.

### Check Email Existence

- **Endpoint**: `/account/checkemail/:email`
- **Method**: GET
- **Description**: Checks if the provided email exists in the database.
- **Parameters**:
  - `email` (path parameter): User's email address (string, required).
- **Responses**:
  - `200 OK`: Email exists in the database.
  - `404 Not Found`: Email does not exist in the database.
  - `500 Internal Server Error`: Error occurred while checking the email existence.

## Error Handling

- **500 Internal Server Error**: Returned when an internal server error occurs.
