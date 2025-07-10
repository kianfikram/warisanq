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

interface SplashScreenProps {
  onAnimationFinish: () => void; // Callback saat animasi selesai
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationFinish }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current; // Animasi opacity untuk logo
  const textWidth = useRef(new Animated.Value(0)).current; // Animasi lebar untuk teks (efek clipping)

  useEffect(() => {
    // Animasi Fade In Logo
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1000, // Durasi fade in logo
      delay: 500, // Tunda sebentar sebelum logo muncul
      useNativeDriver: true,
    }).start(() => {
      // Setelah logo fade in, mulai animasi teks
      Animated.timing(textWidth, {
        toValue: 1, // Menggunakan 1 sebagai representasi 100% lebar
        duration: 800, // Durasi animasi teks
        easing: require("react-native").Easing.out(
          require("react-native").Easing.ease
        ), // Efek easing
        useNativeDriver: true,
      }).start(() => {
        // Setelah semua animasi selesai, panggil callback
        setTimeout(() => {
          onAnimationFinish();
        }, 500); // Tunda sebentar sebelum navigasi ke aplikasi utama
      });
    });
  }, [logoOpacity, textWidth, onAnimationFinish]);

  // Lebar teks akan diinterpolasi dari 0 hingga lebar penuh
  const interpolatedTextWidth = textWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.5], // Contoh: 50% dari lebar layar untuk teks "WariSolve"
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/logo-waris.png")} // Pastikan path logo Anda benar
        style={[styles.logo, { opacity: logoOpacity }]}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Animated.View
          style={[styles.clippingView, { width: interpolatedTextWidth }]}
        >
          <Text style={styles.text}>WariSolve</Text>
        </Animated.View>
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
    overflow: "hidden", // Penting untuk efek clipping
  },
  clippingView: {
    // Lebar diatur oleh animasi interpolatedTextWidth
    // Tinggi diatur oleh konten teks
  },
  text: {
    fontSize: 36, // Ukuran teks "WariSolve"
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2, // Memberi sedikit jarak antar huruf
    // Pastikan teks tidak terpotong oleh clippingView saat lebar penuh
    // Ini diatasi dengan mengatur lebar clippingView ke interpolatedTextWidth
  },
});

export default SplashScreen;
