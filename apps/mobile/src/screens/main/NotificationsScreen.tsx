import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme";

type NotifType = "payment" | "loan" | "kyc" | "offer" | "security";

type Notification = {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

const NOTIFS: Notification[] = [
  { id: "1", type: "payment", title: "Repayment Due Soon", body: "Your installment of KES 5,200 is due in 3 days.", time: "2h ago", read: false },
  { id: "2", type: "loan", title: "Loan Under Review", body: "Application LN-1002 is being processed.", time: "5h ago", read: false },
  { id: "3", type: "kyc", title: "KYC Verified", body: "Your identity has been successfully verified.", time: "1d ago", read: true },
  { id: "4", type: "offer", title: "New Offer Available", body: "Limited-time top-up offer: get KES 30,000 extra.", time: "2d ago", read: false },
  { id: "5", type: "security", title: "Login from New Device", body: "A login was detected from a new device. Was this you?", time: "3d ago", read: true },
];

const typeConfig: Record<NotifType, { icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  payment: { icon: "card-outline", color: "#f97316" },
  loan: { icon: "document-text-outline", color: "#3b82f6" },
  kyc: { icon: "shield-checkmark-outline", color: colors.success },
  offer: { icon: "flash-outline", color: colors.yellow },
  security: { icon: "alert-circle-outline", color: colors.danger },
};

export function NotificationsScreen() {
  const [notifs, setNotifs] = useState(NOTIFS);

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.glow} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.title}>Notifications</Text>
            {unreadCount > 0 && (
              <Text style={styles.subtitle}>{unreadCount} unread alert{unreadCount > 1 ? "s" : ""}</Text>
            )}
          </View>
          {unreadCount > 0 && (
            <Pressable style={styles.markBtn} onPress={markAllRead}>
              <Text style={styles.markText}>Mark all read</Text>
            </Pressable>
          )}
        </View>

        {notifs.map((notif) => {
          const cfg = typeConfig[notif.type];
          return (
            <Pressable
              key={notif.id}
              style={[styles.card, !notif.read && styles.cardUnread]}
              onPress={() => setNotifs((prev) => prev.map((n) => n.id === notif.id ? { ...n, read: true } : n))}
            >
              <View style={[styles.iconWrap, { backgroundColor: cfg.color + "22" }]}>
                <Ionicons name={cfg.icon} size={20} color={cfg.color} />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <View style={styles.cardTop}>
                  <Text style={styles.cardTitle}>{notif.title}</Text>
                  {!notif.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.cardBody}>{notif.body}</Text>
                <Text style={styles.cardTime}>{notif.time}</Text>
              </View>
            </Pressable>
          );
        })}
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
  scroll: { padding: 18, gap: 10, paddingBottom: 30 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 },
  title: { color: colors.text, fontSize: 26, fontWeight: "900" },
  subtitle: { color: colors.textMuted, fontSize: 13 },
  markBtn: {
    backgroundColor: colors.panel, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: colors.border,
  },
  markText: { color: colors.brandLight, fontWeight: "700", fontSize: 12 },
  card: {
    flexDirection: "row", gap: 12,
    backgroundColor: colors.panel, borderRadius: 14,
    padding: 14, borderWidth: 1, borderColor: colors.border,
  },
  cardUnread: { borderColor: colors.yellow + "44", backgroundColor: "#0f172a" },
  iconWrap: { width: 42, height: 42, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  cardTop: { flexDirection: "row", alignItems: "center", gap: 6 },
  cardTitle: { color: colors.text, fontWeight: "700", fontSize: 14 },
  unreadDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.yellow },
  cardBody: { color: colors.textMuted, fontSize: 13, lineHeight: 18 },
  cardTime: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
});
