import jwt from "jsonwebtoken";

export const generateAdminToken = (email: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};