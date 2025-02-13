import {
	Image,
	StyleSheet,
	Platform,
	TextInput,
	ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import WeatherCard from "@/components/ui/weather/weather-card";
import { useWeatherAPI } from "@/hooks/useWeatherAPI";
import { useState, useEffect } from "react";
import SearchBar from "@/components/ui/shared/search-bar";
import Divider from "@/components/ui/shared/divider";
import { WeatherData } from "@/components/ui/weather/weather.types";
import WeatherHistory from "@/components/ui/weather/weather-history";

export default function HomeScreen() {
	const [location, setLocation] = useState("Londres");
	const [history, setHistory] = useState<WeatherData[]>([]);
	const { data, loading, error } = useWeatherAPI(location);

	useEffect(() => {
		if (data) {
			setHistory((prev) => [...prev, data]);
		}
	}, [data]);

	const handleSearch = (query: string) => {
		setLocation(query);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				style={{ width: "100%" }}
				contentContainerStyle={{ alignItems: "center" }}
			>
				<SearchBar onSearch={handleSearch} />
				{location && data && <WeatherCard data={data} />}
				{history.length > 0 && <Divider />}
				{history.length > 0 && <WeatherHistory history={history} />}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 16,
	},
});
