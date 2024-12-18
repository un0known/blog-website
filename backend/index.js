import express from 'express'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary';

import mongoose from 'mongoose'
import userRoute from "./routes/userRoute.js"


const app = express()
dotenv.config()

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL
console.log(MONGO_URL);

// middleware
app.use(express.json())

// file upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/"
}))

// db code
try{
    mongoose.connect(MONGO_URL)
    console.log("connect to mongoos");
}catch(error){
    console.log(error);
    
}

// define routes
app.use("/api/users", userRoute)

// Cloudinary 
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});

app.listen(port, ()=>{
    console.log(`server is runnig at port: ${port}`);
    
})
