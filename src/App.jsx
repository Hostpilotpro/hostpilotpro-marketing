import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Tour from './pages/Tour.jsx';
import Owner from './pages/Owner.jsx';
import Ops from './pages/Ops.jsx';
import Guest from './pages/Guest.jsx';
import Field from './pages/Field.jsx';
import FullSuite from './pages/FullSuite.jsx';
import Pricing from './pages/Pricing.jsx';
import About from './pages/About.jsx';
import Proof from './pages/Proof.jsx';
import Blog from './pages/Blog.jsx';
import Demo from './pages/Demo.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Re-run per route so newly-mounted `.reveal` nodes are observed.
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
    }, 30);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/ops" element={<Ops />} />
          <Route path="/guest" element={<Guest />} />
          <Route path="/field" element={<Field />} />
          <Route path="/full-suite" element={<FullSuite />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/proof" element={<Proof />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/demo" element={<Demo />} />

          {/* Legacy routes from the previous site — kept so existing links survive. */}
          <Route path="/owner-portal" element={<Navigate to="/owner" replace />} />
          <Route path="/ops-hub" element={<Navigate to="/ops" replace />} />
          <Route path="/guest-portal" element={<Navigate to="/guest" replace />} />
          <Route path="/testimonials" element={<Navigate to="/proof" replace />} />
          <Route path="/features" element={<Navigate to="/full-suite" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
