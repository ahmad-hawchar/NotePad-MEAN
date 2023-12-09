import mongoose from "mongoose";
import userSchema from '../model/UserSchema.js';
const User = mongoose.model('Users', userSchema);
import connection from "../connection.js";
const register = async (fullname, email, password) => {
    try {
        let alreadytaken = await User.find({ email: email })
        if (alreadytaken.length > 0) {
            return false;
        }
        else {
            const newUser = new User({
                fullname,
                email,
                password,
            });
            await newUser.save();
            return true
        }
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
const Login = async (email, password) => {
    try {
        let Result = await User.find({ email: email, password: password });
        if (Result.length > 0) {
            return { success: true, result: Result[0]._id }
        }
        else {
            return { success: false }
        }
    }
    catch (e) {
        throw (e)
    }
}

export default {
    register,
    Login
}