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
		const { email, password, name } = req.body;

		const existingUser = await userRepository.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: "Cet email est déjà utilisé" });
		}

		const user = new User();
		user.email = email;
		user.password = password;
		user.name = name;

		await user.hashPassword();
		const savedUser = await userRepository.save(user);

		res.status(201).json({
			message: "Inscription réussie, vous pouvez maintenant vous connecter",
			user: { id: savedUser.id, email: savedUser.email, name: savedUser.name },
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Erreur lors de l'inscription" });
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
