Yes Credit Limited (YCL) is a premier Kenyan microfinance institution dedicated to bridging the financial inclusion gap. By leveraging a mobile-first approach, YCL provides tech-savvy, adaptable financial tools to the informal economy—a sector that employs over 80% of Kenya’s workforce but remains largely underserved by traditional banking systems.

Core Identity
Mission: To uplift underserved communities with innovative and adaptable financial tools, sparking entrepreneurship, enabling asset ownership, and fostering lasting economic strength.
Vision: To become Africa’s most trusted and accessible microfinance partner, transforming lives through responsible lending and innovation.
Driving Purpose: YCL operates on the belief that financial inclusion is a right. Inspired by global leaders in microfinance, the company walks with clients from the initial dream to realized prosperity.

The 3-Part Model (Core Offerings)
YCL’s model is built on three pillars designed for flexibility and individualized needs:
Microfinance Loans
Target: Civil servants (teachers, nurses), private sector employees, and entrepreneurs.
Scope: Loans ranging from KES 10,000 to KES 300,000.
Products: Paycheck loans, logbook loans, title deed loans, group loans, and SACCO guarantor-backed loans.
Delivery: Swift disbursement via M-Pesa.
Boda Boda Asset Financing
Target: Boda Boda riders looking to transition from renting to owning.
Benefits: YCL sources motorcycles directly, providing a seamless acquisition process.
Security: Packages include affordable repayment plans, integrated insurance, and GPS tracking to ensure financial and asset security.
Market Bond Financing
Target: Market vendors and small-scale traders (Mama Mbogas, Mitumba traders).
Scope: Loans ranging from KES 10,000 to KES 100,000.
Structure: Mobile-based daily repayments via M-Pesa to align with daily cash flow, paired with essential financial literacy training.

Key Strengths & Competitive Advantage
Technology Integration: A mobile-first philosophy utilizing M-Pesa for end-to-end processing, ensuring transparency and efficiency.
Community Trust: Deep-rooted partnerships with local entities like the Kenya Boda Boda Association and various Market Traders’ Associations.
Social Impact: Directly aligned with Kenya’s Vision 2030 by empowering those below the poverty line through asset acquisition and capital.
Proven Track Record: Supported over 10,000 businesses, 4,000 Boda Boda riders, and conducted 612 financial literacy trainings.

Core Values
Integrity: Honesty and transparency in every operation.
Innovation: Leveraging tech to simplify financial services.
Community Trust: Prioritizing collective success and peer accountability over profit.

===============================================================================
YES CREDIT DIGITAL PLATFORM - COMPLETE PRODUCT BLUEPRINT
===============================================================================

Goal
Build a best-in-class lending ecosystem with:
1) Borrower mobile app (React Native + Expo)
2) Admin web dashboard (Vite + React)
3) Shared backend services for loans, KYC, repayments, notifications, and analytics.

This document defines the complete feature scope, UX direction, architecture, and phased release plan.

-------------------------------------------------------------------------------
1. Product Vision
-------------------------------------------------------------------------------

Create a simple, trusted, and transparent loan experience where users can:
- Sign up and log in quickly
- See exactly how much they owe and due dates
- Repay via M-Pesa
- Apply for new loans in minutes
- Complete KYC digitally
- Receive smart reminders and updates

For Admin teams, provide a command center to:
- Track loan demand and portfolio health in real time
- Review and approve/reject applications faster
- Monitor risk, defaults, repayments, and user growth
- Manage users, products, limits, and communications

-------------------------------------------------------------------------------
2. Inspirations from Top Loan Apps
-------------------------------------------------------------------------------

Borrow best practices from loan and fintech leaders:
- Extremely clear repayment card and due-date countdown.
- Minimal onboarding flow with progress tracker
- Dynamic loan offers based on repayment behavior
- In-app reminders before due dates and overdue escalation flows
- Fast, auditable approval workflow for operations teams
- Risk heatmaps and delinquency monitoring dashboards

-------------------------------------------------------------------------------
3. Borrower Mobile App (React Native + Expo) - Feature List
-------------------------------------------------------------------------------

A) Authentication and Account Access
- Phone number login with OTP
- Email/password fallback login
- Biometric login (fingerprint/face)
- Device binding and suspicious login alerts
- Session management (active devices, logout all)

B) Onboarding and Profile Setup
- Welcome flow with clear value proposition
- Multi-step registration (name, ID number, phone, occupation, income band)
- Address capture with geolocation support
- Emergency contact details
- Bank/M-Pesa payout details
- Profile completion meter (%)

