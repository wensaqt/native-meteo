import { StyleSheet, ScrollView, View } from "react-native";
import SearchBar from "@/components/ui/shared/search-bar";
import WeatherHistory from "@/components/ui/weather/weather-history";
import CurrentWeatherCard from "@/components/ui/weather/current-weather-card";

export default function HomeScreen() {
	return (
		<ScrollView
			style={styles.pageContainer}
			contentContainerStyle={styles.scrollContent}
		>
			<View style={styles.content}>
				<SearchBar />
				<CurrentWeatherCard />
				<WeatherHistory />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 80, // hauteur de l'ActionBar + padding
	},
	content: {
		padding: 16,
		gap: 16,
	},
});
