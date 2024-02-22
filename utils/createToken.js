


import jwt from "jsonwebtoken";




const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  // Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken


// const createToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "3d",
//   });
//   return token;
// };

// export {
//   generateToken,
//   createToken
// };

// import jwt from "jsonwebtoken";

// const generateToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });

//   console.log("Generated token: ", token);

//   // Set JWT as an HTTP-Only Cookie
//   res.cookie("jwt", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== "development",
//     sameSite: "none",
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//   });

//   console.log("Set cookie: ", res.cookies);

//   return token;
// };

// export default generateToken;