C) KYC and Compliance
- National ID upload (front/back)
- Selfie liveness check
- Optional passport image upload
- Document OCR extraction (auto-fill fields)
- KRA PIN capture (if required)
- KYC status states: Pending, Under Review, Approved, Rejected
- Re-submission flow with reasons for rejection

D) Home Dashboard (Best UI Priority)
- Main "Outstanding Balance Card" with:
  - Remaining balance
  - Next repayment date
  - Progress bar (paid vs remaining)
  - Quick "Repay Now" CTA
- Available loan limit card
- Active loan summary card
- Loan eligibility score indicator
- Notification bell with unread badges
- "Financial health tips" carousel

E) Loan Application
- Product selection (salary loan, logbook, market bond, group loan)
- Loan calculator (amount, tenure, estimated installment, fees)
- Transparent fee breakdown before submit
- Purpose of loan selection
- Guarantor details (for applicable products)
- Collateral details (for secured products)
- "Save draft" loan application
- Application timeline tracking

F) Loan Management
- Active loan details page:
  - Principal, interest, fees, penalties
  - Total repaid vs outstanding
  - Installment schedule
  - Days remaining / overdue days
- Repayment schedule calendar view
- Downloadable agreement and statements (PDF)
- Top-up / refinance offers
- Early repayment and payoff quote

G) Repayments
- M-Pesa STK push integration
- Manual paybill guidance flow
- Card payments (optional future)
- Auto-debit opt-in
- Partial payment support
- Repayment receipt screen and downloadable receipt
- Repayment history and transaction ledger

H) Notifications and Communication
- Push notifications:
  - Approval/rejection updates
  - Due date reminders (7 days, 3 days, 1 day, due day)
  - Overdue alerts and resolution prompts
  - Promotional offers
- SMS fallback for critical notices
- In-app notification center
- Customer support chat / ticketing
- FAQ and help center

I) User Growth and Engagement Features
- Referral program with rewards
- Loyalty tiers based on on-time repayments
- Credit limit increase milestones
- Smart recommendations ("You can qualify for X in 2 weeks")
- In-app financial literacy content

J) Security and Trust
- End-to-end encrypted data in transit
- PIN for transaction confirmation
- Fraud detection checks (velocity, device risk)
- Data privacy controls and consent management

K) Settings
- Edit profile
- Language selection (English/Swahili ready)
- Notification preferences
- Linked accounts and payout channels
- Close account / data deletion request

-------------------------------------------------------------------------------
4. Admin Dashboard (Vite + React) - Feature List
-------------------------------------------------------------------------------

A) Admin Access and Roles
- Secure login with 2FA
- Role-based access control:
  - Super Admin
  - Loan Officer
  - KYC Analyst
  - Collections Officer
  - Support Agent
  - Read-only Auditor
- Activity logs for all admin actions

B) Executive Overview Dashboard
- Total users
- Active users (daily/weekly/monthly)
- Total loans disbursed
- Total outstanding portfolio
- Repayment rate
- Delinquency ratios (PAR 1/7/30)
- Default rate
- Average loan size
- Revenue from interest/fees
- Net cash flow widget

C) Loan Application Pipeline
- New applications queue
- Filters (amount, product, risk band, region, KYC status)
- Application detail panel:
  - Applicant profile
  - KYC docs
  - Credit score and risk indicators
  - Existing obligations
- Approve / Reject / Request More Info actions
- Decision notes and internal comments
- SLA timers for each stage

D) KYC Review Console
- Side-by-side document and extracted fields
- Liveness verification status
- Duplicate identity detection
- Blacklist/sanctions flag checks
- Approve/reject with reason templates
- Reverification workflow

E) User and Account Management
- Full user profiles with lifecycle states
- User segmentation (new, active, dormant, high risk)
- Account freeze/unfreeze
- Loan limit adjustment
- Manual KYC override (authorized roles only)
- Communication history per user

F) Repayment and Collections
- Repayment feed (real-time)
- Failed payment alerts
- Overdue buckets (1-7, 8-30, 31-60, 60+ days)
- Collections work queue
- Follow-up actions (call, SMS, visit, restructure)
- Promise-to-pay tracking
- Reschedule/restructure plans

G) Product and Rules Management
- Create/edit loan products
- Configure:
  - Min/max amounts
  - Tenure options
  - Interest and fee formulas
  - Grace periods
  - Penalty rules
- Eligibility and affordability rule engine
- Feature flags and rollout controls

H) Reports and Analytics
- Portfolio performance dashboards
- Cohort analysis by signup month
- Funnel analytics (signup -> KYC -> approved -> repaid)
- Geographic distribution maps
- Export CSV/XLS/PDF reports
- Scheduled reports via email

