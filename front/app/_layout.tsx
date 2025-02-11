import "react-native-reanimated";

import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { Text, Layout } from "@ui-kitten/components";
// import HomeScreen from "./(tabs)";

const HomeScreen = () => (
	<Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
		<Text category="h1">HOME</Text>
	</Layout>
);

export default function RootLayout() {
	return (
		<ApplicationProvider {...eva} theme={eva.light}>
			<HomeScreen />
		</ApplicationProvider>
	);
}
