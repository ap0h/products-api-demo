# Products API

The **Products API** service facilitates the management of products, offering a range of operations such as creation, updating, retrieval, and deletion of products. Additionally, it supports the importation of products from a CSV file that can be uploaded from an external source.

## Postman DOCS

**https://documenter.getpostman.com/view/6855847/2s9Ykrcg3Z**

## How to run

Simply run `yarn dev` docker will do the rest.


## Development

The project is authored in TypeScript and employs MongoDB and GraphQL via Express. It incorporates various tools to enhance the development process, including:

- **TypeScript:** The primary language for development.
- **MongoDB:** The database system used for data storage.
- **GraphQL with Express:** The API layer for efficient query execution.
- **ESLint with XO:** Predefined best practice ESLint rules using the XO package for code quality.
- **SWC:** Utilized for swift TypeScript compilation, enhancing development speed.
- **Nodemon:** Watches for changes and automatically restarts the project, streamlining the development workflow.

**Import Path Aliases:** The project employs import path aliases for key directories, improving code organization:

- **@core:** Core Entities
- **@libs:** Shared libraries and utilities
- **@config:** Configuration files
- **@repositories:** Data access layer
- **@services:** Business logic services
- **@use-cases:** Application use cases

This setup ensures a structured and efficient development environment for managing and enhancing the products API.

