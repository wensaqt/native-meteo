import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
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
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
	const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
		null
	);
	const [location, setLocation] = useState("Paris");
	const [history, setHistory] = useState<WeatherData[]>([]);
	const { data, loading, error } = useWeatherAPI(location);
	const [showOnlyLiked, setShowOnlyLiked] = useState(false);

	useEffect(() => {
		if (data) {
			console.log("Nouvelles données reçues pour:", data.location.name);
			setHistory((prev) => {
				const newHistory = [...prev, data];
				console.log(
					"Nouvel historique:",
					newHistory.map((h) => h.location.name)
				);
				return newHistory;
			});
		}
	}, [data]);

	const searchLocation = (newLocation: string) => {
		console.log("Recherche de nouvelle location:", newLocation);
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

	const filteredHistory = showOnlyLiked
		? history?.filter((weather) => weather.liked)
		: history;

	return (
		<WeatherContext.Provider
			value={{
				currentWeather,
				setCurrentWeather,
				history,
				filteredHistory,
				showOnlyLiked,
				setShowOnlyLiked,
				loading,
				error,
				searchLocation,
				clearHistory,
				toggleLike,
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
