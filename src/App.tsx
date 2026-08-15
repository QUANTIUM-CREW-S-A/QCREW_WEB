import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import { TestimonialsPage } from "./pages/Testimonials";
import { TeamPage } from "./pages/TeamPage";
import NotFound from "./pages/NotFound";
import { AdminPanel } from "./pages/AdminPanel";
import { ServiceDetail } from "./pages/ServiceDetail";
import Store from "./pages/Store";
import { AdminLogin } from "./pages/AdminLogin";
import { ProtectedRoute } from "./components/ui/ProtectedRoute";
import { ToastContainer } from "./components/ui/Toast";
import { WhatsAppButton } from "./components/ui/WhatsAppButton";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function SiteLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-rack-paper font-sans text-rack-ink antialiased">
        <Routes>
          {/* Admin routes - no Navbar/Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />

          {/* Site routes - with Navbar/Footer */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/tienda" element={<Store />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
