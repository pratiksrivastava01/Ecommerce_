const ErrorHandler = require("../utils/errorhander");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  // Check if 'req.cookies' exists before attempting to destructure 'token'
  if (req.cookies && req.cookies.token) {
    const { token } = req.cookies;
    // Uncomment the following lines if you want to use the token for further verification
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    // Call 'next()' to proceed to the next middleware or route handler
    next();
  } else {
    // If 'req.cookies' or 'req.cookies.token' is undefined, handle the error
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
