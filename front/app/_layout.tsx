import { WeatherProvider } from "@/app/store/weather.ctx";
import HomeScreen from "./screens";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionBar } from "@/components/ui/weather/action-bar";

export default function RootLayout() {
	return (
		<WeatherProvider>
			<SafeAreaView style={{ flex: 1, backgroundColor: "#E8E3F3" }}>
				<HomeScreen />
				<ActionBar />
			</SafeAreaView>
		</WeatherProvider>
	);
}
