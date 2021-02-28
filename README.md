# Microservices-Blog

This is part of microservices to power my applications entire back end. 

For the **entire microservices project overview**, please visit the repo for [**API-Gateway**](https://github.com/PengChen11/Microservices-API_Gateway).

## Table of Contents

---

- [Microservices-Blog](#microservices-blog)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Feature Tasks & Requirements](#feature-tasks--requirements)
  - [Implementation Notes](#implementation-notes)
    - [Limitations of MVP:](#limitations-of-mvp)
  - [Authors](#authors)
  - [License](#license)
  - [Acknowledgements / Resources](#acknowledgements--resources)

---

## Overview

Create a RESTful API supports full CRUD operations, display my projects and articles in my portfolio website, and accept CRUB operations from my admin center too.

## Feature Tasks & Requirements

Create a single resource REST API using a Mongoose model, constructed using AWS Cloud Services or other providers

- **Database: MongoDB**
  1. model required:
     1. projects model:
        - contains everything about my projects
     2. articles model:
        - contains everything about articles I wrote

- **Routing:**
  1. POST
     - /:model - Given a JSON body, inserts a record into the database based on the model being selected

  2. GET
     - /:model - returns an array of objects representing all the records in the database
     - /:model/:id - returns an object representing one record, by its id
  
  3. PATCH
     - /:model/:id - Given a JSON body and an ID, updates a record in the database

  4. DELETE
     - /:model/:id - Given an ID removes the matching record from the database

- **ACL:**
  - The only ACL being applied is API gateway validation. This microservice will only respond to requests come from the API gateway and will drop everything comes from everywhere else.

- **System logs:**
  - This microservice will log all errors, warnings and proper events to system monitoring service through the API gateway.

- **Service discovery:**
  - This microservice will store the API gateway's IP in it's env, when goes on line, it will register it self with the API gateway.
  - This service will maintain a heart beat with API gateway and send over it's URL every 30 sec. In this case, if this service goes off line, the API gate way will be able to re-connect to it automatically.

## Implementation Notes

### Limitations of MVP:

1. System monitoring limitations:
   - System logs are handled by another microservice, thus it is highly rely on internet connections.
   - It is not able to save system logs if connection to API gateway is lost.
   - It is not able to save system logs if the connection between API gateway and Authentication service is lost. Authentication is required before save any system log.
   - It is not able to save system logs if the connection between API gateway and system monitor service is lost. System monitor service is the one actuarially saves all the system logs.

2. Solution in the future:
   - As of right now, make MVP and create a working system is my top priority. In the future:
   - A alternative way to recording system monitoring logs will be added, it will be:
     - using alternative ways to send logs, e.g using AWS message queue.
     - using local file system to temperately store logs in file, then log everything from them file when system is fully back online.

## Authors

- Software Developer: Peng Chen
  - [Official Github](https://github.com/PengChen11)

## License

This project is under the MIT License.

## Acknowledgements / Resources

- [Things about microservices](https://microservices.io)

- [7 reasons to switch to microservices — and 5 reasons you might not succeed](https://www.cio.com/article/3201193/7-reasons-to-switch-to-microservices-and-5-reasons-you-might-not-succeed.html)