import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppStackParamList } from "../../types/navigation";
import { colors } from "../../theme";

type Props = NativeStackScreenProps<AppStackParamList, "LoanDetail">;

type LoanStatus = "submitted" | "evaluation" | "approved" | "disbursed" | "rejected";

type Loan = {
  id: string;
  product: string;
  amount: string;
  tenure: string;
  purpose: string;
  appliedDate: string;
  status: LoanStatus;
  outstanding?: string;
  nextDue?: string;
  nextAmount?: string;
  disbursedDate?: string;
  mpesa?: string;
  processingFee?: string;
  monthlyInstallment?: string;
};

const LOANS: Record<string, Loan> = {
  "LN-1001": {
    id: "LN-1001", product: "Salary Loan", amount: "KES 80,000",
    tenure: "12 months", purpose: "Business capital", appliedDate: "2 May 2026",
    status: "disbursed", outstanding: "KES 62,400", nextDue: "17 Jun 2026",
    nextAmount: "KES 5,200", disbursedDate: "3 May 2026",
    mpesa: "+254 712 000 111", processingFee: "KES 1,200", monthlyInstallment: "KES 7,467",
  },
  "LN-1002": {
    id: "LN-1002", product: "Market Bond", amount: "KES 50,000",
    tenure: "6 months", purpose: "Stock purchase", appliedDate: "11 May 2026",
    status: "evaluation", processingFee: "KES 750", monthlyInstallment: "KES 9,333",
  },
  "LN-1003": {
    id: "LN-1003", product: "Group Loan", amount: "KES 120,000",
    tenure: "18 months", purpose: "Equipment", appliedDate: "9 May 2026",
    status: "approved", mpesa: "+254 712 000 111",
    processingFee: "KES 1,800", monthlyInstallment: "KES 7,467",
  },
};

const PIPELINE_STEPS = [
  { key: "submitted",  label: "Submitted",    icon: "cloud-upload-outline"     as const },
  { key: "evaluation", label: "Under Review", icon: "search-outline"           as const },
  { key: "approved",   label: "Approved",     icon: "checkmark-circle-outline" as const },
  { key: "disbursed",  label: "Disbursed",    icon: "flash-outline"            as const },
];

const STATUS_ORDER: LoanStatus[] = ["submitted", "evaluation", "approved", "disbursed"];

/* ── StyleSheets defined BEFORE components that use them ── */

