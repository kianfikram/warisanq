// app/(tabs)/index.tsx

import React from "react";
import { StyleSheet, View, SafeAreaView, StatusBar, Text } from "react-native";
import HadithCard from "../../components/HadithCard";
import FeatureCard from "../../components/FeatureCard";

import { useRouter } from "expo-router";

const calculatorIcon = require("../../assets/images/calculator_icon.png");
const bookIcon = require("../../assets/images/book_icon.png");

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

const Header: React.FC = () => {
  return (
    <View style={headerStyles.header}>
      <Text style={headerStyles.headerText}>Selamat Datang</Text>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
