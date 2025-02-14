import { AuthProvider } from "./store/auth.ctx";
import { useAuth } from "./store/auth.ctx";
import PublicLayout from "./(public)/_layout";
import PrivateLayout from "./(private)/_layout";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
	return (
		<AuthProvider>
			<SafeAreaView style={{ flex: 1, backgroundColor: "#E8E3F3" }}>
				<RootLayoutNav />
			</SafeAreaView>
		</AuthProvider>
	);
}

function RootLayoutNav() {
	const { user } = useAuth();
	return user ? <PrivateLayout /> : <PublicLayout />;
}
