import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./layout/AppShell";
import { ForgotPasswordPage, LoginPage, RegisterPage } from "./pages/AuthPages";
import {
  AuditLogsPage,
  CampaignsPage,
  CollectionsPage,
  KycPage,
  LoanRequestsPage,
  OverviewPage,
  ReportsPage,
  SettingsPage,
  UsersPage,
  UserDetailPage,
  LoanDetailPage,
  BorrowersPage,
  BorrowerDetailPage,
} from "./pages/AppPages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot" element={<ForgotPasswordPage />} />

      <Route path="/app" element={<AppShell />}>
        <Route path="overview" element={<OverviewPage />} />
        <Route path="loan-requests" element={<LoanRequestsPage />} />
        <Route path="loan-requests/:id" element={<LoanDetailPage />} />
        <Route path="kyc" element={<KycPage />} />
        <Route path="collections" element={<CollectionsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<UserDetailPage />} />
        <Route path="borrowers" element={<BorrowersPage />} />
        <Route path="borrowers/:id" element={<BorrowerDetailPage />} />
        <Route path="campaigns" element={<CampaignsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="audit" element={<AuditLogsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
