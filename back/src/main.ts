import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// Routes
import authRoutes from "./routes/auth";
app.use("/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5600;
app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server running on port ${PORT}`);
});
