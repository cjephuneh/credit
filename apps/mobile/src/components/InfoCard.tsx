import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

type InfoCardProps = PropsWithChildren<{
  title: string;
  value?: string;
}>;

export function InfoCard({ title, value, children }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {value ? <Text style={styles.value}>{value}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
  },
  value: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
  },
});
