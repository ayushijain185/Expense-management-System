const express = require('express');
const app=express();
const PORT = process.env.PORT || 8000
const userRoute = require('./routes/userRoute');
const transectionRoute = require("./routes/transectionRoutes")
const cors = require('cors');
const morgan = require('morgan');

const colors=require('colors');
const dotenv=require('dotenv');
dotenv.config();

const connectDb = require("./config/connectDB")
connectDb();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/users",userRoute);
app.use("/api/v1/transection",transectionRoute)

app.listen(PORT,()=>{
    console.log(`server listen on port ${PORT}`)
})

