import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import LoginForm from "@/components/ui/auth/login-form";
import RegisterForm from "@/components/ui/auth/register-form";
import Button from "@/components/ui/shared/button";

type AuthMode = "login" | "register";

export default function AuthScreen() {
	const [mode, setMode] = useState<AuthMode>("login");

	const handleMode = (newMode: AuthMode) => setMode(newMode);

	return (
		<View style={styles.container}>
			<View style={styles.buttonsContainer}></View>

			<View style={styles.header}>
				<ThemedText type="title">
					{mode === "login" ? "Welcome Back!" : "Create Account"}
				</ThemedText>
				<ThemedText>
					{mode === "login" ? "Sign in to continue" : "Sign up to get started"}
				</ThemedText>
			</View>

			{mode === "login" ? (
				<LoginForm onModeChange={handleMode} />
			) : (
				<RegisterForm onModeChange={handleMode} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		justifyContent: "center",
		alignItems: "center",
		gap: 32,
	},
	header: {
		alignItems: "center",
		gap: 8,
	},
	buttonsContainer: {
		flexDirection: "row",
		gap: 16,
	},
	button: {
		flex: 1,
	},
	activeButton: {
		backgroundColor: "#6366F1",
	},
});
