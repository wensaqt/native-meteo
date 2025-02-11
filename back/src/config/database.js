const { DataSource } = require("typeorm");
const { UserSchema } = require("../models/User");

const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT || "5432"),
	username: process.env.DB_USERNAME || "postgres",
	password: process.env.DB_PASSWORD || "postgres",
	database: process.env.DB_NAME || "native-meteo-db",
	synchronize: true,
	logging: process.env.NODE_ENV === "development",
	entities: [UserSchema],
	subscribers: [],
	migrations: [],
});

module.exports = { AppDataSource };
