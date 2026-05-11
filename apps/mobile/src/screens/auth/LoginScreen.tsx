import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
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

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.glowBlue} />
      <View style={styles.glowYellow} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brandRow}>
            <View style={styles.brandIcon}>
              <Ionicons name="shield-checkmark" size={28} color={colors.yellow} />
            </View>
            <View>
              <Text style={styles.brandName}>YES CREDIT</Text>
              <Text style={styles.brandTagline}>Smart lending, your way</Text>
            </View>
          </View>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Log in to view balances, loans, and repayments.</Text>

          <View style={styles.inputWrap}>
            <Ionicons name="phone-portrait-outline" size={18} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              keyboardType="phone-pad"
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputWrap}>
            <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput
              placeholder="PIN"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              secureTextEntry
              keyboardType="number-pad"
              returnKeyType="done"
            />
          </View>

          <Pressable style={styles.primary} onPress={() => navigation.getParent()?.navigate("MainTabs")}>
            <Text style={styles.primaryText}>Log In</Text>
            <Ionicons name="arrow-forward" size={18} color="#000" />
          </Pressable>

          <Pressable onPress={() => navigation.navigate("ForgotPin")}>
            <Text style={styles.link}>Forgot PIN?</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>
              Don't have an account? <Text style={styles.linkBold}>Create one</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  glowBlue: {
    position: "absolute", top: -80, right: -40,
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: colors.brandGlow,
  },
  glowYellow: {
    position: "absolute", bottom: 80, left: -60,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: colors.yellowGlow,
  },
  container: {
    flexGrow: 1, padding: 24, justifyContent: "center",
    gap: 12, paddingBottom: 40,
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 },
  brandIcon: {
    width: 52, height: 52, borderRadius: 14,
    backgroundColor: colors.yellowGlow,
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: colors.yellowDark + "44",
  },
  brandName: { color: colors.yellow, fontWeight: "900", fontSize: 20, letterSpacing: 2 },
  brandTagline: { color: colors.textMuted, fontSize: 12 },
  title: { color: colors.text, fontSize: 30, fontWeight: "900" },
  subtitle: { color: colors.textMuted, marginBottom: 8, lineHeight: 20 },
  inputWrap: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: colors.panel, borderWidth: 1,
    borderColor: colors.border, borderRadius: 14, paddingHorizontal: 14,
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, color: colors.text, paddingVertical: 14, fontSize: 15 },
  primary: {
    backgroundColor: colors.yellow, borderRadius: 14,
    padding: 15, flexDirection: "row",
    alignItems: "center", justifyContent: "center",
    gap: 8, marginTop: 4,
  },
  primaryText: { color: "#000", fontWeight: "900", fontSize: 16 },
  link: { color: colors.textMuted, textAlign: "center", marginTop: 4, fontSize: 13 },
  linkBold: { color: colors.brandLight, fontWeight: "700" },
});
