const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { createServer } = require('http');
const { Server } = require('socket.io');

const { PORT, CLIENT_PORT, swaggerOptions } = require('./config');
const routes = require('./routes/routes');
const secureRoute = require('./routes/secureRoutes');

const app = express();
const httpServer = createServer(app);

require('./auth/auth');
require('./db');

const openApiSpecification = swaggerJsdoc(swaggerOptions);
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

const io = new Server(httpServer, { cors: { origin: CLIENT_PORT } });

io.on('connection', (socket) => {
  console.log(`User connection id: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User ID: ${socket.id} joined room ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening app on port http://localhost:${PORT}`);
  console.log(`Listening swagger on port http://localhost:${PORT}/api-docs`);
});
