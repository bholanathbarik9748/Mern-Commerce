import Jwt from "jsonwebtoken";

// Protected Route
export const requiredSignIn = async (req, res, next) => {
    try {
        const decode = Jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false, 
            message: "Something went wrong"
        })
    }
}