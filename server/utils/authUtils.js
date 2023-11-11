import jwt from "jsonwebtoken";

// Function to set an HTTP cookie on client
export const setTokenCookie = (res, token) => {
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    // Setting httpOnly to true makes cookie accessible via HTTP
    httpOnly: true,
    // Cookie expires one day from now
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
};

// Function to generate JWT token for a user
export const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );
};
