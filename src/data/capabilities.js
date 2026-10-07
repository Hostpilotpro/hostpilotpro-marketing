export const salesSections = {
  ops: {
    eyebrow: 'Marketing & communication',
    title: 'Fill the gaps. Keep the conversation connected.',
    lede: 'Bring campaign planning, guest communication and the daily operation into the same working context.',
    items: [
      ['Google & Meta advertising', 'Find available stay windows, prepare campaign briefs and build paused ads for review. Approved campaigns can be launched through configured Google and Meta connections; track spend, clicks and provider-reported conversions.'],
      ['Mailchimp newsletters', 'Turn selected villas, real photos and booking links into editable newsletters. AI helps write and revise the draft; your team previews it, chooses the audience and approves sending.'],
      ['Social content studio', 'Prepare artwork, captions and community-post drafts around actual availability. Download content for manual posting; community-group publishing stays with your team.'],
      ['WhatsApp office inbox', 'Keep supported one-to-one conversations, incoming files and property context together. Configured office accounts support reviewed text replies within the provider’s messaging window.'],
      ['LINE supplier workflow', 'A supplier pilot connects orders, delivery photos, quantities, bills and payment evidence. Activate and test the workflow with each participating supplier.'],
      ['Facebook & Instagram inbox', 'Configured social capture brings incoming messages into the office view. Receiving messages and publishing ads are separate capabilities; social inbox replies are not currently supported.'],
    ],
  },
  owner: {
    eyebrow: 'Owner involvement',
    title: 'Give owners decisions they can understand.',
    lede: 'Connect performance, property care and growth requests to the records behind them.',
    items: [
      ['Fund a marketing boost', 'Owners can request campaigns, review budgets and use marketing credits. Advertising spend and management fees remain visible; staff share campaign results once reviewed.'],
      ['Approve property work', 'Bring maintenance requests, inspection findings and proposals into the owner conversation, with supporting records and a saved response.'],
      ['Contracts & documents', 'Review draft contracts, leave feedback and follow the signature journey. Keep property documents, invoices and statement downloads accessible.'],
      ['Performance & investment', 'Follow bookings, revenue targets and pricing boundaries. Record purchase costs and investment figures for a clearer view of the property’s performance.'],
      ['Payout clarity', 'See recorded payment methods, references and proof alongside statement balances. Estimates remain distinguishable from completed payments.'],
    ],
  },
  guest: {
    eyebrow: 'Throughout the stay',
    title: 'A useful guest portal before, during and after arrival.',
    lede: 'Help guests find answers, request services and understand what has been confirmed.',
    items: [
      ['Digital arrival', 'Collect guest details and passport documents, show check-in progress and provide the house manual, directions and configured access instructions.'],
      ['Requests with a history', 'Guests can follow service and transfer requests, ask for changes or cancellation and contact the team. Supplier confirmation remains a separate step.'],
      ['Guest payments', 'Configured Stripe checkout supports card payments. Wise transfer instructions and Thailand’s PromptPay slip workflow provide additional options where enabled. Payment status follows reconciliation or staff verification, not a checkout return or an uploaded slip alone.'],
      ['Stay extensions & visits', 'Request extra nights and changes to scheduled property visits. The office checks availability and confirms the request.'],
      ['Catch concerns during the stay', 'A mid-stay check-in lets guests raise a concern while the team can still respond. Contextual concierge assistance also offers a route to a human.'],
      ['Local information', 'Bring villa guidance, weather, experiences and relevant local notices into the guest’s stay context.'],
    ],
  },
};

export const connections = [
  ['Hostaway', 'Current booking-system connection', 'Reservations and stay context. Configure and validate each operator’s account before activation.'],
  ['Guesty / Lodgify', 'Planned adapters', 'Their APIs differ. Access, permissions and supported workflows must be tested before onboarding can offer them.'],
  ['Google Ads / Meta Ads', 'Implemented provider workflows', 'Reporting and reviewed campaign actions need credentials, permissions, budgets and approval. Provider conversions are not independently verified bookings.'],
  ['Mailchimp', 'Implemented newsletter workflow', 'Audience selection, draft creation, editing, preview, reports and explicitly approved sending.'],
  ['WhatsApp', 'Configured office connection', 'Supported incoming conversations and files; reviewed one-to-one text replies through the office provider.'],
  ['Facebook / Instagram messages', 'Incoming capture', 'Requires account subscriptions and activation. Outbound social inbox replies are not supported.'],
  ['LINE', 'Supplier pilot', 'Ordering, delivery evidence and payment records with participating suppliers. Bank transfers are recorded, not executed by this workflow.'],
  ['Email', 'Configured delivery workflows', 'Guest and owner notices depend on enabled delivery paths. Full Gmail or Outlook mailbox synchronisation is not currently offered.'],
  ['Stripe / Wise / PromptPay', 'Payment options by configuration', 'Stripe hosted checkout, Wise instructions and PromptPay payment evidence. Eligibility, currency and reconciliation vary by provider and country.'],
  ['TM30', 'Thailand-specific workflow', 'Prepare the Thai guest-report import spreadsheet and track staff-recorded filing status. An export is not an automatic government submission.'],
];
