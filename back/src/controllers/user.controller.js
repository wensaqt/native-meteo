const { AppDataSource } = require("../config/database");
const { User } = require("../models/User");

const userRepository = AppDataSource.getRepository("User");

exports.getProfile = async (req, res) => {
	try {
		const user = await userRepository.findOne({
			where: { id: req.user.userId },
		});

		if (!user) {
			return res.status(404).json({ message: "Utilisateur non trouvé" });
		}

		res.json({
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
			},
		});
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Erreur lors de la récupération du profil" });
	}
};

exports.updateProfile = async (req, res) => {
	try {
		const { name, email } = req.body;
		const user = await userRepository.findOne({
			where: { id: req.user.userId },
		});

		if (!user) {
			return res.status(404).json({ message: "Utilisateur non trouvé" });
		}

		// Vérifier si le nouvel email n'est pas déjà utilisé
		if (email && email !== user.email) {
			const existingUser = await userRepository.findOne({
				where: { email },
			});
			if (existingUser) {
				return res.status(400).json({ message: "Cet email est déjà utilisé" });
			}
			user.email = email;
		}

		if (name) {
			user.name = name;
		}

		await userRepository.save(user);

		res.json({
			message: "Profil mis à jour avec succès",
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
			},
		});
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Erreur lors de la mise à jour du profil" });
	}
};
