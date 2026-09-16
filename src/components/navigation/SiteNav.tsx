import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "WORK", sectionId: "work", navId: "work" },
  { label: "BLOG", sectionId: "blog", navId: "blog" },
  { label: "INFO", sectionId: "about", navId: "info" },
  { label: "MAIL", sectionId: "contact", navId: "mail" },
];

export const SiteNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [activeNav, setActiveNav] = useState("work");
  const pendingNavRef = useRef<string | null>(null);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveNav(location.pathname.startsWith("/blog/") ? "blog" : "work");
      return;
    }

    const sections = navItems
      .map(({ sectionId }) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const updateActiveNav = () => {
      const activationPoint = window.innerHeight * 0.25;
      let currentSection = sections[0];

      const isAtPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (isAtPageBottom) {
        currentSection = sections[sections.length - 1];
      } else {
        sections.forEach((section) => {
          if (section.getBoundingClientRect().top <= activationPoint) {
            currentSection = section;
          }
        });
      }

      const currentNav =
        currentSection.getAttribute("data-nav-id") ?? currentSection.id;
      const pendingNav = pendingNavRef.current;

      if (pendingNav && pendingNav !== currentNav) return;

      pendingNavRef.current = null;
      setActiveNav(currentNav);
    };

    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav);

    const hash = window.location.hash.slice(1);
    if (hash) {
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 0);
    }

    return () => {
      window.removeEventListener("scroll", updateActiveNav);
    };
  }, [location.pathname]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
    navId: string,
  ) => {
    event.preventDefault();
    pendingNavRef.current = navId;
    setActiveNav(navId);

    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }

    window.history.pushState(null, "", `/#${sectionId}`);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const navLinkClass = (navId: string) =>
    `relative inline-flex min-h-11 items-center overflow-hidden border-2 border-brutalist-ink px-2.5 text-[0.65rem] font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutalist-teal sm:px-4 sm:text-xs ${
      activeNav === navId
        ? "text-brutalist-cream"
        : "text-brutalist-ink hover:bg-brutalist-ink hover:text-brutalist-cream"
    }`;

  return (
    <nav aria-label="Primary" className="sticky top-0 z-50 flex items-center justify-between border-b-4 border-brutalist-ink bg-brutalist-cream px-4 py-3 sm:px-6">
      <Link
        to="/"
        aria-label="Khanh Nguyen home"
        className="inline-flex min-h-11 min-w-11 items-center text-xl font-bold text-brutalist-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutalist-teal"
      >
        KN
      </Link>
      <div className="flex gap-1">
        {navItems.map(({ label, sectionId, navId }) => (
          <a
            key={navId}
            href={`/#${sectionId}`}
            onClick={(event) => handleNavClick(event, sectionId, navId)}
            className={navLinkClass(navId)}
            aria-current={activeNav === navId ? "page" : undefined}
          >
            {activeNav === navId && (
              <motion.span
                layoutId="active-primary-nav"
                aria-hidden="true"
                className="absolute inset-0 z-0 bg-brutalist-ink"
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 34 }
                }
              />
            )}
            <span className="relative z-10">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};
