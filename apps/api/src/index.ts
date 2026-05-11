import cors from "cors";
import express from "express";

type LoanStatus = "active" | "pending" | "repaid" | "overdue";
type KycStatus = "approved" | "pending" | "rejected";

type User = {
  id: string;
  fullName: string;
  phone: string;
  kycStatus: KycStatus;
  totalBorrowed: number;
  outstandingBalance: number;
};

type LoanRequest = {
  id: string;
  userId: string;
  product: string;
  requestedAmount: number;
  tenureMonths: number;
  status: LoanStatus;
  createdAt: string;
};

const users: User[] = [
  {
    id: "USR-001",
    fullName: "Mary Wanjiku",
    phone: "+254712000111",
    kycStatus: "approved",
    totalBorrowed: 225000,
    outstandingBalance: 62400,
  },
  {
    id: "USR-002",
    fullName: "James Otieno",
    phone: "+254733000222",
    kycStatus: "pending",
    totalBorrowed: 45000,
    outstandingBalance: 32000,
  },
  {
    id: "USR-003",
    fullName: "Faith Njeri",
    phone: "+254755000333",
    kycStatus: "approved",
    totalBorrowed: 120000,
    outstandingBalance: 14000,
  },
];

const loans: LoanRequest[] = [
  {
    id: "LN-1001",
    userId: "USR-001",
    product: "Paycheck Loan",
    requestedAmount: 80000,
    tenureMonths: 6,
    status: "active",
    createdAt: "2026-05-05T08:10:00.000Z",
  },
  {
    id: "LN-1002",
    userId: "USR-002",
    product: "Market Bond Loan",
    requestedAmount: 50000,
    tenureMonths: 4,
    status: "pending",
    createdAt: "2026-05-10T10:00:00.000Z",
  },
  {
    id: "LN-1003",
    userId: "USR-003",
    product: "Boda Asset Financing",
    requestedAmount: 150000,
    tenureMonths: 12,
    status: "overdue",
    createdAt: "2026-04-12T09:30:00.000Z",
  },
];

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "yes-credit-api" });
});

app.get("/api/admin/overview", (_req, res) => {
  const totalUsers = users.length;
  const totalDisbursed = users.reduce((sum, user) => sum + user.totalBorrowed, 0);
  const totalOutstanding = users.reduce(
    (sum, user) => sum + user.outstandingBalance,
    0,
  );
  const pendingLoans = loans.filter((loan) => loan.status === "pending").length;

  res.json({
    totalUsers,
    totalDisbursed,
    totalOutstanding,
    pendingLoans,
    repaymentRate: 89.4,
    par30: 6.3,
  });
});

app.get("/api/admin/loan-requests", (_req, res) => {
  res.json(
    loans.map((loan) => ({
      ...loan,
      user: users.find((u) => u.id === loan.userId) ?? null,
    })),
  );
});

app.get("/api/mobile/dashboard/:userId", (req, res) => {
  const user = users.find((item) => item.id === req.params.userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const activeLoan = loans.find(
    (loan) => loan.userId === user.id && (loan.status === "active" || loan.status === "overdue"),
  );

  res.json({
    user,
    activeLoan,
    availableLimit: Math.max(150000 - user.outstandingBalance, 15000),
    nextDueDate: "2026-05-17",
    nextInstallment: 5200,
    notificationCount: 3,
  });
});

app.post("/api/mobile/loan-apply", (req, res) => {
  const { userId, product, requestedAmount, tenureMonths } = req.body as Partial<LoanRequest>;

  if (!userId || !product || !requestedAmount || !tenureMonths) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const newLoan: LoanRequest = {
    id: `LN-${1000 + loans.length + 1}`,
    userId,
    product,
    requestedAmount,
    tenureMonths,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  loans.unshift(newLoan);
  res.status(201).json(newLoan);
});

app.post("/api/mobile/repayments", (req, res) => {
  const { userId, amount, channel } = req.body as {
    userId?: string;
    amount?: number;
    channel?: string;
  };

  if (!userId || !amount) {
    res.status(400).json({ message: "User and amount are required" });
    return;
  }

  const user = users.find((item) => item.id === userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  user.outstandingBalance = Math.max(0, user.outstandingBalance - amount);

  res.status(201).json({
    receiptId: `RCP-${Date.now()}`,
    status: "success",
    amount,
    channel: channel ?? "M-Pesa",
    newOutstandingBalance: user.outstandingBalance,
    paidAt: new Date().toISOString(),
  });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`Yes Credit API running on http://localhost:${port}`);
});