const p = StyleSheet.create({
  wrap: { gap: 16 },
  lineTrack: {
    position: "absolute", top: 18, left: "12.5%" as unknown as number, right: "12.5%" as unknown as number,
    height: 3, backgroundColor: colors.border, borderRadius: 999, overflow: "hidden", zIndex: 0,
  },
  lineFill: { height: "100%", backgroundColor: colors.yellow, borderRadius: 999 },
  stepsRow: { flexDirection: "row", justifyContent: "space-between", zIndex: 1 },
  stepCol: { alignItems: "center", gap: 6, flex: 1 },
  stepDot: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: "center", justifyContent: "center",
    borderWidth: 2, borderColor: colors.border, backgroundColor: colors.panel,
  },
  stepDotDone:    { backgroundColor: colors.yellow, borderColor: colors.yellow },
  stepDotActive:  { backgroundColor: colors.yellow, borderColor: colors.yellow, elevation: 4 },
  stepDotPending: { backgroundColor: colors.panel,  borderColor: colors.border },
  stepLabel:       { color: colors.textMuted, fontSize: 10, fontWeight: "600" as const, textAlign: "center" as const },
  stepLabelActive: { color: colors.yellow,    fontWeight: "800" as const },
  stepLabelDone:   { color: colors.text,      fontWeight: "700" as const },
  activePill: {
    backgroundColor: colors.yellowGlow, borderRadius: 999,
    paddingHorizontal: 6, paddingVertical: 2,
    borderWidth: 1, borderColor: colors.yellowDark + "44",
  },
  activePillText: { color: colors.yellow, fontSize: 9, fontWeight: "800" as const },
  currentDetail: {
    flexDirection: "row", alignItems: "flex-start", gap: 8,
    backgroundColor: colors.brandGlow, borderRadius: 12,
    padding: 12, borderWidth: 1, borderColor: colors.brandLight + "33",
  },
  currentDetailText: { color: "#bfdbfe", fontSize: 13, lineHeight: 18, flex: 1 },
  rejectedCard: {
    backgroundColor: colors.dangerBg, borderRadius: 16, padding: 20,
    alignItems: "center", gap: 8, borderWidth: 1, borderColor: colors.danger + "44",
  },
  rejectedIcon: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.dangerBg, alignItems: "center", justifyContent: "center",
  },
  rejectedTitle: { color: colors.danger, fontSize: 18, fontWeight: "800" as const },
  rejectedSub:   { color: colors.textMuted, fontSize: 13, textAlign: "center" as const },
});

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  glowBlue:   { position: "absolute", top: -60,  right: -40, width: 200, height: 200, borderRadius: 100, backgroundColor: colors.brandGlow  },
  glowYellow: { position: "absolute", bottom: 80, left: -60, width: 180, height: 180, borderRadius: 90,  backgroundColor: colors.yellowGlow },
  scroll: { padding: 18, gap: 14, paddingBottom: 40 },

  heroCard: { backgroundColor: colors.panel, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: colors.border, overflow: "hidden", gap: 10 },
  heroGlow: { position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: 70, backgroundColor: colors.brandGlow },
  heroTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  productIconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  loanId:      { color: colors.brandLight, fontSize: 12, fontWeight: "700" as const },
  productName: { color: colors.text, fontSize: 15, fontWeight: "800" as const },
  statusBadge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  statusBadgeText: { fontSize: 11, fontWeight: "800" as const },
  heroAmount: { color: colors.text, fontSize: 32, fontWeight: "900" as const, letterSpacing: -0.5 },
  heroMeta: { flexDirection: "row", gap: 16 },
  heroMetaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  heroMetaText: { color: colors.textMuted, fontSize: 12 },

  sectionTitle: { color: colors.text, fontWeight: "800" as const, fontSize: 16 },
  pipelineCard: { backgroundColor: colors.panel, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: colors.border },

  statsRow: { flexDirection: "row", gap: 10 },
  statCard: { flex: 1, backgroundColor: colors.panel, borderRadius: 14, padding: 12, gap: 4, borderWidth: 1, borderColor: colors.border, alignItems: "center" },
  statValue: { color: colors.text, fontWeight: "800" as const, fontSize: 13, textAlign: "center" as const },
  statLabel: { color: colors.textMuted, fontSize: 10, textAlign: "center" as const },

  repaidCard: { backgroundColor: colors.panel, borderRadius: 14, padding: 14, gap: 8, borderWidth: 1, borderColor: colors.border },
  repaidRow:  { flexDirection: "row", justifyContent: "space-between" },
  repaidLabel: { color: colors.text, fontWeight: "700" as const, fontSize: 13 },
  repaidPct:   { color: colors.brandLight, fontWeight: "700" as const, fontSize: 13 },
  progressTrack: { height: 6, backgroundColor: colors.border, borderRadius: 999, overflow: "hidden" },
  progressFill:  { height: "100%", backgroundColor: colors.brandLight, borderRadius: 999 },
  repaidSub: { color: colors.textMuted, fontSize: 11 },

  detailsCard: { backgroundColor: colors.panel, borderRadius: 16, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  detailRow:       { flexDirection: "row", justifyContent: "space-between", padding: 14 },
  detailRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  detailLabel: { color: colors.textMuted, fontSize: 13 },
  detailValue: { color: colors.text, fontWeight: "700" as const, fontSize: 13, maxWidth: "55%" as unknown as number, textAlign: "right" as const },

  payBtn:     { backgroundColor: colors.yellow, borderRadius: 14, padding: 15, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  payBtnText: { color: "#000", fontWeight: "900" as const, fontSize: 15 },
  reapplyBtn:     { backgroundColor: colors.yellowGlow, borderRadius: 14, padding: 15, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderWidth: 1, borderColor: colors.yellowDark + "44" },
  reapplyBtnText: { color: colors.yellow, fontWeight: "900" as const, fontSize: 15 },

  supportRow:  { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: colors.panel, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: colors.border },
  supportText: { color: colors.textMuted, fontSize: 13, flex: 1 },

  notFound:     { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  notFoundText: { color: colors.textMuted, fontSize: 16 },
  backBtn:      { backgroundColor: colors.panel, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: colors.border },
  backBtnText:  { color: colors.text, fontWeight: "700" as const },
});

/* ── PipelineTracker ── */
function PipelineTracker({ status }: { status: LoanStatus }) {
  const currentIdx = status === "rejected" ? -1 : STATUS_ORDER.indexOf(status);
  const lineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (currentIdx < 0) return;
    Animated.timing(lineAnim, {
      toValue: currentIdx / (PIPELINE_STEPS.length - 1),
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, []);

  if (status === "rejected") {
    return (
      <View style={p.rejectedCard}>
        <View style={p.rejectedIcon}>
          <Ionicons name="close-circle" size={32} color={colors.danger} />
        </View>
        <Text style={p.rejectedTitle}>Application Rejected</Text>
        <Text style={p.rejectedSub}>Contact support for more information or apply again.</Text>
      </View>
    );
  }

  const lineWidth = lineAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });

  return (
    <View style={p.wrap}>
      {/* Track */}
      <View style={p.lineTrack}>
        <Animated.View style={[p.lineFill, { width: lineWidth }]} />
      </View>

      {/* Dots */}
      <View style={p.stepsRow}>
        {PIPELINE_STEPS.map((step, idx) => {
          const done   = idx < currentIdx;
          const active = idx === currentIdx;
          return (
            <View key={step.key} style={p.stepCol}>
              <View style={[p.stepDot, done && p.stepDotDone, active && p.stepDotActive, !done && !active && p.stepDotPending]}>
                {done
                  ? <Ionicons name="checkmark" size={14} color="#000" />
                  : <Ionicons name={step.icon} size={14} color={active ? "#000" : colors.textMuted} />
                }
              </View>
              <Text style={[p.stepLabel, active && p.stepLabelActive, done && p.stepLabelDone]}>
                {step.label}
              </Text>
              {active && (
                <View style={p.activePill}>
                  <Text style={p.activePillText}>Current</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Status description */}
      <View style={p.currentDetail}>
        <Ionicons name="information-circle-outline" size={15} color={colors.brandLight} />
        <Text style={p.currentDetailText}>
          {status === "submitted"  ? "Your application has been received and is queued for review." :
           status === "evaluation" ? "A loan officer is reviewing your application. This usually takes 2–4 hours." :
           status === "approved"   ? "Your loan is approved! Disbursement to M-Pesa will happen within 2 hours." :
                                     "Funds have been sent to your M-Pesa. Check your messages for confirmation."}
        </Text>
      </View>
    </View>
  );
}

/* ── LoanDetailScreen ── */
export function LoanDetailScreen({ route, navigation }: Props) {
  const loan = LOANS[route.params.loanId];
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  if (!loan) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.notFound}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.textMuted} />
          <Text style={s.notFoundText}>Loan not found</Text>
          <Pressable style={s.backBtn} onPress={() => navigation.goBack()}>
            <Text style={s.backBtnText}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const statusConfig: Record<LoanStatus, { label: string; color: string; bg: string }> = {
    submitted:  { label: "Submitted",    color: colors.brandLight, bg: colors.brandGlow  },
    evaluation: { label: "Under Review", color: colors.warning,    bg: "#451a03"         },
    approved:   { label: "Approved",     color: colors.yellow,     bg: colors.yellowGlow },
    disbursed:  { label: "Active",       color: colors.success,    bg: colors.successBg  },
    rejected:   { label: "Rejected",     color: colors.danger,     bg: colors.dangerBg   },
  };
  const sc = statusConfig[loan.status];

  const detailRows = [
    { label: "Loan ID",             value: loan.id },
    { label: "Product",             value: loan.product },
    { label: "Amount",              value: loan.amount },
    { label: "Tenure",              value: loan.tenure },
    { label: "Purpose",             value: loan.purpose },
    { label: "Processing Fee",      value: loan.processingFee ?? "—" },
    { label: "Monthly Installment", value: loan.monthlyInstallment ?? "—" },
    ...(loan.disbursedDate ? [{ label: "Disbursed On", value: loan.disbursedDate }] : []),
    ...(loan.mpesa         ? [{ label: "Disbursed To", value: loan.mpesa }]         : []),
  ];

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.glowBlue} />
      <View style={s.glowYellow} />
      <Animated.ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
        style={{ opacity: fadeIn }}
      >
        {/* Hero */}
        <View style={s.heroCard}>
          <View style={s.heroGlow} />
          <View style={s.heroTop}>
            <View style={[s.productIconWrap, { backgroundColor: "#3b82f622" }]}>
              <Ionicons name="briefcase-outline" size={22} color="#3b82f6" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.loanId}>{loan.id}</Text>
              <Text style={s.productName}>{loan.product}</Text>
            </View>
            <View style={[s.statusBadge, { backgroundColor: sc.bg }]}>
              <Text style={[s.statusBadgeText, { color: sc.color }]}>{sc.label}</Text>
            </View>
          </View>
          <Text style={s.heroAmount}>{loan.amount}</Text>
          <View style={s.heroMeta}>
            <View style={s.heroMetaItem}>
              <Ionicons name="calendar-outline" size={12} color={colors.textMuted} />
              <Text style={s.heroMetaText}>{loan.tenure}</Text>
            </View>
            <View style={s.heroMetaItem}>
              <Ionicons name="time-outline" size={12} color={colors.textMuted} />
              <Text style={s.heroMetaText}>Applied {loan.appliedDate}</Text>
            </View>
          </View>
        </View>

        {/* Pipeline */}
        <Text style={s.sectionTitle}>Application Status</Text>
        <View style={s.pipelineCard}>
          <PipelineTracker status={loan.status} />
        </View>

        {/* Active loan stats */}
        {loan.status === "disbursed" && (
          <>
            <Text style={s.sectionTitle}>Loan Summary</Text>
            <View style={s.statsRow}>
              <View style={s.statCard}>
                <Ionicons name="alert-circle-outline" size={18} color={colors.warning} />
                <Text style={s.statValue}>{loan.outstanding}</Text>
                <Text style={s.statLabel}>Outstanding</Text>
              </View>
              <View style={s.statCard}>
                <Ionicons name="calendar-outline" size={18} color={colors.brandLight} />
                <Text style={s.statValue}>{loan.nextAmount}</Text>
                <Text style={s.statLabel}>Next Due</Text>
              </View>
              <View style={s.statCard}>
                <Ionicons name="time-outline" size={18} color={colors.textMuted} />
                <Text style={[s.statValue, { fontSize: 11 }]}>{loan.nextDue}</Text>
                <Text style={s.statLabel}>Due Date</Text>
              </View>
            </View>
            <View style={s.repaidCard}>
              <View style={s.repaidRow}>
                <Text style={s.repaidLabel}>Repayment Progress</Text>
                <Text style={s.repaidPct}>22% repaid</Text>
              </View>
              <View style={s.progressTrack}>
                <View style={[s.progressFill, { width: "22%" }]} />
              </View>
              <Text style={s.repaidSub}>KES 17,600 of KES 80,000 repaid</Text>
            </View>
          </>
        )}

        {/* Details */}
        <Text style={s.sectionTitle}>Loan Details</Text>
        <View style={s.detailsCard}>
          {detailRows.map((row, idx) => (
            <View key={row.label} style={[s.detailRow, idx < detailRows.length - 1 && s.detailRowBorder]}>
              <Text style={s.detailLabel}>{row.label}</Text>
              <Text style={s.detailValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* CTAs */}
        {loan.status === "disbursed" && (
          <Pressable style={s.payBtn} onPress={() => navigation.navigate("MainTabs")}>
            <Ionicons name="flash" size={18} color="#000" />
            <Text style={s.payBtnText}>Make a Repayment</Text>
          </Pressable>
        )}
        {loan.status === "rejected" && (
          <Pressable style={s.reapplyBtn} onPress={() => navigation.navigate("ApplyLoan")}>
            <Ionicons name="refresh-outline" size={18} color={colors.yellow} />
            <Text style={s.reapplyBtnText}>Apply Again</Text>
          </Pressable>
        )}

        <Pressable style={s.supportRow} onPress={() => navigation.navigate("Support")}>
          <Ionicons name="chatbubble-ellipses-outline" size={16} color={colors.brandLight} />
          <Text style={s.supportText}>Questions about this loan? Contact support</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.textMuted} />
        </Pressable>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
