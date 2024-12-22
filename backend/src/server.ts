import express, { Express, Request, Response, RequestHandler } from "express";
import colors from "colors";
import "dotenv/config";
import errorHandler from "../middleware/errorMiddleware";
import productRouter from "../routes/productRoutes";
import userRouter from "../routes/userRoutes";
import connectDB from "../config/db";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;

connectDB();

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
