import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParamList } from "../../types/navigation";
import { colors } from "../../theme";

type Props = NativeStackScreenProps<AuthStackParamList, "ForgotPin">;

type Step = "phone" | "otp" | "newpin" | "done";

export function ForgotPinScreen({ navigation }: Props) {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  if (step === "done") {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.glowGreen} />
        <View style={s.doneScreen}>
          <View style={s.doneIcon}>
            <Ionicons name="checkmark-circle" size={64} color={colors.success} />
          </View>
          <Text style={s.doneTitle}>PIN Reset!</Text>
          <Text style={s.doneSub}>Your PIN has been updated successfully. You can now log in with your new PIN.</Text>
          <Pressable style={s.primary} onPress={() => navigation.navigate("Login")}>
            <Ionicons name="log-in-outline" size={18} color="#000" />
            <Text style={s.primaryText}>Back to Login</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.glowBlue} />
      <View style={s.glowYellow} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={s.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
        {/* Brand */}
        <View style={s.brandRow}>
          <View style={s.brandIcon}>
            <Ionicons name="shield-checkmark" size={26} color={colors.yellow} />
          </View>
          <View>
            <Text style={s.brandName}>YES CREDIT</Text>
            <Text style={s.brandSub}>Account recovery</Text>
          </View>
        </View>

        {/* Step progress */}
        <View style={s.progressWrap}>
          {(["phone", "otp", "newpin"] as Step[]).map((st, i) => (
            <View key={st} style={s.progressItem}>
              <View style={[
                s.progressDot,
                step === st && s.progressDotActive,
                (step === "otp" && i === 0) || (step === "newpin" && i <= 1) || (step as string) === "done"
                  ? s.progressDotDone : null,
              ]}>
                {((step === "otp" && i === 0) || (step === "newpin" && i <= 1))
                  ? <Ionicons name="checkmark" size={12} color="#000" />
                  : <Text style={[s.progressDotNum, step === st && { color: "#000" }]}>{i + 1}</Text>
                }
              </View>
              {i < 2 && <View style={[s.progressLine, (step === "otp" && i === 0) || (step === "newpin" && i <= 1) ? s.progressLineDone : null]} />}
            </View>
          ))}
        </View>

        {/* ── STEP 1: Phone ── */}
        {step === "phone" && (
          <View style={s.stepWrap}>
            <Text style={s.title}>Forgot PIN?</Text>
            <Text style={s.subtitle}>Enter your registered phone number and we'll send a verification code.</Text>

            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Phone Number</Text>
              <View style={[s.inputWrap, focused === "phone" && s.inputWrapFocused]}>
                <Ionicons name="phone-portrait-outline" size={17} color={focused === "phone" ? colors.yellow : colors.textMuted} style={s.inputIcon} />
                <TextInput
                  style={s.input}
                  placeholder="+254 7XX XXX XXX"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused(null)}
                />
              </View>
            </View>

            <View style={s.infoBox}>
              <Ionicons name="information-circle-outline" size={16} color={colors.brandLight} />
              <Text style={s.infoText}>A 6-digit OTP will be sent to your M-Pesa registered number.</Text>
            </View>

            <Pressable style={[s.primary, !phone && s.primaryDisabled]} onPress={() => phone && setStep("otp")}>
              <Text style={s.primaryText}>Send OTP</Text>
              <Ionicons name="arrow-forward" size={18} color="#000" />
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={s.link}>← Back to login</Text>
            </Pressable>
          </View>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === "otp" && (
          <View style={s.stepWrap}>
            <Text style={s.title}>Enter OTP</Text>
            <Text style={s.subtitle}>
              We sent a 6-digit code to{"\n"}
              <Text style={{ color: colors.yellow, fontWeight: "700" }}>{phone}</Text>
            </Text>

            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Verification Code</Text>
              <View style={[s.inputWrap, focused === "otp" && s.inputWrapFocused]}>
                <Ionicons name="keypad-outline" size={17} color={focused === "otp" ? colors.yellow : colors.textMuted} style={s.inputIcon} />
                <TextInput
                  style={s.input}
                  placeholder="6-digit code"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="number-pad"
                  maxLength={6}
                  value={otp}
                  onChangeText={setOtp}
                  onFocus={() => setFocused("otp")}
                  onBlur={() => setFocused(null)}
                />
              </View>
            </View>

            <Pressable style={s.resendRow}>
              <Ionicons name="refresh-outline" size={14} color={colors.brandLight} />
              <Text style={s.resendText}>Resend code</Text>
            </Pressable>

            <Pressable style={[s.primary, otp.length < 6 && s.primaryDisabled]} onPress={() => otp.length >= 6 && setStep("newpin")}>
              <Text style={s.primaryText}>Verify Code</Text>
              <Ionicons name="arrow-forward" size={18} color="#000" />
            </Pressable>

            <Pressable onPress={() => setStep("phone")}>
              <Text style={s.link}>← Change phone number</Text>
            </Pressable>
          </View>
        )}

        {/* ── STEP 3: New PIN ── */}
        {step === "newpin" && (
          <View style={s.stepWrap}>
            <Text style={s.title}>Set New PIN</Text>
            <Text style={s.subtitle}>Choose a strong 4-digit PIN you haven't used before.</Text>

            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>New PIN</Text>
              <View style={[s.inputWrap, focused === "newpin" && s.inputWrapFocused]}>
                <Ionicons name="lock-closed-outline" size={17} color={focused === "newpin" ? colors.yellow : colors.textMuted} style={s.inputIcon} />
                <TextInput
                  style={s.input}
                  placeholder="4-digit PIN"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="number-pad"
                  secureTextEntry
                  maxLength={4}
                  value={newPin}
                  onChangeText={setNewPin}
                  onFocus={() => setFocused("newpin")}
                  onBlur={() => setFocused(null)}
                />
              </View>
            </View>

            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Confirm New PIN</Text>
              <View style={[s.inputWrap, focused === "confirm" && s.inputWrapFocused, confirmPin.length === 4 && newPin !== confirmPin && s.inputWrapError]}>
                <Ionicons name="lock-closed-outline" size={17} color={focused === "confirm" ? colors.yellow : colors.textMuted} style={s.inputIcon} />
                <TextInput
                  style={s.input}
                  placeholder="Re-enter PIN"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="number-pad"
                  secureTextEntry
                  maxLength={4}
                  value={confirmPin}
                  onChangeText={setConfirmPin}
                  onFocus={() => setFocused("confirm")}
                  onBlur={() => setFocused(null)}
                />
                {confirmPin.length === 4 && (
                  <Ionicons
                    name={newPin === confirmPin ? "checkmark-circle" : "close-circle"}
                    size={18}
                    color={newPin === confirmPin ? colors.success : colors.danger}
                  />
                )}
              </View>
              {confirmPin.length === 4 && newPin !== confirmPin && (
                <Text style={s.errorText}>PINs do not match</Text>
              )}
            </View>

            {/* PIN strength hints */}
            <View style={s.hintCard}>
              <Ionicons name="shield-outline" size={14} color={colors.yellow} />
              <Text style={s.hintText}>Use a PIN that's easy for you to remember but hard for others to guess. Avoid 1234 or your birth year.</Text>
            </View>

            <Pressable
              style={[s.primary, (newPin.length < 4 || newPin !== confirmPin) && s.primaryDisabled]}
              onPress={() => newPin.length === 4 && newPin === confirmPin && setStep("done")}
            >
              <Ionicons name="checkmark-circle-outline" size={18} color="#000" />
              <Text style={s.primaryText}>Reset PIN</Text>
            </Pressable>
          </View>
        )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  glowBlue: {
    position: "absolute", top: -80, right: -40,
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: colors.brandGlow,
  },
  glowYellow: {
    position: "absolute", bottom: 80, left: -60,
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: colors.yellowGlow,
  },
  glowGreen: {
    position: "absolute", top: -60, right: -40,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: "rgba(34,197,94,0.12)",
  },
  container: { flexGrow: 1, padding: 24, justifyContent: "center", gap: 16, paddingBottom: 40 },

  brandRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  brandIcon: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: colors.yellowGlow,
    borderWidth: 1, borderColor: colors.yellowDark + "44",
    alignItems: "center", justifyContent: "center",
  },
  brandName: { color: colors.yellow, fontWeight: "900", fontSize: 18, letterSpacing: 2 },
  brandSub: { color: colors.textMuted, fontSize: 11 },

  progressWrap: { flexDirection: "row", alignItems: "center" },
  progressItem: { flexDirection: "row", alignItems: "center" },
  progressDot: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: colors.panel,
    borderWidth: 1, borderColor: colors.border,
    alignItems: "center", justifyContent: "center",
  },
  progressDotActive: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  progressDotDone: { backgroundColor: colors.success, borderColor: colors.success },
  progressDotNum: { color: colors.textMuted, fontSize: 12, fontWeight: "800" },
  progressLine: { width: 32, height: 2, backgroundColor: colors.border, marginHorizontal: 4 },
  progressLineDone: { backgroundColor: colors.success },

  stepWrap: { gap: 14 },
  title: { color: colors.text, fontSize: 28, fontWeight: "900" },
  subtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 22 },

  fieldGroup: { gap: 6 },
  fieldLabel: {
    color: colors.textMuted, fontSize: 11,
    fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5,
  },
  inputWrap: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: colors.panel,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: 14, paddingHorizontal: 14,
  },
  inputWrapFocused: { borderColor: colors.yellow },
  inputWrapError: { borderColor: colors.danger },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: colors.text, paddingVertical: 14, fontSize: 15 },
  errorText: { color: colors.danger, fontSize: 12, marginTop: 2 },

  infoBox: {
    flexDirection: "row", alignItems: "flex-start", gap: 8,
    backgroundColor: colors.brandGlow, borderRadius: 12,
    padding: 12, borderWidth: 1, borderColor: colors.brandLight + "44",
  },
  infoText: { color: "#bfdbfe", fontSize: 13, lineHeight: 18, flex: 1 },

  resendRow: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start" },
  resendText: { color: colors.brandLight, fontSize: 13, fontWeight: "700" },

  hintCard: {
    flexDirection: "row", alignItems: "flex-start", gap: 8,
    backgroundColor: colors.yellowGlow, borderRadius: 12,
    padding: 12, borderWidth: 1, borderColor: colors.yellowDark + "33",
  },
  hintText: { color: "#fef9c3", fontSize: 12, lineHeight: 18, flex: 1 },

  primary: {
    backgroundColor: colors.yellow, borderRadius: 14,
    padding: 15, flexDirection: "row",
    alignItems: "center", justifyContent: "center", gap: 8,
  },
  primaryDisabled: { opacity: 0.4 },
  primaryText: { color: "#000", fontWeight: "900", fontSize: 16 },

  link: { color: colors.brandLight, textAlign: "center", fontSize: 13, fontWeight: "600" },

  // Done screen
  doneScreen: { flex: 1, alignItems: "center", justifyContent: "center", padding: 30, gap: 16 },
  doneIcon: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: "rgba(34,197,94,0.15)",
    alignItems: "center", justifyContent: "center",
  },
  doneTitle: { color: colors.text, fontSize: 28, fontWeight: "900" },
  doneSub: { color: colors.textMuted, textAlign: "center", lineHeight: 22, fontSize: 14 },
});
