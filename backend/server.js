import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// Security middleware
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

// Body parser
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL.split(","),
    credentials: true
  })
);

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));