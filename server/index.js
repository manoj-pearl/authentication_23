import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/connDb.js";
import userRoute from "./routes/userRoute.js";

const app = express();

dotenv.config();

const PORT = 5000 || process.env.PORT;


app.use(cookieParser());

app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000","http://localhost:3001"],
    credentials: true,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    exposedHeaders: ["*", "Authorization"],
  })
);



app.use("/api/auth/user", userRoute);


// app.use("/", (req, res, next) => {
//   return res.send("Welcome to Authentication App");
// });


app.listen(PORT, () => {
  console.log(`Server is running on port no ${PORT}`);
  connectDB();
});
