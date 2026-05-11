import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme";

type StepStatus = "pending" | "active" | "done" | "error";

type KycStep = {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const STEPS: KycStep[] = [
  { id: 1, title: "Upload National ID", description: "Front and back of your government-issued ID", icon: "card-outline" },
  { id: 2, title: "Take a Selfie", description: "Live liveness capture for face match", icon: "camera-outline" },
  { id: 3, title: "Confirm Details", description: "Review your personal information", icon: "person-outline" },
  { id: 4, title: "Submit for Review", description: "We'll verify within 24 hours", icon: "cloud-upload-outline" },
];

export function KycCenterScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepStatus, setStepStatus] = useState<Record<number, StepStatus>>({ 1: "active" });
  const [idFrontUri, setIdFrontUri] = useState<string | null>(null);
  const [idBackUri, setIdBackUri] = useState<string | null>(null);
  const [selfieUri, setSelfieUri] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const getStatus = (id: number): StepStatus => {
    if (stepStatus[id]) return stepStatus[id];
    if (id < currentStep) return "done";
    return "pending";
  };

  const completeStep = (id: number) => {
    setStepStatus((prev) => ({ ...prev, [id]: "done", [id + 1]: "active" }));
    setCurrentStep(id + 1);
  };

  const simulateUpload = (type: "front" | "back" | "selfie") => {
    const mockUri = `https://picsum.photos/seed/${type}/200/120`;
    if (type === "front") setIdFrontUri(mockUri);
    else if (type === "back") setIdBackUri(mockUri);
    else setSelfieUri(mockUri);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setStepStatus((prev) => ({ ...prev, 4: "done" }));
    Alert.alert("Submitted!", "Your KYC documents are under review. We'll notify you within 24 hours.");
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.successScreen}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={64} color={colors.success} />
          </View>
          <Text style={styles.successTitle}>KYC Submitted!</Text>
          <Text style={styles.successSub}>Your documents are under review. You'll receive a notification within 24 hours.</Text>
          <View style={styles.statusCard}>
            <Ionicons name="time-outline" size={18} color={colors.warning} />
            <Text style={styles.statusText}>Status: Under Review</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.glowYellow} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>KYC Center</Text>
          <Text style={styles.subtitle}>Complete verification to unlock higher limits</Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${((currentStep - 1) / 4) * 100}%` }]} />
          </View>
          <Text style={styles.progressLabel}>Step {Math.min(currentStep, 4)} of 4</Text>
        </View>

        {/* Steps */}
        {STEPS.map((step) => {
          const status = getStatus(step.id);
          const isActive = status === "active";
          const isDone = status === "done";

          return (
            <View
              key={step.id}
              style={[
                styles.stepCard,
                isActive && styles.stepCardActive,
                isDone && styles.stepCardDone,
              ]}
            >
              <View style={styles.stepHeader}>
                <View style={[styles.stepNum, isActive && styles.stepNumActive, isDone && styles.stepNumDone]}>
                  {isDone
                    ? <Ionicons name="checkmark" size={16} color="#fff" />
                    : <Ionicons name={step.icon} size={16} color={isActive ? colors.yellow : colors.textMuted} />
                  }
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.stepTitle, isActive && styles.stepTitleActive]}>{step.title}</Text>
                  <Text style={styles.stepDesc}>{step.description}</Text>
                </View>
                {isDone && <Ionicons name="checkmark-circle" size={20} color={colors.success} />}
              </View>

              {/* Step 1: Upload ID */}
              {isActive && step.id === 1 && (
                <View style={styles.stepContent}>
                  <View style={styles.uploadRow}>
                    <Pressable style={styles.uploadBox} onPress={() => simulateUpload("front")}>
                      {idFrontUri
                        ? <Image source={{ uri: idFrontUri }} style={styles.uploadPreview} />
                        : <>
                            <Ionicons name="cloud-upload-outline" size={28} color={colors.brandLight} />
                            <Text style={styles.uploadLabel}>ID Front</Text>
                          </>
                      }
                    </Pressable>
                    <Pressable style={styles.uploadBox} onPress={() => simulateUpload("back")}>
                      {idBackUri
                        ? <Image source={{ uri: idBackUri }} style={styles.uploadPreview} />
                        : <>
                            <Ionicons name="cloud-upload-outline" size={28} color={colors.brandLight} />
                            <Text style={styles.uploadLabel}>ID Back</Text>
                          </>
                      }
                    </Pressable>
                  </View>
                  <Pressable
                    style={[styles.actionBtn, (!idFrontUri || !idBackUri) && styles.actionBtnDisabled]}
                    onPress={() => (idFrontUri && idBackUri) ? completeStep(1) : Alert.alert("Upload both sides of your ID")}
                  >
                    <Text style={styles.actionBtnText}>Continue</Text>
                    <Ionicons name="arrow-forward" size={16} color="#fff" />
                  </Pressable>
                </View>
              )}

              {/* Step 2: Selfie */}
              {isActive && step.id === 2 && (
                <View style={styles.stepContent}>
                  <View style={styles.selfieArea}>
                    {selfieUri
                      ? <Image source={{ uri: selfieUri }} style={styles.selfiePreview} />
                      : <View style={styles.selfieFrame}>
                          <Ionicons name="person-outline" size={60} color={colors.border} />
                          <Text style={styles.selfieHint}>Position your face in the frame</Text>
                        </View>
                    }
                  </View>
                  <View style={styles.selfieActions}>
                    <Pressable style={styles.selfieBtn} onPress={() => simulateUpload("selfie")}>
                      <Ionicons name="camera" size={20} color={colors.yellow} />
                      <Text style={styles.selfieBtnText}>Take Selfie</Text>
                    </Pressable>
                    <Pressable style={[styles.selfieBtn, styles.selfieBtnAlt]} onPress={() => simulateUpload("selfie")}>
                      <Ionicons name="image-outline" size={20} color={colors.brandLight} />
                      <Text style={[styles.selfieBtnText, { color: colors.brandLight }]}>Upload Photo</Text>
                    </Pressable>
                  </View>
                  <Pressable
                    style={[styles.actionBtn, !selfieUri && styles.actionBtnDisabled]}
                    onPress={() => selfieUri ? completeStep(2) : Alert.alert("Please take or upload a selfie")}
                  >
                    <Text style={styles.actionBtnText}>Confirm Selfie</Text>
                    <Ionicons name="arrow-forward" size={16} color="#fff" />
                  </Pressable>
                </View>
              )}

              {/* Step 3: Confirm details */}
              {isActive && step.id === 3 && (
                <View style={styles.stepContent}>
                  {[
                    { label: "Full Name", value: "Mary Wanjiku" },
                    { label: "National ID", value: "12345678" },
                    { label: "Phone", value: "+254 712 000 111" },
                    { label: "Date of Birth", value: "15 March 1990" },
                  ].map((field) => (
                    <View key={field.label} style={styles.detailRow}>
                      <Text style={styles.detailLabel}>{field.label}</Text>
                      <Text style={styles.detailValue}>{field.value}</Text>
                    </View>
                  ))}
                  <Pressable style={styles.actionBtn} onPress={() => completeStep(3)}>
                    <Text style={styles.actionBtnText}>Details Look Correct</Text>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  </Pressable>
                </View>
              )}

              {/* Step 4: Submit */}
              {isActive && step.id === 4 && (
                <View style={styles.stepContent}>
                  <View style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                      <Ionicons name="card-outline" size={16} color={colors.success} />
                      <Text style={styles.summaryText}>National ID uploaded</Text>
                    </View>
                    <View style={styles.summaryRow}>
                      <Ionicons name="camera-outline" size={16} color={colors.success} />
                      <Text style={styles.summaryText}>Selfie captured</Text>
                    </View>
                    <View style={styles.summaryRow}>
                      <Ionicons name="person-outline" size={16} color={colors.success} />
                      <Text style={styles.summaryText}>Details confirmed</Text>
                    </View>
                  </View>
                  <Pressable style={[styles.actionBtn, styles.actionBtnSubmit]} onPress={handleSubmit}>
                    <Ionicons name="cloud-upload-outline" size={18} color="#000" />
                    <Text style={[styles.actionBtnText, { color: "#000" }]}>Submit for Verification</Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  glowYellow: {
    position: "absolute", top: -60, right: -40,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: colors.yellowGlow,
  },
  scroll: { padding: 18, gap: 14, paddingBottom: 30 },
  header: { gap: 4 },
  title: { color: colors.text, fontSize: 26, fontWeight: "900" },
  subtitle: { color: colors.textMuted, fontSize: 13 },
  progressWrap: { gap: 6 },
  progressTrack: {
    height: 6, backgroundColor: colors.border,
    borderRadius: 999, overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: colors.yellow, borderRadius: 999 },
  progressLabel: { color: colors.textMuted, fontSize: 11, textAlign: "right" },
  stepCard: {
    backgroundColor: colors.panel, borderRadius: 16,
    padding: 16, borderWidth: 1, borderColor: colors.border,
  },
  stepCardActive: { borderColor: colors.yellow + "66" },
  stepCardDone: { borderColor: colors.success + "44" },
  stepHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  stepNum: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: colors.panelAlt,
    alignItems: "center", justifyContent: "center",
  },
  stepNumActive: { backgroundColor: colors.yellowGlow, borderWidth: 1, borderColor: colors.yellow + "55" },
  stepNumDone: { backgroundColor: colors.successBg },
  stepTitle: { color: colors.textMuted, fontWeight: "700", fontSize: 14 },
  stepTitleActive: { color: colors.text },
  stepDesc: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  stepContent: { marginTop: 16, gap: 12 },
  uploadRow: { flexDirection: "row", gap: 10 },
  uploadBox: {
    flex: 1, height: 100, backgroundColor: colors.panelAlt,
    borderRadius: 12, borderWidth: 1.5, borderColor: colors.border,
    borderStyle: "dashed", alignItems: "center", justifyContent: "center", gap: 6,
    overflow: "hidden",
  },
  uploadPreview: { width: "100%", height: "100%", borderRadius: 12 },
  uploadLabel: { color: colors.textMuted, fontSize: 12 },
  actionBtn: {
    backgroundColor: colors.brand, borderRadius: 12,
    padding: 14, flexDirection: "row",
    alignItems: "center", justifyContent: "center", gap: 8,
  },
  actionBtnDisabled: { opacity: 0.4 },
  actionBtnSubmit: { backgroundColor: colors.yellow },
  actionBtnText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  selfieArea: { alignItems: "center" },
  selfieFrame: {
    width: 180, height: 180, borderRadius: 90,
    borderWidth: 2, borderColor: colors.border,
    borderStyle: "dashed", alignItems: "center",
    justifyContent: "center", gap: 8,
  },
  selfiePreview: { width: 180, height: 180, borderRadius: 90 },
  selfieHint: { color: colors.textMuted, fontSize: 11, textAlign: "center" },
  selfieActions: { flexDirection: "row", gap: 10 },
  selfieBtn: {
    flex: 1, flexDirection: "row", alignItems: "center",
    justifyContent: "center", gap: 8,
    backgroundColor: colors.yellowGlow, borderRadius: 12,
    padding: 12, borderWidth: 1, borderColor: colors.yellowDark + "44",
  },
  selfieBtnAlt: { backgroundColor: colors.brandGlow, borderColor: colors.brandLight + "44" },
  selfieBtnText: { color: colors.yellow, fontWeight: "700" },
  detailRow: {
    flexDirection: "row", justifyContent: "space-between",
    backgroundColor: colors.panelAlt, borderRadius: 10,
    padding: 12, borderWidth: 1, borderColor: colors.border,
  },
  detailLabel: { color: colors.textMuted, fontSize: 13 },
  detailValue: { color: colors.text, fontWeight: "700", fontSize: 13 },
  summaryCard: {
    backgroundColor: colors.successBg, borderRadius: 12,
    padding: 14, gap: 10,
  },
  summaryRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  summaryText: { color: colors.success, fontWeight: "600" },
  successScreen: { flex: 1, alignItems: "center", justifyContent: "center", padding: 30, gap: 16 },
  successIcon: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: colors.successBg,
    alignItems: "center", justifyContent: "center",
  },
  successTitle: { color: colors.text, fontSize: 26, fontWeight: "900" },
  successSub: { color: colors.textMuted, textAlign: "center", lineHeight: 22 },
  statusCard: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: "#451a03", borderRadius: 12,
    padding: 14, borderWidth: 1, borderColor: colors.warning + "44",
  },
  statusText: { color: colors.warning, fontWeight: "700" },
});
