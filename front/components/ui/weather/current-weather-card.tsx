import { useEffect } from "react";
import { useWeather } from "@/app/store/weather.ctx";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";
import { IconSymbol, IconSymbolName } from "../IconSymbol";
import { getWeatherIcon } from "@/utils/weather-icons";
import Divider from "@/components/ui/shared/divider";

const CurrentWeatherCard = () => {
    const { currentWeather, loading, error, fetchUserCurrentWeather } = useWeather();

    useEffect(() => {
        fetchUserCurrentWeather();
    }, []);

    if (loading) return <ThemedText>Chargement...</ThemedText>;
    if (error) return <ThemedText>Erreur: {error}</ThemedText>;
    if (!currentWeather) return null;

    return (
        <>
            <ThemedView style={styles.container}>
                <ThemedView style={styles.header}>
                    <ThemedView>
                        <ThemedText type="subtitle">{currentWeather.location.name}</ThemedText>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.infosContainer}>
                    <IconSymbol
                        name={getWeatherIcon(currentWeather.current.condition.code) as IconSymbolName}
                        size={80}
                        color="#9B89C7"
                    />
                    <View style={styles.temperatureContainer}>
                        <ThemedText type="temp" style={styles.temperature}>
                            {currentWeather.current.temp_c}°C
                        </ThemedText>
                        <ThemedText>{currentWeather.current.condition.text}</ThemedText>
                    </View>
                </ThemedView>
            </ThemedView>
            <Divider />
        </>
    );
};

export default CurrentWeatherCard;

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
});