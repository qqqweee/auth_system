import express from "express";
import { body } from "express-validator";
import {
  registerUser,
  authUser,
  logoutUser,
  getProfile,
  refreshToken
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.post(
  "/signup",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 })
  ],
  validate,
  registerUser
);

router.post("/login", authUser);
router.post("/refresh", refreshToken);
router.post("/logout", logoutUser);
router.get("/profile", protect, getProfile);

export default router;