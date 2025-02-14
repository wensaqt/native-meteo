import axios from "axios";
import Constants from "expo-constants";

export const http = axios.create({
	baseURL: Constants.expoConfig?.extra?.API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});