I) Notifications and Campaigns
- Broadcast announcements (push/SMS/email)
- Triggered messaging templates
- A/B campaigns for repayment reminders
- Segmented campaigns (e.g., first-time borrowers)

J) Audit, Compliance, and Monitoring
- Immutable audit logs
- Compliance reports
- Loan decision traceability
- Operational health dashboard (API uptime, queue delays, failures)
- Incident alerting integration (Slack/Email)

-------------------------------------------------------------------------------
5. Shared Platform Features (Backend + Integrations)
-------------------------------------------------------------------------------

- Loan decisioning service (rules + scorecards)
- Repayment orchestration service
- Notification service (push, SMS, email)
- Document management service
- Analytics pipeline for BI dashboards
- Integration with M-Pesa APIs
- Credit bureau integrations (optional phased)
- Fraud and anomaly detection layer
- Config-driven product engine (non-dev rule updates)

-------------------------------------------------------------------------------
6. UI/UX Creative Direction (Best UI Requirement)
-------------------------------------------------------------------------------

Borrower App UX Style
- Bold card-based UI with clean white backgrounds and high-contrast accents
- Large "amount left" visual with radial/progress components
- Single-tap actions for repay and apply
- Contextual microcopy that builds trust ("No hidden fees", "Updated just now")
- Motion design for success states (repayment success confetti subtle animation)
- Dark mode support

Admin Dashboard UX Style
- Clean professional data-grid layout with interactive charts
- Color-coded risk states (safe/warning/delinquent)
- Fast keyboard-first workflows for officers
- Sticky filters and saved views
- Drill-down from KPI tiles to user/application details

Design System
- Shared component library between mobile and web where practical
- Standard spacing, typography scale, and elevation system
- Accessible color contrasts and readable text hierarchy
- Consistent empty/loading/error states

-------------------------------------------------------------------------------
7. Suggested Tech Stack
-------------------------------------------------------------------------------

Mobile (Borrower):
- React Native + Expo
- Expo Router
- React Query / TanStack Query
- Zustand or Redux Toolkit (global state)
- NativeWind or styled-components (styling)
- Expo Notifications
- Expo SecureStore for sensitive tokens

Admin Web:
- Vite + React + TypeScript
- React Router
- TanStack Query
- Table/Chart stack: TanStack Table + Recharts/ECharts
- Component system: shadcn/ui or custom design system

Backend (recommended):
- Node.js (NestJS or Express + TypeScript)
- PostgreSQL
- Redis (queues/cache/rate-limits)
- Object storage for KYC docs
- BullMQ / message queue for async jobs
- OpenAPI-first API contracts

Infra:
- Dockerized services
- CI/CD pipelines
- Monitoring: Prometheus/Grafana or hosted equivalent
- Error tracking: Sentry

-------------------------------------------------------------------------------
8. Data and Metrics to Track
-------------------------------------------------------------------------------

Acquisition:
- New signups, KYC completion rate, approval rate

Portfolio:
- Disbursement volume, outstanding balance, PAR, defaults

Repayment:
- On-time repayment rate, collection efficiency, recovery rate

Engagement:
- DAU/WAU/MAU, notification open rate, referral conversion

Operations:
- Loan decision turnaround time, KYC processing time, failed payment rate

-------------------------------------------------------------------------------
9. Phased Delivery Plan
-------------------------------------------------------------------------------

Phase 1 (MVP - 8 to 12 weeks)
- Auth, onboarding, KYC basic flow
- Apply for loan, approval workflow
- Outstanding balance card + repayment via M-Pesa
- Basic notifications
- Admin overview + loan queue + user management

Phase 2 (Growth)
- Risk scoring improvements
- Repayment reminders automation
- Collections module
- Reporting dashboard expansions
- Referral and loyalty features

Phase 3 (Scale)
- Advanced analytics and cohort insights
- Rule engine self-service for operations
- Multiple loan products and dynamic offers
- AI-assisted risk and collections prioritization

-------------------------------------------------------------------------------
10. Future Enhancements (High Value)
-------------------------------------------------------------------------------

- WhatsApp assistant for repayments and reminders
- Offline mode for low-connectivity regions
- Voice-guided onboarding
- In-app marketplace for insurance and savings products
- Merchant partner integrations
- Agent app for field officers

-------------------------------------------------------------------------------
11. Build Order Recommendation (Practical)
-------------------------------------------------------------------------------

1) Finalize UX wireframes and design system
2) Build backend APIs and auth/KYC foundations
3) Implement borrower MVP app with repayment flow
4) Build admin MVP dashboard for operations
5) Add analytics and growth features
6) Harden security, compliance, and observability

This blueprint is intentionally expansive to allow Yes Credit to launch quickly, then scale into a full digital lending platform comparable to top regional loan apps.