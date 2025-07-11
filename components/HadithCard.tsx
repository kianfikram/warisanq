// components/HadithCard.tsx

import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const hadithMessages = [
  {
    head: "Rasulullah ﷺ bersabda:",
    arabic:
      "يَا أَبَا هُرَيْرَةَ، تَعَلَّمُوا الْفَرَائِضَ وَعَلِّمُوهَا، فَإِنَّهَا نِصْفُ الْعِلْمِ، وَإِنَّهَا تُنْسَى، وَإِنَّهَا أَوَّلُ شَيْءٍ يُرْفَعُ مِنْ أُمَّتِي",
    translation:
      "Wahai Abu Hurairah, pelajarilah ilmu waris dan ajarkanlah karena ia adalah separuh ilmu, dan ia adalah yang pertama kali akan diangkat dari umatku. (HR. Ibnu Majah, Ad-Daruquthni, Al-Hakim, dan Al-Baihaqi)",
  },
  {
    head: "Ilmu waris, atau dikenal sebagai ilmu faraidh, adalah ilmu yang mengatur pembagian harta peninggalan berdasarkan hukum Allah. Allah Ta’ala berfirman:",
    arabic:
      "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنْثَيَيْنِ",
    translation:
      "Allah mensyariatkan bagimu tentang (pembagian warisan untuk) anak-anakmu. Yaitu: bagian seorang anak laki-laki sama dengan bagian dua orang anak perempuan. (QS. An-Nisa: 11)",
  },
  {
    head: "Rasulullah ﷺ juga mengingatkan:",
    arabic: "الْحَقُّ لِلْوَارِثِ بِالْقِسْمِ بِمَا أَمَرَ اللَّهُ بِهِ",
    translation:
      "Hak bagi ahli waris adalah menerima bagian sesuai yang telah diperintahkan Allah. (HR. Bukhari dan Muslim)",
  },
  {
    head: "Orang yang murtad, yaitu keluar dari agama Islam, tidak berhak menerima warisan dari muslim yang meninggal. Allah SWT berfirman:",
    arabic:
      "وَمَنْ يَرْتَدِدْ مِنْكُمْ عَنْ دِينِهِ فَيَمُتْ وَهُوَ كَافِرٌ فَأُوْلَئِكَ حَبِطَتْ أَعْمَالُهُمْ فِي الدُّنْيَا وَالْآخِرَةِ",
    translation:
      "Barang siapa di antara kamu murtad dari agamanya lalu dia mati dalam keadaan kafir, maka sia-sialah amal mereka di dunia dan di akhirat. (QS. Al-Baqarah: 217)",
  },
  {
    arabic:
      "عَنِ ابْنِ عَبَّاسٍ رَضِيَ اللهُ عَنْهُمَا قَالَ: قَالَ رَسُوْلُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: أَلْحِقُوا الفَرائِضَ بأَهْلِها، فَمَا أَبْقَتِ الفَرائِضُ فَلِأَوْلى رَجُلٍ ذَكَرٍ.خَرَّجَهُ البُخَارِيُّ وَمُسْلِمٌ",
    translation:
      "Dari Ibnu ‘Abbas radhiyallahu ‘anhuma, ia berkata bahwa Rasulullah shallallahu ‘alaihi wa sallam bersabda, “Berikan bagian warisan kepada ahli warisnya, selebihnya adalah milik laki-laki yang paling dekat dengan mayit. (HR. Bukhari, no. 6746 dan Muslim, no. 1615)",
  },
];

const HadithCard: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const currentIndexRef = useRef(0); // Untuk track indeks secara konsisten
  const [_, forceUpdate] = useState(false); // Untuk paksa re-render (opsional)

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % hadithMessages.length;
      currentIndexRef.current = nextIndex;

      scrollViewRef.current?.scrollTo({
        x: nextIndex * (width - 40),
        animated: true,
      });

      forceUpdate((prev) => !prev); // Optional: biar komponen tetap update
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.hadithSection}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.hadithScrollView}
          onMomentumScrollEnd={(event) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const newIndex = Math.round(offsetX / (width - 40));
            currentIndexRef.current = newIndex;
          }}
        >
          {hadithMessages.map((hadith, index) => (
            <View key={index} style={styles.hadithItem}>
              {hadith.head && (
                <Text style={styles.translationText}>{hadith.head}</Text>
              )}
              <Text style={styles.arabicText}>{hadith.arabic}</Text>
              <Text style={styles.translationText}>{hadith.translation}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#ED6933",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  hadithSection: {
    padding: 20,
    maxHeight: 250,
  },
  hadithTitleStatic: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
    color: "white",
  },
  hadithScrollView: {},
  hadithItem: {
    width: width - 40,
    paddingHorizontal: 0,
  },
  arabicText: {
    fontFamily: "Amiri",
    fontSize: 20,
    textAlign: "right",
    lineHeight: 30,
    marginBottom: 15,
    color: "white",
  },
  translationText: {
    fontStyle: "italic",
    fontSize: 14,
    lineHeight: 22,
    color: "white",
  },
});

export default HadithCard;
