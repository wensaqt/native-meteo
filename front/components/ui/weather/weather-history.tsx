import { View } from "react-native";
import { WeatherData } from "./weather.types";
import WeatherCard from "./weather-card";

const WeatherHistory = ({ history }: { history: WeatherData[] }) => {
	return (
		<View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
			{history?.map((weather, index) => (
				<WeatherCard data={weather} key={index} />
			))}
		</View>
	);
};

export default WeatherHistory;
