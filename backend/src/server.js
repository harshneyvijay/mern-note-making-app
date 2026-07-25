import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config(); 

//console.log(process.env.DATABASE_URL);

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors({
    origin:"http://localhost:5173",
}));

app.use(express.json());
app.use(rateLimiter);
// app.use((req,res,next) => {
//     //console.log("we just got a new req");
//     console.log(`req method is ${req.method} & req URL is ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT);
    });
});