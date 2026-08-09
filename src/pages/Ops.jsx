import useSeo from '../lib/seo.js';
import ProductPage from '../components/ProductPage.jsx';
import OpsConsole from '../tour/OpsConsole.jsx';

export default function Ops() {
  useSeo({
    title: 'HostPilot Ops — the staff console a villa company runs on',
    description:
      'Villas, owners, reservations, tasks, inspections, statements, petty cash and payroll inputs in one console, with a command palette that reaches any record in two keystrokes.',
    path: '/ops',
  });
  return (
    <ProductPage
      eyebrow="HostPilot Ops"
      title={
        <>
          The console the whole operation <span className="serif-em text-hp-text2">actually runs on.</span>
        </>
      }
      lede="One screen for the morning: who arrives, who leaves, what is late, what it earned. Underneath it, a villa file for every property that holds the bookings, the house manual, the photos, the owner, the financials and the history in one place — so nobody has to ask which spreadsheet is current."
      bullets={[
        'A dashboard that opens with today, not with a chart nobody reads',
        '⌘K command palette across villas, tasks and owners',
        'A villa dossier per property with a 30-day booking grid',
        'Task board across cleaning, pool, garden, maintenance and inspection',
        'Finance hub: statements, owner balances, payment queue, petty cash',
        'Profit estimate for the open month, clearly labelled as an estimate',
      ]}
      replica={<OpsConsole />}
      replicaTheme="dark"
      host="ops.hostpilotpro.com"
      sections={[
        {
          eyebrow: 'Speed',
          title: 'Two keystrokes to any record.',
          lede:
            'Field-facing software fails on friction. If a coordinator needs four clicks and a filter to find a villa mid-phone-call, they stop using the system and go back to WhatsApp.',
          items: [
            ['Command palette', 'Press ⌘K anywhere, type three letters of a villa or a code, hit enter.'],
            ['Contextual sidebar', 'Six domains in the rail, and only the sub-navigation for the one you are in.'],
            ['Favourites and recents', 'The five screens a given role opens every day sit at the top of their sidebar.'],
            ['Everything deep-linkable', 'Any villa, task or statement is a URL you can paste into a message.'],
          ],
        },
        {
          eyebrow: 'Operations',
          title: 'Work that leaves a record.',
          lede:
            'Every task closed in the field becomes evidence in an owner statement later. That is the connection most operations tools do not make.',
          items: [
            ['Departments, not a flat list', 'Cleaning, pool, garden, maintenance and inspection each have their own rhythm and their own board.'],
            ['Photo proof by default', 'A closed clean carries images and a timestamp. Disputes end quickly.'],
            ['Overdue counted separately', 'Backlog is never hidden inside today’s number to make the dashboard look calm.'],
            ['Batch assign and reschedule', 'Drill into a department and move a day’s work in one pass.'],
          ],
        },
        {
          eyebrow: 'Money',
          title: 'The unglamorous half.',
          lede:
            'Villa management is a cash-handling business. Petty cash, guest recoveries, staff overtime and supplier bills are where margin quietly disappears.',
          items: [
            ['Statements pipeline', 'Draft, review, close, issue. Owner balances stay visible to staff for review only.'],
            ['Petty cash and bills', 'Receipts photographed in the field land in the finance queue the same hour.'],
            ['Service income tracked', 'Laundry, cleaning, pool and garden income separated from the management fee.'],
            ['Profit estimate, honestly labelled', 'The open month is an estimate. The product says so on the tile.'],
          ],
        },
      ]}
      notFor={[
        'It is not a channel manager. Distribution, rates on the OTAs and inventory sync stay with Hostaway.',
        'It is not a full accounting ledger. It produces the operational truth your accountant works from.',
        'There is no built-in website or booking engine. Direct bookings arrive through your existing stack.',
      ]}
    />
  );
}
