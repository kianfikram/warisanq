import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Selamat Datang</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#007bff", // Example blue color
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center", // Pusatkan teks
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Header;
