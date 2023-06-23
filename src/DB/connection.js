// const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017", {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Connected to the database");
// }).catch((error) => {
//     console.log("There was an issue connecting to the database", error);
// });






const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to the database");
}).catch((error) => {
    console.log("There was an issue connecting to the database", error);
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', () => {
//   console.log('Connected to the database');
// });