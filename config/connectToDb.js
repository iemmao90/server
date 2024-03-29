const mongoose = require('mongoose');

async function connectToDB() {
  try {
    await mongoose.connect(process.env.REACT_APP_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(typeof process.env.REACT_APP_DB_URI);
    console.log('Connected to database');
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToDB;
