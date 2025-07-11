// app/kalkulator/hasil.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  Platform, // Import Platform for OS-specific styles
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const HasilFaraidScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [faraidResult, setFaraidResult] = useState<any>(null); // State untuk menyimpan hasil Faraid

  useEffect(() => {
    if (params.faraidResult) {
      try {
        const result = JSON.parse(params.faraidResult as string);
        setFaraidResult(result);
      } catch (error: any) {
        // Explicitly type error as any for message property
        console.error("Error parsing faraidResult:", error);
        Alert.alert(
          "Error",
          `Gagal memuat hasil perhitungan. Detail: ${error.message}`
        );
        setFaraidResult(null);
      }
    } else {
      Alert.alert("Info", "Tidak ada data hasil perhitungan.");
      router.back(); // Kembali jika tidak ada data
    }
  }, [params.faraidResult]);

  // Fungsi untuk memformat angka menjadi format mata uang Rupiah
  const formatRupiah = (angka: number) => {
    if (isNaN(angka)) return "Rp 0";
    const reverse = angka.toString().split("").reverse().join("");
    const ribuan = reverse.match(/\d{1,3}/g);
    const result = ribuan?.join(".").split("").reverse().join("");
    return "Rp " + result;
  };

  if (!faraidResult) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Memuat hasil...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* PERUBAHAN: Warna status bar sesuai header */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={styles.headerStyle.backgroundColor}
      />
      <Stack.Screen
        options={{
          title: "Kalkulator Faraid",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.headerIconContainer} // Menggunakan container untuk padding
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => null,
          headerStyle: styles.headerStyle, // Menggunakan style dari StyleSheet
          headerTintColor: "white",
        }}
      />
      {/* Progress Bar (sesuaikan progressnya, mungkin 100% di sini) */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFilled}></View>
        <View style={styles.progressBarEmpty}></View>
      </View>

      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.contentCard}>
          <Text style={styles.title}>Hasil</Text>

          {/* Tabel Hasil */}
          <View style={styles.table}>
            {/* Header Tabel */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeader, styles.columnAhliWaris]}>
                Ahli Waris
              </Text>
              <Text style={[styles.tableHeader, styles.columnBgFaraid]}>
                Bg. Faraid
              </Text>
              <Text style={[styles.tableHeader, styles.columnBgDihitung]}>
                Bg. Dihitung
              </Text>
              <Text style={[styles.tableHeader, styles.columnNilai]}>
                Nilai
              </Text>
            </View>

            {/* Baris Data */}
            {faraidResult.distribusi_ahli_waris &&
            faraidResult.distribusi_ahli_waris.length > 0 ? (
              faraidResult.distribusi_ahli_waris.map(
                (item: any, index: number) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.columnAhliWaris]}>
                      {item.ahli_waris}
                    </Text>
                    <Text style={[styles.tableCell, styles.columnBgFaraid]}>
                      {item.bagian_fraksi}
                    </Text>
                    <Text style={[styles.tableCell, styles.columnBgDihitung]}>
                      {item.bagian_dihitung || "-"}
                    </Text>
                    <Text style={[styles.tableCell, styles.columnNilai]}>
                      {formatRupiah(item.jumlah_harta)}
                    </Text>
                  </View>
                )
              )
            ) : (
              <Text style={styles.noDataText}>
                Tidak ada ahli waris yang berhak.
              </Text>
            )}

            {/* Tampilkan sisa harta jika ada */}
            {faraidResult.sisa_harta_akhir > 0 && (
              <View style={styles.tableRow}>
                <Text
                  style={[
                    styles.tableCell,
                    styles.columnAhliWaris,
                    { fontWeight: "bold" },
                  ]}
                >
                  Sisa Harta
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.columnBgFaraid,
                    { fontWeight: "bold" },
                  ]}
                >
                  -
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.columnBgDihitung,
                    { fontWeight: "bold" },
                  ]}
                >
                  -
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.columnNilai,
                    { fontWeight: "bold" },
                  ]}
                >
                  {formatRupiah(faraidResult.sisa_harta_akhir)}
                </Text>
              </View>
            )}
          </View>

          {/* Tombol Simpan Hasil (DIHAPUS) */}
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Alert.alert(
                "Info",
                "Fungsi Simpan Hasil belum diimplementasikan."
              )
            }
          >
            <Text style={styles.buttonText}>Simpan Hasil</Text>
          </TouchableOpacity> */}

          {/* PERUBAHAN: Tombol Kembali navigasi ke index */}
          <TouchableOpacity
            style={styles.button} // Menggunakan style button utama
            onPress={() => router.push("/")} // Navigasi ke halaman utama
          >
            <Text style={styles.buttonText}>Kembali ke Utama</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FF8C00", // <--- PERUBAHAN: Warna latar belakang header menjadi oranye
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  loadingText: {
    fontSize: 18,
    color: "#555",
  },
  headerIcon: {
    // Ini adalah style lama, tidak digunakan lagi secara langsung oleh headerLeft
    padding: 10,
  },
  headerIconContainer: {
    // <--- PENAMBAHAN: Container untuk ikon panah kembali
    padding: 10,
    marginLeft: Platform.OS === "ios" ? 0 : 5, // Sedikit penyesuaian margin untuk Android
  },
  headerStyle: {
    // <--- PENAMBAHAN: Definisi gaya header
    backgroundColor: "#FF8C00", // <--- PERUBAHAN: Warna latar belakang header menjadi oranye
  },
  progressBarContainer: {
    flexDirection: "row",
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressBarFilled: {
    width: "100%", // 100% progress di halaman hasil
    backgroundColor: "#007bff", // <--- PERUBAHAN: Warna progress bar menjadi biru
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
    marginTop: -10,
    marginHorizontal: 20,
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
    marginBottom: 20,
    textAlign: "center",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontWeight: "bold",
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  tableCell: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#eee",
  },
  columnAhliWaris: {
    flex: 2, // Lebar relatif untuk kolom Ahli Waris
  },
  columnBgFaraid: {
    flex: 1.2, // Lebar relatif untuk kolom Bg. Faraid
  },
  columnBgDihitung: {
    flex: 1.5, // Lebar relatif untuk kolom Bg. Dihitung
  },
  columnNilai: {
    flex: 2.5, // Lebar relatif untuk kolom Nilai
    borderRightWidth: 0, // Tidak ada border di kolom terakhir
  },
  noDataText: {
    textAlign: "center",
    padding: 20,
    color: "#666",
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#FF8C00",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderColor: "#007bff",
    borderWidth: 1,
    marginTop: 10,
  },
  secondaryButtonText: {
    color: "#007bff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HasilFaraidScreen;
