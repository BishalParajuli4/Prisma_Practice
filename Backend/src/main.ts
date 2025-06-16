import express from "express";
import userRouter from "./router/userRouter";
import categoryRouter from "./router/categoryRouter";
import { todoRouter } from "./router/todoRouter";
import { authRoutes } from "./router/authRoutes";


const app = express();

const port = 3000;


app.use(express.json());
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/todo", todoRouter);
app.use("/auth", authRoutes);
app.use(cookieParser());


app.listen(port, () => {
  console.log(`This is a port ${port}`);
});
function cookieParser(): any {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      req.cookies = parseCookies(cookieHeader);
    }
    next();
  };
}

function parseCookies(cookieHeader: string): { [key: string]: string } {
  return cookieHeader.split(";").reduce((cookies, cookie) => {
    const [name, value] = cookie.trim().split("=");
    cookies[name] = decodeURIComponent(value);
    return cookies;
  }, {} as { [key: string]: string });
}

