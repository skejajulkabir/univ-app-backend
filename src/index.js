const express = require('express');
require('dotenv').config();
require('../src/DB/connection');

const port = process.env.PORT || 1432;


// importing routers
const ClientRouter1 = require('./Routers/ClientRouters/ClientRouter1')
const AdminRouter1 = require('./Routers/AdminRouters/AdminRouter1')


const app = express();

app.use(express.json());



// defining Route
app.use("/client1", ClientRouter1)
app.use("/admin", AdminRouter1)









app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});