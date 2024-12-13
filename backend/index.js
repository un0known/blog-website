import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
const app = express()
dotenv.config()
// thus is jnew cmmd

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL
console.log(MONGO_URL);


app.get('/', (req, res)=>{
    res.send('hello word')
});

app.listen(port, ()=>{
    console.log(`server is runnig at port: ${port}`);
    
})