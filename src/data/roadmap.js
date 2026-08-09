/**
 * Being built now. NOT shipped.
 *
 * Rules (messaging-v2 §7 and §8): describe the capability, never the partner.
 * The trust-account banking partnership is unsigned, so no vendor is named.
 * Nothing in this file may be presented anywhere on the site as a shipped
 * feature, and the block that renders it has to be impossible to mistake for
 * one.
 */

export const roadmap = [
  {
    id: 'trust',
    title: 'Segregated owner trust accounts',
    body:
      'Owner money held in a separate account from the management company’s operating cash, with the ledger and the bank balance reconciling to each other. Today HostPilot records the payout; the bank still moves it.',
    state: 'In build',
  },
  {
    id: 'connectors',
    title: 'Guesty and Lodgify connectors',
    body:
      'HostPilot is Hostaway-native today, and Hostaway is the only channel manager it syncs with. Guesty and Lodgify adapters are next. If you are on either one, you cannot subscribe and connect this week — ask us where the queue is.',
    state: 'Next',
  },
  {
    id: 'devices',
    title: 'Connected smart devices, starting with door locks',
    body:
      'Today the smart-tech surface is a catalogue and an install request. Bringing the installed hardware itself into the portal — lock codes issued against a reservation, meter readings on the statement — has not started. Not a single device is connected yet, and the site will say so until one is.',
    state: 'Not started',
  },
];
