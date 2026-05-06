import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { collegeRoutes } from "./routes/collegeRoutes";
import { compareRoutes } from "./routes/compareRoutes";
import { predictRoutes } from "./routes/predictRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/colleges", collegeRoutes);
app.use("/api/compare", compareRoutes);
app.use("/api/predict", predictRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
