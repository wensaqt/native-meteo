const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) {
			return res.status(401).json({ message: "Authentification requise" });
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decodedToken;
		next();
	} catch (error) {
		res.status(401).json({ message: "Token invalide" });
	}
};
