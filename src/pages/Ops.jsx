import useSeo from '../lib/seo.js';
import ProductPage from '../components/ProductPage.jsx';
import { opsDepth } from './ops-sections.js';
import BusinessStories from '../components/BusinessStories.jsx';

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
          Your PMS handles the bookings.<br /><span className="serif-em text-hp-text2">Run the business around them.</span>
        </>
      }
      lede="Connect the message centre, owner finance, RatePilot, listing tools, people and property care. Keep the booking backbone you already use, then give the office and the team a shared way to run the business behind every stay."
      bullets={[
        'Message context, staff authorship and human-reviewed AI assistance',
        'Owner ledgers, invoices, payouts, supplier costs and verification',
        'RatePilot, competitor context and owner pricing boundaries',
        'Channel-specific listing audits, rewrites and fleet visibility',
        'Recruitment, staff documents, overtime, allowances and payday',
        'Onboarding, property records, inspections and proof of work',
      ]}
      showcase={<BusinessStories />}
      compactDetails
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
        ...opsDepth,
        {
          eyebrow:'People & payroll',
          title:'Recruitment to payday, with the working details included.',
          lede:'A staff directory is only the beginning. Keep the employment journey connected to the work, the evidence and the pay review.',
          items:[
            ['Careers and employment','Applications, CVs, contracts and staff records belong in a connected workflow.'],
            ['Payroll walkthrough','Review one payee at a time, with salary, approved overtime, allowances and previous advances visible.'],
            ['Goals and recognition','Make contributions and bonus goals visible. Approved pay, league standings and reward accounting are not the same thing.'],
            ['Document dates','Track staff documents and expiry dates. Confirm the configured reminder recipients and delivery path during onboarding.'],
          ],
        },
      ]}
      roadmapIds={['connectors', 'trust']}
      notFor={[
        'It is not a channel manager. Distribution, rates on the OTAs and inventory sync stay with Hostaway.',
        'It is not a full accounting ledger. It produces the operational truth your accountant works from.',
        'There is no built-in website or booking engine. Direct bookings arrive through your existing stack.',
        'RatePilot does not run your pricing unattended. It proposes; a person accepts; strict mode never pushes.',
        'Document expiry reminders are not proven. The dates are tracked and visible; we will not promise an email until one has demonstrably sent.',
        'The combined message centre uses supported, configured sources. It is not a full Gmail replacement or WhatsApp group archive; social capture and outbound support have separate activation boundaries.',
        'Tour and transfer requests are confirmed by your office, not auto-confirmed with the supplier.',
      ]}
    />
  );
}
