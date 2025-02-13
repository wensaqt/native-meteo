type WeatherIconMap = {
	[key: number]: string;
};

// Codes from https://www.weatherapi.com/docs/weather_conditions.json
const weatherIconMap: WeatherIconMap = {
	// Sunny/Clear
	1000: "sun",

	// Partly cloudy
	1003: "cloud.sun",

	// Cloudy/Overcast
	1006: "cloud",
	1009: "cloud",

	// Mist/Fog
	1030: "cloud.fog",
	1135: "cloud.fog",
	1147: "cloud.fog",

	// Rain
	1063: "cloud.drizzle",
	1180: "cloud.rain",
	1183: "cloud.rain",
	1186: "cloud.rain",
	1189: "cloud.rain",
	1192: "cloud.rain",
	1195: "cloud.rain",

	// Snow
	1066: "cloud.snow",
	1210: "cloud.snow",
	1216: "cloud.snow",
	1222: "cloud.snow",

	// Thunder
	1087: "cloud.bolt",
	1273: "cloud.bolt.rain",
	1276: "cloud.bolt.rain",
};

export const getWeatherIcon = (conditionCode: number): string => {
	return weatherIconMap[conditionCode] || "questionmark.circle";
};
