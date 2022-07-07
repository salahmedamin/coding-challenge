import dotenv from "dotenv";
import { Application, default as express } from "express";
import { APIRouter } from "./routes/api";

dotenv.config();
const app: Application = express();
app.use(express.json());
app.use("/api", APIRouter);
export default app;
