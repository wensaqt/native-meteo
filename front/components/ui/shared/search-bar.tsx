import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Input from "./input";
import Button from "./button";
import { useWeather } from "@/app/store/weather.ctx";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const { searchLocation } = useWeather();

	const handleSubmit = () => {
		if (query.trim()) {
			console.log("query: ", query.trim());
			searchLocation(query.trim());
			setQuery("");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Input
					value={query}
					onChangeText={setQuery}
					placeholder="Search city..."
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
