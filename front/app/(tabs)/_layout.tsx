import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WeatherProvider } from "../store/weather.ctx";
import HomeScreen from "./index";
export default function TabLayout() {
	return (
		<WeatherProvider>
			<SafeAreaView style={{ flex: 1 }}>
				<HomeScreen />
			</SafeAreaView>
		</WeatherProvider>
	);
}
