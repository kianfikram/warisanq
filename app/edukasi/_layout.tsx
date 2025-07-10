// app/edukasi/_layout.tsx
import { Stack } from "expo-router";

export default function EdukasiLayout() {
  return (
    // Stack navigator untuk semua halaman edukasi
    <Stack screenOptions={{ headerShown: false }}>
      {/* Halaman "Dasar Dasar Faraid" */}
      <Stack.Screen name="dasar_faraid" />
      {/* Halaman-halaman edukasi lainnya */}
      <Stack.Screen
        name="penggolongan_ahli_waris"
        options={{ title: "Penggolongan Ahli Waris & Bagiannya" }}
      />
      <Stack.Screen
        name="al_hajb"
        options={{ title: "Penghalang Hak Waris (Al-Hajb)" }}
      />
      <Stack.Screen
        name="pelaksanaan_pembagian"
        options={{ title: "Pelaksanaan Pembagian Harta Warisan" }}
      />
      <Stack.Screen
        name="al_aul_radd"
        options={{ title: "Al-Aul & Al-Radd" }}
      />
      <Stack.Screen name="kuis" options={{ title: "Kuis Pembagian Warisan" }} />
      {/* Tambahkan rute untuk halaman edukasi lainnya di sini */}
    </Stack>
  );
}
