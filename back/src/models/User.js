const { EntitySchema } = require("typeorm");
const bcrypt = require("bcryptjs");

class User {
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 12);
	}

	async comparePassword(candidatePassword) {
		return bcrypt.compare(candidatePassword, this.password);
	}
}

const UserSchema = new EntitySchema({
	name: "User",
	tableName: "users",
	target: User,
	columns: {
		id: {
			primary: true,
			type: "uuid",
			generated: "uuid",
		},
		email: {
			type: "varchar",
			unique: true,
		},
		password: {
			type: "varchar",
		},
		name: {
			type: "varchar",
		},
		createdAt: {
			type: "timestamp",
			createDate: true,
		},
		updatedAt: {
			type: "timestamp",
			updateDate: true,
		},
	},
});

module.exports = { User, UserSchema };
