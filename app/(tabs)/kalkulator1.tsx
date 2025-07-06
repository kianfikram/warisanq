// Contoh bagian dari KalkulatorFaraidScreen.tsx atau index.tsx di tab kalkulator Anda

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

// ... (komponen Header, StatusBar, dll. yang relevan dengan UI Anda)

const KalkulatorFaraidScreen: React.FC = () => {
  const [jenisKelaminPewaris, setJenisKelaminPewaris] = useState("Laki-laki");
  const [statusPernikahan, setStatusPernikahan] = useState("Menikah");
  const [jumlahIstri, setJumlahIstri] = useState("1"); // Contoh default
  const [ayahHidup, setAyahHidup] = useState("Hidup");
  const [ibuHidup, setIbuHidup] = useState("Meninggal");
  const [anakLakiLaki, setAnakLakiLaki] = useState("2");
  const [anakPerempuan, setAnakPerempuan] = useState("1");
  const [cucuLakiLaki, setCucuLakiLaki] = useState("0");
  const [cucuPerempuan, setCucuPerempuan] = useState("0");

  const handleLanjut = async () => {
    const dataInput = {
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
      },
      // ... tambahkan input lain sesuai kebutuhan
    };

    try {
      // Ganti dengan URL API Python Anda
      const response = await fetch("http://192.168.1.23:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataInput),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Hasil Perhitungan Faraid:", result);
      // Di sini Anda akan mengupdate UI untuk menampilkan hasil perhitungan
      Alert.alert("Hasil Perhitungan", JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("Error saat menghitung Faraid:", error);
      Alert.alert("Error", "Gagal menghitung Faraid. Silakan coba lagi.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ahli Waris</Text>
      <Text style={styles.description}>
        *Syarat untuk menjadi ahli ahli waris adalah memiliki hubungan darah
        atau pernikahan, dan beragama Islam
      </Text>

      {/* Bagian input form Anda (menggunakan Picker dan TextInput) */}
      {/* Ini hanya contoh struktur, Anda perlu mengimplementasikan setiap baris input dari gambar */}
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
        <Text style={styles.inputLabel}>Istri</Text>
        <Picker
          selectedValue={jumlahIstri}
          style={styles.picker}
          onValueChange={(itemValue: string) => setJumlahIstri(itemValue)}
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

      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Anak Laki-laki</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          value={anakLakiLaki}
          onChangeText={setAnakLakiLaki}
        />
      </View>
      {/* ... tambahkan baris input lainnya ... */}

      <TouchableOpacity style={styles.button} onPress={handleLanjut}>
        <Text style={styles.buttonText}>Lanjut</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    padding: 20,
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
