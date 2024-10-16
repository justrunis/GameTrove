import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./is-auth"; // assuming this is where your AuthRequest is defined

export default function isAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    // Check if the user is authenticated and has the role of admin
    if (req.user?.role !== "admin") {
      res.status(403).json({ error: "Access denied. Admins only." });
      return;
    }

    // If the user is an admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle unexpected errors
    if (!(error instanceof Error)) {
      error = new Error("Unauthorized");
    }
    if (!(error as any).statusCode) {
      (error as any).statusCode = 401;
    }
    next(error);
  }
}
