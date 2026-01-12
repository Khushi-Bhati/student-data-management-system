import { Usermodel } from "../models/Usermodel.js";

const registerController=async(req,res)=>{
    try {
        const {username,email,password,mobileno,usertype}=req.body;

        if([username,email,password,mobileno,usertype].some((field)=>{
            field.trim()===""
        })){
            res.status(200).send({
                message:"All fields are required",
                status:"notsuccess"
            })
        }


        // find data read data


        const user=await Usermodel.findOne({email});

        if(user){
            res.status(200).send({
                message:"User already exist",
                status:'notsuccess'
            })
        }


        const createuser=await Usermodel.create({
            email,
            username,
            mobileno,
            usertype,
            password
            
        })



        res.status(200).send({
            message:"User Register successfully",
            status:'success',
            profile:createuser
        })
        
    } catch (error) {
        res.status(500).send({
            message:`register user error:${error}`,
            status:"failed"
        })
        
    }

}

const logincontroller=async(req,res)=>{
    try {
        const {email,password}=req.body;

        if([email,password].some((field)=>{
            field.trim()===""
        })){
            res.status(200).send({
                message:"All fields are required",
                status:"notsuccess"
            })
        }



        const user=await Usermodel.findOne({email});

        console.log(user)

        if(!user){
            res.status(200).send(
                {
                    message:"Please register first",
                    status:"notsuccess"
                }
            )
        }


        const matchpassword=await user.isPasswordCorrect(password)

        if(!matchpassword){
            res.status(200).send(
                {
                    message:"Invalid email or password",
                    status:'notsuccess'
                }
            )
        }


        const token=await user.generateAccessToken();

        res.status(200).send(
            {
                message:"Login successfully",
                status:"success",
                loginid:user._id,
                role:user.usertype,
                isprofilecreated:user.isprofilecreated,
                token,
                email:user.email
            }
        )


    } catch (error) {
        res.status(500).send(
            {
                message:`login error:${error}`,
                status:"notsuccess"
            }
        )
        
    }
}

export {registerController,logincontroller}