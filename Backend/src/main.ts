import express from "express";
import userRouter from "./router/userRouter";
import categoryRouter from "./router/categoryRouter";
import { todoRouter } from "./router/todoRouter";
import signInRouter from "./router/sign-inRouter";

const app = express();

const port = 3000;

app.use(express.json());
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/todo", todoRouter);
app.use("/login", signInRouter);

app.listen(port, () => {
  console.log(`This is a port ${port}`);
});
