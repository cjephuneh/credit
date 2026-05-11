import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme";

const FAQS = [
  { q: "When is my repayment due?", a: "Your due date is shown on the Home screen and in the Repayments tab. You'll also receive a reminder 3 days before." },
  { q: "How do I increase my loan limit?", a: "Consistent on-time repayments automatically boost your limit. Check Credit Score for your current trajectory." },
  { q: "What fees apply to my loan?", a: "A one-time processing fee is charged at disbursement. No hidden charges — all fees are shown before you confirm." },
  { q: "How long does KYC take?", a: "KYC verification typically takes under 24 hours. You'll receive a notification once approved." },
];

export function SupportScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.glow} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Help & Support</Text>
        <Text style={styles.subtitle}>We're here to help — fast</Text>

        {/* Contact options */}
        <View style={styles.contactRow}>
          <Pressable style={[styles.contactCard, { borderColor: "#22c55e44" }]}>
            <View style={[styles.contactIcon, { backgroundColor: "#22c55e22" }]}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color={colors.success} />
            </View>
            <Text style={styles.contactLabel}>Live Chat</Text>
            <Text style={styles.contactSub}>~2 min response</Text>
          </Pressable>
          <Pressable style={[styles.contactCard, { borderColor: "#3b82f644" }]}>
            <View style={[styles.contactIcon, { backgroundColor: "#3b82f622" }]}>
              <Ionicons name="call-outline" size={24} color="#3b82f6" />
            </View>
            <Text style={styles.contactLabel}>Call Us</Text>
            <Text style={styles.contactSub}>+254 700 123 456</Text>
          </Pressable>
          <Pressable style={[styles.contactCard, { borderColor: "#f9731644" }]}>
            <View style={[styles.contactIcon, { backgroundColor: "#f9731622" }]}>
              <Ionicons name="mail-outline" size={24} color="#f97316" />
            </View>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactSub}>support@yes.co.ke</Text>
          </Pressable>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={16} color={colors.textMuted} />
          <TextInput
            placeholder="Search help articles..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
          />
        </View>

        {/* FAQ */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {FAQS.map((faq, i) => (
          <View key={i} style={styles.faqCard}>
            <View style={styles.faqQ}>
              <View style={styles.faqIcon}>
                <Ionicons name="help-circle-outline" size={18} color={colors.yellow} />
              </View>
              <Text style={styles.faqQuestion}>{faq.q}</Text>
            </View>
            <Text style={styles.faqAnswer}>{faq.a}</Text>
          </View>
        ))}

        {/* Escalate */}
        <View style={styles.escalateCard}>
          <Ionicons name="alert-circle-outline" size={20} color={colors.warning} />
          <View style={{ flex: 1 }}>
            <Text style={styles.escalateTitle}>Need to raise a dispute?</Text>
            <Text style={styles.escalateSub}>Report billing issues or transaction errors</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
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
  scroll: { padding: 18, gap: 14, paddingBottom: 30 },
  title: { color: colors.text, fontSize: 26, fontWeight: "900" },
  subtitle: { color: colors.textMuted, fontSize: 13 },
  contactRow: { flexDirection: "row", gap: 10 },
  contactCard: {
    flex: 1, backgroundColor: colors.panel,
    borderRadius: 14, padding: 14, gap: 6,
    borderWidth: 1, alignItems: "center",
  },
  contactIcon: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  contactLabel: { color: colors.text, fontWeight: "700", fontSize: 13, textAlign: "center" },
  contactSub: { color: colors.textMuted, fontSize: 11, textAlign: "center" },
  searchWrap: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: colors.panel, borderRadius: 12,
    padding: 12, borderWidth: 1, borderColor: colors.border,
  },
  searchInput: { flex: 1, color: colors.text, fontSize: 14 },
  sectionTitle: { color: colors.text, fontWeight: "800", fontSize: 16 },
  faqCard: {
    backgroundColor: colors.panel, borderRadius: 14,
    padding: 14, gap: 8, borderWidth: 1, borderColor: colors.border,
  },
  faqQ: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  faqIcon: { marginTop: 1 },
  faqQuestion: { color: colors.text, fontWeight: "700", fontSize: 14, flex: 1 },
  faqAnswer: { color: colors.textMuted, fontSize: 13, lineHeight: 20, paddingLeft: 26 },
  escalateCard: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: "#451a03", borderRadius: 14,
    padding: 14, borderWidth: 1, borderColor: colors.warning + "44",
  },
  escalateTitle: { color: colors.warning, fontWeight: "700", fontSize: 14 },
  escalateSub: { color: "#fde68a", fontSize: 12 },
});
