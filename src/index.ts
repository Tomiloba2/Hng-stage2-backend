import express from "express";
import dotenv from "dotenv"
import errorHandler from "./middlewares/errorHandler.js";
import router from "./routes/route.js";
dotenv.config()

const app = express()
const Port = process.env.PORT || 2001
app.use(express.json())
app.use(`/api`, router)

//error handler middleware
app.use(errorHandler)


app.listen(Port, () => {
    console.log(`server is live on port ${Port}`);

})