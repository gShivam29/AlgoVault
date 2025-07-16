import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const JWTtoken = req.cookies?.JWTtoken;

  if (!JWTtoken) {
    res.status(401).json({ message: "Unauthorised: No Token Provided" });
    return;
  }

  try {
    const decoded = jwt.verify(JWTtoken, process.env.JWT_SECRET!);
    // req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden: Invalid Token" });
    return;
  }
};
