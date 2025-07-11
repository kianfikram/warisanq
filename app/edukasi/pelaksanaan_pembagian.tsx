// app/edukasi/pelaksanaan_pembagian.tsx
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

const PelaksanaanPembagianScreen: React.FC = () => {
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
            title: "Pelaksanaan Pembagian Harta Warisan", // Judul di tengah header
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
        {/* Konten yang bisa di-scroll */}
        <ScrollView style={styles.scrollViewContent}>
          {/* Kartu 1: Pelaksanaan Pembagian Harta Warisan (Pendahuluan) */}
          <View style={styles.contentCard}>
            <Text style={styles.subSectionTitle}>
              Pelaksanaan Pembagian Harta Warisan
            </Text>
            <Text style={styles.paragraph}>
              Pelaksanaan pembagian harta warisan, maka terdapat beberapa hal
              yang harus terlebih dahulu diverifikasi, yaitu:
            </Text>
            <Text style={styles.listItem}>
              1. Melakukan identifikasi orang-orang yang termasuk ahli waris
            </Text>
            <Text style={styles.listItem}>
              2. Menyeleksi ahli waris yang terhalang dan yang tidak terhalang,
              baik halangan itu karena mamnu’ maupun karena mahjub,
            </Text>
            <Text style={styles.listItem}>
              3. Melakukan klasifikasi ahli waris yang tergolong sebagai ahli
              waris ashab al-furud dan menentukan bagian masing-masing, demikian
              halnya menentukan ahli waris yang paling patut menjadi asabah.
              Untuk memudahkan pembacaan Terhadap Klasifikasi dapat dilakukan
              dengan menggunakan diagram hubungan kekerabatan.
            </Text>
            <Text style={styles.listItem}>
              4. Menentukan asal masalah atau disebut masalah pokok
            </Text>
          </View>

          {/* Kartu 2: Tahapan Mengetahui Pokok Masalah */}
          <View style={styles.contentCard}>
            <Text style={styles.subSectionTitle}>
              Tahapan Mengetahui Pokok Masalah
            </Text>
            <Text style={styles.paragraph}>
              merupakan suatu keharusan bagi kita yang mengkaji ilmu faraid. Hal
              ini agar kita dapat mengetahui secara pasti bagian setiap ahli
              waris, hingga pembagiannya benar-benar adil, tanpa mengurangi atau
              melebihkan hak masing-masing. Persoalan "pokok masalah" ini di
              kalangan ulama faraid dikenal dengan istilah at-tashih, yang
              berarti usaha untuk mengetahui pokok masalah. Dalam hal ini, yang
              perlu diketahui adalah bagaimana dapat memperoleh angka pembagian
              hak setiap ahli waris tanpa melalui pemecahan yang rumit. Karena
              itu, para ulama ilmu faraid tidak mau menerima kecuali angka-angka
              yang jelas dan benar.
            </Text>
            <Text style={styles.paragraph}>
              Tashih adalah suatu cara untuk menyamakan pembagi seluruh ahli
              waris agar setiap ahli waris dapat menerima bagiannya berdasarkan
              bilangan bulat yang pas dan tanpa sisa. Tashih umumnya dilakukan
              manakala ahli waris dalam satu kelompok berjumlah lebih dari satu
              orang. Inti dari tashih adalah agar masing-masing ahli waris
              mendapatkan bagian waris dari pembilangnya secara bulat atau pas,
              tanpa menghasilkan sisa. Karena itu pembagi yang ada dapat
              dikalikan dengan jumlah kepala setiap kelompok ahli waris,
              kemudian bagian waris yang baru ikut dikalikan pula dengan jumlah
              kepala setiap kelompok ahli waris.
            </Text>
            <Text style={styles.paragraph}>
              Pembagi, yang dalam ilmu faraid lebih dikenal dengan sebutan pokok
              masalah atau asal masalah, adalah bilangan yang paling sedikit
              atau paling kecil yang bisa diambil dari seluruh bagian para ahli
              waris secara benar tanpa ada bilangan pecahan (desimal), dan
              besarnya bagian itu berbeda sesuai dengan perbedaan para ahli
              waris yang ada. Mengetahui pembagi merupakan suatu keharusan bagi
              kita yang akan mengkaji ilmu faraid, yakni agar kita dapat
              mengetahui secara pasti bagian setiap ahli waris, hingga
              pembagiannya benar- benar adil, tanpa mengurangi atau melebihkan
              hak masing-masing. Untuk mengetahui pembagi, terlebih dahulu perlu
              kita ketahui siapa-siapa ahli warisnya. Artinya, kita harus
              mengetahui apakah ahli waris yang ada semuanya hanya termasuk
              ashabah, atau semuanya hanya dari ashab al-furudh, atau gabungan
              antara ashabah dengan ashab al-furudh.
            </Text>
          </View>

          {/* Kartu 3: Contoh Pembagi Ashabah */}
          <View style={styles.contentCard}>
            <Text style={styles.subSectionTitle}>Contoh Pembagi Ashabah</Text>
            <Text style={styles.paragraph}>
              Apabila seluruh ahli waris yang ada semuanya dari ashabah dari
              golongan laki-laki maka pembaginya dihitung per kepala. Misalnya,
              seseorang wafat dan meninggalkan lima orang anak laki-laki, maka
              pembaginya dari lima, atau masing-masing memperoleh 1/5. Atau
              seseorang wafat meninggalkan sepuluh saudara kandung laki-laki,
              maka pembaginya dari sepuluh, atau masing-masing memperoleh 1/10.
            </Text>
            <Text style={styles.paragraph}>
              Bila ternyata ahli waris yang ada terdiri dari anak laki-laki dan
              perempuan, maka satu anak laki-laki dihitung dua kepala
              (hitungan), dan satu perempuan satu kepala. Hal ini diambil dari
              kaidah qur'aniyah, “bagian anak laki-laki adalah dua kali bagian
              anak perempuan”. Dengan demikian nilai pembaginya dihitung dari
              jumlah per kepala. Misalnya, seseorang wafat dan hanya
              meninggalkan lima orang anak, dua laki-laki dan tiga perempuan.
              Maka pembaginya berarti tujuh :
            </Text>
            <Text style={styles.listItem}>
              1 anak laki-laki = 2/7 x 2 orang = 4/7
            </Text>
            <Text style={styles.listItem}>
              1 anak perempuan = 1/7 x 3 orang = 3/7
            </Text>
            <Text style={styles.paragraph}>Jumlah = 7/7 (habis terbagi)</Text>
          </View>

          {/* Kartu 4: Metode Operasi Bilangan Pecahan */}
          <View style={styles.contentCard}>
            <Text style={styles.subSectionTitle}>
              Metode Operasi Bilangan Pecahan
            </Text>
            <Text style={styles.paragraph}>
              Jika para ahli waris yang ditinggalkan pewaris terdiri dari banyak
              bagian, yakni tidak dari satu jenis, misalnya ada yang berhak
              setengah, seperenam, dan sebagainya, maka kita dapat memadukannya
              menggunakan metode operasi bilangan pecahan. Para ulama faraid
              membagi kaidah-kaidah tersebut menjadi dua bagian:
            </Text>
            <Text style={styles.listItem}>
              1. Bagian setengah (1/2), seperempat (1/4), dan seperdelapan
              (1/8).
            </Text>
            <Text style={styles.listItem}>
              2. Bagian dua per tiga (2/3), sepertiga (1/3), dan seperenam
              (1/6).
            </Text>
            <Text style={styles.paragraph}>
              Apabila para ashab al-furudh hanya terdiri dari bagian yang
              pertama saja (yakni 1/2, 1/4, 1/8), berarti pembaginya dari angka
              yang paling besar. Misalnya, bila dalam suatu keadaan, ahli
              warisnya dari ashab al-furudh setengah (1/2) dan seperempat (1/4),
              maka pembaginya dari empat (4).
            </Text>
            <Text style={styles.paragraph}>
              Begitu juga apabila para ashab al-furudh hanya terdiri dari bagian
              yang kedua saja (yakni 2/3, 1/3, 1/6), berarti pembaginya dari
              angka yang paling besar. Misalnya, bila dalam suatu keadaan ahli
              warisnya terdiri dari ashab al-furudh sepertiga (1/3) dengan
              seperenam (1/6) atau dua per tiga (2/3) dengan seperenam (1/6),
              maka pembaginya dari enam (6).
            </Text>
          </View>

          {/* Kartu 5: Kaidah Campuran Ashab al-furudh */}
          <View style={styles.contentCard}>
            <Text style={styles.subSectionTitle}>
              Kaidah Campuran Ashab al-furudh
            </Text>
            <Text style={styles.paragraph}>
              Namun jika dalam suatu keadaan ahli warisnya bercampur antara
              ashab al-furudh kelompok pertama (1/2, 1/4, dan 1/8) dengan
              kelompok kedua (2/3, 1/3, dan 1/6) diperlukan kaidah yang lain
              untuk mengetahui pembaginya. Kaidah yang dimaksud seperti tersebut
              di bawah ini:
            </Text>
            <Text style={styles.listItem}>
              • Apabila dalam suatu keadaan, ashab al-furudh setengah (1/2) yang
              merupakan kelompok pertama, bercampur dengan salah satu dari
              kelompok kedua, atau semuanya, maka pembaginya dari enam (6).
            </Text>
            <Text style={styles.listItem}>
              • Apabila dalam suatu keadaan, ashab al-furudh seperempat (1/4)
              yang merupakan kelompok pertama, bercampur dengan seluruh kelompok
              kedua atau salah satunya, maka pembaginya dari dua belas (12).
            </Text>
            <Text style={styles.listItem}>
              • Apabila dalam suatu keadaan, ashab al-furudh seperdelapan (1/8)
              yang merupakan kelompok pertama, bercampur dengan seluruh kelompok
              kedua, atau salah satunya, maka pembaginya dari dua puluh empat
              (24).
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

export default PelaksanaanPembagianScreen;
