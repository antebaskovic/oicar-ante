# API Documentation

## Account Routes

### Get Account Details

Retrieves the account details of the authenticated user.

**URL:** `/account`

**Method:** `GET`

**Authentication required:** Yes

**Permissions required:** None

#### Request Parameters

None

#### Response

- `200 OK` if successful

```json
{
  "userId": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "string",
  "trainerDetails": {
    "trainerId": "string",
    "bio": "string",
    "licensesAndCertificates": "string",
    "focusArea": "string"
  },
  "userDetails": {
    "height": "string",
    "weight": "string",
    "age": "string",
    "gender": "string",
    "miscellaneousLimits": "string"
  }
}
```

- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server Error` if an error occurred

### Update Account Details

Updates the account details of the authenticated user.

**URL:** `/account`

**Method:** `PUT`

**Authentication required:** Yes

**Permissions required:** None

#### Request Parameters

- `firstName` (optional): The updated first name of the user (string)
- `lastName` (optional): The updated last name of the user (string)
- `height` (optional): The updated height of the user (string)
- `weight` (optional): The updated weight of the user (string)
- `age` (optional): The updated age of the user (string)
- `gender` (optional): The updated gender of the user (string)
- `miscellaneousLimits` (optional): The updated miscellaneous limits of the user (string)
- `bio` (optional): The updated bio of the trainer (string)
- `licensesAndCertificates` (optional): The updated licenses and certificates of the trainer (string)
- `focusArea` (optional): The updated focus area of the trainer (string)

#### Response

- `204 No Content` if successful
- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server Error` if an error occurred

## Authentication Routes

### Test Connection

Tests the database connection.

**URL:** `/test`

**Method:** `GET`

**Authentication required:** No

**Permissions required:** None

#### Request Parameters

None

#### Response

- `200 OK` if the connection was successful

```
Connected
```

- `500 Internal Server Error` if an error occurred during the database connection

### User Registration

Registers a new user.

**URL:** `/register`

**Method:** `POST`

**Authentication required:** No

**Permissions required:** None

#### Request Parameters

- `email`: The email address of the user (string)
- `firstName`: The first name of the user (string)
- `lastName`: The last name of the user (string)
- `password`: The password of the user (string)
- `role`: The role of the user ("Trainer" or "User") (string)

#### Response

- `201 Created` if the user registration was successful

```json
{
  "userId": "string"
}
```

- `500 Internal Server Error` if an error occurred during user registration

### User Login

Authenticates a user and generates an access token.

**URL:** `/login`

**Method:** `POST`

**Authentication required:** No

**Permissions required:** None

#### Request Parameters

- `

email`: The email address of the user (string)
- `password`: The password of the user (string)

#### Response

- `200 OK` if the login was successful

```json
{
  "accessToken": "string"
}
```

- `401 Unauthorized` if the email or password is incorrect
- `404 Not Found` if the user with the specified email was not found
- `500 Internal Server Error` if an error occurred during the login process

### Change Password

Changes the password of the authenticated user.

**URL:** `/changePassword`

**Method:** `PUT`

**Authentication required:** Yes

**Permissions required:** None

#### Request Parameters

- `oldPassword`: The current password of the user (string)
- `newPassword`: The new password to set for the user (string)

#### Response

- `200 OK` if the password was changed successfully
- `401 Unauthorized` if the old password is incorrect
- `404 Not Found` if the user was not found
- `500 Internal Server Error` if an error occurred during the password change process

## Client Routes

### Get Client Details

Retrieves the details of a client.

**URL:** `/clientDetails/:userId`

**Method:** `GET`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

- `userId`: The ID of the client (string)

#### Response

- `200 OK` if successful

```json
{
  "userId": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "string",
  "height": "string",
  "weight": "string",
  "age": "string",
  "gender": "string",
  "miscellaneousLimits": "string"
}
```

- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `404 Not Found` if the client with the specified userId was not found
- `500 Internal Server Error` if an error occurred

## User Management Routes (Trainer Only)

### Get My Users

Retrieves the list of users assigned to the authenticated trainer.

**URL:** `/myusers`

**Method:** `GET`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

None

#### Response

- `200 OK` if successful

```json
[
  {
    "userId": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "role": "string",
    "height": "string",
    "weight": "string",
    "age": "string",
    "gender": "string",
    "miscellaneousLimits": "string",
    "programId": "string",
    "programName": "string"
  },
  ...
]
```

- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server Error` if an error occurred

## Program Routes

### Create Program

Creates a new program.

**URL:** `/program`

**Method:** `POST`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

- `name`: The name of the program (string)
- `description`: The description of the program (string)
- `category`: The category of the program (string)

#### Response

- `201 Created` if the program creation was successful

```json
{
  "programId": "string"
}
```

- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server

 Error` if an error occurred

### Get Programs

Retrieves the list of programs based on the user role.

**URL:** `/program`

**Method:** `GET`

**Authentication required:** Yes

**Permissions required:** None

#### Request Parameters

None

#### Response

- `200 OK` if successful

```json
[
  {
    "programId": "string",
    "name": "string",
    "description": "string",
    "category": "string",
    "trainerId": "string",
    "trainerName": "string"
  },
  ...
]
```

- `401 Unauthorized` if not authenticated
- `500 Internal Server Error` if an error occurred

### Get All Programs

Retrieves the list of all programs.

**URL:** `/program/all`

**Method:** `GET`

**Authentication required:** Yes

**Permissions required:** User role

#### Request Parameters

None

#### Response

- `200 OK` if successful

```json
[
  {
    "programId": "string",
    "name": "string",
    "description": "string",
    "category": "string",
    "trainerId": "string",
    "trainerName": "string"
  },
  ...
]
```

- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server Error` if an error occurred

### Get Program Details

Retrieves the details of a program.

**URL:** `/program/:programId/details`

**Method:** `GET`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

- `programId`: The ID of the program (string)

#### Response

- `200 OK` if successful

```json
{
  "programId": "string",
  "name": "string",
  "description": "string",
  "category": "string",
  "trainerId": "string",
  "trainerName": "string",
  "enrolledUsers": [
    {
      "userId": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "role": "string",
      "height": "string",
      "weight": "string",
      "age": "string",
      "gender": "string",
      "miscellaneousLimits": "string"
    },
    ...
  ]
}
```

- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `404 Not Found` if the program with the specified programId was not found
- `500 Internal Server Error` if an error occurred

### Enroll in Program

Enrolls the authenticated user in a program.

**URL:** `/program/:programId/enroll`

**Method:** `POST`

**Authentication required:** Yes

**Permissions required:** User role

#### Request Parameters

- `programId`: The ID of the program to enroll in (string)

#### Response

- `201 Created` if enrollment was successful
- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server Error` if an error occurred

### Create Training

Creates a new training within a program.

**URL:** `/program/:programId/training`

**Method:** `POST`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

- `type`: The type of the training (string)
- `daysOfWeek`: The days of the week for the training (string)
- `name`: The name of the training (string)
- `plan`: The plan

 for the training (string)
- `notes`: Additional notes for the training (string)
- `difficulty`: The difficulty level of the training (string)

#### Response

- `201 Created` if the training creation was successful

```json
{
  "trainingId": "string"
}
```

- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server Error` if an error occurred

### Create Meal

Creates a new meal within a program.

**URL:** `/program/:programId/meal`

**Method:** `POST`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

- `daysOfWeek`: The days of the week for the meal (string)
- `type`: The type of the meal (string)
- `name`: The name of the meal (string)
- `calories`: The calories of the meal (string)
- `carbs`: The carbs of the meal (string)
- `protein`: The protein of the meal (string)
- `fats`: The fats of the meal (string)
- `description`: The description of the meal (string)

#### Response

- `201 Created` if the meal creation was successful

```json
{
  "mealId": "string"
}
```

- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server Error` if an error occurred

### Update Program

Updates the details of a program.

**URL:** `/program/:programId`

**Method:** `PUT`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

- `name` (optional): The updated name of the program (string)
- `description` (optional): The updated description of the program (string)
- `category` (optional): The updated category of the program (string)

#### Response

- `204 No Content` if successful
- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server Error` if an error occurred

### Delete Program

Deletes a program.

**URL:** `/program/:programId`

**Method:** `DELETE`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

- `programId`: The ID of the program to delete (string)

#### Response

- `204 No Content` if successful
- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server Error` if an error occurred

### Update Meal

Updates the details of a meal.

**URL:** `/meal/:mealId`

**Method:** `PUT`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

- `daysOfWeek` (optional): The updated days of the week for the meal (string)
- `type` (optional): The updated type of the meal (string)
- `name` (optional): The updated name of the meal (string)
- `calories` (optional): The updated calories of the meal (string)
- `carbs` (optional): The updated carbs of the meal (string)
- `protein` (optional): The updated protein of the meal (string)
- `fats` (optional): The updated fats of the meal (string)
- `description` (optional): The updated description of the meal (string)

