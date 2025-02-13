import { View } from "react-native";
import { WeatherData } from "./weather.types";
import WeatherCard from "./weather-card";
import { useWeather } from "@/app/store/weather.ctx";
import { useState } from "react";
import Button from "../shared/button";

const WeatherHistory = () => {
	const { history, loading, error, toggleLike } = useWeather();
	const [showOnlyLiked, setShowOnlyLiked] = useState(false);

	const filteredHistory = showOnlyLiked
		? history?.filter((weather) => weather.liked)
		: history;

	return (
		<View style={{ gap: 16 }}>
			<Button
				icon={showOnlyLiked ? "heart.fill" : "heart"}
				onPress={() => setShowOnlyLiked(!showOnlyLiked)}
				variant="ghost"
			>
				{showOnlyLiked ? "Show All" : "Show Liked"}
			</Button>
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
