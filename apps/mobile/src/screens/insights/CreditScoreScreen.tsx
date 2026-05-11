import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme";

type UploadState = "idle" | "uploading" | "analysing" | "done";

type StatementFile = {
  name: string;
  size: string;
  type: "mpesa" | "bank";
};

type ScoreData = {
  score: number;
  rating: string;
  ratingColor: string;
  percentile: string;
  factors: { label: string; score: number; color: string; detail: string }[];
  insights: { icon: keyof typeof Ionicons.glyphMap; text: string; positive: boolean }[];
  monthlyIncome: string;
  avgBalance: string;
  txCount: number;
  loanEligibility: string;
};

function computeScore(files: StatementFile[]): ScoreData {
  // Simulate score based on number and type of statements uploaded
  const hasMpesa = files.some((f) => f.type === "mpesa");
  const hasBank  = files.some((f) => f.type === "bank");
  const base = 580 + (hasMpesa ? 80 : 0) + (hasBank ? 82 : 0) + files.length * 10;
  const score = Math.min(base, 850);

  const rating =
    score >= 750 ? "Excellent" :
    score >= 700 ? "Good" :
    score >= 650 ? "Fair" : "Needs Work";

  const ratingColor =
    score >= 750 ? colors.success :
    score >= 700 ? colors.brandLight :
    score >= 650 ? colors.yellow : colors.danger;

  const percentile =
    score >= 750 ? "Top 15%" :
    score >= 700 ? "Top 30%" :
    score >= 650 ? "Top 50%" : "Bottom 40%";

  return {
    score,
    rating,
    ratingColor,
    percentile,
    factors: [
      { label: "Income Consistency",  score: hasMpesa ? 88 : 60, color: colors.success,    detail: "Regular inflows detected" },
      { label: "Spending Behaviour",  score: hasBank  ? 74 : 55, color: colors.yellow,     detail: "Moderate discretionary spend" },
      { label: "Balance Maintenance", score: hasBank  ? 81 : 62, color: "#3b82f6",         detail: "Avg balance above KES 5K" },
      { label: "Loan Repayment",      score: 92,                  color: "#a78bfa",         detail: "No missed payments on record" },
    ],
    insights: [
      { icon: "trending-up-outline",      text: "Consistent M-Pesa inflows over 3+ months detected.",         positive: true  },
      { icon: "checkmark-circle-outline", text: "No returned cheques or failed debit orders found.",           positive: true  },
      { icon: "alert-circle-outline",     text: "High utility spend in Feb — consider reducing fixed costs.",  positive: false },
      { icon: "star-outline",             text: "Salary credit pattern identified — eligible for salary loan.", positive: true  },
    ],
    monthlyIncome: hasMpesa ? "KES 48,200" : "KES 32,000",
    avgBalance:    hasBank  ? "KES 12,400" : "KES 6,800",
    txCount:       files.length * 47 + 23,
    loanEligibility: score >= 700 ? "KES 150,000" : score >= 650 ? "KES 80,000" : "KES 30,000",
  };
}

