import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./Routes/bookRoutes.js";
const app = express();


const PORT = 4000;

//middlewares

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//mongodb connection
const MONGODB_URI = 'mongodb://localhost:27017/bookclubdb';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("MongoDB connected")).catch(err => console.log(err));


routes(app);
app.get("/", (req, res) => {
  res.send("welcome to the server!")
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});