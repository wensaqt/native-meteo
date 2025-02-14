import { WeatherProvider } from "@/app/store/weather.ctx";
import HomeScreen from "../screens/index";
import { ActionBar } from "@/components/ui/weather/action-bar";

export default function PrivateLayout() {
	return (
		<WeatherProvider>
			<HomeScreen />
			<ActionBar />
		</WeatherProvider>
	);
}
