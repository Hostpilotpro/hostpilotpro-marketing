// Marketing-only content. These tours never connect to a production tenant.
export const audiences = [
  {
    key: 'ops', to: '/ops', label: 'Property management companies', short: 'Management companies',
    product: 'Operations workspace', kicker: 'For the company running the portfolio',
    title: 'Run the operation. Not a collection of spreadsheets.',
    body: 'Bring the office and field team together around properties, reservations, tasks and money. Keep your channel manager; give the work after every booking a home.',
    outcomes: ['Know what needs attention today', 'Give every job an owner and a record', 'Follow the money behind each property'],
    cta: 'Explore the operations workspace',
    steps: [
      { title: 'Start with today', body: 'See the portfolio, arrivals and departures in one place. The open-month profit tile is labelled as an estimate, not a closed statement.', action: 'Try opening a villa from the dashboard.', target: 'dashboard' },
      { title: 'Put the work in motion', body: 'Move from a reservation to the work around it. Cleaning, pool, garden and maintenance jobs live on one operations board.', action: 'Try moving a task to its next status. This only changes the demo.', target: 'tasks' },
      { title: 'Keep financial context', body: 'Review statements, balances and payment work alongside the operation. Staff financial controls stay in the operations workspace, not the owner portal.', action: 'Explore the finance navigation to see the sample records.', target: 'finance' },
    ],
  },
  {
    key: 'owner', to: '/owner', label: 'Owners', short: 'Owners',
    product: 'Owner portal', kicker: 'For the person who owns the property',
    title: 'Your property. Your numbers. A clearer picture.',
    body: 'Give owners a dedicated place to understand performance, follow payouts and review decisions. Less chasing the office, more visibility into what is happening.',
    outcomes: ['Understand the income and costs', 'See what is paid and what is expected', 'Review pricing decisions with context'],
    cta: 'Explore the owner portal',
    steps: [
      { title: 'See the bigger picture', body: 'Start with the owner’s own property and performance. This is a different view from the company’s internal operations workspace.', action: 'Look at the performance tiles for this fictional villa.', target: 'Overview' },
      { title: 'Understand a statement', body: 'A total is only useful when the owner can understand it. Open a line to see the explanation behind a fee, recovery or repair.', action: 'Expand “Maintenance” or “Management fee” in the sample statement.', target: 'Statements' },
      { title: 'Stay involved in decisions', body: 'See a suggested rate and the reasoning behind it, then approve, cap or decline. These demo choices never change real rates.', action: 'Try an approval, then reset it to compare the options.', target: 'Approvals' },
    ],
  },
  {
    key: 'guest', to: '/guest', label: 'Guests', short: 'Guests',
    product: 'Guest portal', kicker: 'For the guest enjoying the stay',
    title: 'A smoother stay starts before the front door.',
    body: 'Give guests one simple link for arrival details, access information and extras. Your team remains behind the experience and confirms service requests.',
    outcomes: ['Arrive with the right information', 'Find the essentials without asking twice', 'Discover extras for the stay'],
    cta: 'Explore the guest portal',
    steps: [
      { title: 'Feel expected', body: 'The stay opens with the villa, dates and arrival status. Guests do not need to learn the management company’s internal software.', action: 'Check the sample arrival card and stay details.', target: 'arrival' },
      { title: 'Find the essentials', body: 'A guest-facing place for the access details your team provides. The code and Wi-Fi in this demo are invented, not credentials for a real villa.', action: 'See how door access and Wi-Fi are presented together.', target: 'essentials' },
      { title: 'Make more of the stay', body: 'A priced list makes extras easy to discover. Real requests need office confirmation; the demo only changes a sample selection and total.', action: 'Add or remove an extra and watch the total change.', target: 'extras' },
    ],
  },
];

export const audienceFor = (key) => audiences.find((a) => a.key === key) || audiences[0];
