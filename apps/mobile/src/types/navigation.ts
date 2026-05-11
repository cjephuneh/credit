export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  OTPVerification: { phone: string };
  ForgotPin: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Loans: undefined;
  Repayments: undefined;
  Profile: undefined;
};

export type AppStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  ApplyLoan: undefined;
  LoanDetail: { loanId: string };
  KycCenter: undefined;
  Rewards: undefined;
  Support: undefined;
  Transactions: undefined;
  Settings: undefined;
  Notifications: undefined;
  Offers: undefined;
  CreditScore: undefined;
  BudgetPlanner: undefined;
  Disputes: undefined;
};
