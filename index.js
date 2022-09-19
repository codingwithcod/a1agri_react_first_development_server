import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";
import userRouter from "./Routes/userRoute.js";
import adminRoute from "./Routes/adminRotue.js";



const app = express();
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

const port = process.env.Port || 4000;

mongoose.connect("mongodb://127.0.0.1:27017/A1Agri").then(() => {
    console.log("connection successful")
}).catch((err)=> console.log(err))


app.get('/' , (req, res) => {
    res.send("jai Ram ji ki")
})

app.use('/user', userRouter);
app.use('/admin', adminRoute)






app.listen(port, (req, res) => {
    console.log(`server is listening at Port : ${port}`);
})