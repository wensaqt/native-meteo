import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import * as Location from 'expo-location';
import { WeatherData } from "@/components/ui/weather/weather.types";
import { useWeatherAPI } from "@/hooks/useWeatherAPI";

interface WeatherContextType {
	history: WeatherData[];
	currentWeather: WeatherData | null;
	filteredHistory: WeatherData[];
	showOnlyLiked: boolean;
	setShowOnlyLiked: (showOnlyLiked: boolean) => void;
	loading: boolean;
	error: string | null;
	searchLocation: (location: string) => void;
	clearHistory: () => void;
	toggleLike: (index: number) => void;
	fetchUserCurrentWeather: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
	const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
	const [userCurrentLocation, setUserCurrentLocation] = useState<string | null>(null);
	const [location, setLocation] = useState("Paris");
	const [history, setHistory] = useState<WeatherData[]>([]);
	const { data, loading, error } = useWeatherAPI(location);
	const [showOnlyLiked, setShowOnlyLiked] = useState(false);
	const { data: userWeatherData } = useWeatherAPI(userCurrentLocation || "");

	useEffect(() => {
		if (data) {
			setHistory((prev) => [...prev, data]);
		}
	}, [data]);

	useEffect(() => {
		if (userWeatherData) {
			setCurrentWeather(userWeatherData);
		}
	}, [userWeatherData]);

	const fetchUserCurrentWeather = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			console.error("Permission to access location was denied");
			return;
		}

		const locationData = await Location.getCurrentPositionAsync({});
		const userLocation = `${locationData.coords.latitude},${locationData.coords.longitude}`;
		setUserCurrentLocation(userLocation);
	};

	const searchLocation = (newLocation: string) => {
		setLocation(newLocation);
	};

	const clearHistory = () => {
		setHistory([]);
	};

	const toggleLike = (index: number) => {
		setHistory((prev) => {
			const newHistory = [...prev];
			newHistory[index] = {
				...newHistory[index],
				liked: !newHistory[index].liked,
			};
			return newHistory;
		});
	};

	const filteredHistory = showOnlyLiked ? history?.filter((weather) => weather.liked) : history;

	return (
		<WeatherContext.Provider
			value={{
				currentWeather,
				history,
				filteredHistory,
				showOnlyLiked,
				setShowOnlyLiked,
				loading,
				error,
				searchLocation,
				clearHistory,
				toggleLike,
				fetchUserCurrentWeather,
		}}
		>
			{children}
		</WeatherContext.Provider>
	);
}

export function useWeather() {
	const context = useContext(WeatherContext);
	if (context === undefined) {
		throw new Error("useWeather must be used within a WeatherProvider");
	}
	return context;
}
