import { Image, StyleSheet, Platform, TextInput } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "@/components/ui/shared/input";
import Button from "@/components/ui/shared/button";
export default function HomeScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<ThemedView></ThemedView>
			<Input />
			<Button size="small">Hello</Button>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
});
