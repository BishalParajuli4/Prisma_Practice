/// This code is all about user authentication, including login, signup, and logout functionalities using JWT and Prisma ORM. And password and token management with bcrypt and cookies. They are in hased format for security.
// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { prisma } from "../db";
// import bcrypt from "bcrypt";

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// // Login handler
// const checkLogin = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       res.status(400).json({ error: "Email and password are required." });
//       return;
//     }

//     const existingUser = await prisma.login.findUnique({
//       where: { email },
//     });

//     if (!existingUser) {
//       res.status(401).json({ error: "User not found or incorrect credentials" });
//       return;
//     }

//     const isPasswordValid = await bcrypt.compare(password, existingUser.password);
//     if (!isPasswordValid) {
//       res.status(401).json({ error: "Invalid password" });
//       return;
//     }

//     const token = jwt.sign({ id: existingUser.id, email }, JWT_SECRET, { expiresIn: "1h" });

//     // Update token in database
//     await prisma.login.update({
//       where: { email },
//       data: { token },
//     });

//     // Set cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 60 * 1000, // 1 hour
//       sameSite: "strict",
//     });

//     res.status(200).json({
//       message: `Welcome back, ${existingUser.name}!`,
//       email: existingUser.email,
//       token,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Unexpected error occurred" });
//   }
// };

// // Signup handler (if new user wants to register)
// const signup = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//      res.status(400).json({ error: "Name, email, and password are required." });
//       return;

//     }

//     const existingUser = await prisma.login.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       res.status(409).json({ error: "User already exists." });
//       return;
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

//     const newUser = await prisma.login.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         token,
//       },
//     });

//     // Set cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 60 * 1000,
//       sameSite: "strict",
//     });

//     res.status(201).json({ message: "User created successfully", user: newUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error creating user" });
//   }
// };

// // Logout handler
// const logout = async (req: Request, res: Response) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       res.status(400).json({ error: "No token provided" });
//       return;
//     }

//     const decoded = jwt.verify(token, JWT_SECRET) as { email: string };

//     await prisma.login.update({
//       where: { email: decoded.email },
//       data: { token: null },
//     });

//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });

//     res.status(200).json({ message: "Successfully logged out" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error while logging out" });
//   }
// };

// export { checkLogin, signup, logout };

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const checkLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password required" });
      return;
    }

    const user = await prisma.login.findUnique({ where: { email } });
    if (!user || password !== user.password) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id, email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const hashedToken = await bcrypt.hash(token, 10);

    await prisma.login.update({
      where: { email },
      data: { token: hashedToken },
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
      sameSite: "lax",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: "All fields required" });
      return;
    }

    const existingUser = await prisma.login.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: "User exists" });
      return;
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "20sec" });
    const hashedToken = await bcrypt.hash(token, 10);

    const newUser = await prisma.login.create({
      data: { name, email, password, token: hashedToken },
    });
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
      sameSite: "strict",
    });

    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(400).json({ error: "No token provided" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    await prisma.login.update({
      where: { email: decoded.email },
      data: { token: null },
    });

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch {
    res.status(500).json({ error: "Server error during logout" });
  }
};

export { checkLogin, signup, logout };
