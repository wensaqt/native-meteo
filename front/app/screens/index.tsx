import { StyleSheet, ScrollView, View } from "react-native";
import SearchBar from "@/components/ui/shared/search-bar";
import WeatherHistory from "@/components/ui/weather/weather-history";
import { ActionBar } from "@/components/ui/weather/action-bar";

export default function HomeScreen() {
	return (
		<ScrollView style={styles.pageContainer}>
			<View style={styles.content}>
				<SearchBar />
				<WeatherHistory />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		width: "100%",
		height: "100%",
		flex: 1,
	},
	content: {
		minHeight: "100%",
		padding: 16,
		gap: 16,
		position: "relative",
	},
});
