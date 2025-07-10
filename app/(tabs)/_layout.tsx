import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import { Stack } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,

        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
        }}
      />

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="kalkulator1" options={{ headerShown: false }} />
        <Stack.Screen name="kalkulator2" options={{ headerShown: false }} />
        <Stack.Screen name="kalkulator3" options={{ headerShown: false }} />
      </Stack>

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
        <Stack.Screen
          name="kuis"
          options={{ title: "Kuis Pembagian Warisan" }}
        />
        {/* Tambahkan rute untuk halaman edukasi lainnya di sini */}
      </Stack>
    </Tabs>
  );
}
