# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
$user: git clone {repository URL}
$user: cd kanban-rest
```

## Run Docker

Install docker and docker-compose using the instruction https://docs.docker.com/get-docker/

Run command:

```bash
$user: docker-compose up
```

## Run Xeroku


Run command:

```bash
$user: git clone {repository URL}
$user: cd kanban-rest
$user: git switch source
$user: heroku create --region eu
$user: heroku addons:create heroku-postgresql:hobby-dev
$user: heroku config:set NPM_CONFIG_PRODUCTION=false
$user: heroku config:set LOG_CONSOLE=false
$user: heroku config:set LOG_ERR_LEVEL=warn
$user: heroku config:set LOG_INFO_LEVEL=info
$user: heroku config:set JWT_SECRET_KEY=secret-key
$user: heroku config:set SALT_SIZE=10
$user: heroku config:set USE_FASTIFY=true
$user: heroku git:remote -a <YOUR_APP_NAME>
$user: git push heroku source:master
```

# REST service docs

## Endpoints:

- `Swagger Docs` (`/docs` route)
- `Auth` (`/` route)
  - `POST /signup` - new user registration
  - `POST /signin` - user authorization
- `User` (`/` route)

  - `GET /users` - get all users
  - `GET /users/:userId` - get the user by id (ex. “/users/123”)
  - `PUT /users/:userId` - update user
  - `DELETE /users/:userId` - delete user

- `Board` (`/boards` route)

  - `GET /` - get all boards
  - `GET /:boardId` - get the board by id
  - `POST /` - create board
  - `PUT /:boardId` - update board
  - `DELETE /:boardId` - delete board

* `Column` (`boards/:boardId/columns` route)

  - `GET /` - get all columns
  - `GET /:columnsId` - get the column by id
  - `POST /:columnsId` - create column
  - `PUT /:columnsId` - update column
  - `DELETE /:columnsId` - delete column

* `Task` (`boards/:boardId/columns/:columnsId` route)

  - `GET /tasks` - get all tasks
  - `GET /tasks/:taskId` - get the task by id
  - `POST /tasks` - create task
  - `PUT /tasks/:taskId` - update task
  - `DELETE /tasks/:taskId` - delete task

* `File`:
  - `GET file/:taskId/:filename/` - download file
  - `POST file/` - upload file `multipart/form-data`

* `Logs files`:
  - `GET logs/error` - download 'error' log file 
  - `GET logs/info` - download 'info' log file 

