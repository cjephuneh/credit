import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppStackParamList, MainTabParamList } from "../../types/navigation";
import { colors } from "../../theme";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Profile">,
  NativeStackScreenProps<AppStackParamList>
>;

const AVATAR_URI = "https://i.pravatar.cc/150?img=47";

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sub?: string;
  color: string;
  onPress: () => void;
};

export function ProfileScreen({ navigation }: Props) {
  const menuSections: { title: string; items: MenuItem[] }[] = [
    {
      title: "Account",
      items: [
        { icon: "receipt-outline", label: "Transaction History", sub: "View all payments & disbursements", color: "#3b82f6", onPress: () => navigation.navigate("Transactions") },
        { icon: "shield-checkmark-outline", label: "KYC Center", sub: "Identity verification status", color: "#facc15", onPress: () => navigation.navigate("KycCenter") },
        { icon: "stats-chart-outline", label: "Credit Score", sub: "Your current score: 742", color: "#22c55e", onPress: () => navigation.navigate("CreditScore") },
      ],
    },
    {
      title: "Rewards & Offers",
      items: [
        { icon: "gift-outline", label: "Rewards & Referrals", sub: "Gold Tier · 2 away from Platinum", color: "#a78bfa", onPress: () => navigation.navigate("Rewards") },
        { icon: "flash-outline", label: "Special Offers", sub: "Personalized deals for you", color: "#f97316", onPress: () => navigation.navigate("Offers") },
      ],
    },
    {
      title: "Settings",
      items: [
        { icon: "settings-outline", label: "Settings & Security", sub: "PIN, biometrics, privacy", color: "#94a3b8", onPress: () => navigation.navigate("Settings") },
        { icon: "help-buoy-outline", label: "Help & Support", sub: "Chat, call, FAQ", color: "#ec4899", onPress: () => navigation.navigate("Support") },
        { icon: "alert-circle-outline", label: "Disputes", sub: "Raise a billing complaint", color: "#ef4444", onPress: () => navigation.navigate("Disputes") },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.glow} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile hero */}
        <View style={styles.profileHero}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: AVATAR_URI }} style={styles.avatar} />
            <View style={styles.kycBadge}>
              <Ionicons name="checkmark" size={10} color="#fff" />
            </View>
          </View>
          <Text style={styles.name}>Mary Wanjiku</Text>
          <Text style={styles.phone}>+254 712 000 111</Text>
          <View style={styles.tierRow}>
            <View style={styles.tierBadge}>
              <Ionicons name="star" size={12} color={colors.yellow} />
              <Text style={styles.tierText}>Gold Member</Text>
            </View>
            <View style={styles.kycPill}>
              <Ionicons name="shield-checkmark" size={12} color={colors.success} />
              <Text style={styles.kycText}>KYC Verified</Text>
            </View>
          </View>
        </View>

        {/* Stats strip */}
        <View style={styles.statsStrip}>
          <View style={styles.stripItem}>
            <Text style={styles.stripValue}>742</Text>
            <Text style={styles.stripLabel}>Credit Score</Text>
          </View>
          <View style={styles.stripDivider} />
          <View style={styles.stripItem}>
            <Text style={styles.stripValue}>KES 87.6K</Text>
            <Text style={styles.stripLabel}>Limit</Text>
          </View>
          <View style={styles.stripDivider} />
          <View style={styles.stripItem}>
            <Text style={styles.stripValue}>12</Text>
            <Text style={styles.stripLabel}>Loans Taken</Text>
          </View>
        </View>

        {/* Menu sections */}
        {menuSections.map((section) => (
          <View key={section.title}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuGroup}>
              {section.items.map((item, idx) => (
                <Pressable
                  key={item.label}
                  style={[
                    styles.menuItem,
                    idx < section.items.length - 1 && styles.menuItemBorder,
                  ]}
                  onPress={item.onPress}
                >
                  <View style={[styles.menuIcon, { backgroundColor: item.color + "22" }]}>
                    <Ionicons name={item.icon} size={20} color={item.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    {item.sub ? <Text style={styles.menuSub}>{item.sub}</Text> : null}
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <Pressable style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  glow: {
    position: "absolute", top: -60, right: -40,
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: colors.yellowGlow,
  },
  scroll: { padding: 18, gap: 14, paddingBottom: 30 },
  profileHero: {
    backgroundColor: colors.panel, borderRadius: 20,
    padding: 24, alignItems: "center", gap: 6,
    borderWidth: 1, borderColor: colors.border,
  },
  avatarWrap: { position: "relative", marginBottom: 4 },
  avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: colors.yellow },
  kycBadge: {
    position: "absolute", bottom: 0, right: 0,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: colors.success,
    alignItems: "center", justifyContent: "center",
    borderWidth: 2, borderColor: colors.panel,
  },
  name: { color: colors.text, fontSize: 22, fontWeight: "800" },
  phone: { color: colors.textMuted, fontSize: 13 },
  tierRow: { flexDirection: "row", gap: 8, marginTop: 6 },
  tierBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: colors.yellowGlow, borderRadius: 999,
    paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1, borderColor: colors.yellowDark + "44",
  },
  tierText: { color: colors.yellow, fontSize: 11, fontWeight: "700" },
  kycPill: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: colors.successBg, borderRadius: 999,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  kycText: { color: colors.success, fontSize: 11, fontWeight: "700" },
  statsStrip: {
    backgroundColor: colors.panel, borderRadius: 16,
    flexDirection: "row", padding: 16,
    borderWidth: 1, borderColor: colors.border,
  },
  stripItem: { flex: 1, alignItems: "center", gap: 2 },
  stripDivider: { width: 1, backgroundColor: colors.border },
  stripValue: { color: colors.text, fontWeight: "800", fontSize: 16 },
  stripLabel: { color: colors.textMuted, fontSize: 11 },
  sectionTitle: { color: colors.textMuted, fontSize: 11, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 },
  menuGroup: {
    backgroundColor: colors.panel, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border, overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row", alignItems: "center", gap: 12,
    padding: 14,
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  menuIcon: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  menuLabel: { color: colors.text, fontWeight: "700", fontSize: 14 },
  menuSub: { color: colors.textMuted, fontSize: 12, marginTop: 1 },
  logoutBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, padding: 14, borderRadius: 14,
    backgroundColor: colors.dangerBg,
    borderWidth: 1, borderColor: colors.danger + "44",
  },
  logoutText: { color: colors.danger, fontWeight: "700", fontSize: 15 },
});
