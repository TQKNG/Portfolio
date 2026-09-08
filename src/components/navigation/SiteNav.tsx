import { useEffect, useRef, useState } from "react";
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
    const scrollPanel = document.querySelector<HTMLElement>(
      "[data-site-scroll-panel]",
    );

    if (!scrollPanel || sections.length === 0) return;

    const updateActiveNav = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const viewportTop = isDesktop
        ? scrollPanel.getBoundingClientRect().top
        : 0;
      const viewportHeight = isDesktop
        ? scrollPanel.clientHeight
        : window.innerHeight;
      const activationPoint = viewportTop + viewportHeight * 0.25;
      let currentSection = sections[0];

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= activationPoint) {
          currentSection = section;
        }
      });

      const currentNav =
        currentSection.getAttribute("data-nav-id") ?? currentSection.id;
      const pendingNav = pendingNavRef.current;

      if (pendingNav && pendingNav !== currentNav) return;

      pendingNavRef.current = null;
      setActiveNav(currentNav);
    };

    updateActiveNav();
    scrollPanel.addEventListener("scroll", updateActiveNav);
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
      scrollPanel.removeEventListener("scroll", updateActiveNav);
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

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const navLinkClass = (navId: string) =>
    activeNav === navId
      ? "border-2 border-brutalist-ink bg-brutalist-ink px-4 py-2 text-xs font-bold text-brutalist-cream"
      : "border-2 border-brutalist-ink px-4 py-2 text-xs font-bold text-brutalist-ink hover:bg-brutalist-ink hover:text-brutalist-cream";

  return (
    <nav className="flex items-center justify-between border-b-4 border-brutalist-ink px-6 py-4">
      <Link to="/" className="text-xl font-bold text-brutalist-ink">
        KN
      </Link>
      <div className="flex gap-1">
        {navItems.map(({ label, sectionId, navId }) => (
          <a
            key={navId}
            href={`/#${sectionId}`}
            onClick={(event) => handleNavClick(event, sectionId, navId)}
            className={navLinkClass(navId)}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
};
