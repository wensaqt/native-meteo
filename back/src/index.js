require("reflect-metadata");
require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const { AppDataSource } = require("./config/database");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Connexion à la base de données
AppDataSource.initialize()
	.then(() => {
		console.log("Connexion à la base de données établie");

		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`Serveur démarré sur le port ${PORT}`);
		});
	})
	.catch((error) =>
		console.log("Erreur lors de la connexion à la base de données:", error)
	);

// Gestion des erreurs
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Une erreur est survenue!" });
});
