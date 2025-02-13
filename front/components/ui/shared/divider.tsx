import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";

const Divider = () => {
	return <ThemedView style={styles.divider} />;
};

const styles = StyleSheet.create({
	divider: {
		height: 1,
		width: "100%",
		opacity: 0.2,
		backgroundColor: "black",
		marginVertical: 20,
	},
});

export default Divider;
