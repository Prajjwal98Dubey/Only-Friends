import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleWare = async (req, res, next) => {
  if (req.headers.cookie) {
    const userCookie = req.headers.cookie;
    const token = userCookie.split("=")[1];
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decodedToken) {
      req.user = decodedToken;
      next();
    } else return res.status(200).json({ message: "Authentication Failed." });
  } else {
    return res.status(400).json({ message: "insufficient information." });
  }
};
