import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
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

type Props = NativeStackScreenProps<AuthStackParamList, "OTPVerification">;

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export function OTPVerificationScreen({ route, navigation }: Props) {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [verified, setVerified] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(timer); setCanResend(true); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVerify = () => {
    if (otp.length < OTP_LENGTH) return;
    setVerified(true);
    setTimeout(() => navigation.getParent()?.navigate("MainTabs"), 1200);
  };

  const handleResend = () => {
    if (!canResend) return;
    setCanResend(false);
    setCountdown(RESEND_SECONDS);
    setOtp("");
  };

  if (verified) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.glowGreen} />
        <View style={s.successScreen}>
          <Animated.View style={[s.successIcon, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]}>
            <Ionicons name="checkmark-circle" size={72} color={colors.success} />
          </Animated.View>
          <Text style={s.successTitle}>Verified!</Text>
          <Text style={s.successSub}>Your phone number has been confirmed. Taking you to your account…</Text>
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
          contentContainerStyle={[s.container, { flexGrow: 1 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
      <Animated.View style={[{ opacity: opacityAnim, gap: 16 }]}>
        {/* Brand */}
        <View style={s.brandRow}>
          <View style={s.brandIcon}>
            <Ionicons name="shield-checkmark" size={26} color={colors.yellow} />
          </View>
          <View>
            <Text style={s.brandName}>YES CREDIT</Text>
            <Text style={s.brandSub}>Phone verification</Text>
          </View>
        </View>

        {/* Icon */}
        <View style={s.phoneIllustration}>
          <View style={s.phoneIconWrap}>
            <Ionicons name="phone-portrait-outline" size={36} color={colors.brandLight} />
          </View>
          <View style={s.phonePulse} />
        </View>

        <Text style={s.title}>Enter OTP</Text>
        <Text style={s.subtitle}>
          We sent a {OTP_LENGTH}-digit code to{"\n"}
          <Text style={s.phoneHighlight}>{route.params.phone}</Text>
        </Text>

        {/* OTP input */}
        <View style={s.otpWrap}>
          <Ionicons name="keypad-outline" size={18} color={colors.textMuted} />
          <TextInput
            style={s.otpInput}
            placeholder="• • • • • •"
            placeholderTextColor={colors.border}
            keyboardType="number-pad"
            maxLength={OTP_LENGTH}
            value={otp}
            onChangeText={setOtp}
            autoFocus
          />
          {otp.length === OTP_LENGTH && (
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
          )}
        </View>

        {/* Visual digit boxes */}
        <View style={s.digitRow}>
          {Array.from({ length: OTP_LENGTH }).map((_, i) => (
            <View
              key={i}
              style={[
                s.digitBox,
                otp[i] ? s.digitBoxFilled : null,
                i === otp.length && s.digitBoxActive,
              ]}
            >
              <Text style={s.digitText}>{otp[i] ? "•" : ""}</Text>
            </View>
          ))}
        </View>

        {/* Resend */}
        <View style={s.resendRow}>
          {canResend ? (
            <Pressable style={s.resendBtn} onPress={handleResend}>
              <Ionicons name="refresh-outline" size={14} color={colors.brandLight} />
              <Text style={s.resendActive}>Resend OTP</Text>
            </Pressable>
          ) : (
            <Text style={s.resendCountdown}>
              Resend in{" "}
              <Text style={{ color: colors.yellow, fontWeight: "700" }}>{countdown}s</Text>
            </Text>
          )}
        </View>

        {/* Verify button */}
        <Pressable
          style={[s.primary, otp.length < OTP_LENGTH && s.primaryDisabled]}
          onPress={handleVerify}
        >
          <Ionicons name="shield-checkmark-outline" size={18} color="#000" />
          <Text style={s.primaryText}>Verify & Continue</Text>
        </Pressable>

        {/* Wrong number */}
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={s.link}>Wrong number? Go back</Text>
        </Pressable>
      </Animated.View>
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
  container: { flex: 1, padding: 24, justifyContent: "center", gap: 16 },

  brandRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  brandIcon: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: colors.yellowGlow,
    borderWidth: 1, borderColor: colors.yellowDark + "44",
    alignItems: "center", justifyContent: "center",
  },
  brandName: { color: colors.yellow, fontWeight: "900", fontSize: 18, letterSpacing: 2 },
  brandSub: { color: colors.textMuted, fontSize: 11 },

  phoneIllustration: { alignItems: "center", position: "relative", height: 80, justifyContent: "center" },
  phoneIconWrap: {
    width: 64, height: 64, borderRadius: 18,
    backgroundColor: colors.brandGlow,
    borderWidth: 1, borderColor: colors.brandLight + "44",
    alignItems: "center", justifyContent: "center",
  },
  phonePulse: {
    position: "absolute",
    width: 80, height: 80, borderRadius: 40,
    borderWidth: 1, borderColor: colors.brandLight + "33",
  },

  title: { color: colors.text, fontSize: 28, fontWeight: "900" },
  subtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 22 },
  phoneHighlight: { color: colors.yellow, fontWeight: "700" },

  otpWrap: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: colors.panel,
    borderWidth: 1, borderColor: colors.yellow,
    borderRadius: 14, paddingHorizontal: 16,
  },
  otpInput: {
    flex: 1, color: colors.text,
    paddingVertical: 14, fontSize: 22,
    letterSpacing: 8, fontWeight: "800",
  },

  digitRow: { flexDirection: "row", gap: 10, justifyContent: "center" },
  digitBox: {
    width: 44, height: 52, borderRadius: 12,
    backgroundColor: colors.panel,
    borderWidth: 1, borderColor: colors.border,
    alignItems: "center", justifyContent: "center",
  },
  digitBoxFilled: { borderColor: colors.yellow, backgroundColor: colors.yellowGlow },
  digitBoxActive: { borderColor: colors.brandLight },
  digitText: { color: colors.text, fontSize: 20, fontWeight: "900" },

  resendRow: { alignItems: "center" },
  resendBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  resendActive: { color: colors.brandLight, fontWeight: "700", fontSize: 14 },
  resendCountdown: { color: colors.textMuted, fontSize: 13 },

  primary: {
    backgroundColor: colors.yellow, borderRadius: 14,
    padding: 15, flexDirection: "row",
    alignItems: "center", justifyContent: "center", gap: 8,
  },
  primaryDisabled: { opacity: 0.4 },
  primaryText: { color: "#000", fontWeight: "900", fontSize: 16 },

  link: { color: colors.brandLight, textAlign: "center", fontSize: 13, fontWeight: "600" },

  successScreen: { flex: 1, alignItems: "center", justifyContent: "center", padding: 30, gap: 16 },
  successIcon: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: "rgba(34,197,94,0.15)",
    alignItems: "center", justifyContent: "center",
  },
  successTitle: { color: colors.text, fontSize: 28, fontWeight: "900" },
  successSub: { color: colors.textMuted, textAlign: "center", lineHeight: 22, fontSize: 14 },
});
