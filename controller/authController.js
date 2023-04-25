import User from "../models/User.js";
import { HashPassword, comparePassword } from "../utils/authHelper.js";
import Jwt from "jsonwebtoken";

// Register User
export const Register = async (req, res) => {
    try {
        // assign Value 
        const { name, email, password, phone } = req.body;

        if (!name) {
            return res.send({
                error: "name is Required"
            })
        }
        if (!email) {
            return res.send({
                error: "email is Required"
            })
        }
        if (!password) {
            return res.send({
                error: "password is Required"
            })
        }
        if (!phone) {
            return res.send({
                error: "phone is Required"
            })
        }

        // Check User is exist or not 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Email Already Register !!"
            })
        }

        // Convert Password into Hash
        const HashedPassword = await HashPassword(password);

        // Save into Database 
        const user = await new User({ name, email, phone, password: HashedPassword }).save()
        res.status(200).json({
            success: true,
            message: "User Register Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error
        })
    }
}

// Login User || POST
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({
                error: "Invalid email or password"
            })
        }

        const UserExist = await User.findOne({ email });
        if (!UserExist) {
            return res.status(200).send({
                success: false,
                message: "User Not Exist Please Register !!"
            })
        }

        const IsMatch = await comparePassword(password, UserExist.password);
        if (!IsMatch) {
            return res.status(200).send({
                success: false,
                message: "Incorrect password"
            })
        }  
        
        console.log((UserExist._id).toString());
        const JwtToken = await Jwt.sign({ _id: (UserExist._id).toString() }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                name: UserExist.name,
                email: UserExist.email,
                phone: UserExist.phone,
                AdminRole: UserExist.AdminRole
            },
            JwtToken,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
        })
    }
}
