import express from "express";
import cors from "cors"
import { route } from "./routes/routes.js";

const app = express();
app.use(express.json())
app.use(cors());

app.use("/api", route);

app.listen(8000, function () {
     console.log("App is running in port 8000")
})