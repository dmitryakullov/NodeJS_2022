const PORT = process.env.PORT || 4040;

const CLIENT_PORT = 'http://localhost:3000';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'This is a API application',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = {
  PORT,
  CLIENT_PORT,
  swaggerOptions,
};
