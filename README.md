# GUIZ - Geography Quiz App

A quiz application focused on geographies. User can select a quiz to start and find the countries on the world map based on the question provided.

## Key Tech Stack

- React
- Redux Saga
- Express
- Sequelize (MySQL)
- React Simple Maps
- D3-Geo
- Redis

## Frontend Setup

1. Install dependencies:

```
npm install
```

2. Start the application:

```
npm run start
```

## Backend Setup

1. Install dependencies:

```
npm install
```

2. Create the database:

```
npx sequelize-cli db:create
```

3. Migrate the database:

```
npx sequelize-cli db:migrate
```

4. Seed the database:

```
npx sequelize-cli db:seed:all
```

5. Start the development server:

```
npm run dev
```

# Server Endpoints

## Global Response

_Response (500 - Internal Server Error)_

```json
{
  "error": "Internal Server Error"
}
```

_Response (400 - Authentication Error)_

```json
{
  "error": "User is not authenticated"
}
```

_Response (403 - Admin Authorization Error)_

```json
{
  "error": "Access forbidden. Admin authorization required."
}
```

---

# RESTful Endpoints

## Quiz API Endpoints

### GET /api/quiz/all

> Get All Quizzes

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Response (200)_

```json
[
  {
    "id": "<quiz_id>",
    "title": "<title>",
    "description": "<description>",
    "noOfQuestions": "<number_of_questions>",
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>",
    "userId": "<user_id>"
  }
]
```

---

### GET /api/quiz/:quizId

> Get Quiz by ID

_Request Header_

```
not needed
```

_Request Params_

```json
{
  "quizId": "<quiz_id>"
}
```

_Response (200)_

```json
{
  "id": "<quiz_id>",
  "title": "<title>",
  "description": "<description>",
  "noOfQuestions": "<number_of_questions>",
  "createdAt": "<timestamp>",
  "updatedAt": "<timestamp>",
  "userId": "<user_id>",
  "questions": [
    {
      "id": "<question_id>",
      "content": "<question_content>",
      "answer": "<answer>",
      "createdAt": "<timestamp>",
      "updatedAt": "<timestamp>",
      "quizId": "<quiz_id>"
    },
    ...
  ],
}

```

_Response (404)_

```json
{
  "message": "Quiz not found."
}
```

---

### POST /api/quiz/create

> Create Quiz with Questions

_Request Header_

```
Authorization: Bearer <token>
```

_Request Body_

```
{
  "title": "<title>",
  "description": "<description>",
  "questions": [
    {
      "content": "<question_content>",
      "answer": "<answer>"
    },
    ...
  ]
}

```

_Response (201)_

```json
{
  "id": "<quiz_id>",
  "title": "<title>",
  "description": "<description>",
  "noOfQuestions": "<number_of_questions>",
  "createdAt": "<timestamp>",
  "updatedAt": "<timestamp>",
  "userId": "<user_id>",
  "questions": [
    {
      "id": "<question_id>",
      "content": "<question_content>",
      "answer": "<answer>",
      "createdAt": "<timestamp>",
      "updatedAt": "<timestamp>",
      "quizId": "<quiz_id>"
    },
    ...
  ],
  "message": "Quiz successfully created!"
}
```

_Response (400)_ - Joi Validation Error

```json
{
  "message": "<validation_error_message>"
}
```

---

### PUT /api/quiz/edit/:quizId

> Edit Quiz and Its Questions

_Request Header_

```
Authorization: Bearer <token>
```

_Request Params_

```json
{
  "quizId": "<quiz_id>"
}
```

_Request Body_

```json
{
  "title": "<new_title>",
  "description": "<new_description>",
  "questions": [
    {
      "id": "<question_id>",
      "content": "<new_question_content>",
      "answer": "<new_answer>"
    },
    {
      "content": "<new_question_content>",
      "answer": "<new_answer>"
    },
    ...
  ]
}

```

_Response (200)_

```json
{
  "quiz": {
    "id": "<quiz_id>",
    "title": "<updated_title>",
    "description": "<updated_description>",
    "noOfQuestions": "<updated_number_of_questions>",
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
  },
  "message": "Quiz successfully updated!"
}
```

_Response (404)_

```json
{
  "message": "Quiz not found."
}
```

_Response (400)_ - Joi Validation Error

```json
{
  "message": "<validation_error_message>"
}
```

---

### DELETE /api/quiz/delete/:quizId

> Delete Quiz by ID

_Request Header_

```
Authorization: Bearer <token>
```

_Request Params_

```json
{
  "quizId": "<quiz_id>"
}
```

_Response (200)_

```json
{
  "message": "Quiz deleted successfully"
}
```

_Response (404)_

```json
{
  "message": "Quiz not found"
}
```

---

## Quiz Takers API Endpoints

### GET /api/taker/user

> Get Quiz Takers by User ID

_Request Header_

```
Authorization: Bearer <token>
```

_Response (200)_

```json
[
  {
    "id": "<quiz_taker_id>",
    "userId": "<user_id>",
    "quizId": "<quiz_id>",
    "score": "<score>",
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>",
    "user": {
      "id": "<user_id>",
      "username": "<username>",
      "email": "<email>",
      // other user fields
    },
    "quiz": {
      "id": "<quiz_id>",
      "title": "<title>",
      "description": "<description>",
      // other quiz fields
    }
  },
  ...
]
```

---

### GET /api/taker/all/score

> Get All Users' Total Scores

_Request Header_

```
Authorization: Bearer <token>
```

_Response (200)_

```json
[
  {
    "userId": "<user_id>",
    "totalScore": "<total_score>",
    "user": {
      "id": "<user_id>",
      "username": "<username>",
      "email": "<email>",
      // other user fields
    }
  },
  ...
]

```

---

### POST /api/taker/finish/:quizId

> Finish Quiz

_Request Header_

```
Authorization: Bearer <access_token>
```

_Request Params_

```json
{
  "quizId": "<quiz_id>"
}
```

_Request Body_

```json
{
  "score": <score>
}
```

_Response (200)_

```json
{
  "message": "Quiz completed successfully."
}
```

_Response (400)_ - Joi Validation Error

```json
{
  "message": "<validation_error_message>"
}
```

_Response (404)_

```json
{
  "message": "Quiz not found."
}
```
