import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

// Definisikan tipe untuk props
interface FeatureCardProps {
  icon: ImageSourcePropType; // Tipe untuk require() gambar
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
      style={styles.featureCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.featureIconContainer}>
        <Image source={icon} style={styles.featureIcon} resizeMode="contain" />
      </View>
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  featureCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    flexDirection: "row",
    alignItems: "center",
  },
  featureIconContainer: {
    width: 60, // Sesuaikan ukuran sesuai kebutuhan
    height: 60, // Sesuaikan ukuran sesuai kebutuhan
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    // Untuk ikon kalkulator di gambar, ada latar belakang kuning
    // Anda bisa menambahkan backgroundColor di sini jika ikon tidak memiliki latar belakang
    // backgroundColor: '#FFD700', // Contoh untuk ikon kalkulator
    borderRadius: 10, // Sedikit membulat
  },
  featureIcon: {
    width: "100%",
    height: "100%",
  },
  featureText: {
    flex: 1, // Memastikan teks mengisi sisa ruang
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

export default FeatureCard;
