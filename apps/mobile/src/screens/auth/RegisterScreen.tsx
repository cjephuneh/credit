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

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

type Field = {
  key: string;
  label: string;
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  secure?: boolean;
  keyboard?: "default" | "phone-pad" | "number-pad";
};

const FIELDS: Field[] = [
  { key: "name",    label: "Full Name",     placeholder: "e.g. Mary Wanjiku",   icon: "person-outline"          },
  { key: "phone",   label: "Phone Number",  placeholder: "+254 7XX XXX XXX",    icon: "phone-portrait-outline", keyboard: "phone-pad" },
  { key: "id",      label: "National ID",   placeholder: "8-digit ID number",   icon: "card-outline",           keyboard: "number-pad" },
  { key: "pin",     label: "Set PIN",       placeholder: "4-digit PIN",         icon: "lock-closed-outline",    secure: true, keyboard: "number-pad" },
  { key: "confirm", label: "Confirm PIN",   placeholder: "Re-enter PIN",        icon: "lock-closed-outline",    secure: true, keyboard: "number-pad" },
];

export function RegisterScreen({ navigation }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);

  const set = (key: string, val: string) => setValues((v) => ({ ...v, [key]: val }));

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.glowBlue} />
      <View style={s.glowYellow} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={s.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
        {/* Brand mark */}
        <View style={s.brandRow}>
          <View style={s.brandIcon}>
            <Ionicons name="shield-checkmark" size={26} color={colors.yellow} />
          </View>
          <View>
            <Text style={s.brandName}>YES CREDIT</Text>
            <Text style={s.brandSub}>Smart lending, your way</Text>
          </View>
        </View>

        <Text style={s.title}>Create account</Text>
        <Text style={s.subtitle}>Join Yes Credit and start your digital loan journey.</Text>

        {/* Steps indicator */}
        <View style={s.stepsRow}>
          {["Personal Info", "Verify OTP", "Done"].map((step, i) => (
            <View key={step} style={s.stepItem}>
              <View style={[s.stepDot, i === 0 && s.stepDotActive]}>
                {i === 0
                  ? <Text style={s.stepDotText}>1</Text>
                  : <Text style={[s.stepDotText, { color: colors.textMuted }]}>{i + 1}</Text>
                }
              </View>
              <Text style={[s.stepLabel, i === 0 && s.stepLabelActive]}>{step}</Text>
              {i < 2 && <View style={s.stepLine} />}
            </View>
          ))}
        </View>

        {/* Fields */}
        <View style={s.fieldsWrap}>
          {FIELDS.map((field) => (
            <View key={field.key} style={s.fieldGroup}>
              <Text style={s.fieldLabel}>{field.label}</Text>
              <View style={[s.inputWrap, focused === field.key && s.inputWrapFocused]}>
                <Ionicons
                  name={field.icon}
                  size={17}
                  color={focused === field.key ? colors.yellow : colors.textMuted}
                  style={s.inputIcon}
                />
                <TextInput
                  style={s.input}
                  placeholder={field.placeholder}
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={field.secure}
                  keyboardType={field.keyboard ?? "default"}
                  value={values[field.key] ?? ""}
                  onChangeText={(v) => set(field.key, v)}
                  onFocus={() => setFocused(field.key)}
                  onBlur={() => setFocused(null)}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Terms */}
        <View style={s.termsRow}>
          <View style={s.termsCheck}>
            <Ionicons name="checkmark" size={11} color={colors.yellow} />
          </View>
          <Text style={s.termsText}>
            I agree to the{" "}
            <Text style={s.termsLink}>Terms & Conditions</Text>
            {" "}and{" "}
            <Text style={s.termsLink}>Privacy Policy</Text>
          </Text>
        </View>

        {/* CTA */}
        <Pressable
          style={s.primary}
          onPress={() => navigation.navigate("OTPVerification", { phone: values.phone ?? "+2547..." })}
        >
          <Text style={s.primaryText}>Continue</Text>
          <Ionicons name="arrow-forward" size={18} color="#000" />
        </Pressable>

        {/* Login link */}
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={s.link}>
            Already have an account?{" "}
            <Text style={s.linkBold}>Sign in</Text>
          </Text>
        </Pressable>
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
    position: "absolute", bottom: 60, left: -60,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: colors.yellowGlow,
  },
  scroll: { flexGrow: 1, padding: 24, gap: 14, paddingBottom: 40 },

  brandRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 4 },
  brandIcon: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: colors.yellowGlow,
    borderWidth: 1, borderColor: colors.yellowDark + "44",
    alignItems: "center", justifyContent: "center",
  },
  brandName: { color: colors.yellow, fontWeight: "900", fontSize: 18, letterSpacing: 2 },
  brandSub: { color: colors.textMuted, fontSize: 11 },

  title: { color: colors.text, fontSize: 28, fontWeight: "900" },
  subtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 20 },

  stepsRow: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  stepItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  stepDot: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: colors.panel,
    borderWidth: 1, borderColor: colors.border,
    alignItems: "center", justifyContent: "center",
  },
  stepDotActive: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  stepDotText: { color: "#000", fontSize: 11, fontWeight: "800" },
  stepLabel: { color: colors.textMuted, fontSize: 11, fontWeight: "600" },
  stepLabelActive: { color: colors.yellow },
  stepLine: { width: 20, height: 1, backgroundColor: colors.border, marginHorizontal: 4 },

  fieldsWrap: { gap: 12 },
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
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: colors.text, paddingVertical: 14, fontSize: 15 },

  termsRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  termsCheck: {
    width: 20, height: 20, borderRadius: 6,
    backgroundColor: colors.yellowGlow,
    borderWidth: 1, borderColor: colors.yellowDark + "44",
    alignItems: "center", justifyContent: "center",
    marginTop: 1,
  },
  termsText: { color: colors.textMuted, fontSize: 13, flex: 1, lineHeight: 20 },
  termsLink: { color: colors.brandLight, fontWeight: "700" },

  primary: {
    backgroundColor: colors.yellow, borderRadius: 14,
    padding: 15, flexDirection: "row",
    alignItems: "center", justifyContent: "center", gap: 8,
  },
  primaryText: { color: "#000", fontWeight: "900", fontSize: 16 },

  link: { color: colors.textMuted, textAlign: "center", fontSize: 13 },
  linkBold: { color: colors.brandLight, fontWeight: "700" },
});
