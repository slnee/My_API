import express from "express";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import phobieRoutes from "./routes/phobieRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(express.static("view"));

app.use("/api/phobies", phobieRoutes);
app.use("/api", userRoutes);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});
