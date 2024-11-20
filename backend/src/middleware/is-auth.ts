import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

// Extend the Request interface to include the user property
export interface AuthRequest extends Request {
  user?: CustomJwtPayload;
}

// Custom payload interface with expected properties
interface CustomJwtPayload extends JwtPayload {
  id: string;
  username: string;
  email: string;
  role: string;
}

export default function isAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "Authorization header missing" });
      return;
    }

    let token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Token missing" });
      return;
    }

    // Remove double quotes from the token
    token = token.replace(/"/g, "");

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decodedToken === "string") {
      res.status(401).json({ error: "Invalid token format" });
      return;
    }

    req.user = decodedToken as CustomJwtPayload;

    next();
  } catch (error) {
    if (error instanceof Error) {
      if (!(error as any).statusCode) {
        (error as any).statusCode = 401;
      }
      next(error);
    } else {
      const newError = new Error("Unauthorized");
      (newError as any).statusCode = 401;
      next(newError);
    }
  }
}
