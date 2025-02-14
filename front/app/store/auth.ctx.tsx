import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { useAuthAPI } from "@/hooks/useAuthAPI";

interface User {
	id: string;
	email: string;
	name: string;
}

interface AuthContextType {
	user: User | null;
	loading: boolean;
	error: string | null;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string, name: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const authAPI = useAuthAPI();

	// Log initial state
	console.log("[AUTH CTX] Initial user state:", user);

	const login = async (email: string, password: string) => {
		try {
			console.log("[AUTH CTX] Login attempt for:", email);
			setLoading(true);
			setError(null);
			const response = await authAPI.login({ email, password });
			console.log("[AUTH CTX] Login successful, setting user:", response.user);
			setUser(response.user);
		} catch (err) {
			console.error("[AUTH CTX] Login failed:", err);
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	const register = async (email: string, password: string, name: string) => {
		try {
			console.log("[AUTH CTX] Registration attempt for:", email);
			setLoading(true);
			setError(null);
			const response = await authAPI.register({ email, password, name });
			console.log(
				"[AUTH CTX] Registration successful, setting user:",
				response.user
			);
			setUser(response.user);
		} catch (err) {
			console.error("[AUTH CTX] Registration failed:", err);
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	// Log whenever user state changes
	useEffect(() => {
		console.log("[AUTH CTX] User state updated:", user);
	}, [user]);

	const logout = async () => {
		try {
			setLoading(true);
			await authAPI.logout();
			setUser(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				error,
				login,
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
