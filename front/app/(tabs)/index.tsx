import { StyleSheet, ScrollView, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import WeatherCard from "@/components/ui/weather/weather-card";
import SearchBar from "@/components/ui/shared/search-bar";
import { useWeather } from "../store/weather.ctx";
import { ThemedText } from "@/components/ThemedText";
import WeatherHistory from "@/components/ui/weather/weather-history";

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
	},
	content: {
		padding: 16,
		gap: 16,
	},
});
