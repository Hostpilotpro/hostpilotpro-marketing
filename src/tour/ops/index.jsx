/**
 * Registry of every sidebar destination in the Ops Console.
 *
 * The console's sidebar renders `sidebars[section].groups[].items[]`; each of
 * those labels must resolve to a component here. Dashboard, All villas and
 * Tasks stay in OpsConsole.jsx because they own navigation state.
 */
import {
  FinanceHub,
  Statements,
  OwnerBalances,
  PaymentQueue,
  PettyCash,
  Bills,
  Payouts,
} from './Finance.jsx';
import {
  RatePilot,
  RateCalendar,
  CompSet,
  ConciergeSales,
  Reviews,
  UpsellCatalogue,
} from './Growth.jsx';
import { UsersRoles, StaffDirectory, PayrollInputs, HostawaySync, AuditLog, Settings } from './Admin.jsx';
import {
  MyDay,
  ArrivalsDepartures,
  Inbox,
  MyTasks,
  MyRequests,
  MyBills,
  PropertyDrift,
  HeroPhotos,
  PortfolioAnalytics,
  OwnerDirectory,
  Onboarding,
  ReservationsFeed,
  Inspections,
  Checkout,
  ServiceSchedule,
  DamageClaims,
  TM30,
} from './Everyday.jsx';

/** label → component. Each receives { goTo } so a view can push another view. */
export const itemViews = {
  // Home
  'My day': MyDay,
  'Arrivals & departures': ArrivalsDepartures,
  Inbox,
  'My tasks': MyTasks,
  'My requests': MyRequests,
  'My bills': MyBills,
  // Properties
  'Property drift': PropertyDrift,
  'Hero photos': HeroPhotos,
  'Portfolio analytics': PortfolioAnalytics,
  'Owner directory': ({ goTo }) => <OwnerDirectory onOpenStatements={() => goTo('finance', 'Statements')} />,
  'Owner statements': Statements,
  Onboarding,
  // Operations
  'Reservations feed': ReservationsFeed,
  Inspections,
  Checkout,
  'Service schedule': ServiceSchedule,
  'Damage claims': DamageClaims,
  TM30,
  // Finance
  'Finance hub': FinanceHub,
  Statements,
  'Owner balances': OwnerBalances,
  'Payment queue': PaymentQueue,
  'Petty cash': PettyCash,
  Bills,
  Payouts,
  // Growth
  RatePilot,
  'Rate calendar': RateCalendar,
  'Comp set': CompSet,
  'Concierge sales': ConciergeSales,
  Reviews,
  'Upsell catalogue': UpsellCatalogue,
  // Admin
  'Users & roles': UsersRoles,
  'Staff directory': StaffDirectory,
  'Payroll inputs': PayrollInputs,
  'Hostaway sync': HostawaySync,
  'Audit log': AuditLog,
  Settings,
};

/** The landing item for each rail section. */
export const sectionLanding = {
  home: 'Dashboard',
  properties: 'All villas',
  operations: 'Tasks',
  finance: 'Finance hub',
  growth: 'RatePilot',
  admin: 'Users & roles',
};

export function ItemView({ item, goTo }) {
  const Cmp = itemViews[item];
  if (!Cmp) return null;
  return <Cmp goTo={goTo} />;
}
