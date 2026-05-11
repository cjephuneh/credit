import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AppStackParamList } from "../../types/navigation";
import { colors } from "../../theme";

type Props = NativeStackScreenProps<AppStackParamList, "ApplyLoan">;

type Step = 1 | 2 | 3 | 4 | 5;

const LOAN_PRODUCTS = [
  { id: "salary", label: "Salary Loan", range: "KES 10K – 300K", icon: "briefcase-outline" as const, color: "#3b82f6" },
  { id: "market", label: "Market Bond", range: "KES 5K – 50K", icon: "storefront-outline" as const, color: "#22c55e" },
  { id: "boda", label: "Boda Financing", range: "KES 30K – 150K", icon: "bicycle-outline" as const, color: "#f97316" },
  { id: "group", label: "Group Loan", range: "KES 20K – 500K", icon: "people-outline" as const, color: "#a78bfa" },
];

const TENURES = ["3 months", "6 months", "12 months", "18 months", "24 months"];
const PURPOSES = ["Business capital", "School fees", "Medical", "Home improvement", "Asset purchase", "Other"];

function StepIndicator({ current, total }: { current: Step; total: number }) {
  return (
    <View style={ind.wrap}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[ind.dot, i + 1 < current && ind.dotDone, i + 1 === current && ind.dotActive]} />
      ))}
      <Text style={ind.label}>Step {current} of {total}</Text>
    </View>
  );
}

const ind = StyleSheet.create({
  wrap: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#1f2937" },
  dotActive: { backgroundColor: "#facc15", width: 20 },
  dotDone: { backgroundColor: "#22c55e" },
  label: { color: "#94a3b8", fontSize: 12, marginLeft: 6 },
});

