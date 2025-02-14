import { StyleSheet, ScrollView, View } from "react-native";
import { useEffect } from "react";
import SearchBar from "@/components/ui/shared/search-bar";
import WeatherCard from "@/components/ui/weather/weather-card";
import Divider from "@/components/ui/shared/divider";
import { useWeather } from "@/app/store/weather.ctx";
import React from "react";

export default function HomeScreen() {
	const { history, currentWeather, fetchUserCurrentWeather } = useWeather();

	useEffect(() => {
		fetchUserCurrentWeather();
	}, []);

	return (
		<ScrollView
			style={styles.pageContainer}
			contentContainerStyle={styles.scrollContent}
		>
			<View style={styles.content}>
				<SearchBar />
				{currentWeather && (
					<>
						<WeatherCard data={currentWeather} />
						<Divider />
					</>
				)}
				{history.map((data, index) => (
					<WeatherCard key={`${data.location.name}-${index}`} data={data} />
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 80,
	},
	content: {
		padding: 16,
		gap: 16,
	},
});
