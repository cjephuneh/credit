import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppStackParamList, MainTabParamList } from "../../types/navigation";
import { colors } from "../../theme";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Loans">,
  NativeStackScreenProps<AppStackParamList>
>;

type LoanProduct = {
  title: string;
  range: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  tag?: string;
};

const PRODUCTS: LoanProduct[] = [
  {
    title: "Salary Loan",
    range: "KES 10,000 – 300,000",
    description: "Flexible repayment tied to your payslip cycle. Fast disbursement via M-Pesa.",
    icon: "briefcase-outline",
    color: "#3b82f6",
    tag: "Most Popular",
  },
  {
    title: "Market Bond",
    range: "KES 5,000 – 50,000",
    description: "Daily repayment model designed for traders and market vendors.",
    icon: "storefront-outline",
    color: "#22c55e",
  },
  {
    title: "Boda Asset Financing",
    range: "KES 30,000 – 150,000",
    description: "Own your motorcycle. Structured repayment over 12–24 months.",
    icon: "bicycle-outline",
    color: "#f97316",
    tag: "New",
  },
  {
    title: "Group Loan",
    range: "KES 20,000 – 500,000",
    description: "SACCO-backed group access with shared liability and lower rates.",
    icon: "people-outline",
    color: "#a78bfa",
  },
];

export function LoansScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.glow} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Loan Products</Text>
        <Text style={styles.subtitle}>Choose a facility that matches your cash flow</Text>

        {/* Smart offer banner */}
        <View style={styles.offerBanner}>
          <View style={styles.offerGlow} />
          <Ionicons name="sparkles" size={20} color={colors.yellow} />
          <View style={{ flex: 1 }}>
            <Text style={styles.offerTitle}>Smart Offer Unlocked</Text>
            <Text style={styles.offerSub}>Pay 2 more installments on time to increase your limit by 20%</Text>
          </View>
        </View>

        {/* Products */}
        {PRODUCTS.map((product) => (
          <View key={product.title} style={styles.productCard}>
            <View style={styles.productTop}>
              <View style={[styles.productIcon, { backgroundColor: product.color + "22" }]}>
                <Ionicons name={product.icon} size={22} color={product.color} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.productTitleRow}>
                  <Text style={styles.productTitle}>{product.title}</Text>
                  {product.tag && (
                    <View style={[styles.productTag, { backgroundColor: product.color + "22" }]}>
                      <Text style={[styles.productTagText, { color: product.color }]}>{product.tag}</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.productRange, { color: product.color }]}>{product.range}</Text>
              </View>
            </View>
            <Text style={styles.productDesc}>{product.description}</Text>
            <Pressable
              style={[styles.applyBtn, { backgroundColor: product.color }]}
              onPress={() => navigation.navigate("ApplyLoan")}
            >
              <Text style={styles.applyBtnText}>Apply Now</Text>
              <Ionicons name="arrow-forward" size={14} color="#fff" />
            </Pressable>
          </View>
        ))}

        {/* Active loan */}
        <Text style={styles.sectionTitle}>Active Loan</Text>
        <View style={styles.activeLoan}>
          <View style={styles.activeLoanRow}>
            <Text style={styles.activeLoanLabel}>Loan ID</Text>
            <Text style={styles.activeLoanValue}>LN-1001</Text>
          </View>
          <View style={styles.activeLoanRow}>
            <Text style={styles.activeLoanLabel}>Principal</Text>
            <Text style={styles.activeLoanValue}>KES 80,000</Text>
          </View>
          <View style={styles.activeLoanRow}>
            <Text style={styles.activeLoanLabel}>Outstanding</Text>
            <Text style={[styles.activeLoanValue, { color: colors.warning }]}>KES 62,400</Text>
          </View>
          <View style={styles.activeLoanRow}>
            <Text style={styles.activeLoanLabel}>Status</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
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
  offerBanner: {
    backgroundColor: colors.panel, borderRadius: 16,
    padding: 14, flexDirection: "row", alignItems: "center", gap: 12,
    borderWidth: 1, borderColor: colors.yellowDark + "44", overflow: "hidden",
  },
  offerGlow: {
    position: "absolute", top: -30, right: -30,
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: colors.yellowGlow,
  },
  offerTitle: { color: colors.text, fontWeight: "700", fontSize: 14 },
  offerSub: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  productCard: {
    backgroundColor: colors.panel, borderRadius: 16,
    padding: 16, gap: 10, borderWidth: 1, borderColor: colors.border,
  },
  productTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  productIcon: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  productTitleRow: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  productTitle: { color: colors.text, fontWeight: "800", fontSize: 15 },
  productTag: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  productTagText: { fontSize: 10, fontWeight: "700" },
  productRange: { fontWeight: "700", fontSize: 13, marginTop: 2 },
  productDesc: { color: colors.textMuted, fontSize: 13, lineHeight: 20 },
  applyBtn: {
    borderRadius: 10, padding: 10,
    flexDirection: "row", alignItems: "center",
    justifyContent: "center", gap: 6,
  },
  applyBtnText: { color: "#fff", fontWeight: "800", fontSize: 13 },
  sectionTitle: { color: colors.text, fontWeight: "800", fontSize: 16 },
  activeLoan: {
    backgroundColor: colors.panel, borderRadius: 16,
    padding: 16, gap: 10, borderWidth: 1, borderColor: colors.border,
  },
  activeLoanRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  activeLoanLabel: { color: colors.textMuted, fontSize: 13 },
  activeLoanValue: { color: colors.text, fontWeight: "700", fontSize: 14 },
  statusPill: {
    backgroundColor: colors.successBg, borderRadius: 999,
    paddingHorizontal: 10, paddingVertical: 3,
  },
  statusText: { color: colors.success, fontSize: 11, fontWeight: "700" },
});
