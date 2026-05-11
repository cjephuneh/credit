import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme";

type ScreenLayoutProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export function ScreenLayout({ title, subtitle, children }: ScreenLayoutProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  glowTop: {
    position: "absolute", top: -80, right: -40,
    width: 220, height: 220, borderRadius: 140,
    backgroundColor: colors.brandGlow,
  },
  glowBottom: {
    position: "absolute", bottom: -120, left: -60,
    width: 240, height: 240, borderRadius: 140,
    backgroundColor: colors.yellowGlow,
  },
  content: { padding: 18, gap: 14, paddingBottom: 30 },
  header: { gap: 4, marginBottom: 4 },
  title: { color: colors.text, fontSize: 26, fontWeight: "900" },
  subtitle: { color: colors.textMuted, fontSize: 13 },
});
