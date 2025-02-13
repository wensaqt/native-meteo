import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import WeatherCard from '@/components/ui/weather/weather-card';
import { useWeatherAPI } from '@/hooks/useWeatherAPI';

export default function NearbyWeatherScreen() {
  const [location, setLocation] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(`${location.coords.latitude},${location.coords.longitude}`);
    };

    getLocation();
  }, []);

  const { data, loading, error } = useWeatherAPI(location ?? '');

  if (errorMsg) {
    return <Text style={styles.error}>{errorMsg}</Text>;
  }

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      {data ? <WeatherCard weather={data} /> : <Text>Aucune donnée météo disponible</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginTop: 50,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});