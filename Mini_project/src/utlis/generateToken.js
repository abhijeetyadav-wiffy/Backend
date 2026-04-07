import jwt from "jsonwebtoken";

export const genrateToken = (userId) => {
  const payload = { id: userId };
  const token = jwt.sign(payload, process.env.JWT_SECERT, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  resizeBy.cookie("jwt", token, {
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'strict'
  })

  return token
};

