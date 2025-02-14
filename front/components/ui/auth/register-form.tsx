import { useForm } from "react-hook-form";
import Form, { FormFieldConfig } from "../shared/form";
import { useAuth } from "@/app/store/auth.ctx";
import { View, StyleSheet } from "react-native";
import Button from "../shared/button";

interface RegisterFormData {
	email: string;
	password: string;
	name: string;
}

interface RegisterFormProps {
	onModeChange: (mode: "login" | "register") => void;
}

const RegisterForm = ({ onModeChange }: RegisterFormProps) => {
	const { register, loading } = useAuth();
	const form = useForm<RegisterFormData>({
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
	});

	const fields: FormFieldConfig<RegisterFormData>[] = [
		{
			name: "name",
			type: "text",
			placeholder: "Name",
			rules: {
				required: "Name is required",
				minLength: {
					value: 3,
					message: "Name must be at least 3 characters",
				},
			},
		},
		{
			name: "email",
			type: "text",
			placeholder: "Email",
			rules: {
				required: "Email is required",
				pattern: {
					value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
					message: "Invalid email address",
				},
			},
		},
		{
			name: "password",
			type: "password",
			placeholder: "Password",
			rules: {
				required: "Password is required",
				minLength: {
					value: 6,
					message: "Password must be at least 6 characters",
				},
			},
		},
	];

	const onSubmit = async (data: RegisterFormData) => {
		await register(data.email, data.password, data.name);
	};

	return (
		<Form
			form={form}
			fields={fields}
			onSubmit={onSubmit}
			submitText={loading ? "Loading..." : "Sign Up"}
			mode="register"
			onModeChange={onModeChange}
		/>
	);
};

const styles = StyleSheet.create({
	switchMode: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: 16,
	},
	switchButton: {
		minWidth: 120,
	},
});

export default RegisterForm;
