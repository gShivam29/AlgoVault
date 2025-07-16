import express, { Request, Response } from "express";
import dotenv from "dotenv";
import User from "../models/users"; // Assuming this is correct
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

// type JwtPayload = {
//   sub: string; //subject
//   email: string;
//   name: string;
//   picture: string;
//   email_verified: boolean;
//   iss: string;
// };

dotenv.config({ path: "../../.env" });
// const JWT_SECRET = process.env.JWT_SECRET || "not_undefined";
const app = express.Router(); // or use express.Router() if part of a larger app
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(express.json()); // To parse JSON request bodies

app.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.body?.token;

    if (!token) {
      return res.status(400).json({ message: "Token is Required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Ensure this matches your frontend
    });

    const decoded = ticket.getPayload();

    if (!decoded) {
      return res.status(401).json({ message: "Invalid ID token" });
    }
    const { name, picture, email, email_verified, sub, iss } = decoded;
    //making my own token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res
        .status(500)
        .json({ message: "JWT Secret not defined in environment" });
    }
    const payload = { name: name, email: email };
    const JWTtoken = jwt.sign(payload, jwtSecret!, { expiresIn: "7d" });

    let user = await User.findOne({ email });

    if (user) {
      user.name = name || user.name;
      user.picture = picture || user.picture;
      user.email = email || user.email;
      user.email_verified =
        email_verified !== undefined ? email_verified : user.email_verified;
      user.subject = sub || user.subject;
      user.issuer = iss || user.issuer;
      await user.save();

      return res
        .cookie("JWTtoken", JWTtoken, {
          httpOnly: true,
          secure: false, // true if using HTTPS
          sameSite: "lax",
          path: "/",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ message: "User updated Successfully", user });
    }

    //user does not exist
    user = new User({
      name,
      email,
      picture,
      email_verified,
      subject: sub,
      issuer: iss,
    });

    await user.save();

    return res
      .cookie("JWTtoken", JWTtoken, {
        httpOnly: true,
        secure: false, // true if using HTTPS
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ message: "User Created Successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

export default app;
