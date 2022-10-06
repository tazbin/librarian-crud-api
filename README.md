# Librarian CRUD API

This is a simple CRUD application where a librarian who can create books with authors. This application is a **RESTful API**.

<em> The **API endpoints** and the **API documentation** can be found [here in Postman documentation](https://documenter.getpostman.com/view/14185987/2s83zduQzF) </em> 

![](./postman-doc.jpg)

## Features:
- librarian can create new books with ``title`` & ``author``
- librarian can get the full list of created books
- librarian can search for books with ``title`` and/or ``author``
- librarian can edit any book's details
- librarian can delete any book

## Tech used:

**Runtime environment**
- [x] Node.js

**Database**
- [x] MongoDB

## How to install & run:
### Using Git (recommended)
1. Navigate & open CLI into the directory where you want to put this project & Clone this project (will be cloned inside librarian-crud-api folder) using this command.
   
```bash
git clone https://github.com/tazbin/librarian-crud-api.git ./librarian-crud-api
```
### Using manual download ZIP
1. Download repository
2. Extract the zip file, navigate into it & copy the folder to your desired directory

### Run the project
Run the command & wait for docker build
```bash
docker compose duild
```

The run in docker container using command & wait for a while to connect with database
```bash
docker compose up
```

Press CTRL + C to stop the server.

### Run tests
Run the tests using the command
```bash
npm test
```
