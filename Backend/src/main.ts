import express from "express";
import userRouter from "./router/userRouter";
import categoryRouter from "./router/categoryRouter";
import { todoRouter } from "./router/todoRouter";

const app = express();

const port = 3000;

app.use(express.json());
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/todo", todoRouter);
app.listen(port, () => {
  console.log(`This is a port ${port}`);
});
