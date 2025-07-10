// app/edukasi/al_hajb.tsx
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
  Dimensions,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons"; // Untuk ikon panah kembali
import EducationSidebar from "../../components/EducationSidebar"; // Sesuaikan path jika berbeda

const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.7; // Lebar sidebar 70% dari lebar layar

const AlHajbScreen: React.FC = () => {
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
      <StatusBar barStyle="light-content" backgroundColor="#007bff" />

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
            title: "Penghalang Hak Waris (Al-Hajb)", // Judul di tengah header
            headerShown: true, // Pastikan header ditampilkan
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
              backgroundColor: "#007bff", // Warna latar belakang header
            },
            headerTintColor: "white", // Warna teks dan ikon di header
          }}
        />
        <ScrollView style={styles.scrollViewContent}>
          <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>
              Al-Hajb (Penghalang atau Penggugur Hak Waris)
            </Text>

            <Text style={styles.paragraph}>
              Al-hajb dalam bahasa Arab bermakna penghalang atau penggugur. Maka
              makna al-hajb menurut istilah ialah orang yang menghalangi orang
              lain untuk mendapatkan warisan, dan al-mahjub berarti orang yang
              terhalang untuk mendapatkan warisan.
            </Text>

            <Text style={styles.subSectionTitle}>Macam-macam al-Hajb</Text>
            <Text style={styles.paragraph}>Al-hajb terbagi dua, yaitu :</Text>

            {/* Al-hajb bil washfi */}
            <Text style={styles.listItem}>
              • Al-hajb bil washfi (berdasarkan sifatnya)
            </Text>
            <Text style={styles.subParagraph}>
              Al-hajb bil washfi berarti orang yang terkena hajb tersebut
              terhalang dari mendapatkan hak waris secara keseluruhan, misalnya
              orang yang membunuh pewarisnya, kafir atau murtad, serta budak.
              Maka hak waris untuk kelompok ini menjadi gugur atau terhalang.
            </Text>

            {/* Al-hajb bi asy-syakhshi */}
            <Text style={styles.listItem}>
              • Al-hajb bi asy-syakhshi (karena orang lain)
            </Text>
            <Text style={styles.subParagraph}>
              Sedangkan al-hajb bi asy-syakhshi yaitu gugurnya hak waris
              seseorang dikarenakan adanya orang lain yang lebih berhak untuk
              menerimanya. Al-hajb bi asy-syakhshi ini sendiri terbagi menjadi
              dua, yaitu :
            </Text>
            <Text style={styles.subListItem}>
              • Hajb Hirman, yaitu penghalang yang menggugurkan seluruh hak
              waris seseorang. Misalnya, terhalangnya hak waris seorang kakek
              karena adanya ayah, terhalangnya hak waris cucu karena adanya
              anak, terhalangnya hak waris saudara seayah karena adanya saudara
              kandung, terhalangnya hak waris seorang nenek karena adanya ibu,
              dan seterusnya.
            </Text>

            <Text style={styles.subSectionTitle}>
              Pengelompokan Hajb Hirman
            </Text>
            <Text style={styles.paragraph}>
              Dengan merujuk pada penjelasan-penjelasan di atas, maka dapat
              disimpulkan, para ahli waris dalam hajb hirman dapat dibagi
              menjadi empat kelompok, yaitu :
            </Text>
            <Text style={styles.listItem}>
              1. Ahli waris yang bisa menghalangi dan tidak bisa terhalang,
              yaitu bapak, ibu, anak laki-laki dan anak perempuan.
            </Text>
            <Text style={styles.listItem}>
              2. Ahli waris yang tidak bisa menghalangi dan bisa terhalang,
              yaitu saudara laki-laki seibu dan saudara perempuan seibu.
            </Text>
            <Text style={styles.listItem}>
              3. Ahli waris yang tidak bisa menghalangi dan tidak bisa
              terhalang, yaitu duda dan janda.
            </Text>
            <Text style={styles.listItem}>
              4. Ahli waris yang bisa menghalangi dan bisa pula terhalang, yaitu
              para ahli waris selain yang tersebut di atas.
            </Text>

            <Text style={styles.subListItem}>
              • Hajb Nuqshan, yaitu penghalangan terhadap hak waris seseorang
              untuk mendapatkan bagian yang terbanyak. Contohnya, Istri
              terhalang mendapatkan bagian warisan, dari seperempat (1/4)
              menjadi seperdelapan (1/8) karena adanya keturunan suami yang
              dapat mewarisi, baik keturunan tersebut dihasilkan dari
              perkawinannya dengan istri tersebut maupun dengan istri-istrinya
              yang lain. Demikian pula ibu, ia terhalang mendapatkan bagian
              warisan, dari sepertiga (1/3) menjadi seperenam (1/6) karena
              adanya keturunan yang dapat mewarisi dan karena sebab berkumpulnya
              beberapa (dua orang atau lebih) saudara laki-laki atau saudara
              perempuan, baik saudara sekandung, seayah maupun seibu.
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
    backgroundColor: "#007bff", // Warna latar belakang header
  },
  headerIcon: {
    padding: 10,
  },
  scrollViewContent: {
    flex: 1,
    backgroundColor: "#f0f2f5", // Latar belakang abu-abu muda
    padding: 15, // Padding di sekitar content card
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
  contentCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#444",
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 10,
    color: "#555",
  },
  listItem: {
    fontSize: 15,
    lineHeight: 24,
    marginLeft: 15, // Indent untuk daftar
    marginBottom: 5,
    color: "#555",
    fontWeight: "bold", // Membuat bullet point utama lebih tebal
  },
  subParagraph: {
    fontSize: 15,
    lineHeight: 24,
    marginLeft: 30, // Indent lebih dalam untuk penjelasan sub-item
    marginBottom: 10,
    color: "#666",
  },
  subListItem: {
    fontSize: 15,
    lineHeight: 24,
    marginLeft: 30, // Indent lebih dalam untuk sub-daftar
    marginBottom: 5,
    color: "#666",
  },
});

export default AlHajbScreen;
