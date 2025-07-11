// app/edukasi/penggolongan_ahli_waris.tsx
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

const PenggolonganAhliWarisScreen: React.FC = () => {
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
            title: "Penggolongan Ahli Waris", // Judul di tengah header
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
              backgroundColor: "#ED6933", // Ubah warna latar belakang header
            },
            headerTintColor: "white", // Warna teks dan ikon di header
          }}
        />
        <ScrollView style={styles.scrollViewContent}>
          {/* Kartu 1: Ahli Waris Laki-laki dan Perempuan */}
          <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>
              Ahli Waris Laki-laki dan Perempuan Menurut Ijma’ para Ulama
            </Text>

            {/* Ahli Waris Laki-laki */}
            <Text style={styles.subSectionTitle}>Ahli Waris Laki-laki</Text>
            <Text style={styles.paragraph}>
              Terdapat 15 ahli waris laki-laki yang telah menjadi ijma’ para
              ulama, yaitu:
            </Text>
            <Text style={styles.listItem}>1. Anak laki-laki.</Text>
            <Text style={styles.listItem}>
              2. Cucu laki-laki dari keturunan anak laki-laki seterusnya ke
              bawah
            </Text>
            <Text style={styles.listItem}>3. Ayah.</Text>
            <Text style={styles.listItem}>
              4. Kakek sahih (bapak dari ayah) dan laki-laki generasi di
              atasnya.
            </Text>
            <Text style={styles.listItem}>5. Saudara laki-laki sekandung.</Text>
            <Text style={styles.listItem}>6. Saudara laki-laki seayah.</Text>
            <Text style={styles.listItem}>7. Saudara laki-laki seibu.</Text>
            <Text style={styles.listItem}>
              8. Anak laki-laki dari saudara laki-laki sekandung.
            </Text>
            <Text style={styles.listItem}>
              9. Anak laki-laki dari saudara laki-laki seayah.
            </Text>
            <Text style={styles.listItem}>
              10. Paman sekandung (saudara laki-laki sekandung ayah, baik adik
              maupun kakak ayah).
            </Text>
            <Text style={styles.listItem}>
              11. Paman seayah (saudara laki-laki seayah ayah).
            </Text>
            <Text style={styles.listItem}>
              12. Anak laki-laki dari paman sekandung.
            </Text>
            <Text style={styles.listItem}>
              13. Anak laki-laki dari paman seayah.
            </Text>
            <Text style={styles.listItem}>14. Duda.</Text>
            <Text style={styles.listItem}>
              15. Laki-laki yang memerdekakan budak, baik budak laki-laki maupun
              budak perempuan.
            </Text>
          </View>

          <View style={styles.contentCard}>
            {/* Ahli Waris Perempuan */}
            <Text style={styles.subSectionTitle}>Ahli Waris Perempuan</Text>
            <Text style={styles.paragraph}>
              Terdapat 10 ahli waris perempuan yang telah menjadi ijma’ para
              ulama, yaitu:
            </Text>
            <Text style={styles.listItem}>1. Anak perempuan.</Text>
            <Text style={styles.listItem}>
              2. Cucu perempuan dari keturunan anak laki-laki seterusnya ke
              bawah,
            </Text>
            <Text style={styles.listItem}>3. Ibu.</Text>
            <Text style={styles.listItem}>4. Nenek (ibu dari ayah).</Text>
            <Text style={styles.listItem}>
              5. Nenek (ibu dari ibu). Nenek, baik ibu dari ayah maupun ibu dari
              ibu, semuanya bersekutu dalam satu bagian yang telah ditetapkan
              untuk mereka (dibagi sama rata),
            </Text>
            <Text style={styles.listItem}>6. Saudara perempuan sekandung.</Text>
            <Text style={styles.listItem}>7. Saudara perempuan seayah.</Text>
            <Text style={styles.listItem}>8. Saudara perempuan seibu.</Text>
            <Text style={styles.listItem}>9. Janda.</Text>
            <Text style={styles.listItem}>
              10. Perempuan yang memerdekakan budak, baik budak laki-laki maupun
              budak perempuan.
            </Text>
          </View>

          {/* Kartu 2: Pengelompokan Ahli Waris (Pendahuluan) */}
          <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>Pengelompokan Ahli Waris</Text>
            <Text style={styles.paragraph}>
              Terdapat empat kelompok ahli waris, berikut ini adalah
              penjelasannya :
            </Text>
          </View>

          {/* Kartu 3: Kelompok Ashab al-furudh */}
          <View style={styles.contentCard}>
            <Text style={styles.subSectionTitle}>Kelompok Ashab al-furudh</Text>
            <Text style={styles.paragraph}>
              Yaitu kelompok ahli waris yang pertama kali diberi bagian harta
              warisan. Mereka adalah orang-orang yang telah ditentukan bagiannya
              dalam Al-Qur’an, as-Sunnah, dan ijma' secara tetap. Mereka
              berjumlah tujuh orang, yaitu:
            </Text>
            <Text style={styles.listItem}>1. Ibu</Text>
            <Text style={styles.listItem}>2. Saudara laki-laki seibu</Text>
            <Text style={styles.listItem}>3. Saudara perempuan seibu</Text>
            <Text style={styles.listItem}>4. Nenek dari ayah</Text>
            <Text style={styles.listItem}>5. Nenek dari ibu</Text>
            <Text style={styles.listItem}>6. Duda</Text>
            <Text style={styles.listItem}>7. Janda</Text>
          </View>

          {/* Kartu 4: Kelompok Ashabah */}
          <View style={styles.contentCard}>
            <Text style={styles.subSectionTitle}>Kelompok Ashabah</Text>
            <Text style={styles.paragraph}>
              Yaitu kelompok ahli waris yang menerima sisa harta warisan setelah
              dibagikan kepada ashab al-furudh. Bahkan, jika ternyata tidak ada
              ashabul furudh serta ahli waris lainnya, ia berhak mengambil
              seluruh harta peninggalan yang ada. Begitu juga, jika harta waris
              yang ada sudah habis dibagikan kepada ashabul furudh, maka
              merekapun tidak mendapat bagian
            </Text>
            <Text style={styles.paragraph}>
              Sepuluh ashabah yang merupakan kerabat laki-laki tersebut adalah :
            </Text>
            <Text style={styles.listItem}>1. Anak laki-laki</Text>
            <Text style={styles.listItem}>
              2. Cucu laki-laki dari anak laki-laki dan seterusnya ke bawah
            </Text>
            <Text style={styles.listItem}>3. Saudara laki-laki sekandung</Text>
            <Text style={styles.listItem}>4. Saudara laki-laki seayah</Text>
            <Text style={styles.listItem}>
              5. Anak laki-laki dari saudara laki-laki sekandung
            </Text>
            <Text style={styles.listItem}>
              6. Anak laki-laki dari saudara laki-laki seayah
            </Text>
            <Text style={styles.listItem}>7. Paman sekandung</Text>
            <Text style={styles.listItem}>8. Paman seayah</Text>
            <Text style={styles.listItem}>
              9. Anak laki-laki dari paman sekandung
            </Text>
            <Text style={styles.listItem}>
              10. Anak laki-laki dari paman seayah
            </Text>
            <Text style={styles.paragraph}>
              Sedangkan dua orang di luar kerabat, karena ia yang telah
              memerdekakan pewaris jika status pewaris sebelumnya adalah sebagai
              budak dia.
            </Text>
            <Text style={styles.listItem}>
              1. Laki-laki yang memerdekakan budak
            </Text>
            <Text style={styles.listItem}>
              2. Perempuan yang memerdekakan budak
            </Text>
          </View>

          {/* Kartu 5: Kelompok Ashab al-furudh atau Ashabah */}
          <View style={styles.contentCard}>
            <Text style={styles.subSectionTitle}>
              Kelompok Ashab al-furudh atau Ashabah
            </Text>
            <Text style={styles.paragraph}>
              Yaitu kelompok ahli waris yang pada kondisi tertentu bisa menjadi
              ashab al-furudh atau bisa juga menjadi ashabah, hal itu tergantung
              dengan kondisi yang menjadi syarat utamanya. Mereka adalah:
            </Text>
            <Text style={styles.listItem}>1. Anak perempuan</Text>
            <Text style={styles.listItem}>
              2. Cucu perempuan dari keturunan anak laki-laki dan seterusnya ke
              bawah
            </Text>
            <Text style={styles.listItem}>3. Saudara perempuan sekandung</Text>
            <Text style={styles.listItem}>4. Saudara perempuan seayah</Text>
            <Text style={styles.paragraph}>
              Mereka akan digolongkan ke dalam kelompok ashab al-furudh, selama
              tidak ada saudara laki-laki mereka.
            </Text>
          </View>

          {/* Kartu 6: Kelompok Ashab al-furudh dan Ashabah */}
          <View style={styles.contentCard}>
            <Text style={styles.subSectionTitle}>
              Kelompok Ashab al-furudh dan Ashabah
            </Text>
            <Text style={styles.paragraph}>
              Yaitu kelompok ahli waris yang pada kondisi tertentu bisa menjadi
              ashab al-furudh, bisa juga menjadi ashabah, dan bisa juga sebagai
              gabungan dari keduanya, yaitu sebagai ashab al-furudh dan ashabah
              secara sekaligus dalam satu waktu, hal itu tergantung dengan
              kondisi yang menjadi syarat utamanya. Mereka adalah :
            </Text>
            <Text style={styles.listItem}>1. Ayah</Text>
            <Text style={styles.listItem}>2. Kakek (bapak dari ayah)</Text>
            <Text style={styles.paragraph}>
              Hal ini terjadi karena semua ahli waris dari kelompok ashab
              alfurudh yang ada sudah menerima bagiannya, namun masih ada harta
              waris yang tersisa, sedangkan di sana tidak ada ashabah yang lain,
              maka sisanya diberikan kepada kelompok ini.
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
    marginBottom: 15, // Jarak antar card jika ada lebih dari satu
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
  },
});

export default PenggolonganAhliWarisScreen;
