import { Link } from 'react-router-dom';
import useSeo from '../lib/seo.js';
import { Eyebrow } from '../components/ui.jsx';

export default function NotFound() {
  useSeo({ title: 'Page not found — HostPilot Pro', description: 'That page does not exist.', path: '/404' });
  return (
    <div className="shell flex min-h-[70vh] flex-col justify-center py-24">
      <Eyebrow>404</Eyebrow>
      <h1 className="h-sec mt-4 font-medium">
        That page is not here. <span className="serif-em text-hp-text2">The product is.</span>
      </h1>
      <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-hp-text2">
        Either we moved it or the link was wrong. The four surfaces are all reachable from the tour.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/tour" className="btn btn-gold">
          Open the live tour
        </Link>
        <Link to="/" className="btn btn-quiet">
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
