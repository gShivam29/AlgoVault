import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import users from "../models/users";
interface DecodedToken{
  name: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userID: string;
        name: string;
        email: string;
      };
    }
  }
}


export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const JWTtoken = req.cookies?.JWTtoken;

  if (!JWTtoken) {
    res.status(401).json({ message: "Unauthorised: No Token Provided" });
    return;
  }

  try {
    const decoded = jwt.verify(JWTtoken, process.env.JWT_SECRET!) as DecodedToken;
    const user = await users.findOne({email: decoded.email}).select('_id name email');
    if (!user){
      res.status(404).json({message: 'User not found'});
      return;
    }

    req.user = {
      userID: user._id.toString(),
      name: user.name,
      email: user.email
    }
    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden: Invalid Token" });
    return;
  }
};
