import express, { Express, Request, Response, RequestHandler } from "express";
import colors from "colors";
import cors from "cors";
import fs from "fs";
import path from "path";
import "dotenv/config";
import errorHandler from "../middleware/errorMiddleware";
import productRouter from "../routes/productRoutes";
import userRouter from "../routes/userRoutes";
import connectDB from "../config/db";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 5000;

// Create upload folder if it doesnt exist
const uploadsPath = path.resolve(__dirname, "../uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

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
