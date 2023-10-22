const express = require('express');
require('dotenv').config();
require('../src/DB/connection');
const cors = require('cors')
const path = require('path')

// importing routers
const ClientRouter1 = require('./Routers/ClientRouters/ClientRouter1')
const AdminRouter1 = require('./Routers/AdminRouters/AdminRouter1')
const verifyRouter1 = require('./Routers/verification/varificationRouter')
const MailRouter = require('./Routers/MailRoutes/MailRouter')
const searchRouter = require('./Routers/search router/searchRouter')
const PaymentRouter = require('./Routers/PaymentRouters/PaymentRouter')
const OrderRouter = require('./Routers/OrderRouters/OrderRouter')

const port = process.env.PORT || 1432;

const app = express();

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(
    cors({
        origin: "*"
    })
)



// defining Route
app.use("/client1", ClientRouter1)
app.use("/admin", AdminRouter1)
app.use("/verify", verifyRouter1)
app.use("/mail", MailRouter)
app.use("/search", searchRouter)
app.use("/payment", PaymentRouter)
app.use("/order", OrderRouter)






// app.use((err , req , res , next)=>{
//     console.log("Error: ", err);
//     res.send(err);
// })




app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});