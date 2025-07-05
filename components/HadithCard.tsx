import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HadithCard: React.FC = () => {
  return (
    <View style={styles.hadithCard}>
      <Text style={styles.hadithTitle}>Rasulullah ﷺ bersabda:</Text>
      <Text style={styles.arabicText}>
        "يا أبا هريرة، تعلموا الفرائض وعلموها، فإنها نصف العلم، وإنها تنسى،
        وإنها أول شيء يرفع من أمتي"
      </Text>
      <Text style={styles.translationText}>
        "Wahai Abu Hurairah, pelajarilah ilmu waris dan ajarkanlah karena ia
        adalah separuh ilmu, dan ia adalah yang pertama kali akan diangkat dari
        umatku." (HR. Ibnu Majah, Ad-Daruquthni, Al-Hakim, dan Al-Baihaqi)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  hadithCard: {
    backgroundColor: "#e0f7fa", // Light blue background
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  hadithTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  arabicText: {
    // Anda mungkin perlu memuat font Arab kustom untuk rendering terbaik
    fontFamily: "System", // Ganti dengan nama font Anda jika memuat kustom
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

export default HadithCard;
