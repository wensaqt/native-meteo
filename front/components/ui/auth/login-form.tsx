import { useForm } from "react-hook-form";
import Form, { FormFieldConfig } from "../shared/form";
import { useAuth } from "@/app/store/auth.ctx";
import { View, StyleSheet } from "react-native";
import Button from "../shared/button";

interface LoginFormData {
	email: string;
	password: string;
}

interface LoginFormProps {
	onModeChange: (mode: "login" | "register") => void;
}

const LoginForm = ({ onModeChange }: LoginFormProps) => {
	const { login, loading, error } = useAuth();
	const form = useForm<LoginFormData>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const fields: FormFieldConfig<LoginFormData>[] = [
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

	const onSubmit = async (data: LoginFormData) => {
		await login(data.email, data.password);
	};

	return (
		<Form
			form={form}
			fields={fields}
			onSubmit={onSubmit}
			submitText={loading ? "Loading..." : "Sign In"}
			mode="login"
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

export default LoginForm;
