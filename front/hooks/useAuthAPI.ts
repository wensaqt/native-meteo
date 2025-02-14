import { http } from "@/api/http";

interface LoginCredentials {
	email: string;
	password: string;
}

interface RegisterCredentials extends LoginCredentials {
	name: string;
}

interface AuthResponse {
	token: string;
	user: {
		id: string;
		email: string;
		name: string;
	};
}

export const useAuthAPI = () => {
	const login = async (credentials: LoginCredentials) => {
		const { data } = await http.post<AuthResponse>(
			"/api/auth/login",
			credentials
		);
		return data;
	};

	const register = async (credentials: RegisterCredentials) => {
		console.log("[API] Registration credentials:", credentials);
		try {
			const { data } = await http.post<AuthResponse>(
				"/api/auth/register",
				credentials
			);
			console.log("[API] Registration response:", data);
			return data;
		} catch (error) {
			console.error(
				"[API] Registration request failed:",
				error.response?.data || error
			);
			throw error;
		}
	};

	const logout = async () => {
		await http.post("/api/auth/logout");
	};

	return { login, register, logout };
};
