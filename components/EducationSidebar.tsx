// components/EducationSidebar.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Link, LinkProps } from "expo-router";

interface SidebarProps {
  onClose: () => void; // Fungsi untuk menutup sidebar
}

const EducationSidebar: React.FC<SidebarProps> = ({ onClose }) => {
  // Daftar item menu edukasi
  const menuItems = [
    {
      name: "Dasar Dasar Faraid",
      icon: "chatbox",
      href: "/edukasi/dasar_faraid",
    },
    {
      name: "Penggolongan Ahli Waris & Bgiannya",
      icon: "people",
      href: "/edukasi/penggolongan_ahli_waris",
    },
    {
      name: "Penghalang Hak Waris (Al-Hajb)",
      icon: "close-circle",
      href: "/edukasi/penghalang_hak_waris",
    },
    {
      name: "Pelaksanaan Pembagian Harta Warisan",
      icon: "share-alt",
      href: "/edukasi/pelaksanaan_pembagian",
    },
    { name: "Al-Aul & Al-Radd", icon: "search", href: "/edukasi/al_aul_radd" },
    {
      name: "Kasus Pembagian Warisan",
      icon: "help-circle",
      href: "/edukasi/kasus_waris",
    },
  ];

  return (
    <View style={styles.sidebar}>
      {/* Tombol tutup sidebar */}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={30} color="white" />
      </TouchableOpacity>
      {/* Daftar item menu */}
      <View style={styles.menuItemsContainer}>
        {menuItems.map((item, index) => (
          // Menggunakan Link dari expo-router untuk navigasi
          <Link key={index} href={item.href as LinkProps["href"]} asChild>
            <TouchableOpacity style={styles.menuItem} onPress={onClose}>
              {/* Icon dari Feather Icons */}
              <Feather
                name={item.icon as any}
                size={24}
                color="white"
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: "70%", // Lebar sidebar
    backgroundColor: "#ED6933",
    paddingTop: 60, // Sesuaikan dengan tinggi StatusBar dan header
    paddingHorizontal: 20,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 100, // Pastikan sidebar di atas konten utama
  },
  closeButton: {
    position: "absolute",
    top: 30, // Posisi tombol X
    left: 20,
    padding: 10,
    zIndex: 101, // Pastikan tombol X di atas item menu
  },
  menuItemsContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)", // Garis pemisah item menu
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EducationSidebar;
