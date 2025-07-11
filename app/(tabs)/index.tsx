// app/(tabs)/index.tsx

import React from "react";
import { StyleSheet, View, SafeAreaView, StatusBar, Text } from "react-native";
import HadithCard from "../../components/HadithCard";
import FeatureCard from "../../components/FeatureCard";

import { useRouter } from "expo-router";

const calculatorIcon = require("../../assets/images/calculator_icon.png");
const bookIcon = require("../../assets/images/book_icon.png");

// --- Komponen Header (Lokal) ---
const Header: React.FC = () => {
  return (
    <View style={headerStyles.header}>
      <Text style={headerStyles.headerText}>Selamat Datang</Text>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: "transparent", // Latar belakang transparan
    paddingVertical: 15,
    // paddingHorizontal: 20, // Tidak perlu padding horizontal di sini karena sudah di content
    marginBottom: 20,
    alignItems: "flex-start", // Teks rata kiri
    width: "100%", // Pastikan mengambil lebar penuh
  },
  headerText: {
    color: "#000000", // Warna teks biru (sesuai gambar awal)
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 0, // Pastikan tidak ada margin tambahan
  },
});

export default function App() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.content}>
        <Header />
        <HadithCard />
        <FeatureCard
          icon={calculatorIcon}
          title="Kalkulator Warisan"
          subtitle="Hitung Bagian Waris"
          onPress={() => router.push("/kalkulator/kalkulator1")}
        />
        <FeatureCard
          icon={bookIcon}
          title="Ilmu Kewarisan Islam"
          subtitle="Penjelasan Aturan Kewarisan Dalam Islam Beserta Kuis Kasus Pembagian Warisan"
          onPress={() => router.push("/edukasi/dasar_faraid")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1, // Memastikan konten mengisi sisa ruang
    paddingHorizontal: 20, // Padding samping untuk seluruh konten
    paddingVertical: 10, // Padding vertikal untuk seluruh konten
  },
});
