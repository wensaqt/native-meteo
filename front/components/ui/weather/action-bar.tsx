import { StyleSheet, View } from "react-native";
import Button from "../shared/button";
import { useWeather } from "@/app/store/weather.ctx";

export const ActionBar = () => {
	const { clearHistory, showOnlyLiked, setShowOnlyLiked } = useWeather();

	return (
		<View style={styles.container}>
			<Button
				icon={showOnlyLiked ? "heart.fill" : "heart"}
				iconSize={24}
				iconColor="white"
				onPress={() => setShowOnlyLiked(!showOnlyLiked)}
				variant="ghost"
				textStyle={{ fontSize: 16, color: "white" }}
			>
				Likes
			</Button>

			<Button
				icon="trash"
				iconColor="white"
				iconSize={24}
				onPress={clearHistory}
				variant="ghost"
				textStyle={{ fontSize: 16, color: "white" }}
			>
				Clear
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		padding: 16,
		backgroundColor: "#9B89C7", // Slightly darker but washed out purple
		justifyContent: "space-between",
		width: "100%",
		position: "absolute",
		bottom: 0,
		right: 0,
	},
});
