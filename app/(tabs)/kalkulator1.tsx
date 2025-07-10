// app/kalkulator/index.tsx (atau nama file lain di dalam folder kalkulator Anda)

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  ScrollView, // Tambahkan ScrollView untuk konten yang bisa di-scroll
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { Stack, useRouter } from "expo-router"; // Import Stack untuk konfigurasi header
import { Ionicons, Feather } from "@expo/vector-icons"; // Untuk ikon header

const KalkulatorFaraidScreen: React.FC = () => {
  const router = useRouter();

  // State untuk setiap input ahli waris
  const [jenisKelaminPewaris, setJenisKelaminPewaris] = useState("Laki-laki");
  const [statusPernikahan, setStatusPernikahan] = useState("Menikah");
  const [jumlahIstri, setJumlahIstri] = useState("1");
  const [ayahHidup, setAyahHidup] = useState("Hidup");
  const [ibuHidup, setIbuHidup] = useState("Meninggal");
  const [anakLakiLaki, setAnakLakiLaki] = useState("2");
  const [anakPerempuan, setAnakPerempuan] = useState("1");
  const [cucuLakiLaki, setCucuLakiLaki] = useState("0");
  const [cucuPerempuan, setCucuPerempuan] = useState("0");
  // Tambahkan state untuk ahli waris lainnya sesuai kebutuhan UI Anda
  const [suamiHidup, setSuamiHidup] = useState("Meninggal"); // Jika pewaris perempuan
  const [kakekHidup, setKakekHidup] = useState("Meninggal");
  const [nenekHidup, setNenekHidup] = useState("Meninggal");
  const [saudaraKandungLk, setSaudaraKandungLk] = useState("0");
  const [saudaraKandungPr, setSaudaraKandungPr] = useState("0");
  const [saudaraSebapakLk, setSaudaraSebapakLk] = useState("0");
  const [saudaraSebapakPr, setSaudaraSebapakPr] = useState("0");
  const [saudaraSeibuLk, setSaudaraSeibuLk] = useState("0");
  const [saudaraSeibuPr, setSaudaraSeibuPr] = useState("0");
  const [pamanKandung, setPamanKandung] = useState("0");
  const [pamanSebapak, setPamanSebapak] = useState("0");
  const [sepupuKandungLk, setSepupuKandungLk] = useState("0");
  const [sepupuSebapakLk, setSepupuSebapakLk] = useState("0");

  const handleLanjut = () => {
    // Kumpulkan semua data ahli waris dari state
    const ahliWarisData = {
      pewaris: {
        jenis_kelamin: jenisKelaminPewaris,
        status_pernikahan: statusPernikahan,
      },
      ahli_waris: {
        istri_jumlah: parseInt(jumlahIstri),
        ayah: ayahHidup === "Hidup" ? true : false,
        ibu: ibuHidup === "Hidup" ? true : false,
        anak_laki_laki_jumlah: parseInt(anakLakiLaki),
        anak_perempuan_jumlah: parseInt(anakPerempuan),
        cucu_laki_laki_jumlah: parseInt(cucuLakiLaki),
        cucu_perempuan_jumlah: parseInt(cucuPerempuan),
        suami: suamiHidup === "Hidup" ? true : false,
        kakek: kakekHidup === "Hidup" ? true : false,
        nenek: nenekHidup === "Hidup" ? true : false,
        saudara_kandung_lk_jumlah: parseInt(saudaraKandungLk),
        saudara_kandung_pr_jumlah: parseInt(saudaraKandungPr),
        saudara_sebapak_lk_jumlah: parseInt(saudaraSebapakLk),
        saudara_sebapak_pr_jumlah: parseInt(saudaraSebapakPr),
        saudara_seibu_lk_jumlah: parseInt(saudaraSeibuLk),
        saudara_seibu_pr_jumlah: parseInt(saudaraSeibuPr),
        paman_kandung_jumlah: parseInt(pamanKandung),
        paman_sebapak_jumlah: parseInt(pamanSebapak),
        sepupu_kandung_lk_jumlah: parseInt(sepupuKandungLk),
        sepupu_sebapak_lk_jumlah: parseInt(sepupuSebapakLk),
        // ... tambahkan ahli waris lainnya di sini
      },
    };

    // Navigasi ke halaman Nilai Harta dan kirim data ahli waris sebagai parameter
    router.push({
      pathname: "/kalkulator2",
      params: {
        ahliWarisData: JSON.stringify(ahliWarisData), // Ubah objek menjadi string JSON
      },
    });

    // Hapus bagian fetch API dari sini, karena fetch akan dilakukan di halaman nilai_harta.tsx
    // try {
    //   const response = await fetch("http://192.168.1.23:5000", { ... });
    //   ...
    // } catch (error) {
    //   ...
    // }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#007bff" />
      {/* Konfigurasi Header untuk halaman ini */}
      <Stack.Screen
        options={{
          title: "Kalkulator Faraid", // Judul di tengah header
          headerShown: true, // Pastikan header ditampilkan
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => null, // Tidak ada ikon di kanan
          headerStyle: {
            backgroundColor: "#007bff", // Background biru tua untuk header
          },
          headerTintColor: "white", // Warna teks dan ikon di header
        }}
      />

      {/* Progress Bar (sesuaikan progressnya) */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFilled}></View>
        <View style={styles.progressBarEmpty}></View>
      </View>

      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.contentCard}>
          <Text style={styles.title}>Ahli Waris</Text>
          <Text style={styles.description}>
            *Syarat untuk menjadi ahli ahli waris adalah memiliki hubungan darah
            atau pernikahan, dan beragama Islam
          </Text>

          {/* Bagian input form Anda */}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Jenis Kelamin Pewaris</Text>
            <Picker
              selectedValue={jenisKelaminPewaris}
              style={styles.picker}
              onValueChange={(itemValue: string) =>
                setJenisKelaminPewaris(itemValue)
              }
            >
              <Picker.Item label="Laki-laki" value="Laki-laki" />
              <Picker.Item label="Perempuan" value="Perempuan" />
            </Picker>
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Status Pernikahan</Text>
            <Picker
              selectedValue={statusPernikahan}
              style={styles.picker}
              onValueChange={(itemValue: string) =>
                setStatusPernikahan(itemValue)
              }
            >
              <Picker.Item label="Menikah" value="Menikah" />
              <Picker.Item label="Belum Menikah" value="Belum Menikah" />
            </Picker>
          </View>

          {/* Tampilkan input Istri hanya jika pewaris Laki-laki dan Menikah */}
          {jenisKelaminPewaris === "Laki-laki" &&
            statusPernikahan === "Menikah" && (
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Istri</Text>
                <Picker
                  selectedValue={jumlahIstri}
                  style={styles.picker}
                  onValueChange={(itemValue: string) =>
                    setJumlahIstri(itemValue)
                  }
                >
                  {[0, 1, 2, 3, 4].map((num) => (
                    <Picker.Item
                      key={num}
                      label={num.toString()}
                      value={num.toString()}
                    />
                  ))}
                </Picker>
              </View>
            )}

          {/* Tampilkan input Suami hanya jika pewaris Perempuan dan Menikah */}
          {jenisKelaminPewaris === "Perempuan" &&
            statusPernikahan === "Menikah" && (
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Suami</Text>
                <Picker
                  selectedValue={suamiHidup}
                  style={styles.picker}
                  onValueChange={(itemValue: string) =>
                    setSuamiHidup(itemValue)
                  }
                >
                  <Picker.Item label="Hidup" value="Hidup" />
                  <Picker.Item label="Meninggal" value="Meninggal" />
                </Picker>
              </View>
            )}

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Ayah</Text>
            <Picker
              selectedValue={ayahHidup}
              style={styles.picker}
              onValueChange={(itemValue: string) => setAyahHidup(itemValue)}
            >
              <Picker.Item label="Hidup" value="Hidup" />
              <Picker.Item label="Meninggal" value="Meninggal" />
            </Picker>
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Ibu</Text>
            <Picker
              selectedValue={ibuHidup}
              style={styles.picker}
              onValueChange={(itemValue: string) => setIbuHidup(itemValue)}
            >
              <Picker.Item label="Hidup" value="Hidup" />
              <Picker.Item label="Meninggal" value="Meninggal" />
            </Picker>
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Anak Laki-laki</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={anakLakiLaki}
              onChangeText={setAnakLakiLaki}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Anak Perempuan</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={anakPerempuan}
              onChangeText={setAnakPerempuan}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>
              Cucu Laki-laki (dari anak laki-laki)
            </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={cucuLakiLaki}
              onChangeText={setCucuLakiLaki}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>
              Cucu Perempuan (dari anak laki-laki)
            </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={cucuPerempuan}
              onChangeText={setCucuPerempuan}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Kakek</Text>
            <Picker
              selectedValue={kakekHidup}
              style={styles.picker}
              onValueChange={(itemValue: string) => setKakekHidup(itemValue)}
            >
              <Picker.Item label="Hidup" value="Hidup" />
              <Picker.Item label="Meninggal" value="Meninggal" />
            </Picker>
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Nenek</Text>
            <Picker
              selectedValue={nenekHidup}
              style={styles.picker}
              onValueChange={(itemValue: string) => setNenekHidup(itemValue)}
            >
              <Picker.Item label="Hidup" value="Hidup" />
              <Picker.Item label="Meninggal" value="Meninggal" />
            </Picker>
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Saudara Kandung Laki-laki</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={saudaraKandungLk}
              onChangeText={setSaudaraKandungLk}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Saudara Kandung Perempuan</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={saudaraKandungPr}
              onChangeText={setSaudaraKandungPr}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Saudara Sebapak Laki-laki</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={saudaraSebapakLk}
              onChangeText={setSaudaraSebapakLk}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Saudara Sebapak Perempuan</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={saudaraSebapakPr}
              onChangeText={setSaudaraSebapakPr}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Saudara Seibu Laki-laki</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={saudaraSeibuLk}
              onChangeText={setSaudaraSeibuLk}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Saudara Seibu Perempuan</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={saudaraSeibuPr}
              onChangeText={setSaudaraSeibuPr}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Paman Kandung</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={pamanKandung}
              onChangeText={setPamanKandung}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Paman Sebapak</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={pamanSebapak}
              onChangeText={setPamanSebapak}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Sepupu Kandung Laki-laki</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={sepupuKandungLk}
              onChangeText={setSepupuKandungLk}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Sepupu Sebapak Laki-laki</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={sepupuSebapakLk}
              onChangeText={setSepupuSebapakLk}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLanjut}>
            <Text style={styles.buttonText}>Lanjut</Text>
          </TouchableOpacity>
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
  progressBarContainer: {
    flexDirection: "row",
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)", // Warna kosong progress bar
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressBarFilled: {
    width: "30%", // Contoh: 30% progress untuk langkah pertama
    backgroundColor: "#FFA500", // Warna orange untuk progress bar
    borderRadius: 4,
  },
  progressBarEmpty: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollViewContent: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  contentCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    marginTop: -10, // Sedikit overlap dengan area biru di atas
    marginHorizontal: 20, // Sesuaikan dengan padding horizontal parent jika berbeda
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    flex: 2,
  },
  picker: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default KalkulatorFaraidScreen;
