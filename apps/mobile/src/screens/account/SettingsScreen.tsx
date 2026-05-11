import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppStackParamList } from "../../types/navigation";
import { colors } from "../../theme";

type Props = NativeStackScreenProps<AppStackParamList, "Settings">;

export function SettingsScreen({ navigation }: Props) {
  const [biometric, setBiometric] = useState(true);
  const [repaymentAlerts, setRepaymentAlerts] = useState(true);
  const [offerAlerts, setOfferAlerts] = useState(false);
  const [kycAlerts, setKycAlerts] = useState(true);
  const [language, setLanguage] = useState<"English" | "Swahili">("English");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.glow} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Settings & Security</Text>
        <Text style={styles.subtitle}>Manage preferences and secure your account</Text>

        {/* Security */}
        <Text style={styles.sectionLabel}>Security</Text>
        <View style={styles.group}>
          <Pressable style={[styles.row, styles.rowBorder]}>
            <View style={[styles.rowIcon, { backgroundColor: "#3b82f622" }]}>
              <Ionicons name="lock-closed-outline" size={18} color="#3b82f6" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Change PIN</Text>
              <Text style={styles.rowSub}>Update your 4-digit login PIN</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </Pressable>
          <View style={[styles.row, styles.rowBorder]}>
            <View style={[styles.rowIcon, { backgroundColor: "#22c55e22" }]}>
              <Ionicons name="finger-print-outline" size={18} color={colors.success} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Biometric Login</Text>
              <Text style={styles.rowSub}>Use fingerprint or Face ID</Text>
            </View>
            <Switch
              value={biometric}
              onValueChange={setBiometric}
              trackColor={{ false: colors.border, true: colors.success + "88" }}
              thumbColor={biometric ? colors.success : colors.textMuted}
            />
          </View>
          <Pressable style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: "#ef444422" }]}>
              <Ionicons name="shield-outline" size={18} color={colors.danger} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Data & Privacy</Text>
              <Text style={styles.rowSub}>Manage your data controls</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </Pressable>
        </View>

        {/* Notifications */}
        <Text style={styles.sectionLabel}>Notifications</Text>
        <Pressable style={styles.notifBanner} onPress={() => navigation.navigate("Notifications")}>
          <View style={[styles.rowIcon, { backgroundColor: colors.yellowGlow }]}>
            <Ionicons name="notifications-outline" size={18} color={colors.yellow} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowLabel}>View All Notifications</Text>
            <Text style={styles.rowSub}>4 unread alerts</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </Pressable>

        <View style={styles.group}>
          <View style={[styles.row, styles.rowBorder]}>
            <View style={[styles.rowIcon, { backgroundColor: "#f97316" + "22" }]}>
              <Ionicons name="card-outline" size={18} color="#f97316" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Repayment Reminders</Text>
              <Text style={styles.rowSub}>Alerts before due dates</Text>
            </View>
            <Switch
              value={repaymentAlerts}
              onValueChange={setRepaymentAlerts}
              trackColor={{ false: colors.border, true: colors.yellow + "88" }}
              thumbColor={repaymentAlerts ? colors.yellow : colors.textMuted}
            />
          </View>
          <View style={[styles.row, styles.rowBorder]}>
            <View style={[styles.rowIcon, { backgroundColor: "#a78bfa22" }]}>
              <Ionicons name="flash-outline" size={18} color="#a78bfa" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Offer Alerts</Text>
              <Text style={styles.rowSub}>New deals and promotions</Text>
            </View>
            <Switch
              value={offerAlerts}
              onValueChange={setOfferAlerts}
              trackColor={{ false: colors.border, true: "#a78bfa88" }}
              thumbColor={offerAlerts ? "#a78bfa" : colors.textMuted}
            />
          </View>
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: "#22c55e22" }]}>
              <Ionicons name="shield-checkmark-outline" size={18} color={colors.success} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>KYC Updates</Text>
              <Text style={styles.rowSub}>Verification status changes</Text>
            </View>
            <Switch
              value={kycAlerts}
              onValueChange={setKycAlerts}
              trackColor={{ false: colors.border, true: colors.success + "88" }}
              thumbColor={kycAlerts ? colors.success : colors.textMuted}
            />
          </View>
        </View>

        {/* Preferences */}
        <Text style={styles.sectionLabel}>Preferences</Text>
        <View style={styles.group}>
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: "#06b6d422" }]}>
              <Ionicons name="language-outline" size={18} color="#06b6d4" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Language</Text>
              <Text style={styles.rowSub}>Currently: {language}</Text>
            </View>
            <View style={styles.langToggle}>
              {(["English", "Swahili"] as const).map((lang) => (
                <Pressable
                  key={lang}
                  style={[styles.langBtn, language === lang && styles.langBtnActive]}
                  onPress={() => setLanguage(lang)}
                >
                  <Text style={[styles.langText, language === lang && styles.langTextActive]}>
                    {lang === "English" ? "EN" : "SW"}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Danger zone */}
        <Text style={styles.sectionLabel}>Account</Text>
        <View style={styles.group}>
          <Pressable style={[styles.row, styles.rowBorder]}>
            <View style={[styles.rowIcon, { backgroundColor: "#ef444422" }]}>
              <Ionicons name="trash-outline" size={18} color={colors.danger} />
            </View>
            <Text style={[styles.rowLabel, { color: colors.danger }]}>Delete Account</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </Pressable>
          <Pressable style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: "#ef444422" }]}>
              <Ionicons name="log-out-outline" size={18} color={colors.danger} />
            </View>
            <Text style={[styles.rowLabel, { color: colors.danger }]}>Log Out</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </Pressable>
        </View>
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
  scroll: { padding: 18, gap: 10, paddingBottom: 30 },
  title: { color: colors.text, fontSize: 26, fontWeight: "900" },
  subtitle: { color: colors.textMuted, fontSize: 13, marginBottom: 4 },
  sectionLabel: {
    color: colors.textMuted, fontSize: 11,
    fontWeight: "700", letterSpacing: 1,
    textTransform: "uppercase", marginTop: 6,
  },
  group: {
    backgroundColor: colors.panel, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border, overflow: "hidden",
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowIcon: { width: 38, height: 38, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  rowLabel: { color: colors.text, fontWeight: "700", fontSize: 14 },
  rowSub: { color: colors.textMuted, fontSize: 12, marginTop: 1 },
  notifBanner: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: colors.panel, borderRadius: 14,
    padding: 14, borderWidth: 1, borderColor: colors.yellowDark + "44",
  },
  langToggle: { flexDirection: "row", gap: 4 },
  langBtn: {
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 8, backgroundColor: colors.panelAlt,
    borderWidth: 1, borderColor: colors.border,
  },
  langBtnActive: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  langText: { color: colors.textMuted, fontWeight: "700", fontSize: 12 },
  langTextActive: { color: "#000" },
});
