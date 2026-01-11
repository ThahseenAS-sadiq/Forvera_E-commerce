import { getAuth } from "@clerk/express";

const clerkAuth = (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    req.userId = userId; // ✅ VERY IMPORTANT
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default clerkAuth;
