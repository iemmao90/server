const mongoose = require('mongoose');

async function connectToDB() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database');
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToDB;
