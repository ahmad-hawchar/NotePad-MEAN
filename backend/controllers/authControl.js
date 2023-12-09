import authService from '../services/authService.js';
import dotenv from 'dotenv';
dotenv.config();
const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (fullname && email && password) {
            const success = await authService.register(fullname, email, password);
            if (success) {
                res.status(200).send({ success: true, message: "user added successfully" });
            }
            else if (success == false) {
                res.status(200).send({ success: false, message: "email already registered" });
            }
        }
        else {
            res.status(400).send({ success: false, message: "bad request, missing critical information" })
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const result = await authService.Login(email, password);
            if (result.success) {
                res.status(200).send({ success: true, message: "giveAccess", result: result.result })
            }
            else {
                res.status(200).send({ success: true, message: "WrongInputs" })
            }
        }
        else {
            res.status(400).send({ success: false, message: "bad request, missing critical information" })
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).send("Internal server error")
    }
}

export default {
    register,
    Login,
};