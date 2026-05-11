import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme";

type Offer = {
  id: string;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  expiry: string;
  cta: string;
};

const OFFERS: Offer[] = [
  {
    id: "1",
    title: "Top-up Offer",
    description: "Get up to KES 30,000 extra if you pay your current balance within 45 days.",
    tag: "Limited Time",
    tagColor: colors.yellow,
    icon: "trending-up-outline",
    iconColor: colors.yellow,
    expiry: "Expires 25 May 2026",
    cta: "Claim Offer",
  },
  {
    id: "2",
    title: "Loyalty Discount",
    description: "Enjoy a 1.5% lower processing fee on your next salary loan as a Gold member.",
    tag: "Gold Exclusive",
    tagColor: "#a78bfa",
    icon: "ribbon-outline",
    iconColor: "#a78bfa",
    expiry: "Valid until 30 Jun 2026",
    cta: "Apply Now",
  },
  {
    id: "3",
    title: "Refer & Earn",
    description: "Earn KES 500 for every friend who takes their first loan using your referral code.",
    tag: "Ongoing",
    tagColor: colors.success,
    icon: "people-outline",
    iconColor: colors.success,
    expiry: "No expiry",
    cta: "Share Code",
  },
  {
    id: "4",
    title: "Early Repayment Bonus",
    description: "Pay 5 days before your due date and earn 50 reward points automatically.",
    tag: "Auto-applied",
    tagColor: "#06b6d4",
    icon: "flash-outline",
    iconColor: "#06b6d4",
    expiry: "Every cycle",
    cta: "Learn More",
  },
];

export function OffersScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.glow} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Special Offers</Text>
        <Text style={styles.subtitle}>Personalized deals just for you</Text>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerGlow} />
          <Ionicons name="sparkles" size={22} color={colors.yellow} />
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>4 active offers</Text>
            <Text style={styles.bannerSub}>Exclusive to your Gold membership</Text>
          </View>
        </View>

        {OFFERS.map((offer) => (
          <View key={offer.id} style={styles.offerCard}>
            <View style={styles.offerTop}>
              <View style={[styles.offerIcon, { backgroundColor: offer.iconColor + "22" }]}>
                <Ionicons name={offer.icon} size={22} color={offer.iconColor} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <View style={[styles.tag, { backgroundColor: offer.tagColor + "22" }]}>
                  <Text style={[styles.tagText, { color: offer.tagColor }]}>{offer.tag}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.offerDesc}>{offer.description}</Text>
            <View style={styles.offerFooter}>
              <View style={styles.expiryRow}>
                <Ionicons name="time-outline" size={12} color={colors.textMuted} />
                <Text style={styles.expiry}>{offer.expiry}</Text>
              </View>
              <Pressable style={[styles.ctaBtn, { backgroundColor: offer.iconColor }]}>
                <Text style={styles.ctaText}>{offer.cta}</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  glow: {
    position: "absolute", top: -60, right: -40,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: colors.yellowGlow,
  },
  scroll: { padding: 18, gap: 14, paddingBottom: 30 },
  title: { color: colors.text, fontSize: 26, fontWeight: "900" },
  subtitle: { color: colors.textMuted, fontSize: 13 },
  banner: {
    backgroundColor: colors.panel, borderRadius: 16,
    padding: 16, flexDirection: "row", alignItems: "center", gap: 12,
    borderWidth: 1, borderColor: colors.yellowDark + "44", overflow: "hidden",
  },
  bannerGlow: {
    position: "absolute", top: -30, right: -30,
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: colors.yellowGlow,
  },
  bannerTitle: { color: colors.text, fontWeight: "800", fontSize: 15 },
  bannerSub: { color: colors.textMuted, fontSize: 12 },
  offerCard: {
    backgroundColor: colors.panel, borderRadius: 16,
    padding: 16, gap: 10, borderWidth: 1, borderColor: colors.border,
  },
  offerTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  offerIcon: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  offerTitle: { color: colors.text, fontWeight: "800", fontSize: 15, marginBottom: 4 },
  tag: { alignSelf: "flex-start", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  tagText: { fontSize: 10, fontWeight: "700" },
  offerDesc: { color: colors.textMuted, fontSize: 13, lineHeight: 20 },
  offerFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  expiryRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  expiry: { color: colors.textMuted, fontSize: 11 },
  ctaBtn: { borderRadius: 10, paddingHorizontal: 14, paddingVertical: 7 },
  ctaText: { color: "#000", fontWeight: "800", fontSize: 12 },
});
