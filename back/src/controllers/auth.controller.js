const jwt = require("jsonwebtoken");
const { AppDataSource } = require("../config/database");
const { User } = require("../models/User");

const userRepository = AppDataSource.getRepository("User");

const createToken = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
};

exports.register = async (req, res) => {
	try {
		console.log("[AUTH] Register request body:", req.body);

		const { email, password, username } = req.body;

		if (!email || !password || !username) {
			console.log("[AUTH] Registration failed: Missing fields", {
				email,
				password: !!password,
				username,
			});
			return res.status(400).json({ message: "Tous les champs sont requis" });
		}

		console.log("[AUTH] Register attempt:", { email, username });

		const existingUser = await userRepository.findOne({ where: { email } });
		if (existingUser) {
			console.log("[AUTH] Registration failed: Email already exists");
			return res.status(400).json({ message: "Cet email est déjà utilisé" });
		}

		const user = new User();
		user.email = email;
		user.password = password;
		user.name = username;

		await user.hashPassword();
		const savedUser = await userRepository.save(user);

		const token = createToken(savedUser.id);
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 24 * 60 * 60 * 1000,
		});

		console.log("[AUTH] Registration successful:", {
			id: savedUser.id,
			email: savedUser.email,
		});

		res.status(201).json({
			message: "Inscription réussie",
			user: {
				id: savedUser.id,
				email: savedUser.email,
				username: savedUser.name,
			},
			token: token,
		});
	} catch (error) {
		console.error("[AUTH] Registration error:", error);
		res.status(500).json({
			message: "Erreur lors de l'inscription",
			details: error.message,
		});
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await userRepository.findOne({ where: { email } });
		if (!user || !(await user.comparePassword(password))) {
			return res
				.status(401)
				.json({ message: "Email ou mot de passe incorrect" });
		}

		const token = createToken(user.id);

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 24 * 60 * 60 * 1000, // 1 jour
		});

		res.json({
			message: "Connexion réussie",
			user: { id: user.id, email: user.email, name: user.name },
			token: token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Erreur lors de la connexion" });
	}
};

exports.logout = (req, res) => {
	res.cookie("token", "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		expires: new Date(0),
	});

	res.json({ message: "Déconnexion réussie" });
};
