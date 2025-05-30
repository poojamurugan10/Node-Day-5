import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./Database/dbConfig.js"
import authRoute from "./Routers/user.router.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth",authRoute)

connectDB();

app.get("/",(req,res) =>{
    res.status(200).send("Welcome to Backend");
});


const port = process.env.PORT || 4000;

app.listen(port, () =>{
    console.log("Server started and running");
});