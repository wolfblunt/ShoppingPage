module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Orders Assignment Microservice API',
    version: '1.0.0',
    description: 'API documentation for the Orders Backend Microservice',
  },
  servers: [
    {
      url: 'http://localhost:3002',
      description: 'Orders Backend APIs',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};