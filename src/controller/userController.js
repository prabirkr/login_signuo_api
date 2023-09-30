const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const signup = async(req, res)=> {

   // check for existing user
   //hashed password
   // user creation
   //token generation

   const {username, email ,password} = req.body;

   
   try{
        const existingUser = await userModel.findOne({email : email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashedpassword,
            username: username
        });

        const token = jwt.sign({email: result.email, id : result._id},SECRET_KEY );
        res.status(201).json({user : result, token : token});
   } catch(error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
   }

}

const signin = async(req, res)=> {

    const {email , password} = req.body;
    try {
        const existingUser = await userModel.findOne({email : email});
        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }
         
        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
           return res.status(400).json({message: "Invalid Password"}); 
        }

        const token = jwt.sign({email : existingUser.email, id : existingUser._id},SECRET_KEY );
        res.status(201).json({user : existingUser, token : token});
        
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

module.exports = {signup, signin};