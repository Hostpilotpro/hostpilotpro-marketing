import { useState } from 'react';
import {
  Clock,
  ClipboardList,
  FilePenLine,
  CalendarCheck,
  Wallet,
  MessagesSquare,
  History,
  Sparkles,
  ScanLine,
  Menu,
  Bell,
  ArrowLeft,
  Check,
  Monitor,
} from 'lucide-react';
import demo from '../data/demo.js';

const icons = [Clock, ClipboardList, FilePenLine, CalendarCheck, Wallet, MessagesSquare, History, Sparkles, ScanLine];

/* Tile labels per language. The field app ships in the languages the staff actually speak. */
const L = {
  English: {
    hi: `Hi ${demo.mobile_field.staff}`,
    ask: 'What do you need?',
    desktop: 'Desktop version',
    jobs: 'My jobs',
    back: 'Back',
    claim: 'Claim job',
    claimed: 'Claimed by you',
    today: '4 jobs today',
    tiles: demo.mobile_field.tiles.map((t) => [t.label, t.sub]),
  },
  ไทย: {
    hi: `สวัสดี ${demo.mobile_field.staff}`,
    ask: 'ต้องการอะไร',
    desktop: 'เวอร์ชันเดสก์ท็อป',
    jobs: 'งานของฉัน',
    back: 'กลับ',
    claim: 'รับงานนี้',
    claimed: 'คุณรับงานนี้แล้ว',
    today: 'วันนี้ 4 งาน',
    tiles: [
      ['เข้างาน / ออกงาน', 'วันนี้ 6 ชม. 20 นาที'],
      ['งานของฉัน', 'วันนี้ 4 งาน'],
      ['บันทึกงาน', 'บันทึกงานที่ทำเสร็จแล้ว'],
      ['เช็คอิน / เช็คเอาท์', 'เข้า 9 · ออก 7'],
      ['เงินเดือนของฉัน', 'เงินเดือน ค่าล่วงเวลา โบนัส'],
      ['แชทของทีม', 'ใหม่ 2'],
      ['ชั่วโมงและงาน', 'เดือนนี้ 142 ชม.'],
      ['ผู้ช่วย AI', 'ถามหรือสแกนอะไรก็ได้'],
      ['สแกนใบเสร็จ', 'ถ่ายรูปใบเสร็จ'],
    ],
  },
  မြန်မာ: {
    hi: `မင်္ဂလာပါ ${demo.mobile_field.staff}`,
    ask: 'ဘာလိုအပ်ပါသလဲ',
    desktop: 'ဒက်စ်တော့ဗားရှင်း',
    jobs: 'ကျွန်ုပ်၏အလုပ်များ',
    back: 'ပြန်သွား',
    claim: 'အလုပ်ယူပါ',
    claimed: 'သင်ယူထားပြီး',
    today: 'ဒီနေ့ ၄ ခု',
    tiles: [
      ['အလုပ်ဝင် / ထွက်', 'ဒီနေ့ ၆ နာရီ ၂၀ မိနစ်'],
      ['ကျွန်ုပ်၏အလုပ်များ', 'ဒီနေ့ ၄ ခု'],
      ['အလုပ်မှတ်တမ်း', 'ပြီးဆုံးထားသောအလုပ်ကို မှတ်တမ်းတင်'],
      ['ဝင် / ထွက်', 'ဝင် ၉ · ထွက် ၇'],
      ['လုပ်အခ', 'လစာ၊ အချိန်ပို၊ ဘောနပ်စ်'],
      ['အဖွဲ့ချက်တ်', 'အသစ် ၂'],
      ['နာရီနှင့်အလုပ်', 'ဒီလ ၁၄၂ နာရီ'],
      ['AI အကူအညီ', 'မေးမြန်း သို့ စကင်ဖတ်'],
      ['ဘောက်ချာစကင်', 'ဘောက်ချာဓာတ်ပုံရိုက်'],
    ],
  },
};

const jobs = [
  { title: 'Departure clean · Villa Sunset Sapphire', when: 'Today 11:00', dept: 'Cleaning', mine: true },
  { title: 'Restock welcome hamper · The Frangipani', when: 'Today 13:00', dept: 'Cleaning', mine: true },
  { title: 'Pre-arrival inspection · Baan Lotus', when: 'Today 16:30', dept: 'Inspection', mine: false },
  { title: 'Linen pickup · Casa del Sol', when: 'Today 17:15', dept: 'Laundry', mine: false },
];

