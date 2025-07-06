// app/(tabs)/faraid.tsx

import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

const Dasar_FaraidScreen: React.FC = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Bagian Sumber Hukum dari Al-Qur'an */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sumber Hukum dari Al-Qur'an</Text>
        <Text style={styles.sectionDescription}>
          Sumber hukum utama untuk perhitungan waris dari Al-Qur'an terdapat
          pada tiga ayat dalam surat yang sama, yaitu ayat 11, 12 dan 176 surat
          an-Nisaa'. Ayat-ayat inilah yang disebut sebagai ayat-ayat waris.
        </Text>
        <View style={styles.quranVerseContainer}>
          <Text style={styles.arabicText}>
            يَسْتَفْتُونَكَ قُلِ اللَّهُ يُفْتِيكُمْ فِي الْكَلَالَةِ إِنِ
            امْرُؤٌ هَلَكَ لَيْسَ لَهُ وَلَدٌ وَلَهُ أُخْتٌ فَلَهَا نِصْفُ مَا
            تَرَكَ وَهُوَ يَرِثُهَا إِن لَّمْ يَكُن لَّهَا وَلَدٌ فَإِن كَانَتَا
            اثْنَتَيْنِ فَلَهُمَا الثُّلُثَانِ مِمَّا تَرَكَ وَإِن كَانُوا
            إِخْوَةً رِّجَالًا وَنِسَاءً فَلِلذَّكَرِ مِثْلُ حَظِّ
            الْأُنثَيَيْنِ يُبَيِّنُ اللَّهُ لَكُمْ أَن تَضِلُّوا ۗ وَاللَّهُ
            بِكُلِّ شَيْءٍ عَلِيمٌ
          </Text>
          <Text style={styles.translationText}>
            Mereka meminta fatwa kepadamu (tentang kalalah). Katakanlah, "Allah
            memberi fatwa kepadamu tentang kalalah, (yaitu) jika seseorang
            meninggal dan dia tidak mempunyai anak, tetapi mempunyai seorang
            saudara perempuan, bagiannya (saudara perempuannya itu) seperdua
            dari harta yang ditinggalkan. Adapun saudara laki-lakinya mewarisi
            (seluruh harta saudara perempuan) jika dia tidak mempunyai anak.
            Akan tetapi, jika saudara perempuan itu dua orang, bagi keduanya dua
            pertiga dari harta yang ditinggalkan. Jika mereka (ahli waris itu
            terdiri atas) beberapa saudara laki-laki dan perempuan, bagian
            seorang saudara laki-laki sama dengan bagian dua orang saudara
            perempuan. Allah menerangkan (hukum ini) kepadamu agar kamu tidak
            tersesat. Allah Maha Mengetahui segala sesuatu."(Q.S. an-Nisaa' ayat
            176)
          </Text>
        </View>
      </View>

      {/* Bagian Sumber Hukum dari Hadits Rasulullah */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Sumber Hukum dari Hadits Rasulullah
        </Text>
        <Text style={styles.sectionDescription}>
          Selain dari Al-Qur'an, terdapat pula hadits yang menerangkan tentang
          pentingnya ilmu waris. Hadits tersebut adalah:
        </Text>
        <View style={styles.quranVerseContainer}>
          <Text style={styles.arabicText}>
            يَا أَبَا هُرَيْرَةَ، تَعَلَّمُوا الْفَرَائِضَ وَعَلِّمُوهَا،
            فَإِنَّهَا نِصْفُ الْعِلْمِ، وَإِنَّهَا تُنْسَى، وَإِنَّهَا أَوَّلُ
            شَيْءٍ يُرْفَعُ مِنْ أُمَّتِي
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  contentContainer: {
    padding: 15,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  sectionDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: "#555",
    marginBottom: 10,
  },
  quranVerseContainer: {
    backgroundColor: "#f8f8f8", // Slightly different background for the verse
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  arabicText: {
    fontFamily: "Amiri", // Jika Anda memuat font Amiri atau font Arab lainnya
    fontSize: 20,
    textAlign: "right", // Teks Arab biasanya rata kanan
    lineHeight: 35,
    marginBottom: 10,
    color: "#222",
  },
  translationText: {
    fontSize: 14,
    lineHeight: 22,
    fontStyle: "italic",
    color: "#444",
  },
});

export default Dasar_FaraidScreen;
