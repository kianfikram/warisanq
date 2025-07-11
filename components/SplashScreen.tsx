// components/SplashScreen.tsx

import React, { useEffect, useRef } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const TEXT_TO_ANIMATE = "WariSolve"; // Teks yang akan dianimasikan

interface SplashScreenProps {
  onAnimationFinish: () => void; // Callback saat animasi selesai
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationFinish }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current; // Animasi opacity untuk logo
  // Array of Animated.Value untuk opasitas setiap karakter
  const characterOpacities = useRef(
    TEXT_TO_ANIMATE.split("").map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // 1. Animasi Fade In Logo (selama 2 detik)
    const logoAnimation = Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 2000, // Logo fade in selama 2 detik
      useNativeDriver: true, // Opacity didukung native driver
    });

    // 2. Animasi Teks (karakter per karakter)
    const textAnimations = Animated.stagger(
      50, // Delay antara setiap karakter (50ms)
      characterOpacities.map((opacity) =>
        Animated.timing(opacity, {
          toValue: 1,
          duration: 100, // Durasi fade in setiap karakter
          useNativeDriver: true, // Opacity didukung native driver
        })
      )
    );

    // Jalankan animasi secara berurutan: Logo -> Tunda 1 detik -> Teks
    Animated.sequence([
      logoAnimation, // Logo fade in selesai
      Animated.delay(1000), // Tunda 1 detik setelah logo selesai fade in
      textAnimations, // Kemudian jalankan animasi teks karakter per karakter
    ]).start(() => {
      // Setelah semua animasi selesai, panggil callback
      setTimeout(() => {
        onAnimationFinish();
      }, 500); // Tunda sebentar sebelum navigasi ke aplikasi utama
    });
  }, [logoOpacity, onAnimationFinish]); // Dependensi characterOpacities tidak perlu karena itu useRef.current

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/logo-waris.png")} // Pastikan path logo Anda benar
        style={[styles.logo, { opacity: logoOpacity }]}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        {/* Render setiap karakter dengan opasitas yang dianimasikan */}
        {TEXT_TO_ANIMATE.split("").map((char, index) => (
          <Animated.Text
            key={index}
            style={[styles.text, { opacity: characterOpacities[index] }]}
          >
            {char}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8C00", // Latar belakang oranye
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150, // Sesuaikan ukuran logo
    height: 150,
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: "row", // Penting untuk menempatkan karakter secara horizontal
    overflow: "hidden", // Untuk memastikan tidak ada masalah layout
    // textContainer sudah terpusat oleh container.alignItems
  },
  text: {
    fontSize: 36, // Ukuran teks "WariSolve"
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2, // Memberi sedikit jarak antar huruf
    // textAlign: 'center' tidak diperlukan lagi karena setiap karakter adalah elemen terpisah
  },
});

export default SplashScreen;
