import { StyleSheet, Text, View } from "react-native";
import { ScreenLayout } from "../../components/ScreenLayout";
import { colors } from "../../theme";

export function DisputesScreen() {
  return (
    <ScreenLayout title="Disputes" subtitle="Raise and track billing or transaction complaints.">
      <View style={styles.card}>
        <Text style={styles.title}>Open Dispute</Text>
        <Text style={styles.text}>Charge mismatch on repayment RCP-91022</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Resolved</Text>
        <Text style={styles.text}>Loan fee clarification ticket #DSP-2201</Text>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.panel, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14, gap: 5 },
  title: { color: colors.text, fontWeight: "800" },
  text: { color: colors.textMuted },
});
