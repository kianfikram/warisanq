import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Mencegah splash screen bersembunyi otomatis sebelum aset dimuat sepenuhnya.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Expo Router menggunakan Error Boundary untuk menangkap error di pohon navigasi.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Sembunyikan splash screen setelah font dimuat
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    // Stack navigator utama untuk seluruh aplikasi
    <Stack>
      {/* Rute untuk modul edukasi, headernya diatur di _layout.tsx masing-masing */}
      <Stack.Screen name="edukasi" options={{ headerShown: false }} />
      {/* Rute untuk modul kalkulator (jika ada) */}
      <Stack.Screen name="kalkulator" options={{ headerShown: false }} />
      {/* Rute untuk tab navigator utama (jika ada) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Halaman 404 (Not Found) */}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
