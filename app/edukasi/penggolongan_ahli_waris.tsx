// app/edukasi/penggolongan_ahli_waris.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Untuk ikon panah kembali
import EducationSidebar from "../../components/EducationSidebar";

const PenggolonganAhliWarisScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#007bff" />
      {/* Konfigurasi Header untuk halaman ini */}
      <Stack.Screen
        options={{
          title: "Penggolongan Ahli Waris", // Judul di tengah header
          headerShown: true, // Pastikan header ditampilkan
          headerLeft: () => (
            // Tombol kembali (panah)
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.headerIcon}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => null, // Tidak ada ikon di kanan
          headerStyle: {
            backgroundColor: "#007bff", // Warna latar belakang header
          },
          headerTintColor: "white", // Warna teks dan ikon di header
        }}
      />
      <ScrollView style={styles.scrollViewContent}>
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
            2. Cucu laki-laki dari keturunan anak laki-laki seterusnya ke bawah
          </Text>
          <Text style={styles.listItem}>3. Ayah.</Text>
          <Text style={styles.listItem}>
            4. Kakek sahih (bapak dari ayah) dan laki-laki generasi di atasnya.
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

          {/* Ahli Waris Perempuan */}
          <Text style={styles.subSectionTitle}>Ahli Waris Perempuan</Text>
          <Text style={styles.paragraph}>
            Terdapat 10 ahli waris perempuan yang telah menjadi ijma’ para
            ulama, yaitu:
          </Text>
          <Text style={styles.listItem}>1. Anak perempuan.</Text>
          <Text style={styles.listItem}>
            2. Cucu perempuan dari keturunan anak laki-laki seterusnya ke bawah,
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

          {/* Pengelompokan Ahli Waris */}
          <Text style={styles.sectionTitle}>Pengelompokan Ahli Waris</Text>
          <Text style={styles.paragraph}>
            Terdapat empat kelompok ahli waris, berikut ini adalah penjelasannya
            :
          </Text>

          {/* Kelompok Ashab al-furudh */}
          <Text style={styles.subSectionTitle}>Kelompok Ashab al-furudh</Text>
          <Text style={styles.paragraph}>
            Yaitu kelompok ahli waris yang pertama kali diberi bagian harta
            warisan. Mereka adalah orang-orang yang telah ditentukan bagiannya
            dalam Al-Qur’an, as-Sunnah, dan ijma' secara tetap. Mereka berjumlah
            tujuh orang, yaitu:
          </Text>
          <Text style={styles.listItem}>1. Ibu</Text>
          <Text style={styles.listItem}>2. Saudara laki-laki seibu</Text>
          <Text style={styles.listItem}>3. Saudara perempuan seibu</Text>
          <Text style={styles.listItem}>4. Nenek dari ayah</Text>
          <Text style={styles.listItem}>5. Nenek dari ibu</Text>
          <Text style={styles.listItem}>6. Duda</Text>
          <Text style={styles.listItem}>7. Janda</Text>

          {/* Kelompok Ashabah */}
          <Text style={styles.subSectionTitle}>Kelompok Ashabah</Text>
          <Text style={styles.paragraph}>
            Yaitu kelompok ahli waris yang menerima sisa harta warisan setelah
            dibagikan kepada ashab al-furudh. Bahkan, jika ternyata tidak ada
            ashabul furudh serta ahli waris lainnya, ia berhak mengambil seluruh
            harta peninggalan yang ada. Begitu juga, jika harta waris yang ada
            sudah habis dibagikan kepada ashabul furudh, maka merekapun tidak
            mendapat bagian
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

          {/* Kelompok Ashab al-furudh atau Ashabah */}
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

          {/* Kelompok Ashab al-furudh dan Ashabah */}
          <Text style={styles.subSectionTitle}>
            Kelompok Ashab al-furudh dan Ashabah
          </Text>
          <Text style={styles.paragraph}>
            Yaitu kelompok ahli waris yang pada kondisi tertentu bisa menjadi
            ashab al-furudh, bisa juga menjadi ashabah, dan bisa juga sebagai
            gabungan dari keduanya, yaitu sebagai ashab al-furudh dan ashabah
            secara sekaligus dalam satu waktu, hal itu tergantung dengan kondisi
            yang menjadi syarat utamanya. Mereka adalah :
          </Text>
          <Text style={styles.listItem}>1. Ayah</Text>
          <Text style={styles.listItem}>2. Kakek (bapak dari ayah)</Text>
          <Text style={styles.paragraph}>
            Hal ini terjadi karena semua ahli waris dari kelompok ashab alfurudh
            yang ada sudah menerima bagiannya, namun masih ada harta waris yang
            tersisa, sedangkan di sana tidak ada ashabah yang lain, maka sisanya
            diberikan kepada kelompok ini.
          </Text>
        </View>
      </ScrollView>
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
