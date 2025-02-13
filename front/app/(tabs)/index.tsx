import { Image, StyleSheet, Platform, TextInput } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import WeatherCard from "@/components/ui/weather/weather-card";
import { useWeatherAPI } from "@/hooks/useWeatherAPI";
import { useState } from "react";
import SearchBar from "@/components/ui/shared/search-bar";
import Divider from "@/components/ui/shared/divider";
import { WeatherData } from "@/components/ui/weather/weather.types";
export default function HomeScreen() {
	const [location, setLocation] = useState("Londres");
	const [history, setHistory] = useState<WeatherData[]>([]);
	const { data, loading, error } = useWeatherAPI(location);

	const handleSearch = (query: string) => {
		setLocation(query);
	};

	const pushDataToHistory = (data: WeatherData) => {
		setHistory([...history, data]);
	};

	return (
		<SafeAreaView style={styles.container}>
			<SearchBar onSearch={handleSearch} />
			{location && data && <WeatherCard data={data} />}
			<Divider />
			{history &&
				history.map((data, index) => <WeatherCard key={index} data={data} />)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 10,
	},
});
