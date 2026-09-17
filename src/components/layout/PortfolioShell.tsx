import type { ReactNode } from "react";
import { PageTransition } from "@/components/animations/PageTransition";
import { SiteNav } from "@/components/navigation/SiteNav";

interface PortfolioShellProps {
  children: ReactNode;
  className?: string;
  mainClassName?: string;
}

export const PortfolioShell = ({ children, className = "", mainClassName = "" }: PortfolioShellProps) => (
  <PageTransition>
    <div className={`min-h-screen bg-brutalist-cream font-mono ${className}`}>
      <SiteNav />
      <main id="main-content" className={mainClassName} tabIndex={-1}>
        {children}
      </main>
    </div>
  </PageTransition>
);
