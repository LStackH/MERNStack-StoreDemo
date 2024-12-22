import express, { Express, Request, Response, RequestHandler } from "express";
import "dotenv/config";
import errorHandler from "../middleware/errorMiddleware";
import router from "../routes/productRoutes";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;

app.use("/api/products", router);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
