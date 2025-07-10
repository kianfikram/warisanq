// components/HadithCard.tsx

import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const hadithMessages = [
  {
    arabic:
      "يا أبا هريرة، تعلموا الفرائض وعلموها، فإنها نصف العلم، وإنها تنسى، وإنها أول شيء يرفع من أمتي",
    translation:
      "Wahai Abu Hurairah, pelajarilah ilmu waris dan ajarkanlah karena ia adalah separuh ilmu, dan ia adalah yang pertama kali akan diangkat dari umatku.",
  },
  {
    arabic:
      "إذا مات ابن آدم انقطع عمله إلا من ثلاث: صدقة جارية، أو علم ينتفع به، أو ولد صالح يدعو له",
    translation:
      "Apabila anak Adam meninggal dunia, terputuslah amalnya kecuali tiga perkara: sedekah jariyah, ilmu yang bermanfaat, atau anak saleh yang mendoakannya.",
  },
  {
    arabic: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى",
    translation:
      "Sesungguhnya setiap amalan itu tergantung pada niatnya, dan sesungguhnya setiap orang akan mendapatkan sesuai dengan apa yang ia niatkan.",
  },
];

const HadithCard: React.FC = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % hadithMessages.length;
      setCurrentIndex(nextIndex);
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          x: nextIndex * width,
          animated: true,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.hadithCard}>
      <Text style={styles.hadithTitle}>Rasulullah ﷺ bersabda:</Text>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} // agar tidak bisa digeser manual
      >
        {hadithMessages.map((item, index) => (
          <View style={[styles.slide, { width }]} key={index}>
            <Text style={styles.arabicText}>{item.arabic}</Text>
            <Text style={styles.translationText}>{item.translation}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  hadithCard: {
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 20,
    height: 250,
  },
  hadithTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
  },
  slide: {
    paddingRight: 20,
  },
  arabicText: {
    fontFamily: "Amiri",
    fontSize: 20,
    textAlign: "right",
    lineHeight: 30,
    marginBottom: 15,
    color: "#333",
  },
  translationText: {
    fontStyle: "italic",
    fontSize: 14,
    lineHeight: 22,
    color: "#555",
  },
});

export default HadithCard;