export default function FieldApp() {
  const [lang, setLang] = useState('English');
  const [view, setView] = useState('home');
  const [claimed, setClaimed] = useState([]);
  const t = L[lang];

  const cycle = () => {
    const keys = Object.keys(L);
    setLang(keys[(keys.indexOf(lang) + 1) % keys.length]);
  };

  return (
    <div className="replica-light min-h-[560px] bg-[#F7F4EC] text-[#1E1B16]">
      {/* header */}
      <div className="flex items-start gap-3 px-4 pb-3 pt-6">
        <Menu size={20} className="mt-1 shrink-0 text-[#4A4436]" />
        <div className="min-w-0 flex-1">
          <div className="truncate font-display text-[20px] font-semibold leading-tight">{t.hi}</div>
          <div className="text-[12.5px] text-[#6E6656]">{t.ask}</div>
        </div>
        <div className="relative mt-1">
          <Bell size={17} className="text-[#4A4436]" />
          <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#C2A470]" />
        </div>
        <button
          onClick={cycle}
          className="mt-0.5 rounded-full border border-[#D8D0BC] px-2.5 py-1 text-[12px] font-medium text-[#4A4436]"
        >
          {lang}
        </button>
      </div>

      {view === 'home' && (
        <>
          <div className="grid grid-cols-2 gap-2.5 px-3">
            {t.tiles.map(([label, sub], i) => {
              const Icon = icons[i];
              const badge = demo.mobile_field.tiles[i].badge;
              return (
                <button
                  key={label}
                  onClick={() => i === 1 && setView('jobs')}
                  className="relative rounded-xl border border-[#E3DCC8] bg-white/70 p-3.5 text-left transition active:scale-[0.98]"
                >
                  <Icon size={22} className="text-[#8A7A59]" strokeWidth={1.6} />
                  <div className="mt-3 text-[14.5px] font-semibold leading-tight">{label}</div>
                  <div className="mt-0.5 text-[11.5px] leading-snug text-[#6E6656]">{sub}</div>
                  {badge && (
                    <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-md bg-[#3F5136] text-[11px] font-semibold text-white">
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="p-3">
            <div className="flex items-center justify-center gap-2 rounded-xl border border-[#E3DCC8] bg-white/70 py-3 text-[14px] font-medium text-[#4A4436]">
              <Monitor size={16} /> {t.desktop}
            </div>
          </div>
        </>
      )}

      {view === 'jobs' && (
        <div className="px-3 pb-4">
          <button
            onClick={() => setView('home')}
            className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#D8D0BC] px-3 py-1 text-[12.5px] text-[#4A4436]"
          >
            <ArrowLeft size={12} /> {t.back}
          </button>
          <div className="font-display text-[19px] font-semibold">{t.jobs}</div>
          <div className="text-[12.5px] text-[#6E6656]">{t.today}</div>
          <div className="mt-3 space-y-2.5">
            {jobs.map((j) => {
              const isClaimed = j.mine || claimed.includes(j.title);
              return (
                <div key={j.title} className="rounded-xl border border-[#E3DCC8] bg-white/75 p-3.5">
                  <div className="text-[14px] font-semibold leading-snug">{j.title}</div>
                  <div className="mt-1 flex items-center gap-2 text-[11.5px] text-[#6E6656]">
                    <span className="rounded-full border border-[#D8D0BC] px-1.5 py-0.5">{j.dept}</span>
                    <span>{j.when}</span>
                  </div>
                  {isClaimed ? (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#3F5136] px-3 py-1 text-[12px] font-semibold text-white">
                      <Check size={12} /> {t.claimed}
                    </div>
                  ) : (
                    <button
                      onClick={() => setClaimed((c) => [...c, j.title])}
                      className="mt-3 rounded-full border border-[#8A7A59] px-3 py-1 text-[12px] font-semibold text-[#6B5C3F]"
                    >
                      {t.claim}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="px-4 pb-5 pt-1 text-center text-[10.5px] text-[#8A8371]">
        {demo.mobile_field.staff} · {demo.mobile_field.role} · Azure Coast Villas
      </div>
    </div>
  );
}
