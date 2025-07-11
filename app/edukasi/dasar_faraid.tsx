// app/edukasi/dasar_faraid.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Animated, // Untuk animasi
  Dimensions, // Untuk mendapatkan lebar layar
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons"; // Untuk ikon
import EducationSidebar from "../../components/EducationSidebar"; // Sesuaikan path jika berbeda

const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.7; // Lebar sidebar 70% dari lebar layar

const Dasar_FaraidScreen: React.FC = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Animated.Value untuk mengontrol animasi (0 = tertutup, 1 = terbuka)
  const sidebarAnim = useRef(new Animated.Value(0)).current;

  // Fungsi untuk membuka/menutup sidebar dengan animasi
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    Animated.timing(sidebarAnim, {
      toValue: isSidebarOpen ? 0 : 1, // Jika terbuka, ke 0 (tutup); jika tertutup, ke 1 (buka)
      duration: 300, // Durasi animasi 300ms
      useNativeDriver: true, // Gunakan native driver untuk performa lebih baik
    }).start();
  };

  // Interpolasi untuk posisi X konten utama (menggeser ke kanan saat sidebar terbuka)
  const mainContentTranslateX = sidebarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SIDEBAR_WIDTH], // Geser konten sejauh lebar sidebar
  });

  // Interpolasi untuk skala konten utama (membuat efek mengecil)
  const mainContentScale = sidebarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9], // Dari skala normal (1) menjadi sedikit lebih kecil (0.9)
  });

  // Interpolasi untuk radius border konten utama (membuat sudut membulat)
  const mainContentBorderRadius = sidebarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15], // Dari tidak ada radius menjadi 15px
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#ED6933" />{" "}
      {/* Ubah warna status bar */}
      {/* Sidebar (dirender di belakang konten utama, muncul saat isSidebarOpen true) */}
      {isSidebarOpen && <EducationSidebar onClose={toggleSidebar} />}
      {/* Konten Utama (Animated) */}
      <Animated.View
        style={[
          styles.mainContentWrapper,
          {
            transform: [
              { translateX: mainContentTranslateX },
              { scale: mainContentScale },
            ],
            borderRadius: mainContentBorderRadius,
            overflow: "hidden", // Penting agar borderRadius terlihat
          },
        ]}
      >
        {/* Konfigurasi Header untuk halaman ini */}
        <Stack.Screen
          options={{
            title: "Dasar Dasar Faraid",
            headerShown: true,
            headerLeft: () => (
              // Tombol untuk membuka sidebar (ikon menu hamburger)
              <TouchableOpacity
                onPress={toggleSidebar}
                style={styles.headerIcon}
              >
                <Feather name="menu" size={24} color="white" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              // Tombol kembali (panah)
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.headerIcon}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: "#ED6933", // Ubah warna latar belakang header
            },
            headerTintColor: "white", // Warna teks dan ikon di header
          }}
        />

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Bagian Sumber Hukum dari Al-Qur'an */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sumber Hukum dari Al-Qur'an</Text>
            <Text style={styles.sectionDescription}>
              Sumber hukum utama untuk perhitungan waris dari Al-Qur'an terdapat
              pada tiga ayat dalam surat yang sama, yaitu ayat 11, 12 dan 176
              surat an-Nisaa'. Ayat-ayat inilah yang disebut sebagai ayat-ayat
              waris.
            </Text>
            <View style={styles.quranVerseContainer}>
              <Text style={styles.arabicText}>
                يَسْتَفْتُونَكَ قُلِ اللَّهُ يُفْتِيكُمْ فِي الْكَلَالَةِ إِنِ
                امْرُؤٌ هَلَكَ لَيْسَ لَهُ وَلَدٌ وَلَهُ أُخْتٌ فَلَهَا نِصْفُ
                مَا تَرَكَ وَهُوَ يَرِثُهَا إِن لَّمْ يَكُن لَّهَا وَلَدٌ فَإِن
                كَانَتَا اثْنَتَيْنِ فَلَهُمَا الثُّلُثَانِ مِمَّا تَرَكَ وَإِن
                كَانُوا إِخْوَةً رِّجَالًا وَنِسَاءً فَلِلذَّكَرِ مِثْلُ حَظِّ
                الْأُنثَيَيْنِ يُبَيِّنُ اللَّهُ لَكُمْ أَن تَضِلُّوا ۗ
                وَاللَّهُ بِكُلِّ شَيْءٍ عَلِيمٌ
              </Text>
              <Text style={styles.translationText}>
                Mereka meminta fatwa kepadamu (tentang kalalah). Katakanlah,
                "Allah memberi fatwa kepadamu tentang kalalah, (yaitu) jika
                seseorang meninggal dan dia tidak mempunyai anak, tetapi
                mempunyai seorang saudara perempuan, bagiannya (saudara
                perempuannya itu) seperdua dari harta yang ditinggalkan. Adapun
                saudara laki-lakinya mewarisi (seluruh harta saudara perempuan)
                jika dia tidak mempunyai anak. Akan tetapi, jika saudara
                perempuan itu dua orang, bagi keduanya dua pertiga dari harta
                yang ditinggalkan. Jika mereka (ahli waris itu terdiri atas)
                beberapa saudara laki-laki dan perempuan, bagian seorang saudara
                laki-laki sama dengan bagian dua orang saudara perempuan. Allah
                menerangkan (hukum ini) kepadamu agar kamu tidak tersesat. Allah
                Maha Mengetahui segala sesuatu."(Q.S. an-Nisaa' ayat 176)
              </Text>
            </View>
          </View>

          {/* Bagian Sumber Hukum dari Hadits Rasulullah */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Sumber Hukum dari Hadits Rasulullah
            </Text>
            <Text style={styles.sectionDescription}>
              Selain dari Al-Qur'an, terdapat pula hadits yang menerangkan
              tentang pentingnya ilmu waris. Hadits tersebut adalah:
            </Text>
            <View style={styles.quranVerseContainer}>
              <Text style={styles.arabicText}>
                يَا أَبَا هُرَيْرَةَ، تَعَلَّمُوا الْفَرَائِضَ وَعَلِّمُوهَا
                فَإِنَّهَا نِصْفُ الْعِلْمِ، وَإِنَّهَا تُنْسَى، وَإِنَّهَا
                أَوَّلُ شَيْءٍ يُرْفَعُ مِنْ أُمَّتِي
              </Text>
              <Text style={styles.translationText}>
                "Wahai Abu Hurairah, pelajarilah ilmu waris dan ajarkanlah
                karena ia adalah separuh ilmu, dan ia adalah yang pertama kali
                akan diangkat dari umatku." (HR. Ibnu Majah, Ad-Daruquthni,
                Al-Hakim, dan Al-Baihaqi)
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rukun-Rukun Waris</Text>
            <Text style={styles.numberedText}>
              1. Adanya ahli waris, yaitu seseorang atau sekelompok orang yang
              berhak untuk menguasai atau menerima harta peninggalan pewaris
              dikarenakan adanya ikatan kekerabatan (nasab) atau ikatan
              pernikahan, atau lainnya, beragama Islam dan tidak terhalang
              karena hukum untuk menjadi ahli waris.
            </Text>
            <Text style={styles.numberedText}>
              2. Adanya ahli waris, yaitu seseorang atau sekelompok orang yang
              berhak untuk menguasai atau menerima harta peninggalan pewaris
              dikarenakan adanya ikatan kekerabatan (nasab) atau ikatan
              pernikahan, atau lainnya, beragama Islam dan tidak terhalang
              karena hukum untuk menjadi ahli waris.
            </Text>
            <Text style={styles.numberedText}>
              3. Adanya harta warisan, Harta warisan menurut hukum waris Islam
              adalah harta bawaan dan harta bersama dikurang biayabiaya yang
              dikeluarkan untuk pewaris selama sakit dan setelah meninggal
              dunia.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Syarat-Syarat Waris</Text>
            <Text style={styles.numberedText}>
              1. Telah meninggalnya pewaris baik secara nyata maupun secara
              hukum.
            </Text>
            <Text style={styles.numberedText}>
              2. Adanya ahli waris yang masih hidup secara nyata pada waktu
              pewaris meninggal dunia.
            </Text>
            <Text style={styles.numberedText}>
              3. Seluruh ahli waris telah diketahui secara pasti, termasuk
              kedudukannya terhadap pewaris dan jumlah bagiannya masing masing.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Penggugur Hak Waris</Text>
            <Text style={styles.numberedText}>
              1. Pembunuhan. Apabila seorang ahli waris membunuh pewaris
              (misalnya seorang anak membunuh ayahnya), maka ia tidak berhak
              mendapatkan warisan.
            </Text>
            <Text style={styles.numberedText}>
              2. Berlainan agama. Seorang muslim tidak dapat mewarisi harta
              warisan orang non muslim walaupun ia adalah orang tua atau anak,
              dan begitu pula sebaliknya.
            </Text>
            <Text style={styles.numberedText}>
              3. Budak. Seseorang yang berstatus sebagai budak (yang belum
              merdeka) tidak mempunyai hak untuk mewarisi sekalipun dari
              saudaranya. Sebab segala sesuatu yang dimiliki budak, secara
              langsung menjadi milik tuannya.
            </Text>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ED6933", // Warna latar belakang diubah menjadi oranye
  },
  mainContentWrapper: {
    flex: 1,
    backgroundColor: "#f0f2f5", // Latar belakang konten utama
    position: "absolute", // Penting untuk animasi
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerIcon: {
    padding: 10,
  },
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
    fontSize: 18, // Ukuran font disesuaikan
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "left", // Default rata kiri
  },
  sectionDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: "#555",
    marginBottom: 10,
  },
  numberedText: {
    fontSize: 15, // Ukuran font disesuaikan
    color: "#333",
    marginVertical: 4,
    lineHeight: 22,
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
