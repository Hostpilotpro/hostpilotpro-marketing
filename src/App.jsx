import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import OwnerPortal from './pages/OwnerPortal.jsx';
import OpsHub from './pages/OpsHub.jsx';
import GuestPortal from './pages/GuestPortal.jsx';
import FullSuite from './pages/FullSuite.jsx';
import Pricing from './pages/Pricing.jsx';
import Features from './pages/Features.jsx';
import About from './pages/About.jsx';
import Testimonials from './pages/Testimonials.jsx';
import Blog from './pages/Blog.jsx';
import Demo from './pages/Demo.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    // Wait a tick for React to paint the new route.
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
          <Route path="/owner-portal" element={<OwnerPortal />} />
          <Route path="/ops-hub" element={<OpsHub />} />
          <Route path="/guest-portal" element={<GuestPortal />} />
          <Route path="/full-suite" element={<FullSuite />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
