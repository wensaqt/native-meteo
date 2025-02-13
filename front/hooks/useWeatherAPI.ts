import { useState, useEffect } from "react";

interface WeatherCondition {
	text: string;
	icon: string;
	code: number;
}

interface WeatherData {
	location: {
		name: string;
		country: string;
		localtime: string;
	};
	current: {
		temp_c: number;
		condition: WeatherCondition;
		humidity: number;
		wind_kph: number;
		vis_km: number;
	};
}

interface WeatherError {
	message: string;
}

const API_KEY = "fef62d1a0e4443cd8f8101151251102";
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

export const useWeatherAPI = (location: string) => {
	const [data, setData] = useState<WeatherData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<WeatherError | null>(null);

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					`${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=no`
				);

				if (!response.ok) {
					throw new Error("Failed to fetch weather data");
				}

				const fullData = await response.json();

				// On extrait uniquement les données dont on a besoin
				const formattedData: WeatherData = {
					location: {
						name: fullData.location.name,
						country: fullData.location.country,
						localtime: fullData.location.localtime,
					},
					current: {
						temp_c: fullData.current.temp_c,
						condition: {
							text: fullData.current.condition.text,
							icon: `https:${fullData.current.condition.icon}`,
							code: fullData.current.condition.code,
						},
						humidity: fullData.current.humidity,
						wind_kph: fullData.current.wind_kph,
						vis_km: fullData.current.vis_km,
					},
				};

				setData(formattedData);
				setError(null);
			} catch (err) {
				setError({
					message: err instanceof Error ? err.message : "An error occurred",
				});
				setData(null);
			} finally {
				setLoading(false);
			}
		};

		if (location) {
			fetchWeather();
		}
	}, [location]);

	return { data, loading, error };
};
