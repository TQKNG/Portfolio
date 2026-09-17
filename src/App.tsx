import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { SkipToContent } from "@/components/accessibility/SkipToContent";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import BlogPost from "./pages/BlogPost";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import DesignSystem from "./pages/DesignSystem";
import NotFound from "./pages/NotFound";
import Hero from "./pages/Hero";
import StyleguideHero from "./pages/StyleguideHero";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/styleguide-hero6" element={<StyleguideHero />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <MotionConfig reducedMotion="user">
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SkipToContent />
      <Sonner />
      <AnimatedRoutes />
    </BrowserRouter>
  </MotionConfig>
);

export default App;
