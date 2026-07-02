import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center">
      <div className="container-editorial text-center">
        <div className="eyebrow mb-4">404</div>
        <h1 className="text-5xl md:text-7xl mb-6">
          Not <span className="gradient-text">found.</span>
        </h1>
        <p className="text-slate-600 mb-8">This doorway doesn't lead anywhere.</p>
        <Link to="/" className="btn-primary">Back home</Link>
      </div>
    </section>
  );
}
