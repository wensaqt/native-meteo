import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { IconSymbol } from "../IconSymbol";
import Button from "../shared/button";
import { WeatherData } from "./weather.types";

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
	const formattedDate = formatDate(data.location.localtime);

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.header}>
				<ThemedView>
					<ThemedText type="subtitle">{data.location.name}</ThemedText>
					<ThemedText>{formattedDate}</ThemedText>
				</ThemedView>
				<ThemedView>
					<Button
						icon={data.liked ? "heart.fill" : "heart"}
						iconSize={24}
						variant={"ghost"}
						iconColor="#9B89C7"
						onPress={onToggleLike}
					/>
				</ThemedView>
			</ThemedView>
			<ThemedText type="title">{data.current.temp_c}°C</ThemedText>

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
		borderColor: "gray",
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
});
