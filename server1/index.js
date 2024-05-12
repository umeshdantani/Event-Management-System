import express from 'express';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from "cors";

import { connectDB } from './db/connectdb.js'
import { router } from './routes/routes.js'

const app = express();

const port = process.env.PORT || 5000;
const databaseUrl = process.env.MONGO_URI || "mongodb://localhost:27017"

//Database connect
connectDB(databaseUrl);

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true,
}))

// parse request to body-parser
app.use(bodyParser.urlencoded({ extended : true, limit: "16kb"}))
app.use(express.json({limit: "16kb"}));
app.use(cookieParser());

app.use('/', router)

app.listen(port, () => {
    console.log(`server listen at http://localhost:${port}`);
})