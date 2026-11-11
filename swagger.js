import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Phobies",
      version: "1.0.0",
      description: "API qui liste plusieurr phobies"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: [
    "./routes/*.js"
  ]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;