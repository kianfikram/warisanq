// app/kalkulator/nilai_harta.tsx

import React, { useState, useEffect } from "react";
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
  ScrollView, // Import ScrollView
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Data untuk jenis-jenis harta beserta penjelasan dan contoh
const assetTypes = [
  {
    key: "tanahBangunan",
    label: "Tanah / Bangunan",
    description:
      "Nilai properti berupa tanah, rumah, apartemen, atau bangunan lainnya.",
    example: "Contoh: Rumah tinggal, tanah kosong, ruko.",
  },
  {
    key: "alatTransportasiMesin",
    label: "Alat Transportasi / Mesin",
    description: "Nilai kendaraan pribadi, alat berat, atau mesin produksi.",
    example: "Contoh: Mobil, motor, truk, alat berat, mesin pabrik.",
  },
  {
    key: "hartaBergerakLainnya",
    label: "Harta Bergerak Lainnya",
    description:
      "Aset yang dapat dipindahkan selain alat transportasi dan mesin.",
    example: "Contoh: Perhiasan, barang antik, koleksi seni, hewan ternak.",
  },
  {
    key: "suratBerharga",
    label: "Surat Berharga",
    description:
      "Investasi dalam bentuk dokumen kepemilikan atau janji pembayaran.",
    example: "Contoh: Saham, obligasi, reksa dana, deposito berjangka.",
  },
  {
    key: "kasSetaraKas",
    label: "Kas / Setara Kas",
    description: "Uang tunai atau aset yang sangat likuid dan mudah dicairkan.",
    example:
      "Contoh: Uang tunai di dompet, saldo rekening bank, tabungan giro.",
  },
  {
    key: "hartaLainnya",
    label: "Harta Lainnya",
    description: "Aset lain yang tidak termasuk dalam kategori di atas.",
    example:
      "Contoh: Piutang (tagihan yang belum tertagih), hak paten, royalti.",
  },
];

const EstimasiHartaScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const ahliWarisData = JSON.parse((params.ahliWarisData as string) || "{}");

  // State untuk setiap jenis harta
  const [assetValues, setAssetValues] = useState<{ [key: string]: string }>({});
  const [totalHartaBersih, setTotalHartaBersih] = useState(0);

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

  // Handler perubahan input untuk setiap jenis harta
  const handleAssetInputChange = (key: string, text: string) => {
    const unformatted = unformatRupiah(text);
    setAssetValues((prev) => ({
      ...prev,
      [key]: formatRupiah(unformatted),
    }));
  };

  // Efek untuk menghitung total harta bersih setiap kali assetValues berubah
  useEffect(() => {
    let sum = 0;
    for (const key in assetValues) {
      sum += parseFloat(unformatRupiah(assetValues[key] || "0"));
    }
    setTotalHartaBersih(sum);
  }, [assetValues]);

  const handleAmbilHasil = async () => {
    if (totalHartaBersih <= 0) {
      Alert.alert(
        "Input Invalid",
        "Total nilai harta harus lebih dari Rp 0. Mohon masukkan nilai harta yang valid."
      );
      return;
    }

    const dataUntukKalkulasi = {
      ...ahliWarisData,
      total_harta: totalHartaBersih,
    };

    try {
      const response = await fetch(
        "http://192.168.1.25:5000/calculate_faraid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUntukKalkulasi),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Respons error dari API:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}. Detail: ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Hasil Perhitungan Faraid Akhir:", result);

      router.push({
        pathname: "/kalkulator/kalkulator3",
        params: { faraidResult: JSON.stringify(result) },
      });
    } catch (error: any) {
      console.error("Error saat mengambil hasil Faraid:", error);
      Alert.alert(
        "Error",
        `Gagal mendapatkan hasil perhitungan Faraid. Detail: ${error.message}`
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
              style={styles.headerIconContainer}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => null,
          headerStyle: styles.headerStyle,
          headerTintColor: "white",
        }}
      />

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFilled}></View>
        <View style={styles.progressBarEmpty}></View>
      </View>

      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.contentCard}>
          <Text style={styles.title}>Nilai Harta</Text>
          <Text style={styles.description}>
            Identifikasi nilai estimasi dari aset yang Anda miliki (aset
            bergerak dan tidak bergerak) seperti:
          </Text>

          {/* Input untuk setiap jenis harta */}
          {assetTypes.map((asset) => (
            <View key={asset.key} style={styles.assetInputContainer}>
              <Text style={styles.assetLabel}>{asset.label}</Text>
              <Text style={styles.assetDescription}>{asset.description}</Text>
              <Text style={styles.assetExample}>{asset.example}</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Rp 0"
                keyboardType="numeric"
                value={assetValues[asset.key]}
                onChangeText={(text) => handleAssetInputChange(asset.key, text)}
                placeholderTextColor="#999"
              />
            </View>
          ))}

          {/* Kolom Jumlah Total Harta */}
          <View style={styles.totalHartaContainer}>
            <Text style={styles.totalHartaLabel}>Jumlah Total Harta</Text>
            <Text style={styles.totalHartaValue}>
              {formatRupiah(totalHartaBersih.toString())}
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleAmbilHasil}>
            <Text style={styles.buttonText}>Ambil Hasil</Text>
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
  headerStyle: {
    backgroundColor: "#FF8C00", // <--- PERUBAHAN: Warna latar belakang header menjadi oranye
  },
  headerIconContainer: {
    padding: 10,
    marginLeft: Platform.OS === "ios" ? 0 : 5,
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
    width: "60%",
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
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  assetInputContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 15,
  },
  assetLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  assetDescription: {
    fontSize: 13,
    color: "#666",
    marginBottom: 3,
  },
  assetExample: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
    marginBottom: 10,
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
  totalHartaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: "#f0f0f0",
  },
  totalHartaLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalHartaValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff", // Warna biru untuk total harta
  },
  button: {
    backgroundColor: "#FF8C00",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EstimasiHartaScreen;
