const socialLinks = [
  ["LinkedIn", "https://www.linkedin.com/in/khanhngt", "/assets/icons/social/linkedin.svg"],
  ["GitHub", "https://github.com/TQKNG", "/assets/icons/social/github.svg"],
  ["DEV.to", "https://dev.to/khanh_nguyen_04b1205f5a91", "/assets/icons/social/devto.svg"],
] as const;

export const PortfolioFooter = () => (
  <footer className="border-t-4 border-brutalist-ink px-6 py-4">
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-brutalist-muted">© {new Date().getFullYear()} KHANH NGUYEN</span>
      <div className="flex gap-4">
        {socialLinks.map(([label, href, icon]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-brutalist-muted transition-colors hover:text-brutalist-ink"><img src={icon} alt="" className="h-5 w-5" /></a>)}
      </div>
    </div>
  </footer>
);
