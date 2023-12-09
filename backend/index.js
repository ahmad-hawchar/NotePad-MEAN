import express from 'express';
import authRoute from './routes/authRoute.js';
import ListRoute from './routes/ListRoute.js';
let app = express();
const PORT = process.env.PORT || 4000;
app.use(authRoute);
app.use(ListRoute);
app.listen(PORT, () => console.log("listening on port " + PORT));