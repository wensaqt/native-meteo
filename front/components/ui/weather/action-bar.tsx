import { StyleSheet, View } from "react-native";
import Button from "../shared/button";
import { useWeather } from "@/app/store/weather.ctx";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';

export const ActionBar = () => {
	const { clearHistory, showOnlyLiked, setShowOnlyLiked } = useWeather();
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<LinearGradient
				colors={["rgba(155, 137, 199, 0.7)", "rgba(155, 137, 199, 1)"]}
				locations={[0, 0.33]}
				style={styles.gradient}
			/>
			<View style={styles.content}>
				<Button
					icon={showOnlyLiked ? "list.bullet" : "heart"}
					iconSize={24}
					iconColor="white"
					onPress={() => setShowOnlyLiked(!showOnlyLiked)}
					variant="ghost"
					textStyle={{ fontSize: 16, color: "white" }}
				>
					{showOnlyLiked ? "All" : "Likes"}
				</Button>

				<Button
					icon="trash"
					iconColor="white"
					iconSize={24}
					onPress={clearHistory}
					variant="ghost"
					textStyle={{ fontSize: 16, color: "white" }}
				>
					Clear
				</Button>

				<Button
					icon="location"
					iconColor="white"
					iconSize={24}
					onPress={() => navigation.navigate('Nearby Weather')}
					variant="ghost"
					textStyle={{ fontSize: 16, color: "white" }}
				>
					Nearby
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: "100%",
	},
	gradient: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	content: {
		flexDirection: "row",
		padding: 16,
		justifyContent: "space-between",
		width: "100%",
	},
});