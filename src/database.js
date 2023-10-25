const mongoose = require('mongoose');
const { database } = require('./keys');

mongoose.connect(database.URI, {
    useNewUrlParser: true
}).then(db => console.log("La base de datos se conectó"))
  .catch(err => console.error(err));

 