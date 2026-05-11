import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme";

type TxType = "repayment" | "disbursement" | "fee";

type Transaction = {
  id: string;
  type: TxType;
  label: string;
  amount: string;
  date: string;
  status: "success" | "pending" | "failed";
};

const ALL_TX: Transaction[] = [
  { id: "RCP-91022", type: "repayment", label: "Repayment", amount: "-KES 4,000", date: "5 May 2026", status: "success" },
  { id: "DIS-31011", type: "disbursement", label: "Loan Disbursement", amount: "+KES 80,000", date: "2 May 2026", status: "success" },
  { id: "RCP-90111", type: "repayment", label: "Repayment", amount: "-KES 3,200", date: "1 May 2026", status: "success" },
  { id: "FEE-50021", type: "fee", label: "Processing Fee", amount: "-KES 1,200", date: "2 May 2026", status: "success" },
  { id: "RCP-89200", type: "repayment", label: "Repayment", amount: "-KES 5,000", date: "15 Apr 2026", status: "success" },
  { id: "DIS-29900", type: "disbursement", label: "Loan Disbursement", amount: "+KES 50,000", date: "1 Apr 2026", status: "success" },
];

const FILTERS = ["All", "Repayments", "Disbursements", "Fees"] as const;
type Filter = typeof FILTERS[number];

const typeConfig: Record<TxType, { icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  repayment: { icon: "arrow-up-circle-outline", color: colors.danger },
  disbursement: { icon: "arrow-down-circle-outline", color: colors.success },
  fee: { icon: "receipt-outline", color: colors.warning },
};

export function TransactionsScreen() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = ALL_TX.filter((tx) => {
    if (filter === "All") return true;
    if (filter === "Repayments") return tx.type === "repayment";
    if (filter === "Disbursements") return tx.type === "disbursement";
    if (filter === "Fees") return tx.type === "fee";
    return true;
  });

  const totalIn = ALL_TX.filter((t) => t.type === "disbursement").reduce((s, t) => s + parseInt(t.amount.replace(/\D/g, "")), 0);
  const totalOut = ALL_TX.filter((t) => t.type !== "disbursement").reduce((s, t) => s + parseInt(t.amount.replace(/\D/g, "")), 0);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.glow} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>Full repayment and disbursement history</Text>

        {/* Summary */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { borderColor: colors.success + "44" }]}>
            <Ionicons name="arrow-down-circle-outline" size={20} color={colors.success} />
            <Text style={styles.summaryLabel}>Total In</Text>
            <Text style={[styles.summaryValue, { color: colors.success }]}>KES {totalIn.toLocaleString()}</Text>
          </View>
          <View style={[styles.summaryCard, { borderColor: colors.danger + "44" }]}>
            <Ionicons name="arrow-up-circle-outline" size={20} color={colors.danger} />
            <Text style={styles.summaryLabel}>Total Out</Text>
            <Text style={[styles.summaryValue, { color: colors.danger }]}>KES {totalOut.toLocaleString()}</Text>
          </View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {FILTERS.map((f) => (
            <Pressable
              key={f}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Transaction list */}
        <View style={styles.list}>
          {filtered.map((tx, idx) => {
            const cfg = typeConfig[tx.type];
            return (
              <View
                key={tx.id}
                style={[styles.txCard, idx < filtered.length - 1 && styles.txCardBorder]}
              >
                <View style={[styles.txIcon, { backgroundColor: cfg.color + "22" }]}>
                  <Ionicons name={cfg.icon} size={20} color={cfg.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.txLabel}>{tx.label}</Text>
                  <Text style={styles.txId}>{tx.id} · {tx.date}</Text>
                </View>
                <View style={{ alignItems: "flex-end", gap: 4 }}>
                  <Text style={[styles.txAmount, { color: cfg.color }]}>{tx.amount}</Text>
                  <View style={[styles.statusPill, { backgroundColor: colors.successBg }]}>
                    <Text style={styles.statusText}>{tx.status}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  glow: {
    position: "absolute", top: -60, left: -40,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: colors.brandGlow,
  },
  scroll: { padding: 18, gap: 14, paddingBottom: 30 },
  title: { color: colors.text, fontSize: 26, fontWeight: "900" },
  subtitle: { color: colors.textMuted, fontSize: 13 },
  summaryRow: { flexDirection: "row", gap: 10 },
  summaryCard: {
    flex: 1, backgroundColor: colors.panel,
    borderRadius: 14, padding: 14, gap: 4,
    borderWidth: 1, alignItems: "center",
  },
  summaryLabel: { color: colors.textMuted, fontSize: 11 },
  summaryValue: { fontWeight: "800", fontSize: 16 },
  filterScroll: { flexGrow: 0 },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 999, backgroundColor: colors.panel,
    borderWidth: 1, borderColor: colors.border,
    marginRight: 8,
  },
  filterChipActive: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  filterText: { color: colors.textMuted, fontWeight: "600", fontSize: 13 },
  filterTextActive: { color: "#000" },
  list: {
    backgroundColor: colors.panel, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border, overflow: "hidden",
  },
  txCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14 },
  txCardBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  txIcon: { width: 42, height: 42, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  txLabel: { color: colors.text, fontWeight: "700", fontSize: 14 },
  txId: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  txAmount: { fontWeight: "800", fontSize: 14 },
  statusPill: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  statusText: { color: colors.success, fontSize: 10, fontWeight: "700" },
});
