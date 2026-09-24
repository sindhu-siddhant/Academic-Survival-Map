const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const subjectRoutes = require("./routes/subjectRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/subjects", subjectRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Academic Survival Map API is running!"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
