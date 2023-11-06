import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Eco Coding Interview',
      version: '1.0.0',
    },
  },
  apis: ['./src/router.ts'],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };