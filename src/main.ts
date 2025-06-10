import express from "express";
import userRouter from "./router/userRouter";
import categoryRouter from "./router/categoryRouter";

const app = express();

const port = 3000;

app.use(express.json());
app.use("/user",userRouter);
app.use("/category",categoryRouter);
app.listen(port, () => {
  console.log(`This is a port ${port}`);
});
