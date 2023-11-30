require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { handleResponse } = require('./helper/responseHandler');
const app = express();
const { sequelize } = require('./models'); // Import your Sequelize instance
const port = process.env.PORT || 8080;
const routes = require('./routes/index')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api', routes)

app.all('*', (req, res) => {
  return handleResponse(res, 404, { message: 'API Not Found' });
});

// Start the server and check database connection
async function startServer() {
  try {
    // Connect to the database using Sequelize
    await sequelize.authenticate();
    console.log('Database connection established successfully');

    // Start the Express.js server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
