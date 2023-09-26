# Senior Backend Lead Test: NestJS Order Processing with Objection.js and Knex

## Objective

The objective of this project is to develop an order processing system using NestJS, which integrates with Objection.js and Knex. This system will be responsible for handling and managing kitchen orders based on the provided data structure.

## Project Structure

The project follows a structured approach to maintain code organization and readability. Here's an overview of the key components:

- **NestJS**: NestJS is used as the framework for building the backend application. It provides a robust and scalable architecture for building Node.js applications.

- **Objection.js**: Objection.js is an SQL-friendly ORM (Object-Relational Mapping) for Node.js. It simplifies database interactions and allows us to work with SQL databases in an object-oriented manner.

- **Knex**: Knex.js is a query builder for SQL databases. It's used in conjunction with Objection.js to create and manage database schemas and queries.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository to your local machine:
   ```bash
   git@github.com:emmadedayo/FoodCourt-Test.git
   ``````
2. Install project dependencies:
   ```bash
   pnpm install
   ```
3. Configure the database connection in the `.env` file. Make sure to specify the necessary credentials and database details.
```bash
   JWT_SECRET="Your file"
  PG_HOST="localhost"
  PG_USER="postgres"
  PG_PASSWORD="ma"
  PG_DATABASE="postgres"
  PG_PORT=5432
   ```
4. Run the migration to create the database tables:
    ```bash
    pnpm knex migrate:latest   
    ```
5 Run the seed command to insert brands, meals and addons into the database:
    ```bash
    pnpm knex seed:run
    ```    
6. Start the NestJS application:

    ```bash
    nest start
    ```
    or 
    ```bash
    npm run --watch in dev mode
    ```


The application will be accessible at `http://localhost:3000`.

## Usage

To interact with the endpoints and understand how to use the application, refer to our Postman documentation:

[![Postman Documentation](https://img.shields.io/badge/Postman-Documentation-FF6C37?style=flat-square&logo=postman&logoColor=white)](https://documenter.getpostman.com/view/3080167/2s9YJXaRBj)

Our Postman documentation provides detailed information on available endpoints, request payloads, and response formats. You can use Postman to test and experiment with the order processing system.

For detailed information and instructions related to Question two, please check our [Google Docs Document](https://docs.google.com/document/d/e/2PACX-1vSEaaNh18dABV0P628jelPJxnLD0UCV4BgRCU-V-nngO_coZBSKBrhLnUoR-NAsRWrNe9v3ljX5/pub).


If you have any questions or encounter any issues while using the API, please refer to the documentation first. If the issue persists, feel free to contact us for assistance.

  

## Contributing

If you would like to contribute to this project, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact [Emmanuel](mailto:emmadenagbe@gmail.com).









# FoodCourt-Test
