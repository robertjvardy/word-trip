import jwt from "jsonwebtoken";

const generateAccessToken = (user: string) => {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

export default generateAccessToken;
