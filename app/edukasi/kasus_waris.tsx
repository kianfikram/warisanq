// app/edukasi/kuis.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Animated, // For animation
  Dimensions, // To get screen width
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons"; // For icons
import EducationSidebar from "../../components/EducationSidebar"; // Adjust path if different

const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.7; // Sidebar width 70% of screen width

const KuisPembagianScreen: React.FC = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Animated.Value to control animation (0 = closed, 1 = open)
  const sidebarAnim = useRef(new Animated.Value(0)).current;

  // Function to open/close sidebar with animation
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    Animated.timing(sidebarAnim, {
      toValue: isSidebarOpen ? 0 : 1, // If open, to 0 (close); if closed, to 1 (open)
      duration: 300, // Animation duration 300ms
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  // Interpolation for main content X position (shifts right when sidebar opens)
  const mainContentTranslateX = sidebarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SIDEBAR_WIDTH], // Shift content by sidebar width
  });

  // Interpolation for main content scale (creates shrinking effect)
  const mainContentScale = sidebarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9], // From normal scale (1) to slightly smaller (0.9)
  });

  // Interpolation for main content border radius (creates rounded corners)
  const mainContentBorderRadius = sidebarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15], // From no radius to 15px
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#007bff" />

      {/* Sidebar (rendered behind main content, appears when isSidebarOpen true) */}
      {isSidebarOpen && <EducationSidebar onClose={toggleSidebar} />}

      {/* Main Content (Animated) */}
      <Animated.View
        style={[
          styles.mainContentWrapper,
          {
            transform: [
              { translateX: mainContentTranslateX },
              { scale: mainContentScale },
            ],
            borderRadius: mainContentBorderRadius,
            overflow: "hidden", // Important for borderRadius to be visible
          },
        ]}
      >
        {/* Header Configuration for this page */}
        <Stack.Screen
          options={{
            title: "Kuis Pembagian Warisan", // Title in the center of the header
            headerShown: true,
            headerLeft: () => (
              // Button to open sidebar (hamburger menu icon)
              <TouchableOpacity
                onPress={toggleSidebar}
                style={styles.headerIcon}
              >
                <Feather name="menu" size={24} color="white" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              // Back button (arrow)
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.headerIcon}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: "#007bff", // Header background color
            },
            headerTintColor: "white", // Header text and icon color
          }}
        />
        {/* Scrollable Content */}
        <ScrollView style={styles.scrollViewContent}>
          <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>
              Contoh Kasus Pembagian Warisan
            </Text>

            {/* Soal 1 */}
            <Text style={styles.subSectionTitle}>Soal 1 :</Text>
            <Text style={styles.paragraph}>
              Seorang laki-laki meninggal dunia dengan meninggalkan seorang
              istri, 1 orang anak laki-laki dan 1 orang anak perempuan dari anak
              laki-laki.
            </Text>
            <Text style={styles.subSectionTitle}>Jawab :</Text>
            <Text style={styles.paragraph}>
              Cucu perempuan : hajb (terhalang) karena adanya anak laki-laki
            </Text>
            <Text style={styles.paragraph}>
              Istri : 1/8 karena terdapat anak dan cucu. Sisa 7/8 untuk anak
              laki-laki.
            </Text>
            <Text style={styles.paragraph}>(note: tabel)</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, { flex: 2 }]}>
                  Ahli waris
                </Text>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>Bagian</Text>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>AM/PM</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>janda</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>1/8</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>8</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  anak laki-laki
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Sisa (7/8)
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  cucu perempuan
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>terhalang</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
              </View>
              <View style={styles.tableRow}>
                <Text
                  style={[styles.tableCell, { flex: 2, fontWeight: "bold" }]}
                >
                  JUMLAH
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1.5, fontWeight: "bold" }]}
                >
                  8/8
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1.5, fontWeight: "bold" }]}
                >
                  -
                </Text>
              </View>
            </View>

            {/* Soal 2 */}
            <Text style={styles.subSectionTitle}>Soal 2 :</Text>
            <Text style={styles.paragraph}>
              Seorang laki-laki meninggal dunia dan meninggalkan 1 anak
              perempuan dan seorang ayah.
            </Text>
            <Text style={styles.subSectionTitle}>Jawab :</Text>
            <Text style={styles.paragraph}>Ayah: 1/6 + 2/6 ‘ashabah</Text>
            <Text style={styles.paragraph}>
              Anak perempuan: 1/2 karena hanya satu, tidak ada anak laki-laki
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, { flex: 2 }]}>
                  Ahli waris
                </Text>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>Bagian</Text>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>AM/PM</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  anak perempuan
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>1/2</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>ayah</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  1/6 + sisa (2/6)
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
              </View>
              <View style={styles.tableRow}>
                <Text
                  style={[styles.tableCell, { flex: 2, fontWeight: "bold" }]}
                >
                  JUMLAH
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1.5, fontWeight: "bold" }]}
                >
                  6/6
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1.5, fontWeight: "bold" }]}
                >
                  -
                </Text>
              </View>
            </View>

            {/* Soal 3 */}
            <Text style={styles.subSectionTitle}>Soal 3 :</Text>
            <Text style={styles.paragraph}>
              Seorang pria meninggal dunia dan meninggalkan ayah, 1 anak
              perempuan, 1 anak laki-laki, 1 paman, 1 kakek, 1 anak perempuan
              dari anak laki-laki.
            </Text>
            <Text style={styles.subSectionTitle}>Jawab:</Text>
            <Text style={styles.paragraph}>Ayah : 1/6</Text>
            <Text style={styles.paragraph}>
              Kakek : hajb (terhalangi oleh ayah)
            </Text>
            <Text style={styles.paragraph}>
              Anak perempuan dari anak laki-laki : hajb (terhalangi oleh anak
              laki-laki)
            </Text>
            <Text style={styles.paragraph}>
              Paman : hajb (terhalang oleh anak laki-laki dan ayah)
            </Text>
            <Text style={styles.paragraph}>
              Anak laki-laki dan anak perempuan : sisa
            </Text>
            <Text style={styles.paragraph}>
              Anak perempuan : separuh dari laki-laki
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, { flex: 2 }]}>
                  Ahli waris
                </Text>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>Bagian</Text>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>AM/PM</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>ayah</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>1/6</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>6</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Kakek</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>terhalang</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak laki-laki dan anak perempuan
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Sisa (5/6)
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2.5 }]}>
                  2/3 x 5 = 10/3
                </Text>
                <Text style={[styles.tableCell, { flex: 2.5 }]}>
                  1/3 x 5 = 5/3
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Paman</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>terhalang</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak perempuan dari anak laki-laki
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>terhalang</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
              </View>
              <View style={styles.tableRow}>
                <Text
                  style={[styles.tableCell, { flex: 2, fontWeight: "bold" }]}
                >
                  JUMLAH
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1.5, fontWeight: "bold" }]}
                >
                  6/6
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1.5, fontWeight: "bold" }]}
                >
                  -
                </Text>
              </View>
            </View>

            {/* Soal 4 */}
            <Text style={styles.subSectionTitle}>Soal 4 :</Text>
            <Text style={styles.paragraph}>
              Seseorang meninggal dunia dan hanya meninggalkan ahli waris
              sebagai berikut:
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, { flex: 2 }]}>
                  Ahli Waris
                </Text>
                <Text style={[styles.tableHeader, { flex: 1 }]}>Jumlah</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Suami</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Ayah</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak laki-laki
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Cucu laki-laki dari anak laki-laki
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Kakek sahih (bapak dari ayah )
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Saudara laki-laki sekandung
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Saudara laki-laki seayah
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Saudara laki-laki seibu
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak laki-laki dari saudara laki-laki sekandung
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak laki-laki dari saudara laki-laki seayah
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak laki-laki dari saudara laki-laki seibu
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Paman sekandung
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Paman seayah
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak laki-laki dari paman sekandung
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak laki-laki dari paman seayah
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
              </View>
            </View>
            <Text style={styles.subSectionTitle}>Jawab :</Text>
            <Text style={styles.paragraph}>Tabel pembagian adalah :</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, { flex: 2 }]}>
                  Ahli Waris
                </Text>
                <Text style={[styles.tableHeader, { flex: 1 }]}>Bagian</Text>
                <Text style={[styles.tableHeader, { flex: 3 }]}>
                  Keterangan
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Suami</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1/4</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Mendapat hak waris secara fardh
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Ayah</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1/6</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Mendapat hak waris secara fardh
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak laki-laki
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>Sisanya</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Mendapat hak waris secara ashabah
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Cucu laki-laki dari anak laki-laki
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Terhalang karena adanya anak laki-laki
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Kakek sahih (bapak dari ayah )
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Terhalang karena adanya ayah
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Saudara laki-laki sekandung
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Terhalang karena adanya anak laki-laki dan ayah
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Saudara laki-laki seayah
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Terhalang karena adanya anak laki-laki dan ayah
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Saudara laki-laki seibu
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Terhalang karena adanya anak laki-laki dan ayah
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak laki-laki dari saudara laki-laki sekandung
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Terhalang karena adanya anak laki-laki dan ayah
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak laki-laki dari saudara laki-laki seayah
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Terhalang karena adanya anak laki-laki dan ayah
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak laki-laki dari saudara laki-laki seibu
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Terhalang karena adanya anak laki-laki dan ayah
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Paman sekandung
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Terhalang karena adanya anak laki-laki dan ayah
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Paman seayah
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Terhalang karena adanya anak laki-laki dan ayah
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak laki-laki dari paman sekandung
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Terhalang karena adanya anak laki-laki dan ayah
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak laki-laki dari paman seayah
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Terhalang karena adanya anak laki-laki dan ayah
                </Text>
              </View>
            </View>

            {/* Soal 5 */}
            <Text style={styles.subSectionTitle}>Soal 5 :</Text>
            <Text style={styles.paragraph}>
              Seseorang meninggal dunia dan hanya meninggalkan seorang anak
              laki-laki dan seorang anak perempuan serta mempunyai harta warisan
              setelah dikurangi dengan biaya pemakaman, pembayaran hutang dan
              penunaian wasiat adalah sebesar Rp.6.000.000, Berapakah bagian
              masing-masing ahli waris?
            </Text>
            <Text style={styles.paragraph}>
              Buku Daras : Hukum Kewarisan Islam | 109
            </Text>
            <Text style={styles.subSectionTitle}>Jawab :</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, { flex: 2 }]}>
                  Ahli waris
                </Text>
                <Text style={[styles.tableHeader, { flex: 1 }]}>Bagian</Text>
                <Text style={[styles.tableHeader, { flex: 2 }]}>Perolehan</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak laki-laki
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  2/3 x Rp.6.000.000
                </Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Rp.4.000.000
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak Perempuan
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  1/3 x Rp.6.000.000
                </Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Rp.2.000.000
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text
                  style={[styles.tableCell, { flex: 2, fontWeight: "bold" }]}
                >
                  JUMLAH
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1, fontWeight: "bold" }]}
                >
                  -
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 2, fontWeight: "bold" }]}
                >
                  Rp.6.000.000
                </Text>
              </View>
            </View>

            {/* Soal 2 (Duplicate in original text, treating as Soal 6 for clarity) */}
            <Text style={styles.subSectionTitle}>Soal 6 :</Text>
            <Text style={styles.paragraph}>
              Seseorang meninggal dunia meninggalkan ahli waris, seorang janda,
              anak laki-laki dan seorang saudara laki-laki sekandung. Ternyata
              pewaris tersebut wafat karena dibunuh oleh anak laki-lakinya
              tersebut. Maka berapakah bagian masing-masing ahli warisnya?
            </Text>
            <Text style={styles.subSectionTitle}>Jawab :</Text>
            <Text style={styles.paragraph}>
              Karena pembunuh tidak dapat mewarisi harta dari orang yang
              dibunuhnya, maka anak laki-lakinya tersebut menjadi terhalang
              untuk mendapatkan hak waris ayahnya, dan pewaris dianggap tidak
              memiliki anak laki-laki. Pembagiannya adalah sebagai berikut:
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, { flex: 2 }]}>
                  Ahli waris
                </Text>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>Bagian</Text>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>AM/PM</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Janda</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>1/4</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>4</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Saudara laki-laki sekandung
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>¾</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
              </View>
              <View style={styles.tableRow}>
                <Text
                  style={[styles.tableCell, { flex: 2, fontWeight: "bold" }]}
                >
                  JUMLAH
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1.5, fontWeight: "bold" }]}
                >
                  4/4
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1.5, fontWeight: "bold" }]}
                >
                  -
                </Text>
              </View>
            </View>

            {/* Soal (Another duplicate, treating as Soal 7) */}
            <Text style={styles.subSectionTitle}>Soal 7 :</Text>
            <Text style={styles.paragraph}>
              Seorang meninggal dunia dan meninggalkan ahli waris seorang Janda,
              2 orang anak laki-laki dan tiga orang anak perempuan, tirkah
              16.000.000.
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, { flex: 2 }]}>
                  Ahli waris
                </Text>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>Bagian</Text>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>
                  Perolehan
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Janda</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  1/8 x 8 = 1/8 x Rp.16.000.000
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Rp. 2.000.000
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Sisa</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Rp. 14.000.000
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  2 anak laki-laki
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Tiap anak =2/7 x 14.000.000
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Rp. 4.000.000
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  2 orang anak laki-laki
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Rp. 8.000.000
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  3 anak perempuan
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Tiap anak =1/7 x 14.000.000
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Rp. 2.000.000
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  3 orang anak perempuan
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Rp. 6.000.000
                </Text>
              </View>
            </View>

            {/* Soal 6 (Original text's Soal 6, now Soal 8) */}
            <Text style={styles.subSectionTitle}>Soal 8 :</Text>
            <Text style={styles.paragraph}>
              Seorang meninggal dunia dan meninggalkan ahli waris seorang Dua
              orang janda, 2 saudara laki-laki sekandung, dan 2 saudara
              perempuan sekandung, Tirkah Rp. 24.000.000.
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, { flex: 2 }]}>
                  Ahli waris
                </Text>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>Bagian</Text>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>
                  Perolehan
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  2 orang janda
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  ¼ x 4 = 1/4 x Rp. 24. 000.000
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Rp. 6.000.000
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  atau perorang
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Rp. 3.000.000
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  2 saudara laki-laki sekandung
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Ashabah 3/4 x Rp. 24. 000.000
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Rp.18.000.000
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  2 saudara perempuan sekandung
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Laki-laki</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  4/6 x Rp.18.000.000
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Rp. 4.500.000
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  atau perorang
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Rp. 2.250.000
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Perempuan</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  2/6 x Rp.18.000.000
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Rp. 1.500.000
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  atau perorang
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Rp. 7.000.000
                </Text>
              </View>
            </View>

            {/* Soal 7 (Original text's Soal 7, now Soal 9) */}
            <Text style={styles.subSectionTitle}>Soal 9 :</Text>
            <Text style={styles.paragraph}>
              Seseorang meninggal dunia dan meninggalkan ahli waris istri, anak
              perempuan, cucu perempuan dari anak laki-laki, nenek dari bapak,
              saudara laki-laki sekandung dan saudara laki-laki seayah.
              Berapakah bagian masing-masing ahli warisnya?
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, { flex: 2 }]}>
                  Ahli waris
                </Text>
                <Text style={[styles.tableHeader, { flex: 1 }]}>Bagian</Text>
                <Text style={[styles.tableHeader, { flex: 3 }]}>
                  Keterangan
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Istri</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1/8</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Mendapat hak waris secara fardh
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Anak perempuan
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1/2</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Mendapat hak waris secara fardh
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Cucu perempuan dari anak laki-laki
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1/6</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Karena pewaris hanya meninggalkan anak perempuan tunggal, dan
                  tidak ada cucu laki-laki dari anak laki-laki lainnya, maka ia
                  mendapatkan hak waris secara fardh, yakni 1/6 sebagai
                  penyempurna bagian anak perempuan (2/3). Lihat pembahasan
                  “Ahli waris dari kalangan perempuan yang dapat terkena hajb
                  hirman”.
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Nenek dari jalur ayah
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1/6</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Mendapat hak waris secara fardh. Lihat sub bab “Dalil-dalil
                  yang menetapkan ahli waris perempuan”.
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Saudara laki-laki sekandung
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>Sisa</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Mendapat hak waris secara ashabah
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  Saudara laki-laki seayah
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>-</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  Terhalang karena adanya saudara laki-laki sekandung
                </Text>
              </View>
            </View>

            {/* Soal 8 (Original text's Soal 8, now Soal 10) */}
            <Text style={styles.subSectionTitle}>Soal 10 :</Text>
            <Text style={styles.paragraph}>
              Telah mati seorang perempuan dengan meninggalkan seorang suami,
              dua orang saudara perempuan sekandung, dua orang saudara perempuan
              se-ibu, dan ibu. Masalah demikian dinamakan masalah Syuraihiyah,
              sebab si suami itu mencaci maki Syuraih, hakim yang terkenal itu,
              dimana si suami ini diberi bagian 3/10 oleh Syuraih, padahal
              seharusnya dia mendapatkan 5/10 (lihat tabel di bawah). Lalu dia
              mengelilingi kabilah-kabilah sambil mengatakan: "Syuraih tidak
              memberikan kepadaku separuh dan tidak pula sepertiga." Ketika
              Syuraih mengetahui hal itu, dia memanggilnya untuk menghadap, dan
              memberikan hukuman ta'zir kepadanya, kata Syuraih: "Engkau buruk
              bicara, dan menyembunyikan 'aul."
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, { flex: 2 }]}>
                  Ahli waris
                </Text>
                <Text style={[styles.tableHeader, { flex: 1 }]}>Bagian</Text>
                <Text style={[styles.tableHeader, { flex: 1 }]}>AM/PM</Text>
                <Text style={[styles.tableHeader, { flex: 1 }]}>Di‘aulkan</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Duda</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1/2</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>3/6</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>3/10</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  2 saudara perempuan sekandung
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>2/3</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>4/6</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>4/10</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  2 saudara perempuan seibu
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1/3</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>2/6</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>2/10</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Ibu</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1/6</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1/6</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1/10</Text>
              </View>
              <View style={styles.tableRow}>
                <Text
                  style={[styles.tableCell, { flex: 2, fontWeight: "bold" }]}
                >
                  JUMLAH
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1, fontWeight: "bold" }]}
                >
                  -
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1, fontWeight: "bold" }]}
                >
                  10/6
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1, fontWeight: "bold" }]}
                >
                  10/10
                </Text>
              </View>
            </View>

            {/* Soal (Another duplicate, treating as Soal 11) */}
            <Text style={styles.subSectionTitle}>Soal 11 :</Text>
            <Text style={styles.paragraph}>
              Seseorang meninggal dunia dengan meninggalkan ahli waris: Istri,
              anak perempuan dan cucu perempuan. Berapakah bagian masing-masing
              ahli waris ?
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>
                  Ahli waris
                </Text>
                <Text style={[styles.tableHeader, { flex: 1 }]}>Bagian</Text>
                <Text style={[styles.tableHeader, { flex: 1 }]}>AM/PM</Text>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>
                  Solusi radd
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>janda</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1/8</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>3/24</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  Tidak mendapat sisa (4/32)
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  anak perempuan
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>½</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>12/24</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>21/32</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  cucu perempuan
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>1/6</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>4/24</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>7/32</Text>
              </View>
              <View style={styles.tableRow}>
                <Text
                  style={[styles.tableCell, { flex: 1.5, fontWeight: "bold" }]}
                >
                  JUMLAH
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1, fontWeight: "bold" }]}
                >
                  -
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1, fontWeight: "bold" }]}
                >
                  19/24 (tidak cukup 1) dan tersisa 5/24
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1.5, fontWeight: "bold" }]}
                >
                  32/32
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#007bff", // Background color when sidebar is open
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
  // Styles for table
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 5,
    fontWeight: "bold",
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  tableCell: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#eee",
    fontSize: 13, // Make font slightly smaller for tables
  },
});

export default KuisPembagianScreen;
