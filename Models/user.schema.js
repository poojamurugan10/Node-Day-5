import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum:["admin","user"],
        default: "user"
    },
    token: {
        type: String
    },

})

const User = mongoose.model("User",userSchema)

export default User;
