import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Input from "./input";
import Button from "./button";

interface SearchBarProps {
	onSearch: (query: string) => void;
	placeholder?: string;
}

const SearchBar = ({
	onSearch,
	placeholder = "Search city...",
}: SearchBarProps) => {
	const [query, setQuery] = useState("");

	const handleSubmit = () => {
		if (query.trim()) {
			onSearch(query.trim());
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Input
					value={query}
					onChangeText={setQuery}
					placeholder={placeholder}
				/>
				<View style={styles.iconContainer}>
					<Button
						icon="magnifyingglass"
						iconSize={20}
						onPress={handleSubmit}
						variant="ghost"
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingHorizontal: 16,
	},
	inputContainer: {
		position: "relative",
		width: "100%",
	},
	iconContainer: {
		position: "absolute",
		right: 0,
		top: 10,
		transform: [{ translateY: -12 }],
	},
});

export default SearchBar;
