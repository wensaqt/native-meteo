const {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
} = require("typeorm");
const bcrypt = require("bcryptjs");

@Entity("users")
class User {
	@PrimaryGeneratedColumn("uuid")
	id;

	@Column({ unique: true })
	email;

	@Column()
	password;

	@Column()
	name;

	@CreateDateColumn()
	createdAt;

	@UpdateDateColumn()
	updatedAt;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 12);
	}

	async comparePassword(candidatePassword) {
		return bcrypt.compare(candidatePassword, this.password);
	}
}

module.exports = User;
