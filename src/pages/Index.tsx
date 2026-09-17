import { BlogSection } from "@/components/blog/BlogSection";
import { HomeContact } from "@/components/home/HomeContact";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeInfo } from "@/components/home/HomeInfo";
import { HomeProjects } from "@/components/home/HomeProjects";
import { PortfolioFooter } from "@/components/layout/PortfolioFooter";
import { PageTransition } from "@/components/animations/PageTransition";
import { SiteNav } from "@/components/navigation/SiteNav";

const Index = () => (
  <PageTransition>
    <div className="min-h-screen bg-brutalist-cream font-mono">
      <SiteNav />
      <div className="relative grid min-h-[90vh] grid-cols-1 lg:grid-cols-2 lg:items-start">
        <HomeHero />
        <div>
          <HomeProjects />
          <BlogSection />
          <footer className="mt-8 border-t-4 border-brutalist-ink" id="about" data-nav-id="info">
            <HomeInfo />
            <HomeContact />
            <PortfolioFooter />
          </footer>
        </div>
      </div>
    </div>
  </PageTransition>
);

export default Index;
