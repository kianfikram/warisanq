// app/edukasi/_layout.tsx
import { Stack } from "expo-router";

export default function EdukasiLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Halaman "Dasar Dasar Faraid" */}
      <Stack.Screen name="dasar_faraid" />
      {/* Halaman "Penggolongan Ahli Waris & Bagiannya" */}
      <Stack.Screen name="penggolongan_ahli_waris" />
      {/* Halaman "Penghalang Hak Waris (Al-Hajb)" */}
      <Stack.Screen name="penghalang_hak_waris" />
      {/* Tidak perlu options di sini karena diatur di file itu sendiri */}
      {/* Halaman-halaman edukasi lainnya */}
      <Stack.Screen
        name="pelaksanaan_pembagian"
        options={{ title: "Pelaksanaan Pembagian Harta Warisan" }}
      />
      <Stack.Screen
        name="al_aul_radd"
        options={{ title: "Al-Aul & Al-Radd" }}
      />
      <Stack.Screen name="kuis" options={{ title: "Kuis Pembagian Warisan" }} />
    </Stack>
  );
}
