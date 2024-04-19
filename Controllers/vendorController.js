const Vendor = require("../Models/Vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv")

dotEnv.config();

const seicritKey = process.env.key;

const vendorRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try{
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json({msg: "Vendor already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = await Vendor({
            name,
            email,
            password: hashedPassword
        })
        await newVendor.save();
        console.log("Vendor registered successfully");
        res.status(200).json({msg: "Vendor registered successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"internal server error"});
    }
}

const vendorLogin =  async(req,res)=>{
    const{email,password} = req.body;
    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            return res.status(400).json({msg: "Invalid credentials"});
        }
        const token = jwt.sign({vendorId: vendor._id}, seicritKey);

        res.status(200).json({success:"Vendor logged in successfully", token});
        console.log("Vendor logged in successfully", email,"this is the token", token);
    } catch(err){
        console.log(err);
        res.status(500).json({err:"internal server error"});
    }
}

module.exports = {vendorRegister, vendorLogin};