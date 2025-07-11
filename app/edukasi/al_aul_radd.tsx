// app/edukasi/al_aul_radd.tsx
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

const AlAulRaddScreen: React.FC = () => {
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
            title: "Al-Aul & Al-Radd", // Judul di tengah header
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
          {/* Kartu 1: Definisi al-’Aul */}
          <View style={styles.contentCard}>
            <Text style={styles.subSectionTitle}>Definisi al-’Aul</Text>
            <Text style={styles.paragraph}>
              Al-’aul secara bahasa berarti *irtifa'* atau mengangkat. Dikatakan
              *'aalal miizaan* bila timbangan itu naik, terangkat. Kata *'aul*
              ini kadang berarti cenderung kepada perbuatan aniaya (curang).
            </Text>
            <Text style={styles.paragraph}>
              Menurut para fuqaha, *'aul* ialah bertambahnya saham Ashabul
              furudh dan berkurangnya kadar peneriman warisan mereka. Hal ini
              terjadi ketika makin banyaknya ashabul furudh sehingga harta yang
              dibagikan habis, padahal di antara mereka ada yang belum menerima
              bagian. Dalam keadaan seperti ini kita harus menaikkan atau
              menambah pokok masalahnya (penyebut) sehingga seluruh harta waris
              dapat mencukupi jumlah ashabul furudh yang ada.
            </Text>
            <Text style={styles.paragraph}>
              Dari segi istilah, al-’aul adalah bertambahnya pembagi (jumlah
              bagian fardh) sehingga menyebabkan berkurangnya bagian para ahli
              waris. Hal ini disebabkan banyaknya ashab al-furudh sedangkan
              jumlah seluruh bagiannya telah melebihi nilai 1, sehingga di
              antara ashab al-furudh tersebut ada yang belum menerima bagian
              yang semestinya. Maka dalam keadaan seperti ini harus menaikkan
              atau menambah pembaginya sehingga seluruh harta waris dapat
              mencukupi jumlah ashab al-furudh yang ada, meskipun akhirnya
              bagian mereka menjadi berkurang.
            </Text>
            <Text style={styles.paragraph}>
              Misalnya bagian seorang duda yang semestinya mendapat 1/2 dapat
              berubah menjadi 1/3 dalam keadaan tertentu, seperti bila
              pembaginya dinaikkan, dari 6 menjadi 9. Maka dalam hal ini seorang
              duda yang semestinya mendapat bagian 3/6 (1/2) hanya memperoleh
              3/9 (1/3). Begitu pula halnya dengan ashab al-furudh yang lain,
              bagian mereka dapat berkurang manakala pembaginya naik atau
              bertambah.
            </Text>
          </View>

          {/* Kartu 2: Kesimpulan (dari Al-Aul) */}
          <View style={styles.contentCard}>
            <Text style={styles.subSectionTitle}>Kesimpulan Al-'Aul :</Text>
            <Text style={styles.listItem}>
              1. Setiap masalah atau keadaan yang di dalamnya terdapat ahli
              waris yang berhak mendapatkan bagian 1/2 dari harta waris,
              kemudian yang lain berhak mendapatkan sisanya, atau dua orang ahli
              waris yang masing-masing berhak mendapatkan bagian 1/2, maka
              pembaginya dari 2, dan tidak dapat di-’aul-kan.
            </Text>
            <Text style={styles.listItem}>
              2. Setiap masalah atau keadaan yang di dalamnya terdapat ahli
              waris yang berhak mendapat bagian 1/3 dan yang lain sisanya, atau
              dua orang ahli waris yang satu berhak mendapat bagian 1/3 dan yang
              lainnya 2/3, maka pembaginya dari 3, dan tidak ada ‘aul.
            </Text>
            <Text style={styles.listItem}>
              3. Setiap masalah atau keadaan yang di dalamnya terdapat ahli
              waris yang berhak mendapat bagian 1/4 dan yang lain sisanya, atau
              dua orang ahli waris yang satu berhak mendapat 1/4 dan yang lain
              berhak mendapat 1/2, maka pembaginya dari 4, dan dalam hal ini
              tidak ada ‘aul.
            </Text>
            <Text style={styles.listItem}>
              4. Setiap masalah atau keadaan yang di dalamnya terdapat ahli
              waris yang berhak mendapat bagian 1/8 dan yang lain sisanya, atau
              dua orang ahli waris yang satu berhak mendapat seperdelapan dan
              yang lainnya setengah, maka pembaginya dari delapan, dan tidak ada
              ‘aul.
            </Text>
          </View>

          {/* Kartu 3: Definisi Al-Radd */}
          <View style={styles.contentCard}>
            <Text style={styles.subSectionTitle}>Definisi Al-Radd</Text>
            <Text style={styles.paragraph}>
              Ar-radd dalam bahasa Arab *i'aadah* berarti 'kembali/kembalikan'
              atau juga bermakna *sharf’* berpaling/palingkan'. Adapun ar-radd
              menurut istilah ulama ilmu faraid ialah berkurangnya pokok masalah
              dan bertambahnya/lebihnya jumlah bagian ashabul furudh.
            </Text>
            <Text style={styles.paragraph}>
              Dalam istilah, Ar-radd adalah berkurangnya pembagi (jumlah bagian
              fardh) dan bertambahnya bagian para ahli waris. Hal ini disebabkan
              sedikitnya ashab al-furudh sedangkan jumlah seluruh bagiannya
              belum mencapai nilai 1, sehingga disana ada harta warisan yang
              masih tersisa, sementara tidak ada seorangpun ashabah disana yang
              berhak menerima sisa harta waris. Maka dalam keadaan seperti ini
              harus menurunkan atau mengurangi pembaginya sehingga seluruh harta
              waris dapat mencukupi jumlah ashab al-furudh yang ada, meskipun
              akhirnya bagian mereka menjadi bertambah. Dengan demikian, dapat
              disimpulkan bahwa ar-radd adalah kebalikan dari al- ’aul.
            </Text>
          </View>

          {/* Kartu 4: Syarat-syarat Terjadinya ar-Radd */}
          <View style={styles.contentCard}>
            <Text style={styles.subSectionTitle}>
              Syarat-syarat Terjadinya ar-Radd
            </Text>
            <Text style={styles.paragraph}>
              Ar-radd tidak akan terjadi dalam suatu keadaan, kecuali bila
              terwujud tiga syarat seperti di bawah ini :
            </Text>
            <Text style={styles.listItem}>1. Adanya ashab al-furudh</Text>
            <Text style={styles.listItem}>2. Tidak adanya ashabah</Text>
            <Text style={styles.listItem}>3. Adanya sisa harta waris</Text>
            <Text style={styles.paragraph}>
              Bila dalam pembagian harta waris tidak ada ketiga syarat tersebut
              maka kasus ar-radd tidak akan terjadi.
            </Text>
          </View>

          {/* Kartu 5: Ahli Waris yang Berhak Mendapat ar-Radd */}
          <View style={styles.contentCard}>
            <Text style={styles.subSectionTitle}>
              Ahli Waris yang Berhak Mendapat ar-Radd
            </Text>
            <Text style={styles.paragraph}>
              Ar-radd dapat terjadi dan melibatkan semua ashab al-furudh,
              kecuali duda dan janda. Adapun ashab al-furudh yang dapat menerima
              ar-radd hanya ada delapan orang, yakni :
            </Text>
            <Text style={styles.listItem}>1. Anak perempuan</Text>
            <Text style={styles.listItem}>
              2. Cucu perempuan keturunan anak laki-laki
            </Text>
            <Text style={styles.listItem}>3. Saudara perempuan sekandung</Text>
            <Text style={styles.listItem}>4. Saudara perempuan seayah</Text>
            <Text style={styles.listItem}>5. Ibu kandung</Text>
            <Text style={styles.listItem}>6. Nenek sahih (ibu dari bapak)</Text>
            <Text style={styles.listItem}>7. Saudara perempuan seibu</Text>
            <Text style={styles.listItem}>8. Saudara laki-laki seibu</Text>

            <Text style={styles.paragraph}>
              Adapun mengenai ayah dan kakek, sekalipun keduanya termasuk ashab
              al-furudh dalam beberapa keadaan tertentu, mereka tidak bisa
              mendapatkan ar-radd. Sebab dalam keadaan bagaimanapun, bila dalam
              pembagian hak waris terdapat salah satunya, maka tidak mungkin ada
              ar-radd, karena keduanya akan menerima waris sebagai ashabah.
            </Text>
          </View>

          {/* Kartu 6: Ahli Waris yang Tidak Mendapat ar-Radd */}
          <View style={styles.contentCard}>
            <Text style={styles.subSectionTitle}>
              Ahli Waris yang Tidak Mendapat ar-Radd
            </Text>
            <Text style={styles.paragraph}>
              Adapun ahli waris dari ashab al-furudh yang tidak bisa mendapatkan
              ar-radd hanyalah duda dan janda. Hal ini disebabkan kekerabatan
              keduanya bukanlah karena nasab, akan tetapi karena kekerabatan
              sababiyah (karena sebab), yaitu adanya ikatan tali pernikahan.
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
    backgroundColor: "#ED6933", // Background color changed to orange
  },
  mainContentWrapper: {
    flex: 1,
    backgroundColor: "#f0f2f5", // Main content background
    position: "absolute", // Important for animation
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerIcon: {
    padding: 10,
  },
  scrollViewContent: {
    flex: 1,
    padding: 15, // Padding around the content card
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
    marginBottom: 15, // Spacing between cards if there's more than one
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
    marginLeft: 15, // Indent for list items
    marginBottom: 5,
    color: "#555",
  },
});

export default AlAulRaddScreen;
