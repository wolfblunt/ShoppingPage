require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const { logger } = require('./utils/logger');
const sequelize = require('./config/database');
const setupSwagger = require('./swagger/swaggerDocs');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  exposedHeaders: ['session-id', 'user-id', 'Content-Disposition']
}));

app.use(express.json());
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/api/orders', orderRoutes);

setupSwagger(app);

sequelize.sync().then(() => {
  logger.info('Database connected and synced');
}).catch(err => {
  logger.error('Failed to connect to the database:', err);
});


// Global error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled Error', { error: err.message });
  res.status(err.status || 500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;
