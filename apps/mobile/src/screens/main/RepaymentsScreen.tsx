import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainTabParamList } from "../../types/navigation";
import { colors } from "../../theme";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Props = BottomTabScreenProps<MainTabParamList, "Repayments">;

const SCHEDULE = [
  { id: "INS-001", date: "17 May 2026", amount: "KES 5,200", status: "due" },
  { id: "INS-002", date: "17 Jun 2026", amount: "KES 5,200", status: "upcoming" },
  { id: "INS-003", date: "17 Jul 2026", amount: "KES 5,200", status: "upcoming" },
  { id: "INS-004", date: "17 Aug 2026", amount: "KES 5,200", status: "upcoming" },
];

const HISTORY = [
  { id: "RCP-91022", amount: "KES 4,000", date: "5 May 2026", method: "M-Pesa" },
  { id: "RCP-90111", amount: "KES 3,200", date: "1 May 2026", method: "M-Pesa" },
  { id: "RCP-89200", amount: "KES 5,000", date: "15 Apr 2026", method: "Paybill" },
];

export function RepaymentsScreen({}: Props) {
  const slide = useRef(new Animated.Value(24)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [payMethod, setPayMethod] = useState<"mpesa" | "paybill">("mpesa");

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slide, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const handlePay = () => {
    Alert.alert(
      payMethod === "mpesa" ? "M-Pesa STK Push Sent" : "Paybill Instructions",
      payMethod === "mpesa"
        ? "Check your phone for the M-Pesa prompt to complete payment of KES 5,200."
        : "Paybill: 123456\nAccount: YES-MARY-81\nAmount: KES 5,200"
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.glow} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Repayments</Text>
        <Text style={styles.subtitle}>Keep your account healthy</Text>

        {/* Due card */}
        <Animated.View style={[styles.dueCard, { transform: [{ translateY: slide }], opacity }]}>
          <View style={styles.dueGlow} />
          <Text style={styles.dueLabel}>Amount Due</Text>
          <Text style={styles.dueAmount}>KES 5,200</Text>
          <View style={styles.dueRow}>
            <View style={styles.dueBadge}>
              <Ionicons name="time-outline" size={12} color={colors.warning} />
              <Text style={styles.dueBadgeText}>Due 17 May 2026</Text>
            </View>
            <View style={styles.dueBadgeGreen}>
              <Ionicons name="checkmark-circle-outline" size={12} color={colors.success} />
              <Text style={styles.dueBadgeGreenText}>No late fee</Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressLabel}>62% of loan repaid · 4 installments remaining</Text>
        </Animated.View>

        {/* Payment method toggle */}
        <Text style={styles.sectionTitle}>Pay Now</Text>
        <View style={styles.methodToggle}>
          <Pressable
            style={[styles.methodBtn, payMethod === "mpesa" && styles.methodBtnActive]}
            onPress={() => setPayMethod("mpesa")}
          >
            <Ionicons name="phone-portrait-outline" size={16} color={payMethod === "mpesa" ? "#000" : colors.textMuted} />
            <Text style={[styles.methodText, payMethod === "mpesa" && styles.methodTextActive]}>M-Pesa STK</Text>
          </Pressable>
          <Pressable
            style={[styles.methodBtn, payMethod === "paybill" && styles.methodBtnActive]}
            onPress={() => setPayMethod("paybill")}
          >
            <Ionicons name="document-text-outline" size={16} color={payMethod === "paybill" ? "#000" : colors.textMuted} />
            <Text style={[styles.methodText, payMethod === "paybill" && styles.methodTextActive]}>Paybill</Text>
          </Pressable>
        </View>

        {payMethod === "paybill" && (
          <View style={styles.paybillCard}>
            {[
              { label: "Paybill Number", value: "123456" },
              { label: "Account Number", value: "YES-MARY-81" },
              { label: "Amount", value: "KES 5,200" },
            ].map((row) => (
              <View key={row.label} style={styles.paybillRow}>
                <Text style={styles.paybillLabel}>{row.label}</Text>
                <Text style={styles.paybillValue}>{row.value}</Text>
              </View>
            ))}
          </View>
        )}

        <Pressable style={styles.payBtn} onPress={handlePay}>
          <Ionicons name={payMethod === "mpesa" ? "flash" : "copy-outline"} size={18} color="#000" />
          <Text style={styles.payBtnText}>
            {payMethod === "mpesa" ? "Send M-Pesa STK Push" : "Copy Paybill Details"}
          </Text>
        </Pressable>

        {/* Auto-pay */}
        <View style={styles.autoPayCard}>
          <Ionicons name="repeat-outline" size={18} color={colors.brandLight} />
          <View style={{ flex: 1 }}>
            <Text style={styles.autoPayTitle}>Auto-Pay Available</Text>
            <Text style={styles.autoPaySub}>Set up automatic M-Pesa deductions on due date</Text>
          </View>
          <Pressable style={styles.autoPayBtn}>
            <Text style={styles.autoPayBtnText}>Enable</Text>
          </Pressable>
        </View>

        {/* Schedule */}
        <Text style={styles.sectionTitle}>Repayment Schedule</Text>
        <View style={styles.scheduleGroup}>
          {SCHEDULE.map((item, idx) => (
            <View key={item.id} style={[styles.scheduleRow, idx < SCHEDULE.length - 1 && styles.scheduleBorder]}>
              <View style={[styles.scheduleIcon, item.status === "due" && styles.scheduleIconDue]}>
                <Ionicons
                  name={item.status === "due" ? "alert-circle-outline" : "ellipse-outline"}
                  size={16}
                  color={item.status === "due" ? colors.warning : colors.textMuted}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.scheduleDate}>{item.date}</Text>
                <Text style={styles.scheduleId}>{item.id}</Text>
              </View>
              <Text style={[styles.scheduleAmount, item.status === "due" && { color: colors.warning }]}>
                {item.amount}
              </Text>
            </View>
          ))}
        </View>

        {/* History */}
        <Text style={styles.sectionTitle}>Payment History</Text>
        <View style={styles.historyGroup}>
          {HISTORY.map((item, idx) => (
            <View key={item.id} style={[styles.historyRow, idx < HISTORY.length - 1 && styles.historyBorder]}>
              <View style={styles.historyIcon}>
                <Ionicons name="checkmark-circle-outline" size={18} color={colors.success} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.historyLabel}>{item.id}</Text>
                <Text style={styles.historyMeta}>{item.date} · {item.method}</Text>
              </View>
              <Text style={styles.historyAmount}>{item.amount}</Text>
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
    backgroundColor: colors.brandGlow,
  },
  scroll: { padding: 18, gap: 14, paddingBottom: 30 },
  title: { color: colors.text, fontSize: 26, fontWeight: "900" },
  subtitle: { color: colors.textMuted, fontSize: 13 },
  dueCard: {
    backgroundColor: colors.panel, borderRadius: 20,
    padding: 20, gap: 10, borderWidth: 1,
    borderColor: colors.border, overflow: "hidden",
  },
  dueGlow: {
    position: "absolute", top: -40, right: -40,
    width: 140, height: 140, borderRadius: 70,
    backgroundColor: colors.brandGlow,
  },
  dueLabel: { color: colors.textMuted, fontSize: 12, fontWeight: "600" },
  dueAmount: { color: colors.text, fontSize: 36, fontWeight: "900" },
  dueRow: { flexDirection: "row", gap: 8 },
  dueBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: "#451a03", borderRadius: 999,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  dueBadgeText: { color: colors.warning, fontSize: 11, fontWeight: "700" },
  dueBadgeGreen: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: colors.successBg, borderRadius: 999,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  dueBadgeGreenText: { color: colors.success, fontSize: 11, fontWeight: "700" },
  progressTrack: { height: 6, backgroundColor: colors.border, borderRadius: 999, overflow: "hidden" },
  progressFill: { width: "62%", height: "100%", backgroundColor: colors.brandLight, borderRadius: 999 },
  progressLabel: { color: colors.textMuted, fontSize: 11 },
  sectionTitle: { color: colors.text, fontWeight: "800", fontSize: 16 },
  methodToggle: {
    flexDirection: "row", gap: 10,
    backgroundColor: colors.panel, borderRadius: 14,
    padding: 6, borderWidth: 1, borderColor: colors.border,
  },
  methodBtn: {
    flex: 1, flexDirection: "row", alignItems: "center",
    justifyContent: "center", gap: 6,
    borderRadius: 10, padding: 10,
  },
  methodBtnActive: { backgroundColor: colors.yellow },
  methodText: { color: colors.textMuted, fontWeight: "700", fontSize: 13 },
  methodTextActive: { color: "#000" },
  paybillCard: {
    backgroundColor: colors.panelAlt, borderRadius: 14,
    padding: 14, gap: 10, borderWidth: 1, borderColor: colors.border,
  },
  paybillRow: { flexDirection: "row", justifyContent: "space-between" },
  paybillLabel: { color: colors.textMuted, fontSize: 13 },
  paybillValue: { color: colors.text, fontWeight: "700", fontSize: 13 },
  payBtn: {
    backgroundColor: colors.yellow, borderRadius: 14,
    padding: 15, flexDirection: "row",
    alignItems: "center", justifyContent: "center", gap: 8,
  },
  payBtnText: { color: "#000", fontWeight: "900", fontSize: 15 },
  autoPayCard: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: colors.brandGlow, borderRadius: 14,
    padding: 14, borderWidth: 1, borderColor: colors.brandLight + "44",
  },
  autoPayTitle: { color: colors.text, fontWeight: "700", fontSize: 14 },
  autoPaySub: { color: colors.textMuted, fontSize: 12 },
  autoPayBtn: {
    backgroundColor: colors.brandLight, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  autoPayBtnText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  scheduleGroup: {
    backgroundColor: colors.panel, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border, overflow: "hidden",
  },
  scheduleRow: { flexDirection: "row", alignItems: "center", gap: 10, padding: 14 },
  scheduleBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  scheduleIcon: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: colors.panelAlt,
    alignItems: "center", justifyContent: "center",
  },
  scheduleIconDue: { backgroundColor: "#451a03" },
  scheduleDate: { color: colors.text, fontWeight: "700", fontSize: 13 },
  scheduleId: { color: colors.textMuted, fontSize: 11 },
  scheduleAmount: { color: colors.text, fontWeight: "800", fontSize: 14 },
  historyGroup: {
    backgroundColor: colors.panel, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border, overflow: "hidden",
  },
  historyRow: { flexDirection: "row", alignItems: "center", gap: 10, padding: 14 },
  historyBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  historyIcon: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: colors.successBg,
    alignItems: "center", justifyContent: "center",
  },
  historyLabel: { color: colors.text, fontWeight: "700", fontSize: 13 },
  historyMeta: { color: colors.textMuted, fontSize: 11 },
  historyAmount: { color: colors.success, fontWeight: "800", fontSize: 14 },
});
