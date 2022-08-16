const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 4040;

require('./auth/auth');
require('./db');

const routes = require('./routes/routes');
const secureRoute = require('./routes/secureRoutes');

const app = express();

const options = {
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

const openApiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification, { explorer: true }));

app.use(cors());
app.use(bodyParser.json());
app.use('/static', express.static(`${__dirname}/public`));

app.use('/', routes);

app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({ message: err, entity: null });
});

app.listen(PORT, () => {
  console.log(`Listening app on port http://localhost:${PORT}`);
  console.log(`Listening swagger on port http://localhost:${PORT}/api-docs`);
});
