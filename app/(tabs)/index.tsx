import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

import { Link } from "expo-router";

// Pastikan Anda memiliki ikon ini di folder assets Anda
// Path relatif akan tetap sama karena assets ada di root folder proyek
const calculatorIcon = require("../../assets/images/calculator_icon.png");
const bookIcon = require("../../assets/images/book_icon.png");

// --- Komponen Header ---
const Header: React.FC = () => {
  return (
    <View style={headerStyles.header}>
      <Text style={headerStyles.headerText}>Selamat Datang</Text>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: "#007bff", // Example blue color
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

// --- Komponen HadithCard ---
const HadithCard: React.FC = () => {
  return (
    <View style={hadithCardStyles.hadithCard}>
      <Text style={hadithCardStyles.hadithTitle}>Rasulullah ﷺ bersabda:</Text>
      <Text style={hadithCardStyles.arabicText}>
        "يا أبا هريرة، تعلموا الفرائض وعلموها، فإنها نصف العلم، وإنها تنسى،
        وإنها أول شيء يرفع من أمتي"
      </Text>
      <Text style={hadithCardStyles.translationText}>
        "Wahai Abu Hurairah, pelajarilah ilmu waris dan ajarkanlah karena ia
        adalah separuh ilmu, dan ia adalah yang pertama kali akan diangkat dari
        umatku." (HR. Ibnu Majah, Ad-Daruquthni, Al-Hakim, dan Al-Baihaqi)
      </Text>
    </View>
  );
};

const hadithCardStyles = StyleSheet.create({
  hadithCard: {
    backgroundColor: "#e0f7fa", // Light blue background
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hadithTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  arabicText: {
    fontFamily: "System",
    fontSize: 20,
    textAlign: "right",
    lineHeight: 30,
    marginBottom: 15,
  },
  translationText: {
    fontStyle: "italic",
    fontSize: 14,
    lineHeight: 22,
  },
});

// --- Komponen FeatureCard ---
interface FeatureCardProps {
  icon: ImageSourcePropType;
  title: string;
  subtitle: string;
  onPress: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  subtitle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={featureCardStyles.featureCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={featureCardStyles.featureIconContainer}>
        <Image
          source={icon}
          style={featureCardStyles.featureIcon}
          resizeMode="contain"
        />
      </View>
      <View style={featureCardStyles.featureText}>
        <Text style={featureCardStyles.featureTitle}>{title}</Text>
        <Text style={featureCardStyles.featureSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const featureCardStyles = StyleSheet.create({
  featureCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  featureIcon: {
    width: "100%",
    height: "100%",
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  featureSubtitle: {
    fontSize: 14,
    color: "#666",
  },
});

// --- Komponen Aplikasi Utama (App) ---
export default function App() {
  return (
    <SafeAreaView style={appStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007bff" />
      <Header />
      <HadithCard />
      <Link href="/kalkulator1" asChild>
        <FeatureCard
          icon={calculatorIcon}
          title="Kalkulator Warisan"
          subtitle="Hitung Bagian Waris"
          onPress={() => console.log("Navigate to Calculator")}
        />
      </Link>
      <Link href="/edukasi/dasar_faraid" asChild>
        <FeatureCard
          icon={bookIcon}
          title="Ilmu Kewarisan Islam"
          subtitle="Penjelasan Aturan Kewarisan Dalam Islam Beserta Kuis Kasus Pembagian Warisan"
          onPress={() =>
            console.log("Navigate to Islamic Inheritance Knowledge")
          }
        />
      </Link>
    </SafeAreaView>
  );
}

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    paddingHorizontal: 20,
  },
});
