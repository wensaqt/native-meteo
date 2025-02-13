import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";
import { IconSymbol, IconSymbolName } from "../IconSymbol";
import Button from "../shared/button";
import { WeatherData } from "./weather.types";
import { Image } from "expo-image";
import { getWeatherIcon } from "@/utils/weather-icons";

interface WeatherCardProps {
	data: WeatherData;
	onToggleLike?: () => void;
}

const formatDate = (dateString: string): string => {
	try {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			throw new Error("Invalid date");
		}

		return new Intl.DateTimeFormat("en-US", {
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		}).format(date);
	} catch (error) {
		console.warn("Date formatting error:", error);
		return dateString;
	}
};

const WeatherCard = ({ data, onToggleLike }: WeatherCardProps) => {
	console.log(data);
	const formattedDate = formatDate(data.location.localtime);

	return (
		<ThemedView style={styles.container}>
			<Button
				icon={data.liked ? "heart.fill" : "heart"}
				iconSize={24}
				variant={"ghost"}
				iconColor="#9B89C7"
				onPress={onToggleLike}
				style={styles.likeButton}
			/>

			<ThemedView style={styles.header}>
				<ThemedView>
					<ThemedText type="subtitle">{data.location.name}</ThemedText>
					<ThemedText>{formattedDate}</ThemedText>
				</ThemedView>
			</ThemedView>

			<ThemedView style={styles.infosContainer}>
				<IconSymbol
					name={getWeatherIcon(data.current.condition.code) as IconSymbolName}
					size={80}
					color="#9B89C7"
				/>
				<View style={styles.temperatureContainer}>
					<ThemedText type="temp" style={styles.temperature}>
						{data.current.temp_c}°C
					</ThemedText>
					<ThemedText>{data.current.condition.text}</ThemedText>
				</View>
			</ThemedView>

			<ThemedView style={styles.iconContainer}>
				<ThemedView style={styles.iconWithText}>
					<IconSymbol name="humidity" size={20} color="gray" />
					<ThemedText style={styles.iconText}>
						{data.current.humidity}%
					</ThemedText>
				</ThemedView>
				<ThemedView style={styles.iconWithText}>
					<IconSymbol name="wind" size={20} color="gray" />
					<ThemedText style={styles.iconText}>
						{data.current.wind_kph}km/h
					</ThemedText>
				</ThemedView>
				<ThemedView style={styles.iconWithText}>
					<IconSymbol name="eye" size={20} color="gray" />
					<ThemedText style={styles.iconText}>
						{data.current.vis_km}km
					</ThemedText>
				</ThemedView>
			</ThemedView>
		</ThemedView>
	);
};

export default WeatherCard;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		padding: 10,
		gap: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#9B89C7",
		position: "relative",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	iconContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	iconWithText: {
		flexDirection: "column",
		alignItems: "center",
	},
	iconText: {
		marginLeft: 5,
	},
	infosContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 16,
	},
	temperatureContainer: {
		alignItems: "flex-end",
		justifyContent: "center",
	},
	temperature: {
		marginBottom: -5,
	},
	conditionContainer: {
		flexDirection: "column",
		alignItems: "center",
	},
	likeButton: {
		position: "absolute",
		top: -8,
		right: 0,
		zIndex: 1,
	},
});
