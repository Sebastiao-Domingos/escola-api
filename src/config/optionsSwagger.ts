export const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Api de Escola",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Sebastião Afonso Domingos",
          url: "https://logrocket.com",
          email: "domingossebastiao380@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3333/",
        },
      ],
      host: "localhost:3333",
        // basePath: '/',
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                scheme: 'bearer',
                in: 'header'
            }
        }
    },
    apis: ["./src/routes/*.ts","./src/routes/**/*.ts" ],
  };
  