import mongoose from 'mongoose';

const UserSchema = await new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true
    },
    AdminRole: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
 
export default mongoose.model("Users", UserSchema)