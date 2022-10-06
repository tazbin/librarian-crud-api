# Librarian CRUD API

This is a simple CRUD application where a librarian can create books with authors. This application is a **RESTful API**.

<em> The **API endpoints** and the **API documentation** can be found [here in Postman documentation](https://documenter.getpostman.com/view/14185987/2s83zduQzF) </em> 

![postman api documentation](./postman-doc.jpg)

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

**Testing framework & library**
- [x] Jest
- [x] SuperTest

## Getting the app:
### Using Git (recommended)
1. Navigate & open CLI into the directory where you want to put this project & Clone this project (will be cloned inside librarian-crud-api folder) using this command.
   
    ```bash
    git clone https://github.com/tazbin/librarian-crud-api.git ./librarian-crud-api
    ```
### Using manual download ZIP
1. Download the repository
2. Extract the zip file, navigate into it & copy the folder to your desired directory

### Running the app:
1. To build **docker image**
    ```bash
    docker compose build --no-cache
    ```

2. To run the **containers** in detached mode (wait for a while for database connection)
    ```bash
    docker compose up -d
    ```

3. To view running **containers**
    ```bash
    docker container ps
    ```

4. To view **API logs**
    ```bash
    docker logs librarian-api-c
    ```

5. To **run tests**, first enter within the API container
   - on windows CMD (not switching to bash)
        ```bash
        docker exec -it librarian-api-c /bin/sh
        ```
   - on windows CMD (after switching to bash)
        ```bash
        docker exec -it librarian-api-c //bin//sh
        ```
    now run **test command**
    ```bash
    npm test
    ```
6. To exit from **API container**, press <kbd>Ctrl</kbd>+<kbd>D</kbd> on terminal

7. To **stop** the containers
    ```bash
    docker compose down
    ```
