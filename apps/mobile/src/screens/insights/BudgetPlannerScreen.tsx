import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme";

const BREAKDOWN = [
  { label: "Rent", amount: "KES 12,000", pct: 25, color: "#3b82f6" },
  { label: "Food & Groceries", amount: "KES 8,000", pct: 17, color: "#22c55e" },
  { label: "Transport", amount: "KES 4,000", pct: 8, color: "#f97316" },
  { label: "Loan Repayment", amount: "KES 5,200", pct: 11, color: colors.yellow },
  { label: "Savings", amount: "KES 5,000", pct: 10, color: "#a78bfa" },
  { label: "Other", amount: "KES 13,800", pct: 29, color: colors.textMuted },
];

export function BudgetPlannerScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.glow} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Budget Planner</Text>
        <Text style={styles.subtitle}>Plan your loan repayment around monthly income</Text>

        {/* Income card */}
        <View style={styles.incomeCard}>
          <View style={styles.incomeGlow} />
          <Text style={styles.incomeLabel}>Monthly Income</Text>
          <Text style={styles.incomeValue}>KES 48,000</Text>
          <View style={styles.incomeRow}>
            <View style={styles.incomeStat}>
              <Text style={styles.incomeStatLabel}>Safe Installment</Text>
              <Text style={[styles.incomeStatValue, { color: colors.success }]}>KES 8K – 11K</Text>
            </View>
            <View style={styles.incomeDivider} />
            <View style={styles.incomeStat}>
              <Text style={styles.incomeStatLabel}>Your Installment</Text>
              <Text style={[styles.incomeStatValue, { color: colors.yellow }]}>KES 5,200</Text>
            </View>
            <View style={styles.incomeDivider} />
            <View style={styles.incomeStat}>
              <Text style={styles.incomeStatLabel}>Debt Ratio</Text>
              <Text style={[styles.incomeStatValue, { color: colors.brandLight }]}>10.8%</Text>
            </View>
          </View>
        </View>

        {/* Breakdown */}
        <Text style={styles.sectionTitle}>Spending Breakdown</Text>
        <View style={styles.breakdownCard}>
          {BREAKDOWN.map((item, idx) => (
            <View key={item.label} style={[styles.breakdownRow, idx < BREAKDOWN.length - 1 && styles.breakdownBorder]}>
              <View style={[styles.breakdownDot, { backgroundColor: item.color }]} />
              <Text style={styles.breakdownLabel}>{item.label}</Text>
              <View style={styles.breakdownRight}>
                <Text style={styles.breakdownAmount}>{item.amount}</Text>
                <Text style={[styles.breakdownPct, { color: item.color }]}>{item.pct}%</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Visual bar */}
        <View style={styles.barWrap}>
          {BREAKDOWN.map((item) => (
            <View key={item.label} style={[styles.barSegment, { flex: item.pct, backgroundColor: item.color }]} />
          ))}
        </View>

        {/* Tip */}
        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <Ionicons name="bulb-outline" size={18} color={colors.yellow} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>Smart Tip</Text>
            <Text style={styles.tipText}>Set auto-reminders 4 days before your due date to avoid late fees and protect your credit score.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  glow: {
    position: "absolute", top: -60, right: -40,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: colors.yellowGlow,
  },
  scroll: { padding: 18, gap: 14, paddingBottom: 30 },
  title: { color: colors.text, fontSize: 26, fontWeight: "900" },
  subtitle: { color: colors.textMuted, fontSize: 13 },
  incomeCard: {
    backgroundColor: colors.panel, borderRadius: 20,
    padding: 20, gap: 14, borderWidth: 1,
    borderColor: colors.border, overflow: "hidden",
  },
  incomeGlow: {
    position: "absolute", top: -40, right: -40,
    width: 140, height: 140, borderRadius: 70,
    backgroundColor: colors.brandGlow,
  },
  incomeLabel: { color: colors.textMuted, fontSize: 12, fontWeight: "600" },
  incomeValue: { color: colors.text, fontSize: 32, fontWeight: "900" },
  incomeRow: { flexDirection: "row", alignItems: "center" },
  incomeStat: { flex: 1, alignItems: "center", gap: 2 },
  incomeDivider: { width: 1, height: 30, backgroundColor: colors.border },
  incomeStatLabel: { color: colors.textMuted, fontSize: 10, textAlign: "center" },
  incomeStatValue: { fontWeight: "800", fontSize: 13, textAlign: "center" },
  sectionTitle: { color: colors.text, fontWeight: "800", fontSize: 16 },
  breakdownCard: {
    backgroundColor: colors.panel, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border, overflow: "hidden",
  },
  breakdownRow: { flexDirection: "row", alignItems: "center", gap: 10, padding: 14 },
  breakdownBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  breakdownDot: { width: 10, height: 10, borderRadius: 5 },
  breakdownLabel: { color: colors.text, fontWeight: "600", fontSize: 13, flex: 1 },
  breakdownRight: { alignItems: "flex-end", gap: 2 },
  breakdownAmount: { color: colors.text, fontWeight: "700", fontSize: 13 },
  breakdownPct: { fontSize: 11, fontWeight: "700" },
  barWrap: { flexDirection: "row", height: 10, borderRadius: 999, overflow: "hidden" },
  barSegment: { height: "100%" },
  tipCard: {
    flexDirection: "row", alignItems: "flex-start", gap: 12,
    backgroundColor: colors.yellowGlow, borderRadius: 14,
    padding: 14, borderWidth: 1, borderColor: colors.yellowDark + "44",
  },
  tipIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: colors.yellowDark + "33",
    alignItems: "center", justifyContent: "center",
  },
  tipTitle: { color: colors.yellow, fontWeight: "800", fontSize: 13, marginBottom: 2 },
  tipText: { color: "#fef9c3", fontSize: 12, lineHeight: 18 },
});
