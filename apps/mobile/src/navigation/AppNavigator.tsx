import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AppStackParamList, AuthStackParamList, MainTabParamList } from "../types/navigation";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { OTPVerificationScreen } from "../screens/auth/OTPVerificationScreen";
import { ForgotPinScreen } from "../screens/auth/ForgotPinScreen";
import { HomeScreen } from "../screens/main/HomeScreen";
import { LoansScreen } from "../screens/main/LoansScreen";
import { RepaymentsScreen } from "../screens/main/RepaymentsScreen";
import { ProfileScreen } from "../screens/main/ProfileScreen";
import { ApplyLoanScreen } from "../screens/loan/ApplyLoanScreen";
import { LoanDetailScreen } from "../screens/loan/LoanDetailScreen";
import { KycCenterScreen } from "../screens/kyc/KycCenterScreen";
import { RewardsScreen } from "../screens/engagement/RewardsScreen";
import { OffersScreen } from "../screens/engagement/OffersScreen";
import { SupportScreen } from "../screens/support/SupportScreen";
import { DisputesScreen } from "../screens/support/DisputesScreen";
import { TransactionsScreen } from "../screens/account/TransactionsScreen";
import { SettingsScreen } from "../screens/account/SettingsScreen";
import { NotificationsScreen } from "../screens/main/NotificationsScreen";
import { CreditScoreScreen } from "../screens/insights/CreditScoreScreen";
import { BudgetPlannerScreen } from "../screens/insights/BudgetPlannerScreen";

const AppStack = createNativeStackNavigator<AppStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const NAV_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#020617",
    card: "#0b1222",
    text: "#e2e8f0",
    border: "#1f2937",
  },
};

const HEADER_OPTS = {
  headerStyle: { backgroundColor: "#020617" },
  headerTintColor: "#facc15",
  headerTitleStyle: { color: "#e2e8f0", fontWeight: "800" as const },
  contentStyle: { backgroundColor: "#020617" },
};

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={HEADER_OPTS}>
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="Register" component={RegisterScreen} options={{ title: "Create Account" }} />
      <AuthStack.Screen name="OTPVerification" component={OTPVerificationScreen} options={{ title: "Verify OTP" }} />
      <AuthStack.Screen name="ForgotPin" component={ForgotPinScreen} options={{ title: "Forgot PIN" }} />
    </AuthStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0b1222",
          borderTopColor: "#1f2937",
          borderTopWidth: 1,
          height: 72,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#facc15",
        tabBarInactiveTintColor: "#475569",
        tabBarLabelStyle: { fontSize: 11, fontWeight: "700" },
        tabBarIcon: ({ focused, color, size }) => {
          const icons: Record<keyof MainTabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
            Home: ["home", "home-outline"],
            Loans: ["wallet", "wallet-outline"],
            Repayments: ["card", "card-outline"],
            Profile: ["person-circle", "person-circle-outline"],
          };
          const [active, inactive] = icons[route.name];
          return <Ionicons name={focused ? active : inactive} size={size + 2} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Loans" component={LoansScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Repayments" component={RepaymentsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer theme={NAV_THEME}>
      <AppStack.Navigator
        initialRouteName="Auth"
        screenOptions={{ ...HEADER_OPTS, headerShown: false }}
      >
        <AppStack.Screen name="Auth" component={AuthNavigator} />
        <AppStack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <AppStack.Screen name="ApplyLoan" component={ApplyLoanScreen} options={{ headerShown: true, title: "Apply for Loan" }} />
        <AppStack.Screen name="LoanDetail" component={LoanDetailScreen} options={{ headerShown: true, title: "Loan Details" }} />
        <AppStack.Screen name="KycCenter" component={KycCenterScreen} options={{ headerShown: true, title: "KYC Center" }} />
        <AppStack.Screen name="Rewards" component={RewardsScreen} options={{ headerShown: true, title: "Rewards" }} />
        <AppStack.Screen name="Support" component={SupportScreen} options={{ headerShown: true, title: "Help & Support" }} />
        <AppStack.Screen name="Transactions" component={TransactionsScreen} options={{ headerShown: true, title: "Transactions" }} />
        <AppStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true, title: "Settings & Security" }} />
        <AppStack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: true, title: "Notifications" }} />
        <AppStack.Screen name="Offers" component={OffersScreen} options={{ headerShown: true, title: "Special Offers" }} />
        <AppStack.Screen name="CreditScore" component={CreditScoreScreen} options={{ headerShown: true, title: "Credit Insights" }} />
        <AppStack.Screen name="BudgetPlanner" component={BudgetPlannerScreen} options={{ headerShown: true, title: "Budget Planner" }} />
        <AppStack.Screen name="Disputes" component={DisputesScreen} options={{ headerShown: true, title: "Disputes" }} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
