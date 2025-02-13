export interface WeatherData {
	location: {
		name: string;
		country: string;
		localtime: string;
	};
	current: {
		temp_c: number;
		condition: {
			text: string;
			icon: string;
		};
		humidity: number;
		wind_kph: number;
		vis_km: number;
	};
	liked?: boolean;
}

export interface WeatherHistoryItem extends WeatherData {
	timestamp: number;
}

// Pour identifier de manière unique une ville
export interface LikedLocation {
	name: string;
	country: string;
}
