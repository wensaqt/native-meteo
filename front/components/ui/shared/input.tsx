import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

interface InputProps {
	type?: "text" | "password";
	placeholder?: string;
	value?: string;
	onChangeText?: (text: string) => void;
}

const Input = ({
	type = "text",
	placeholder,
	value,
	onChangeText,
}: InputProps) => {
	const [text, setText] = useState(value || "");
	const [showPassword, setShowPassword] = useState(false);

	const handleTextChange = (newText: string) => {
		setText(newText);
		onChangeText?.(newText);
	};

	return (
		<ThemedView style={styles.container}>
			<TextInput
				style={styles.input}
				value={text}
				onChangeText={handleTextChange}
				placeholder={placeholder}
				secureTextEntry={type === "password" && !showPassword}
				placeholderTextColor="#999"
				autoCorrect={false}
				autoCapitalize="none"
			/>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 8, // Very light blue background
		width: "100%",
		maxWidth: 400,
		borderWidth: 1, // Add border
		borderColor: "#9B89C7",
	},
	input: {
		height: 40,
		fontSize: 16,
		width: "100%",
		color: "#000",
	},
});

export default Input;
