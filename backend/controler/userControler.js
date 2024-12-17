import { User } from "../models/user.models.js"

export const register = async(req, res) =>{
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({message: "no file uploaded"})
    }
    const {img} = req.files
    const allowedFormats = ["jpg", "png"]
    if(!allowedFormats.includes(img.mimetype)){
        return res.status(400).json({ message: "invalid img formate"})
    }
    const{email, name, password, phone, role} = req.body
    if(!email || !name || !password || !phone || !role || !img){
        return res.status(400).json({massage: "please fill require fields"})
    }
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({message: "user already exist"})
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        img.tempFilePath
    )
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log(cloudinaryResponse.error);
        
    }
    const newUser = new User ({email, name, password, phone, role, img:{
        public_id: img.public_id,
        url: img.url
    }})
    await newUser.save()
    if(newUser){
        res.status(201).json({massage: "user registerd successfully"})
    }
    
    
}