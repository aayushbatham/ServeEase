import express from "express";
import dotenv from "dotenv";
import sequelize from "./db/db.connect.js";
import './models/association.js';
import userRoute from "./routes/user.route.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use("/api/users", userRoute);
app.get("/", (req, res) => {
  res.send("Hello World!");
})

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync(); // Syncs the models with the database
    console.log('Database synced successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to sync the database:', error);
  }
};

startServer();