export function ApplyLoanScreen({ navigation }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [product, setProduct] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState<string | null>(null);
  const [purpose, setPurpose] = useState<string | null>(null);
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const numAmount = parseInt(amount.replace(/\D/g, "") || "0");
  const tenureMonths = tenure ? parseInt(tenure) : 0;
  const processingFee = Math.round(numAmount * 0.015);
  const monthlyInstallment = tenureMonths > 0 ? Math.round((numAmount * 1.12) / tenureMonths) : 0;

  const next = () => setStep((s) => Math.min(s + 1, 5) as Step);
  const back = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const handleSubmit = () => {
    if (!agreed) { Alert.alert("Please accept the terms to continue."); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.successScreen}>
          <View style={styles.successRing}>
            <Ionicons name="checkmark-circle" size={72} color={colors.success} />
          </View>
          <Text style={styles.successTitle}>Application Submitted!</Text>
          <Text style={styles.successSub}>
            Your loan application for KES {numAmount.toLocaleString()} is under review. You will receive an M-Pesa notification within 2 hours.
          </Text>
          <View style={styles.refCard}>
            <Text style={styles.refLabel}>Reference Number</Text>
            <Text style={styles.refValue}>LN-{Math.floor(Math.random() * 90000) + 10000}</Text>
          </View>
          <View style={styles.summaryList}>
            {[
              { label: "Product", value: LOAN_PRODUCTS.find((p) => p.id === product)?.label ?? "" },
              { label: "Amount", value: "KES " + numAmount.toLocaleString() },
              { label: "Tenure", value: tenure ?? "" },
              { label: "Monthly Installment", value: "KES " + monthlyInstallment.toLocaleString() },
              { label: "Disbursement to", value: "+254 " + mpesaPhone },
            ].map((row) => (
              <View key={row.label} style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{row.label}</Text>
                <Text style={styles.summaryValue}>{row.value}</Text>
              </View>
            ))}
          </View>
          <Pressable style={styles.homeBtn} onPress={() => navigation.navigate("MainTabs")}>
            <Ionicons name="home-outline" size={18} color="#000" />
            <Text style={styles.homeBtnText}>Back to Home</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.glow} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <StepIndicator current={step} total={5} />

        {step === 1 && (
          <View style={styles.stepWrap}>
            <Text style={styles.stepTitle}>Choose Loan Type</Text>
            <Text style={styles.stepSub}>Select the product that fits your needs</Text>
            {LOAN_PRODUCTS.map((p) => (
              <Pressable
                key={p.id}
                style={[styles.productCard, product === p.id && styles.productCardActive]}
                onPress={() => setProduct(p.id)}
              >
                <View style={[styles.productIcon, { backgroundColor: p.color + "22" }]}>
                  <Ionicons name={p.icon} size={22} color={p.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.productLabel}>{p.label}</Text>
                  <Text style={[styles.productRange, { color: p.color }]}>{p.range}</Text>
                </View>
                {product === p.id && <Ionicons name="checkmark-circle" size={22} color={colors.yellow} />}
              </Pressable>
            ))}
            <Pressable
              style={[styles.nextBtn, !product && styles.nextBtnDisabled]}
              onPress={() => product ? next() : Alert.alert("Select a loan type to continue")}
            >
              <Text style={styles.nextBtnText}>Continue</Text>
              <Ionicons name="arrow-forward" size={16} color="#000" />
            </Pressable>
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepWrap}>
            <Text style={styles.stepTitle}>Loan Details</Text>
            <Text style={styles.stepSub}>Enter the amount and repayment period</Text>
            <Text style={styles.fieldLabel}>Loan Amount (KES)</Text>
            <View style={styles.inputWrap}>
              <Text style={styles.inputPrefix}>KES</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 50,000"
                placeholderTextColor={colors.textMuted}
                keyboardType="number-pad"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
            <Text style={styles.fieldLabel}>Repayment Tenure</Text>
            <View style={styles.chipRow}>
              {TENURES.map((t) => (
                <Pressable
                  key={t}
                  style={[styles.chip, tenure === t && styles.chipActive]}
                  onPress={() => setTenure(t)}
                >
                  <Text style={[styles.chipText, tenure === t && styles.chipTextActive]}>{t}</Text>
                </Pressable>
              ))}
            </View>
            {numAmount > 0 && tenureMonths > 0 && (
              <View style={styles.breakdownCard}>
                <Text style={styles.breakdownTitle}>Loan Breakdown</Text>
                {[
                  { label: "Principal", value: "KES " + numAmount.toLocaleString() },
                  { label: "Processing Fee (1.5%)", value: "KES " + processingFee.toLocaleString() },
                  { label: "Monthly Installment", value: "KES " + monthlyInstallment.toLocaleString() },
                  { label: "Disbursement via", value: "M-Pesa" },
                ].map((row) => (
                  <View key={row.label} style={styles.breakdownRow}>
                    <Text style={styles.breakdownLabel}>{row.label}</Text>
                    <Text style={styles.breakdownValue}>{row.value}</Text>
                  </View>
                ))}
              </View>
            )}
            <View style={styles.btnRow}>
              <Pressable style={styles.backBtn} onPress={back}>
                <Ionicons name="arrow-back" size={16} color={colors.textMuted} />
                <Text style={styles.backBtnText}>Back</Text>
              </Pressable>
              <Pressable
                style={[styles.nextBtn, styles.nextBtnFlex, (!amount || !tenure) && styles.nextBtnDisabled]}
                onPress={() => (amount && tenure) ? next() : Alert.alert("Enter amount and select tenure")}
              >
                <Text style={styles.nextBtnText}>Continue</Text>
                <Ionicons name="arrow-forward" size={16} color="#000" />
              </Pressable>
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.stepWrap}>
            <Text style={styles.stepTitle}>Loan Purpose</Text>
            <Text style={styles.stepSub}>Help us understand how you will use the funds</Text>
            <View style={styles.purposeGrid}>
              {PURPOSES.map((p) => (
                <Pressable
                  key={p}
                  style={[styles.purposeChip, purpose === p && styles.purposeChipActive]}
                  onPress={() => setPurpose(p)}
                >
                  <Text style={[styles.purposeText, purpose === p && styles.purposeTextActive]}>{p}</Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.btnRow}>
              <Pressable style={styles.backBtn} onPress={back}>
                <Ionicons name="arrow-back" size={16} color={colors.textMuted} />
                <Text style={styles.backBtnText}>Back</Text>
              </Pressable>
              <Pressable
                style={[styles.nextBtn, styles.nextBtnFlex, !purpose && styles.nextBtnDisabled]}
                onPress={() => purpose ? next() : Alert.alert("Select a loan purpose")}
              >
                <Text style={styles.nextBtnText}>Continue</Text>
                <Ionicons name="arrow-forward" size={16} color="#000" />
              </Pressable>
            </View>
          </View>
        )}

        {step === 4 && (
          <View style={styles.stepWrap}>
            <Text style={styles.stepTitle}>Disbursement Details</Text>
            <Text style={styles.stepSub}>Where should we send the money?</Text>
            <View style={styles.mpesaCard}>
              <View style={styles.mpesaHeader}>
                <View style={styles.mpesaIcon}>
                  <Ionicons name="phone-portrait-outline" size={22} color={colors.success} />
                </View>
                <View>
                  <Text style={styles.mpesaTitle}>M-Pesa</Text>
                  <Text style={styles.mpesaSub}>Instant disbursement</Text>
                </View>
              </View>
              <Text style={styles.fieldLabel}>M-Pesa Phone Number</Text>
              <View style={styles.inputWrap}>
                <Text style={styles.inputPrefix}>+254</Text>
                <TextInput
                  style={styles.input}
                  placeholder="7XX XXX XXX"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="phone-pad"
                  value={mpesaPhone}
                  onChangeText={setMpesaPhone}
                />
              </View>
            </View>
            <View style={styles.infoBox}>
              <Ionicons name="information-circle-outline" size={16} color={colors.brandLight} />
              <Text style={styles.infoText}>Funds are disbursed within 2 hours of approval. Ensure the number is registered to your name.</Text>
            </View>
            <View style={styles.btnRow}>
              <Pressable style={styles.backBtn} onPress={back}>
                <Ionicons name="arrow-back" size={16} color={colors.textMuted} />
                <Text style={styles.backBtnText}>Back</Text>
              </Pressable>
              <Pressable
                style={[styles.nextBtn, styles.nextBtnFlex, !mpesaPhone && styles.nextBtnDisabled]}
                onPress={() => mpesaPhone ? next() : Alert.alert("Enter your M-Pesa number")}
              >
                <Text style={styles.nextBtnText}>Review Application</Text>
                <Ionicons name="arrow-forward" size={16} color="#000" />
              </Pressable>
            </View>
          </View>
        )}

        {step === 5 && (
          <View style={styles.stepWrap}>
            <Text style={styles.stepTitle}>Review and Submit</Text>
            <Text style={styles.stepSub}>Confirm your application details</Text>
            <View style={styles.reviewCard}>
              {[
                { label: "Loan Type", value: LOAN_PRODUCTS.find((p) => p.id === product)?.label ?? "" },
                { label: "Amount", value: "KES " + numAmount.toLocaleString() },
                { label: "Tenure", value: tenure ?? "" },
                { label: "Purpose", value: purpose ?? "" },
                { label: "Processing Fee", value: "KES " + processingFee.toLocaleString() },
                { label: "Monthly Installment", value: "KES " + monthlyInstallment.toLocaleString() },
                { label: "Disbursement to", value: "+254 " + mpesaPhone },
              ].map((row, idx, arr) => (
                <View key={row.label} style={[styles.reviewRow, idx < arr.length - 1 && styles.reviewRowBorder]}>
                  <Text style={styles.reviewLabel}>{row.label}</Text>
                  <Text style={styles.reviewValue}>{row.value}</Text>
                </View>
              ))}
            </View>
            <Pressable style={styles.termsRow} onPress={() => setAgreed((v) => !v)}>
              <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                {agreed && <Ionicons name="checkmark" size={12} color="#000" />}
              </View>
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.termsLink}>Terms and Conditions</Text> and confirm all details are correct.
              </Text>
            </Pressable>
            <View style={styles.btnRow}>
              <Pressable style={styles.backBtn} onPress={back}>
                <Ionicons name="arrow-back" size={16} color={colors.textMuted} />
                <Text style={styles.backBtnText}>Back</Text>
              </Pressable>
              <Pressable
                style={[styles.submitBtn, !agreed && styles.nextBtnDisabled]}
                onPress={handleSubmit}
              >
                <Ionicons name="cloud-upload-outline" size={18} color="#000" />
                <Text style={styles.submitBtnText}>Submit Application</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  glow: {
    position: "absolute", top: -60, right: -40,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: colors.brandGlow,
  },
  scroll: { padding: 18, gap: 16, paddingBottom: 40 },
  stepWrap: { gap: 14 },
  stepTitle: { color: colors.text, fontSize: 22, fontWeight: "900" },
  stepSub: { color: colors.textMuted, fontSize: 13 },
  productCard: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: colors.panel, borderRadius: 14,
    padding: 14, borderWidth: 1, borderColor: colors.border,
  },
  productCardActive: { borderColor: colors.yellow, backgroundColor: colors.yellowGlow },
  productIcon: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  productLabel: { color: colors.text, fontWeight: "700", fontSize: 14 },
  productRange: { fontSize: 12, fontWeight: "600", marginTop: 2 },
  fieldLabel: { color: colors.textMuted, fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  inputWrap: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: colors.panel, borderRadius: 12,
    borderWidth: 1, borderColor: colors.border, paddingHorizontal: 12,
  },
  inputPrefix: { color: colors.textMuted, fontWeight: "700", marginRight: 8 },
  input: { flex: 1, color: colors.text, paddingVertical: 14, fontSize: 15 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 999, backgroundColor: colors.panel,
    borderWidth: 1, borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  chipText: { color: colors.textMuted, fontWeight: "600", fontSize: 13 },
  chipTextActive: { color: "#000" },
  breakdownCard: {
    backgroundColor: colors.gradient1, borderRadius: 14,
    padding: 14, gap: 10,
  },
  breakdownTitle: { color: "#bfdbfe", fontWeight: "800", fontSize: 14, marginBottom: 2 },
  breakdownRow: { flexDirection: "row", justifyContent: "space-between" },
  breakdownLabel: { color: "#93c5fd", fontSize: 13 },
  breakdownValue: { color: "#fff", fontWeight: "700", fontSize: 13 },
  purposeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  purposeChip: {
    paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: 12, backgroundColor: colors.panel,
    borderWidth: 1, borderColor: colors.border,
  },
  purposeChipActive: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  purposeText: { color: colors.textMuted, fontWeight: "600", fontSize: 13 },
  purposeTextActive: { color: "#000" },
  mpesaCard: {
    backgroundColor: colors.panel, borderRadius: 14,
    padding: 14, gap: 12, borderWidth: 1, borderColor: colors.success + "44",
  },
  mpesaHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  mpesaIcon: {
    width: 42, height: 42, borderRadius: 12,
    backgroundColor: colors.successBg,
    alignItems: "center", justifyContent: "center",
  },
  mpesaTitle: { color: colors.text, fontWeight: "800", fontSize: 15 },
  mpesaSub: { color: colors.success, fontSize: 12 },
  infoBox: {
    flexDirection: "row", alignItems: "flex-start", gap: 8,
    backgroundColor: colors.brandGlow, borderRadius: 12,
    padding: 12, borderWidth: 1, borderColor: colors.brandLight + "44",
  },
  infoText: { color: "#bfdbfe", fontSize: 12, lineHeight: 18, flex: 1 },
  reviewCard: {
    backgroundColor: colors.panel, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border, overflow: "hidden",
  },
  reviewRow: { flexDirection: "row", justifyContent: "space-between", padding: 14 },
  reviewRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  reviewLabel: { color: colors.textMuted, fontSize: 13 },
  reviewValue: { color: colors.text, fontWeight: "700", fontSize: 13, maxWidth: "55%", textAlign: "right" },
  termsRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 2, borderColor: colors.border,
    alignItems: "center", justifyContent: "center", marginTop: 1,
  },
  checkboxChecked: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  termsText: { color: colors.textMuted, fontSize: 13, flex: 1, lineHeight: 20 },
  termsLink: { color: colors.brandLight, fontWeight: "700" },
  btnRow: { flexDirection: "row", gap: 10 },
  backBtn: {
    flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: colors.panel, borderRadius: 12,
    padding: 14, borderWidth: 1, borderColor: colors.border,
  },
  backBtnText: { color: colors.textMuted, fontWeight: "700" },
  nextBtn: {
    backgroundColor: colors.yellow, borderRadius: 12,
    padding: 14, flexDirection: "row",
    alignItems: "center", justifyContent: "center", gap: 8,
  },
  nextBtnFlex: { flex: 1 },
  nextBtnDisabled: { opacity: 0.4 },
  nextBtnText: { color: "#000", fontWeight: "900", fontSize: 15 },
  submitBtn: {
    flex: 1, backgroundColor: colors.yellow, borderRadius: 12,
    padding: 14, flexDirection: "row",
    alignItems: "center", justifyContent: "center", gap: 8,
  },
  submitBtnText: { color: "#000", fontWeight: "900", fontSize: 15 },
  successScreen: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 16 },
  successRing: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: colors.successBg,
    alignItems: "center", justifyContent: "center",
  },
  successTitle: { color: colors.text, fontSize: 26, fontWeight: "900", textAlign: "center" },
  successSub: { color: colors.textMuted, textAlign: "center", lineHeight: 22, fontSize: 14 },
  refCard: {
    backgroundColor: colors.panel, borderRadius: 14,
    padding: 16, alignItems: "center", gap: 4,
    borderWidth: 1, borderColor: colors.yellow + "44", width: "100%",
  },
  refLabel: { color: colors.textMuted, fontSize: 12 },
  refValue: { color: colors.yellow, fontSize: 22, fontWeight: "900", letterSpacing: 2 },
  summaryList: {
    backgroundColor: colors.panel, borderRadius: 14,
    borderWidth: 1, borderColor: colors.border,
    overflow: "hidden", width: "100%",
  },
  summaryRow: {
    flexDirection: "row", justifyContent: "space-between",
    padding: 12, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  summaryLabel: { color: colors.textMuted, fontSize: 13 },
  summaryValue: { color: colors.text, fontWeight: "700", fontSize: 13 },
  homeBtn: {
    backgroundColor: colors.yellow, borderRadius: 14,
    padding: 14, flexDirection: "row",
    alignItems: "center", justifyContent: "center",
    gap: 8, width: "100%",
  },
  homeBtnText: { color: "#000", fontWeight: "900", fontSize: 15 },
});
