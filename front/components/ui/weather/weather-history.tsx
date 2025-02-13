import { View } from "react-native";
import WeatherCard from "./weather-card";
import { useWeather } from "@/app/store/weather.ctx";

const WeatherHistory = () => {
	const { filteredHistory, toggleLike } = useWeather();

	return (
		<View style={{ gap: 16 }}>
			<View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
				{filteredHistory?.map((weather, index) => (
					<WeatherCard
						data={weather}
						key={index}
						onToggleLike={() => toggleLike(index)}
					/>
				))}
			</View>
		</View>
	);
};

export default WeatherHistory;
