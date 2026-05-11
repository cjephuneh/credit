import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppStackParamList, MainTabParamList } from "../../types/navigation";
import { colors } from "../../theme";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Home">,
  NativeStackScreenProps<AppStackParamList>
>;

const AVATAR_URI = "https://i.pravatar.cc/150?img=47";

export function HomeScreen({ navigation }: Props) {
  const pulse = useRef(new Animated.Value(1)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.025, duration: 1400, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 1400, useNativeDriver: true }),
      ])
    ).start();
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const quickActions = [
    { label: "Apply Loan", icon: "add-circle-outline" as const, color: "#3b82f6", onPress: () => navigation.navigate("ApplyLoan") },
    { label: "KYC Center", icon: "shield-checkmark-outline" as const, color: "#facc15", onPress: () => navigation.navigate("KycCenter") },
    { label: "Rewards", icon: "gift-outline" as const, color: "#a78bfa", onPress: () => navigation.navigate("Rewards") },
    { label: "Offers", icon: "flash-outline" as const, color: "#f97316", onPress: () => navigation.navigate("Offers") },
    { label: "Credit Score", icon: "stats-chart-outline" as const, color: "#22c55e", onPress: () => navigation.navigate("CreditScore") },
    { label: "Budget", icon: "pie-chart-outline" as const, color: "#06b6d4", onPress: () => navigation.navigate("BudgetPlanner") },
    { label: "Support", icon: "chatbubble-ellipses-outline" as const, color: "#ec4899", onPress: () => navigation.navigate("Support") },
    { label: "Disputes", icon: "alert-circle-outline" as const, color: "#ef4444", onPress: () => navigation.navigate("Disputes") },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.glowBlue} />
      <View style={styles.glowYellow} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Top bar */}
        <Animated.View style={[styles.topBar, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.userName}>Mary Wanjiku</Text>
          </View>
          <View style={styles.topRight}>
            <Pressable style={styles.notifBtn} onPress={() => navigation.navigate("Notifications")}>
              <Ionicons name="notifications-outline" size={22} color={colors.text} />
              <View style={styles.notifDot} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <Image source={{ uri: AVATAR_URI }} style={styles.avatar} />
            </Pressable>
          </View>
        </Animated.View>

        {/* Hero balance card */}
        <Animated.View style={{ transform: [{ scale: pulse }] }}>
          <View style={styles.heroCard}>
            <View style={styles.heroGlow} />
            <Text style={styles.heroLabel}>Outstanding Balance</Text>
            <Text style={styles.heroAmount}>KES 62,400</Text>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
            <View style={styles.heroRow}>
              <Text style={styles.heroSub}>62% repaid</Text>
              <Text style={styles.heroSub}>Next: KES 5,200 · 17 May</Text>
            </View>
            <View style={styles.heroBadges}>
              <View style={styles.badge}>
                <Ionicons name="checkmark-circle" size={12} color={colors.success} />
                <Text style={styles.badgeText}>Great streak</Text>
              </View>
              <View style={[styles.badge, styles.badgeYellow]}>
                <Ionicons name="star" size={12} color={colors.yellow} />
                <Text style={[styles.badgeText, { color: colors.yellow }]}>Gold Tier</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Stats row */}
        <Animated.View style={[styles.statsRow, { opacity: fadeIn }]}>
          <Pressable style={styles.statCard} onPress={() => navigation.navigate("Loans")}>
            <Ionicons name="trending-up-outline" size={18} color={colors.brandLight} />
            <Text style={styles.statValue}>KES 87,600</Text>
            <Text style={styles.statLabel}>Available Limit</Text>
          </Pressable>
          <View style={[styles.statCard, styles.statCardYellow]}>
            <Ionicons name="shield-checkmark-outline" size={18} color={colors.yellow} />
            <Text style={[styles.statValue, { color: colors.yellow }]}>Approved</Text>
            <Text style={styles.statLabel}>KYC Status</Text>
          </View>
          <Pressable style={styles.statCard} onPress={() => navigation.navigate("Repayments")}>
            <Ionicons name="card-outline" size={18} color="#a78bfa" />
            <Text style={[styles.statValue, { color: "#a78bfa" }]}>KES 5,200</Text>
            <Text style={styles.statLabel}>Due 17 May</Text>
          </Pressable>
        </Animated.View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <Animated.View style={[styles.grid, { opacity: fadeIn }]}>
          {quickActions.map((action) => (
            <Pressable key={action.label} style={styles.actionCard} onPress={action.onPress}>
              <View style={[styles.actionIcon, { backgroundColor: action.color + "22" }]}>
                <Ionicons name={action.icon} size={22} color={action.color} />
              </View>
              <Text style={styles.actionText}>{action.label}</Text>
            </Pressable>
          ))}
        </Animated.View>

        {/* Tip card */}
        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <Ionicons name="sparkles" size={18} color={colors.yellow} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>Pro Tip</Text>
            <Text style={styles.tipText}>Pay your installment 2 days early to unlock instant top-up eligibility.</Text>
          </View>
        </View>

        {/* Recent activity */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {[
          { icon: "arrow-down-circle-outline" as const, label: "Loan Disbursement", amount: "+KES 80,000", date: "2 May", color: colors.success },
          { icon: "arrow-up-circle-outline" as const, label: "Repayment", amount: "-KES 4,000", date: "5 May", color: colors.danger },
          { icon: "arrow-up-circle-outline" as const, label: "Repayment", amount: "-KES 3,200", date: "1 May", color: colors.danger },
        ].map((tx, i) => (
          <View key={i} style={styles.txRow}>
            <View style={[styles.txIcon, { backgroundColor: tx.color + "22" }]}>
              <Ionicons name={tx.icon} size={20} color={tx.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.txLabel}>{tx.label}</Text>
              <Text style={styles.txDate}>{tx.date}</Text>
            </View>
            <Text style={[styles.txAmount, { color: tx.color }]}>{tx.amount}</Text>
          </View>
        ))}

        {/* Bottom nav strip - REMOVED since we have tabs now */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  glowBlue: {
    position: "absolute", top: -60, right: -40,
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: colors.brandGlow,
  },
  glowYellow: {
    position: "absolute", top: 120, left: -80,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: colors.yellowGlow,
  },
  scroll: { padding: 18, gap: 14, paddingBottom: 30 },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  greeting: { color: colors.textMuted, fontSize: 13 },
  userName: { color: colors.text, fontSize: 20, fontWeight: "800" },
  topRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  notifBtn: { position: "relative" },
  notifDot: {
    position: "absolute", top: 0, right: 0,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: colors.yellow,
  },
  avatar: { width: 42, height: 42, borderRadius: 21, borderWidth: 2, borderColor: colors.yellow },
  heroCard: {
    backgroundColor: colors.panel, borderRadius: 20,
    padding: 20, borderWidth: 1, borderColor: colors.border, overflow: "hidden",
  },
  heroGlow: {
    position: "absolute", top: -40, right: -40,
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: "rgba(37,99,235,0.15)",
  },
  heroLabel: { color: colors.textMuted, fontSize: 12, fontWeight: "600", marginBottom: 4 },
  heroAmount: { color: colors.text, fontSize: 34, fontWeight: "900", letterSpacing: -0.5 },
  progressTrack: {
    marginTop: 12, backgroundColor: "#1e293b",
    borderRadius: 999, height: 6, overflow: "hidden",
  },
  progressFill: { width: "62%", height: "100%", backgroundColor: colors.brandLight, borderRadius: 999 },
  heroRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
  heroSub: { color: colors.textMuted, fontSize: 11 },
  heroBadges: { flexDirection: "row", gap: 8, marginTop: 12 },
  badge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: colors.successBg, borderRadius: 999,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  badgeYellow: { backgroundColor: colors.yellowGlow },
  badgeText: { color: colors.success, fontSize: 11, fontWeight: "700" },
  statsRow: { flexDirection: "row", gap: 10 },
  statCard: {
    flex: 1, backgroundColor: colors.panel,
    borderRadius: 14, padding: 12, gap: 4,
    borderWidth: 1, borderColor: colors.border, alignItems: "center",
  },
  statCardYellow: { borderColor: colors.yellowDark + "55" },
  statValue: { color: colors.text, fontWeight: "800", fontSize: 13, textAlign: "center" },
  statLabel: { color: colors.textMuted, fontSize: 10, textAlign: "center" },
  sectionTitle: { color: colors.text, fontWeight: "800", fontSize: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  actionCard: {
    width: "48%", backgroundColor: colors.panelAlt,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: 16, padding: 14, gap: 10,
  },
  actionIcon: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  actionText: { color: colors.text, fontWeight: "700", fontSize: 13 },
  tipCard: {
    backgroundColor: colors.yellowGlow,
    borderWidth: 1, borderColor: colors.yellowDark + "44",
    borderRadius: 16, padding: 14,
    flexDirection: "row", gap: 12, alignItems: "flex-start",
  },
  tipIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: colors.yellowDark + "33",
    alignItems: "center", justifyContent: "center",
  },
  tipTitle: { color: colors.yellow, fontWeight: "800", fontSize: 13, marginBottom: 2 },
  tipText: { color: "#fef9c3", fontSize: 12, lineHeight: 18 },
  txRow: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: colors.panel, borderRadius: 14,
    padding: 12, borderWidth: 1, borderColor: colors.border,
  },
  txIcon: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  txLabel: { color: colors.text, fontWeight: "700", fontSize: 13 },
  txDate: { color: colors.textMuted, fontSize: 11 },
  txAmount: { fontWeight: "800", fontSize: 14 },
});
