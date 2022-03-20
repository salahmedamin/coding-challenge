import { default as express, Request, Response, Application } from "express";
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Hello World !",
  });
});
app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening on ${process.env.PORT}`)
);
