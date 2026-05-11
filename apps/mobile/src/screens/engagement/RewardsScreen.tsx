import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme";

const TIERS = [
  { name: "Bronze", min: 0, color: "#cd7f32", icon: "medal-outline" as const },
  { name: "Silver", min: 3, color: "#94a3b8", icon: "medal-outline" as const },
  { name: "Gold", min: 6, color: colors.yellow, icon: "medal" as const },
  { name: "Platinum", min: 8, color: "#e2e8f0", icon: "diamond-outline" as const },
];

const HISTORY = [
  { label: "On-time repayment bonus", points: "+50 pts", date: "5 May" },
  { label: "Referral: John Kamau", points: "+200 pts", date: "2 May" },
  { label: "Early repayment bonus", points: "+30 pts", date: "1 May" },
];

export function RewardsScreen() {
  const currentTier = TIERS[2]; // Gold

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.glow} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Rewards & Referrals</Text>
        <Text style={styles.subtitle}>Earn bonuses for consistency and referrals</Text>

        {/* Current tier card */}
        <View style={styles.tierCard}>
          <View style={styles.tierGlow} />
          <View style={styles.tierTop}>
            <View style={[styles.tierBadge, { backgroundColor: currentTier.color + "22" }]}>
              <Ionicons name={currentTier.icon} size={32} color={currentTier.color} />
            </View>
            <View>
              <Text style={styles.tierLabel}>Current Tier</Text>
              <Text style={[styles.tierName, { color: currentTier.color }]}>{currentTier.name}</Text>
            </View>
          </View>
          <View style={styles.pointsRow}>
            <Text style={styles.pointsValue}>1,240 pts</Text>
            <Text style={styles.pointsLabel}>Total Points</Text>
          </View>
          <View style={styles.progressWrap}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: "75%", backgroundColor: currentTier.color }]} />
            </View>
            <Text style={styles.progressHint}>2 on-time repayments away from Platinum</Text>
          </View>
        </View>

        {/* Tier ladder */}
        <Text style={styles.sectionTitle}>Tier Ladder</Text>
        <View style={styles.tierLadder}>
          {TIERS.map((tier, idx) => (
            <View key={tier.name} style={[styles.ladderItem, idx < TIERS.length - 1 && styles.ladderBorder]}>
              <Ionicons name={tier.icon} size={18} color={tier.color} />
              <Text style={[styles.ladderName, { color: tier.color }]}>{tier.name}</Text>
              <Text style={styles.ladderMin}>{tier.min}+ repayments</Text>
              {tier.name === "Gold" && (
                <View style={styles.currentPill}>
                  <Text style={styles.currentPillText}>You</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Referral */}
        <Text style={styles.sectionTitle}>Referral Program</Text>
        <View style={styles.referralCard}>
          <View style={styles.referralTop}>
            <Ionicons name="people-outline" size={22} color={colors.yellow} />
            <Text style={styles.referralTitle}>Invite friends, earn KES 500</Text>
          </View>
          <View style={styles.codeBox}>
            <Text style={styles.codeLabel}>Your referral code</Text>
            <Text style={styles.code}>YES-MARY-81</Text>
          </View>
          <Pressable style={styles.shareBtn}>
            <Ionicons name="share-social-outline" size={18} color="#000" />
            <Text style={styles.shareBtnText}>Share Code</Text>
          </Pressable>
        </View>

        {/* History */}
        <Text style={styles.sectionTitle}>Points History</Text>
        <View style={styles.historyGroup}>
          {HISTORY.map((item, idx) => (
            <View key={idx} style={[styles.historyRow, idx < HISTORY.length - 1 && styles.historyBorder]}>
              <View style={styles.historyIcon}>
                <Ionicons name="star-outline" size={16} color={colors.yellow} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.historyLabel}>{item.label}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
              <Text style={styles.historyPoints}>{item.points}</Text>
            </View>
          ))}
        </View>
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
  title: { color: colors.text, fontSize: 26, fontWeight: "900" },
  subtitle: { color: colors.textMuted, fontSize: 13 },
  tierCard: {
    backgroundColor: colors.panel, borderRadius: 20,
    padding: 20, gap: 14, borderWidth: 1,
    borderColor: colors.yellowDark + "44", overflow: "hidden",
  },
  tierGlow: {
    position: "absolute", top: -40, right: -40,
    width: 140, height: 140, borderRadius: 70,
    backgroundColor: colors.yellowGlow,
  },
  tierTop: { flexDirection: "row", alignItems: "center", gap: 14 },
  tierBadge: { width: 60, height: 60, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  tierLabel: { color: colors.textMuted, fontSize: 12 },
  tierName: { fontSize: 24, fontWeight: "900" },
  pointsRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  pointsValue: { color: colors.text, fontSize: 28, fontWeight: "900" },
  pointsLabel: { color: colors.textMuted, fontSize: 13 },
  progressWrap: { gap: 6 },
  progressTrack: { height: 6, backgroundColor: colors.border, borderRadius: 999, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 999 },
  progressHint: { color: colors.textMuted, fontSize: 11 },
  sectionTitle: { color: colors.text, fontWeight: "800", fontSize: 16 },
  tierLadder: {
    backgroundColor: colors.panel, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border, overflow: "hidden",
  },
  ladderItem: {
    flexDirection: "row", alignItems: "center", gap: 10,
    padding: 14,
  },
  ladderBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  ladderName: { fontWeight: "700", fontSize: 14, flex: 1 },
  ladderMin: { color: colors.textMuted, fontSize: 12 },
  currentPill: {
    backgroundColor: colors.yellow, borderRadius: 999,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  currentPillText: { color: "#000", fontSize: 10, fontWeight: "800" },
  referralCard: {
    backgroundColor: colors.panel, borderRadius: 16,
    padding: 16, gap: 12, borderWidth: 1,
    borderColor: colors.yellowDark + "44",
  },
  referralTop: { flexDirection: "row", alignItems: "center", gap: 8 },
  referralTitle: { color: colors.text, fontWeight: "700", fontSize: 15 },
  codeBox: {
    backgroundColor: colors.yellowGlow, borderRadius: 12,
    padding: 14, alignItems: "center", gap: 4,
    borderWidth: 1, borderColor: colors.yellowDark + "44",
  },
  codeLabel: { color: colors.textMuted, fontSize: 11 },
  code: { color: colors.yellow, fontSize: 22, fontWeight: "900", letterSpacing: 2 },
  shareBtn: {
    backgroundColor: colors.yellow, borderRadius: 12,
    padding: 13, flexDirection: "row",
    alignItems: "center", justifyContent: "center", gap: 8,
  },
  shareBtnText: { color: "#000", fontWeight: "800", fontSize: 15 },
  historyGroup: {
    backgroundColor: colors.panel, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border, overflow: "hidden",
  },
  historyRow: { flexDirection: "row", alignItems: "center", gap: 10, padding: 14 },
  historyBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  historyIcon: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: colors.yellowGlow,
    alignItems: "center", justifyContent: "center",
  },
  historyLabel: { color: colors.text, fontWeight: "600", fontSize: 13 },
  historyDate: { color: colors.textMuted, fontSize: 11 },
  historyPoints: { color: colors.yellow, fontWeight: "800", fontSize: 14 },
});
