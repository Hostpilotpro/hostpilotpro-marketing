import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="mt-32 bg-slate-900 text-slate-300">
      <div className="container-editorial py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <div className="text-white"><Logo /></div>
          <p className="mt-5 text-sm text-slate-400 max-w-xs leading-relaxed">
            The complete villa management platform. Owner portal, operations hub, and guest experience — one system, three doorways.
          </p>
          <p className="mt-6 text-xs text-slate-500">Built as Hostaway plugins. Made in Koh Samui.</p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-sky mb-4">Solutions</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/full-suite"   className="text-white font-medium hover:text-sky">Full Suite</Link></li>
            <li><Link to="/owner-portal" className="text-slate-300 hover:text-white">Owner Portal</Link></li>
            <li><Link to="/ops-hub"      className="text-slate-300 hover:text-white">Ops Hub</Link></li>
            <li><Link to="/guest-portal" className="text-slate-300 hover:text-white">Guest Portal</Link></li>
            <li><Link to="/pricing"      className="text-slate-300 hover:text-white">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-orange mb-4">Company</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about"        className="text-slate-300 hover:text-white">About</Link></li>
            <li><Link to="/features"     className="text-slate-300 hover:text-white">Features</Link></li>
            <li><Link to="/testimonials" className="text-slate-300 hover:text-white">Testimonials</Link></li>
            <li><Link to="/blog"         className="text-slate-300 hover:text-white">Blog</Link></li>
            <li><Link to="/demo"         className="text-slate-300 hover:text-white">Request a demo</Link></li>
            <li><a href="mailto:jordi@mrpropertysiam.com" className="text-slate-300 hover:text-white">Contact</a></li>
            <li><a href="https://www.mrpropertysiam.com" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white">Mr Property Siam</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-editorial py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} HostPilotPro Suite. All rights reserved.</span>
          <span>Reference deployment: Mr Property Siam · Koh Samui</span>
        </div>
      </div>
    </footer>
  );
}
