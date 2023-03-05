import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController=async (req,res)=>{
    try{
           const {name,email,password,phone,address}=req.body;
           console.log(req.body);
           if(!name)
           {
            return res.send({error:'Namejh is required'});
           }
           if(!email)
           {
            return res.send({error:'email is required'});
           }
           if(!password)
           {
            return res.send({error:'password is required'});
           }
           if(!phone)
           {
            return res.send({error:'phone is required'});
           }
           if(!address)
           {
            return res.send({error:'address is required'});
           }


           //check User
           const existingUser=await userModel.findOne({email});

           if(existingUser)
           {
               return res.status(200).send({
                    success:true,
                    message:'Already Register Plaese Login'
               })
           }


           //register user
           const hashedPasseord=await hashPassword(password);
           //save
           const user=await new userModel({name,email,phone,address,password:hashedPasseord}).save();

           res.status(201).send({
            success:true,
            message:'User Register Successfully',
            user
           })

    } catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in Registration',
            error,
        });
    }



};

