// app/kalkulator/nilai_harta.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router"; // Import useRouter and useLocalSearchParams
import { Ionicons } from "@expo/vector-icons";

const EstimasiHartaScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams(); // Mengambil parameter dari rute sebelumnya
  const ahliWarisData = JSON.parse((params.ahliWarisData as string) || "{}"); // Mengambil data ahli waris dari params

  const [nilaiHarta, setNilaiHarta] = useState(""); // State untuk nilai harta

  // Fungsi untuk memformat angka menjadi format mata uang Rupiah
  const formatRupiah = (angka: string) => {
    let number_string = angka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return "Rp " + rupiah;
  };

  // Fungsi untuk membersihkan format Rupiah menjadi angka murni
  const unformatRupiah = (formattedValue: string) => {
    return formattedValue.replace(/[^0-9]/g, ""); // Hapus semua karakter selain angka
  };

  const handleInputChange = (text: string) => {
    const unformatted = unformatRupiah(text);
    setNilaiHarta(formatRupiah(unformatted));
  };

  const handleAmbilHasil = async () => {
    const totalHartaBersih = parseFloat(unformatRupiah(nilaiHarta));

    if (isNaN(totalHartaBersih) || totalHartaBersih <= 0) {
      Alert.alert(
        "Input Invalid",
        "Mohon masukkan nilai harta yang valid (angka positif)."
      );
      return;
    }

    // Gabungkan data ahli waris dari screen sebelumnya dengan nilai harta ini
    const dataUntukKalkulasi = {
      ...ahliWarisData, // Data ahli waris dari screen sebelumnya
      total_harta: totalHartaBersih, // Nilai harta bersih
    };

    try {
      // Ganti dengan URL API Python Anda
      const response = await fetch(
        "http://192.168.1.25:5000/calculate_faraid",
        {
          // Ganti dengan IP lokal atau domain server Anda
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUntukKalkulasi),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Hasil Perhitungan Faraid Akhir:", result);

      // Tampilkan hasil kepada pengguna (misalnya, di halaman baru atau dalam alert)
      Alert.alert("Hasil Perhitungan Faraid", JSON.stringify(result, null, 2));

      // Opsional: navigasi ke halaman hasil

      // Navigasi ke halaman hasil
      router.push(
        `/kalkulator3?faraidResult=${encodeURIComponent(
          JSON.stringify(result)
        )}`
      );
    } catch (error) {
      console.error("Error saat mengambil hasil Faraid:", error);
      Alert.alert(
        "Error",
        "Gagal mendapatkan hasil perhitungan Faraid. Silakan coba lagi."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f2f5" />
      <Stack.Screen
        options={{
          title: "Kalkulator Faraid",
          headerShown: true, // Pastikan header ditampilkan
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.headerIcon}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => null, // Tidak ada ikon di kanan jika hanya ada panah kembali
          headerStyle: {
            backgroundColor: "#007bff", // Background biru tua untuk header
          },
          headerTintColor: "white", // Warna teks dan ikon di header
        }}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarFilled}></View>
          <View style={styles.progressBarEmpty}></View>
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.title}>Nilai Harta</Text>
          <Text style={styles.description}>
            Identifikasi nilai estimasi dari aset yang Anda miliki (aset
            bergerak dan tidak bergerak) seperti:
          </Text>
          <Text style={styles.bulletPoint}>• Tabungan dan investasi</Text>
          <Text style={styles.bulletPoint}>• Rumah dan tanah</Text>
          <Text style={styles.bulletPoint}>• Saham perusahaan</Text>
          <Text style={styles.bulletPoint}>• Kendaraan</Text>
          <Text style={styles.bulletPoint}>• Aset lainnya</Text>

          <Text style={styles.inputLabel}>
            Perkiraan nilai aset (dalam IDR)
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Rp 1.000.000"
            keyboardType="numeric" // Memastikan hanya angka yang muncul di keyboard
            value={nilaiHarta}
            onChangeText={handleInputChange}
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.button} onPress={handleAmbilHasil}>
            <Text style={styles.buttonText}>Ambil Hasil</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#007bff", // Warna latar belakang header
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5", // Latar belakang utama aplikasi
    paddingHorizontal: 20,
    paddingTop: 0, // No extra padding needed here
  },
  headerIcon: {
    padding: 10,
    // Adjust padding to align with native back button if necessary
  },
  progressBarContainer: {
    flexDirection: "row",
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)", // Warna kosong progress bar
    marginHorizontal: 20, // Sesuaikan dengan padding horizontal parent jika berbeda
    marginTop: 10, // Margin dari bawah header
    marginBottom: 20, // Margin ke content card
    overflow: "hidden", // Pastikan progress bar tidak meluber
  },
  progressBarFilled: {
    width: "60%", // Contoh: 60% progress (sesuaikan sesuai langkah)
    backgroundColor: "#FFA500", // Warna orange untuk progress bar
    borderRadius: 4,
  },
  progressBarEmpty: {
    flex: 1, // Sisa ruang
    backgroundColor: "transparent",
  },
  contentCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    marginTop: -10, // Sedikit overlap dengan area biru di atas
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1, // Memastikan card mengisi sisa ruang
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#555",
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
    marginLeft: 10, // Indent for bullet points
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    marginTop: 20,
    marginBottom: 8,
  },
  textInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    color: "#333",
    textAlign: "left",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 40, // Increased margin from input
    // position: 'absolute', // Bisa jadi absolute untuk fixed di bawah
    // bottom: 20,
    // left: 20,
    // right: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EstimasiHartaScreen;
