// app/_layout.tsx
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react"; // Import useState

// Import komponen SplashScreen kustom Anda
import CustomSplashScreen from "../components/SplashScreen"; // Sesuaikan path jika berbeda

// Mencegah splash screen bawaan Expo bersembunyi otomatis.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false); // State untuk mengontrol kesiapan aplikasi
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Expo Router menggunakan Error Boundary untuk menangkap error di pohon navigasi.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Sembunyikan splash screen bawaan Expo setelah font dimuat
  useEffect(() => {
    if (loaded) {
      // Setelah font dimuat, kita akan membiarkan CustomSplashScreen yang menangani hiding
      // SplashScreen.hideAsync(); // Ini akan dipanggil oleh CustomSplashScreen
    }
  }, [loaded]);

  // Callback dari CustomSplashScreen saat animasinya selesai
  const handleSplashScreenAnimationFinish = () => {
    setAppReady(true);
    SplashScreen.hideAsync(); // Sembunyikan splash screen bawaan Expo setelah animasi kustom selesai
  };

  // Jangan render apa pun sampai font dimuat atau appReady
  if (!loaded) {
    return null; // Tampilkan splash screen bawaan Expo selama font dimuat
  }

  // Jika aplikasi belum siap (animasi splash screen belum selesai), tampilkan CustomSplashScreen
  if (!appReady) {
    return (
      <CustomSplashScreen
        onAnimationFinish={handleSplashScreenAnimationFinish}
      />
    );
  }

  // Jika aplikasi sudah siap, render stack navigator utama
  return (
    <Stack>
      {/* Rute untuk modul edukasi */}
      <Stack.Screen name="edukasi" options={{ headerShown: false }} />
      {/* Rute untuk modul kalkulator */}
      <Stack.Screen name="kalkulator" options={{ headerShown: false }} />
      {/* Rute untuk tab navigator utama (halaman index ada di sini) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Halaman 404 (Not Found) */}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
