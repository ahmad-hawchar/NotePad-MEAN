import express from 'express';
import cors from 'cors'
import authControl from '../controllers/authControl.js';
let app = express();
app.use(cors());
app.use(express.json());
app.post('/register', authControl.register)
app.post('/login', authControl.Login)
export default app