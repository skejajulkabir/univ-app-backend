const express = require('express');
require('dotenv').config();
require('../src/DB/connection');
const cors = require('cors')

// importing routers
const ClientRouter1 = require('./Routers/ClientRouters/ClientRouter1')
const AdminRouter1 = require('./Routers/AdminRouters/AdminRouter1')
const verifyRouter1 = require('./Routers/verification/varificationRouter')

const port = process.env.PORT || 1432;

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*"
    })
)



// defining Route
app.use("/client1", ClientRouter1)
app.use("/admin", AdminRouter1)
app.use("/verify", verifyRouter1)






// app.use((err , req , res , next)=>{
//     console.log("Error: ", err);
//     res.send(err);
// })




app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});