#### Response

- `204 No Content` if successful
- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed

 to access this endpoint
- `500 Internal Server Error` if an error occurred

### Delete Meal

Deletes a meal.

**URL:** `/meal/:mealId`

**Method:** `DELETE`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

- `mealId`: The ID of the meal to delete (string)

#### Response

- `204 No Content` if successful
- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server Error` if an error occurred

### Update Training

Updates the details of a training.

**URL:** `/training/:trainingId`

**Method:** `PUT`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

- `type` (optional): The updated type of the training (string)
- `daysOfWeek` (optional): The updated days of the week for the training (string)
- `name` (optional): The updated name of the training (string)
- `plan` (optional): The updated plan for the training (string)
- `notes` (optional): The updated notes for the training (string)
- `difficulty` (optional): The updated difficulty level of the training (string)

#### Response

- `204 No Content` if successful
- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server Error` if an error occurred

### Delete Training

Deletes a training.

**URL:** `/training/:trainingId`

**Method:** `DELETE`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

- `trainingId`: The ID of the training to delete (string)

#### Response

- `204 No Content` if successful
- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server Error` if an error occurred

### Get All Meals

Retrieves the list of all meals.

**URL:** `/meal/all`

**Method:** `GET`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

None

#### Response

- `200 OK` if successful

```json
[
  {
    "mealId": "string",
    "programId": "string",
    "daysOfWeek": "string",
    "type": "string",
    "name": "string",
    "calories": "string",
    "carbs": "string",
    "protein": "string",
    "fats": "string",
    "description": "string",
    "programName": "string"
  },
  ...
]
```

- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server Error` if an error occurred

### Get Meal Details

Retrieves the details of a meal.

**URL:** `/meal/:mealId/details`

**Method:** `GET`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

- `mealId`: The ID of the meal (string)

#### Response

- `200 OK` if successful

```json
{
  "mealId": "string",
  "programId": "string",
  "daysOfWeek": "string",
  "type": "string",
  "name": "string",
  "calories": "string",
  "carbs": "string",
  "protein": "string",
  "fats": "string",
  "description": "string",
  "programName": "string"


}
```

- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `404 Not Found` if the meal with the specified mealId was not found
- `500 Internal Server Error` if an error occurred

### Get All Trainings

Retrieves the list of all trainings.

**URL:** `/training/all`

**Method:** `GET`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

None

#### Response

- `200 OK` if successful

```json
[
  {
    "trainingId": "string",
    "programId": "string",
    "type": "string",
    "daysOfWeek": "string",
    "name": "string",
    "plan": "string",
    "notes": "string",
    "difficulty": "string",
    "programName": "string"
  },
  ...
]
```

- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server Error` if an error occurred

### Get Training Details

Retrieves the details of a training.

**URL:** `/training/:trainingId/details`

**Method:** `GET`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

- `trainingId`: The ID of the training (string)

#### Response

- `200 OK` if successful

```json
{
  "trainingId": "string",
  "programId": "string",
  "type": "string",
  "daysOfWeek": "string",
  "name": "string",
  "plan": "string",
  "notes": "string",
  "difficulty": "string",
  "programName": "string"
}
```

- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `404 Not Found` if the training with the specified trainingId was not found
- `500 Internal Server Error` if an error occurred

### Get Week

Retrieves the meals and trainings for a specific program in a week.

**URL:** `/week/:programId`

**Method:** `GET`

**Authentication required:** Yes

**Permissions required:** Trainer role

#### Request Parameters

- `programId`: The ID of the program (string)

#### Response

- `200 OK` if successful

```json
{
  "meals": [
    {
      "mealId": "string",
      "name": "string",
      "type": "string",
      "daysOfWeek": "string"
    },
    ...
  ],
  "trainings": [
    {
      "trainingId": "string",
      "name": "string",
      "type": "string",
      "daysOfWeek": "string"
    },
    ...
  ]
}
```

- `401 Unauthorized` if not authenticated
- `403 Forbidden` if user role is not allowed to access this endpoint
- `500 Internal Server Error` if an error occurred

### Test Database Connection

Tests the database connection.

**URL:** `/test`

**Method:** `GET`

**Authentication required:** No

#### Request Parameters

None

#### Response

- `200 OK` if the database connection is successful

```plaintext
Connected
```

- `500 Internal Server Error` if an error occurred