export function CreditScoreScreen() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [files, setFiles] = useState<StatementFile[]>([]);
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [progress, setProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  const pickDocument = async (type: "mpesa" | "bank") => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "text/csv", "application/vnd.ms-excel",
               "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
        copyToCacheDirectory: false,
      });
      if (result.canceled) return;
      const asset = result.assets[0];
      const sizeKB = asset.size ? Math.round(asset.size / 1024) : 0;
      const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
      setFiles((prev) => {
        const filtered = prev.filter((f) => f.type !== type);
        return [...filtered, { name: asset.name, size: sizeStr, type }];
      });
    } catch {
      Alert.alert("Upload failed", "Could not read the file. Please try again.");
    }
  };

  const removeFile = (type: "mpesa" | "bank") => {
    setFiles((prev) => prev.filter((f) => f.type !== type));
  };

  const runAnalysis = () => {
    if (files.length === 0) {
      Alert.alert("No statements", "Please upload at least one M-Pesa or bank statement.");
      return;
    }
    setUploadState("uploading");
    setProgress(0);
    progressAnim.setValue(0);

    // Simulate upload progress
    Animated.timing(progressAnim, { toValue: 0.4, duration: 1200, useNativeDriver: false }).start(() => {
      setUploadState("analysing");
      Animated.timing(progressAnim, { toValue: 1, duration: 2000, useNativeDriver: false }).start(() => {
        const data = computeScore(files);
        setScoreData(data);
        setUploadState("done");
        Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true }).start();
      });
    });

    progressAnim.addListener(({ value }) => setProgress(Math.round(value * 100)));
  };

  const reset = () => {
    setUploadState("idle");
    setFiles([]);
    setScoreData(null);
    setProgress(0);
    progressAnim.setValue(0);
    fadeIn.setValue(0);
  };

  const progressWidth = progressAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.glowBlue} />
      <View style={s.glowYellow} />
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        <Text style={s.title}>Credit Insights</Text>
        <Text style={s.subtitle}>Upload your statements to get your credit score instantly</Text>

        {/* ── UPLOAD SECTION (always visible until done) ── */}
        {uploadState !== "done" && (
          <View style={s.uploadSection}>
            <View style={s.uploadHeader}>
              <View style={s.uploadHeaderIcon}>
                <Ionicons name="cloud-upload-outline" size={22} color={colors.yellow} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.uploadTitle}>Upload Statements</Text>
                <Text style={s.uploadSub}>PDF, CSV or Excel · Max 10 MB per file</Text>
              </View>
            </View>

            {/* M-Pesa upload */}
            <View style={s.uploadTypeCard}>
              <View style={s.uploadTypeHeader}>
                <View style={[s.uploadTypeIcon, { backgroundColor: "#22c55e22" }]}>
                  <Ionicons name="phone-portrait-outline" size={20} color={colors.success} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.uploadTypeTitle}>M-Pesa Statement</Text>
                  <Text style={s.uploadTypeSub}>Download from MySafaricom app → Statements</Text>
                </View>
              </View>
              {files.find((f) => f.type === "mpesa") ? (
                <View style={s.fileAttached}>
                  <Ionicons name="document-text-outline" size={16} color={colors.success} />
                  <View style={{ flex: 1 }}>
                    <Text style={s.fileName} numberOfLines={1}>{files.find((f) => f.type === "mpesa")!.name}</Text>
                    <Text style={s.fileSize}>{files.find((f) => f.type === "mpesa")!.size}</Text>
                  </View>
                  <Pressable onPress={() => removeFile("mpesa")} style={s.removeBtn}>
                    <Ionicons name="close-circle" size={18} color={colors.danger} />
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  style={[s.uploadBtn, uploadState !== "idle" && s.uploadBtnDisabled]}
                  onPress={() => uploadState === "idle" && pickDocument("mpesa")}
                >
                  <Ionicons name="add-circle-outline" size={16} color={colors.success} />
                  <Text style={[s.uploadBtnText, { color: colors.success }]}>Choose M-Pesa PDF</Text>
                </Pressable>
              )}
            </View>

            {/* Bank upload */}
            <View style={s.uploadTypeCard}>
              <View style={s.uploadTypeHeader}>
                <View style={[s.uploadTypeIcon, { backgroundColor: "#3b82f622" }]}>
                  <Ionicons name="business-outline" size={20} color={colors.brandLight} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.uploadTypeTitle}>Bank Statement</Text>
                  <Text style={s.uploadTypeSub}>Last 3–6 months from your bank's app or portal</Text>
                </View>
              </View>
              {files.find((f) => f.type === "bank") ? (
                <View style={s.fileAttached}>
                  <Ionicons name="document-text-outline" size={16} color={colors.brandLight} />
                  <View style={{ flex: 1 }}>
                    <Text style={s.fileName} numberOfLines={1}>{files.find((f) => f.type === "bank")!.name}</Text>
                    <Text style={s.fileSize}>{files.find((f) => f.type === "bank")!.size}</Text>
                  </View>
                  <Pressable onPress={() => removeFile("bank")} style={s.removeBtn}>
                    <Ionicons name="close-circle" size={18} color={colors.danger} />
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  style={[s.uploadBtn, uploadState !== "idle" && s.uploadBtnDisabled]}
                  onPress={() => uploadState === "idle" && pickDocument("bank")}
                >
                  <Ionicons name="add-circle-outline" size={16} color={colors.brandLight} />
                  <Text style={[s.uploadBtnText, { color: colors.brandLight }]}>Choose Bank Statement</Text>
                </Pressable>
              )}
            </View>

            {/* Privacy note */}
            <View style={s.privacyNote}>
              <Ionicons name="lock-closed-outline" size={14} color={colors.textMuted} />
              <Text style={s.privacyText}>
                Your statements are encrypted and used only to calculate your score. We never store raw transaction data.
              </Text>
            </View>

            {/* Progress bar during analysis */}
            {(uploadState === "uploading" || uploadState === "analysing") && (
              <View style={s.progressWrap}>
                <View style={s.progressTrack}>
                  <Animated.View style={[s.progressFill, { width: progressWidth }]} />
                </View>
                <Text style={s.progressLabel}>
                  {uploadState === "uploading" ? `Uploading… ${progress}%` : `Analysing transactions… ${progress}%`}
                </Text>
                <View style={s.analysingSteps}>
                  {[
                    { label: "Parsing transactions",  done: progress >= 30 },
                    { label: "Detecting income",      done: progress >= 55 },
                    { label: "Scoring behaviour",     done: progress >= 75 },
                    { label: "Generating report",     done: progress >= 95 },
                  ].map((step) => (
                    <View key={step.label} style={s.analysingStep}>
                      <Ionicons
                        name={step.done ? "checkmark-circle" : "ellipse-outline"}
                        size={14}
                        color={step.done ? colors.success : colors.border}
                      />
                      <Text style={[s.analysingStepText, step.done && { color: colors.success }]}>
                        {step.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Analyse button */}
            {uploadState === "idle" && (
              <Pressable
                style={[s.analyseBtn, files.length === 0 && s.analyseBtnDisabled]}
                onPress={runAnalysis}
              >
                <Ionicons name="flash" size={18} color="#000" />
                <Text style={s.analyseBtnText}>
                  {files.length === 0 ? "Upload a statement to continue" : `Analyse ${files.length} Statement${files.length > 1 ? "s" : ""}`}
                </Text>
              </Pressable>
            )}
          </View>
        )}

        {/* ── SCORE RESULTS ── */}
        {uploadState === "done" && scoreData && (
          <Animated.View style={{ opacity: fadeIn, gap: 14 }}>
            {/* Score hero */}
            <View style={s.scoreBadge}>
              <View style={s.scoreGlow} />
              <View style={s.scoreSourceRow}>
                {files.map((f) => (
                  <View key={f.type} style={s.sourceChip}>
                    <Ionicons
                      name={f.type === "mpesa" ? "phone-portrait-outline" : "business-outline"}
                      size={11}
                      color={f.type === "mpesa" ? colors.success : colors.brandLight}
                    />
                    <Text style={[s.sourceChipText, { color: f.type === "mpesa" ? colors.success : colors.brandLight }]}>
                      {f.type === "mpesa" ? "M-Pesa" : "Bank"}
                    </Text>
                  </View>
                ))}
              </View>
              <Text style={s.scoreLabel}>Your Credit Score</Text>
              <Text style={[s.scoreValue, { color: scoreData.ratingColor }]}>{scoreData.score}</Text>
              <View style={s.scoreRatingRow}>
                <Ionicons name="trending-up-outline" size={16} color={scoreData.ratingColor} />
                <Text style={[s.scoreRatingText, { color: scoreData.ratingColor }]}>
                  {scoreData.rating} · {scoreData.percentile} of borrowers
                </Text>
              </View>
              <View style={s.scoreBar}>
                <View style={[s.scoreBarFill, { width: `${((scoreData.score - 300) / 550) * 100}%`, backgroundColor: scoreData.ratingColor }]} />
              </View>
              <View style={s.scoreRange}>
                <Text style={s.scoreRangeText}>300 · Poor</Text>
                <Text style={s.scoreRangeText}>850 · Excellent</Text>
              </View>
            </View>

            {/* Statement summary */}
            <View style={s.summaryRow}>
              {[
                { label: "Monthly Income",    value: scoreData.monthlyIncome, icon: "trending-up-outline" as const,  color: colors.success    },
                { label: "Avg Balance",       value: scoreData.avgBalance,    icon: "wallet-outline" as const,       color: colors.brandLight  },
                { label: "Transactions",      value: `${scoreData.txCount}`,  icon: "receipt-outline" as const,      color: "#a78bfa"          },
                { label: "Loan Eligibility",  value: scoreData.loanEligibility, icon: "cash-outline" as const,      color: colors.yellow      },
              ].map((item) => (
                <View key={item.label} style={s.summaryCard}>
                  <Ionicons name={item.icon} size={16} color={item.color} />
                  <Text style={[s.summaryValue, { color: item.color }]}>{item.value}</Text>
                  <Text style={s.summaryLabel}>{item.label}</Text>
                </View>
              ))}
            </View>

            {/* Score factors */}
            <Text style={s.sectionTitle}>Score Factors</Text>
            <View style={s.factorsGroup}>
              {scoreData.factors.map((f, idx) => (
                <View key={f.label} style={[s.factorRow, idx < scoreData.factors.length - 1 && s.factorBorder]}>
                  <View style={{ flex: 1 }}>
                    <View style={s.factorTitleRow}>
                      <Text style={s.factorLabel}>{f.label}</Text>
                      <Text style={s.factorDetail}>{f.detail}</Text>
                    </View>
                    <View style={s.factorTrack}>
                      <View style={[s.factorFill, { width: `${f.score}%`, backgroundColor: f.color }]} />
                    </View>
                  </View>
                  <Text style={[s.factorScore, { color: f.color }]}>{f.score}</Text>
                </View>
              ))}
            </View>

            {/* AI insights */}
            <Text style={s.sectionTitle}>Statement Insights</Text>
            {scoreData.insights.map((insight, i) => (
              <View key={i} style={[s.insightCard, insight.positive ? s.insightPositive : s.insightWarning]}>
                <View style={[s.insightIcon, { backgroundColor: insight.positive ? colors.successBg : colors.yellowGlow }]}>
                  <Ionicons name={insight.icon} size={16} color={insight.positive ? colors.success : colors.yellow} />
                </View>
                <Text style={[s.insightText, { color: insight.positive ? colors.success : colors.yellow }]}>
                  {insight.text}
                </Text>
              </View>
            ))}

            {/* How to improve */}
            <Text style={s.sectionTitle}>How to Improve</Text>
            {[
              { icon: "time-outline" as const,         text: "Pay on or before due date for a score boost." },
              { icon: "trending-down-outline" as const, text: "Keep active loan utilization below 75%." },
              { icon: "repeat-outline" as const,        text: "Consistent repayments over 6+ months improve your tier." },
            ].map((tip, i) => (
              <View key={i} style={s.tipCard}>
                <View style={s.tipIcon}>
                  <Ionicons name={tip.icon} size={18} color={colors.yellow} />
                </View>
                <Text style={s.tipText}>{tip.text}</Text>
              </View>
            ))}

            {/* Re-analyse */}
            <Pressable style={s.resetBtn} onPress={reset}>
              <Ionicons name="refresh-outline" size={16} color={colors.brandLight} />
              <Text style={s.resetBtnText}>Upload new statements</Text>
            </Pressable>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: colors.background },
  glowBlue:   { position: "absolute", top: -60,  right: -40, width: 200, height: 200, borderRadius: 100, backgroundColor: colors.brandGlow  },
  glowYellow: { position: "absolute", bottom: 80, left: -60, width: 180, height: 180, borderRadius: 90,  backgroundColor: colors.yellowGlow },
  scroll:     { padding: 18, paddingBottom: 40 },

  title:    { color: colors.text,    fontSize: 24, fontWeight: "900", marginBottom: 4 },
  subtitle: { color: colors.textMuted, fontSize: 13, marginBottom: 16 },

  /* Upload section */
  uploadSection:    { backgroundColor: colors.panel, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border, marginBottom: 14 },
  uploadHeader:     { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
  uploadHeaderIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.yellowGlow, alignItems: "center", justifyContent: "center" },
  uploadTitle:      { color: colors.text, fontWeight: "800", fontSize: 15 },
  uploadSub:        { color: colors.textMuted, fontSize: 12, marginTop: 2 },

  uploadTypeCard:   { backgroundColor: colors.panelAlt, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: colors.border, marginBottom: 10 },
  uploadTypeHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  uploadTypeIcon:   { width: 38, height: 38, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  uploadTypeTitle:  { color: colors.text, fontWeight: "700", fontSize: 14 },
  uploadTypeSub:    { color: colors.textMuted, fontSize: 11, marginTop: 2 },

  fileAttached: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: colors.successBg, borderRadius: 10, padding: 10 },
  fileName:     { color: colors.text, fontWeight: "600", fontSize: 13 },
  fileSize:     { color: colors.textMuted, fontSize: 11 },
  removeBtn:    { padding: 2 },

  uploadBtn:         { flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 10, borderWidth: 1, borderColor: colors.border, padding: 10, justifyContent: "center" },
  uploadBtnDisabled: { opacity: 0.4 },
  uploadBtnText:     { fontWeight: "700", fontSize: 13 },

  privacyNote: { flexDirection: "row", alignItems: "flex-start", gap: 8, backgroundColor: colors.brandGlow, borderRadius: 10, padding: 10, marginTop: 4 },
  privacyText: { color: colors.textMuted, fontSize: 12, flex: 1, lineHeight: 17 },

  progressWrap:  { marginTop: 14 },
  progressTrack: { height: 6, backgroundColor: colors.border, borderRadius: 999, overflow: "hidden", marginBottom: 8 },
  progressFill:  { height: "100%", backgroundColor: colors.yellow, borderRadius: 999 },
  progressLabel: { color: colors.textMuted, fontSize: 12, marginBottom: 10 },

  analysingSteps:    { gap: 6 },
  analysingStep:     { flexDirection: "row", alignItems: "center", gap: 8 },
  analysingStepText: { color: colors.textMuted, fontSize: 13 },

  analyseBtn:         { backgroundColor: colors.yellow, borderRadius: 14, padding: 15, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 10 },
  analyseBtnDisabled: { backgroundColor: colors.border },
  analyseBtnText:     { color: "#000", fontWeight: "900", fontSize: 15 },

  /* Score results */
  scoreBadge:     { backgroundColor: colors.panel, borderRadius: 20, padding: 20, alignItems: "center", borderWidth: 1, borderColor: colors.border, overflow: "hidden", marginBottom: 14 },
  scoreGlow:      { position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: 80, backgroundColor: colors.yellowGlow },
  scoreSourceRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  sourceChip:     { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: colors.panelAlt, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: colors.border },
  sourceChipText: { fontSize: 11, fontWeight: "700" },
  scoreLabel:     { color: colors.textMuted, fontSize: 13, marginBottom: 4 },
  scoreValue:     { fontSize: 72, fontWeight: "900", letterSpacing: -2 },
  scoreRatingRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4, marginBottom: 14 },
  scoreRatingText:{ fontWeight: "700", fontSize: 14 },
  scoreBar:       { width: "100%", height: 8, backgroundColor: colors.border, borderRadius: 999, overflow: "hidden", marginBottom: 6 },
  scoreBarFill:   { height: "100%", borderRadius: 999 },
  scoreRange:     { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  scoreRangeText: { color: colors.textMuted, fontSize: 11 },

  summaryRow:  { flexDirection: "row", gap: 8, marginBottom: 14 },
  summaryCard: { flex: 1, backgroundColor: colors.panel, borderRadius: 12, padding: 10, alignItems: "center", gap: 4, borderWidth: 1, borderColor: colors.border },
  summaryValue:{ fontWeight: "800", fontSize: 12, textAlign: "center" },
  summaryLabel:{ color: colors.textMuted, fontSize: 10, textAlign: "center" },

  sectionTitle: { color: colors.text, fontWeight: "800", fontSize: 16, marginBottom: 10 },

  factorsGroup: { backgroundColor: colors.panel, borderRadius: 16, borderWidth: 1, borderColor: colors.border, overflow: "hidden", marginBottom: 14 },
  factorRow:    { flexDirection: "row", alignItems: "center", gap: 12, padding: 14 },
  factorBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  factorTitleRow:{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  factorLabel:  { color: colors.text, fontWeight: "700", fontSize: 13 },
  factorDetail: { color: colors.textMuted, fontSize: 11 },
  factorTrack:  { height: 5, backgroundColor: colors.border, borderRadius: 999, overflow: "hidden" },
  factorFill:   { height: "100%", borderRadius: 999 },
  factorScore:  { fontWeight: "900", fontSize: 16, minWidth: 32, textAlign: "right" },

  insightCard:     { flexDirection: "row", alignItems: "flex-start", gap: 10, borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1 },
  insightPositive: { backgroundColor: colors.successBg, borderColor: colors.success + "33" },
  insightWarning:  { backgroundColor: colors.yellowGlow, borderColor: colors.yellowDark + "33" },
  insightIcon:     { width: 32, height: 32, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  insightText:     { flex: 1, fontSize: 13, lineHeight: 18, fontWeight: "600" },

  tipCard: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.panel, borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  tipIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.yellowGlow, alignItems: "center", justifyContent: "center" },
  tipText: { color: colors.textMuted, fontSize: 13, flex: 1, lineHeight: 18 },

  resetBtn:     { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: colors.panel, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: colors.border, marginTop: 6 },
  resetBtnText: { color: colors.brandLight, fontWeight: "700", fontSize: 14 },
});
