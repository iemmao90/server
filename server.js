// Load env variables
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}
// Import dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDB = require('./config/connectToDb');

const itemsController = require('./controllers/itemController');
const usersController = require('./controllers/usersController');
const requireAuth = require('./middleware/requireAuth');

// Create an express app
const app = express();
const PORT = process.env.PORT || 3030;

// Configure express app
app.use(express.json());
app.use(cookieParser());
// Server accepts from any domain
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Connect to database
connectToDB();
console.log('test');

// Routing
app.post('/signup', usersController.signup);
app.post('/login', usersController.login);
app.get('/logout', usersController.logout);
app.get('/check-auth', requireAuth, usersController.checkAuth);

app.get('/items', requireAuth, itemsController.fetchItems);
app.get('/items/:id', requireAuth, itemsController.fetchItem);
app.post('/items', requireAuth, itemsController.createItem);
app.put('/items/:id', requireAuth, itemsController.updateItem);
app.delete('/items/:id', requireAuth, itemsController.deleteItem);

// Start our server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
