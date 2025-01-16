import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import fileUploader from "express-fileupload";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";


import router from "./routers";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(fileUploader({
  useTempFiles: true,
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use("/api/v1", router);
app.use(errorHandler);

export default app;
