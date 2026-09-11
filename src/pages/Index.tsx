import { Link } from "react-router-dom";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { PageTransition } from "@/components/animations/PageTransition";
import { BlogSection } from "@/components/blog/BlogSection";
import { SiteNav } from "@/components/navigation/SiteNav";
import { ProjectPreviewMedia } from "@/components/projects";
import { getAllProjects } from "@/data/projects";

const Index = () => {
  const projects = getAllProjects();

  return (
    <PageTransition>
      <div className="min-h-screen bg-brutalist-cream font-mono">
        <SiteNav />

        {/* Hero Content - Two Column Layout */}
        <div className="relative grid min-h-[90vh] grid-cols-1 lg:grid-cols-2 lg:items-start">
          {/* Left Panel - Sticky Hero */}
          <div className="flex flex-col justify-center border-b-4 border-brutalist-ink p-8 lg:sticky lg:top-[72px] lg:h-[calc(100svh-72px)] lg:border-b-0 lg:border-r-4 lg:p-12">
            <FadeInStagger staggerDelay={0.08}>
              <FadeIn>
                <h1 className="text-6xl font-bold leading-none text-brutalist-ink md:text-8xl lg:text-[clamp(5rem,7vw,10rem)]">
                  KHANH
                  <br />
                  NGUYEN
                  <br />
                </h1>
              </FadeIn>
              <FadeIn>
                <div className="mt-8 h-4 w-32 bg-brutalist-teal" />
              </FadeIn>
              <FadeIn>
                <p className="mt-6 text-xs tracking-widest text-brutalist-muted">
                  SOFTWARE ENGINEER / EST. 2023
                </p>
              </FadeIn>
            </FadeInStagger>
          </div>

          {/* Right Panel - Projects + Footer */}
          <div>
            <section id="work" data-nav-id="work" className="scroll-mt-[72px]">
              <div className="p-4 pb-4 lg:p-6 lg:pb-4">
                <h4 className="text-xl font-bold text-brutalist-ink">
                  LET&apos;S EXPLORE
                </h4>
                <p className="mt-1 text-xs uppercase tracking-wide text-brutalist-muted">
                  SELECT A PROJECT TO VIEW THE FULL CASE STUDY
                </p>
              </div>
              <FadeInStagger className="space-y-2 px-6 pb-6 pt-0" staggerDelay={0.08}>
                {projects.map((project) => (
                  <FadeIn key={project.id}>
                    <Link
                      to={`/projects/${project.slug}`}
                      aria-label={`View ${project.title} case study`}
                      className="group block cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-brutalist-teal"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden border-4 border-brutalist-ink transition-colors group-hover:border-brutalist-teal group-focus-visible:border-brutalist-teal">
                        <ProjectPreviewMedia
                          project={project}
                          className="transition-transform duration-300 group-hover:scale-[1.015] group-focus-visible:scale-[1.015] motion-reduce:transform-none"
                        />
                        <span className="absolute bottom-0 right-0 z-10 border-l-4 border-t-4 border-brutalist-ink bg-brutalist-cream px-4 py-3 text-xs font-bold text-brutalist-ink transition-colors group-hover:border-brutalist-teal group-hover:bg-brutalist-teal group-hover:text-brutalist-cream group-focus-visible:border-brutalist-teal group-focus-visible:bg-brutalist-teal group-focus-visible:text-brutalist-cream">
                          VIEW CASE STUDY <span aria-hidden="true">→</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="text-sm font-bold text-brutalist-ink transition-colors group-hover:text-brutalist-teal">
                            {project.title.toUpperCase()}
                          </h3>
                          <p className="text-xs text-brutalist-muted">
                            {project.subtitle}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-brutalist-muted">
                          {project.year}
                        </span>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </FadeInStagger>
            </section>

            <BlogSection />

            {/* Footer inside scroll area */}
            <footer
              className="mt-8 scroll-mt-[72px] border-t-4 border-brutalist-ink"
              id="about"
              data-nav-id="info"
            >
              {/* Services Grid */}
              <div className="p-4 pb-4 lg:p-6 lg:pb-4">
                <h4 className="text-xl font-bold text-brutalist-ink">
                  LET&apos;S MAKE AN IMPACT
                </h4>
                <p className="mt-1 text-xs uppercase tracking-wide text-brutalist-muted">
                  A FEW WAYS I TURN BOLD IDEAS INTO MEMORABLE EXPERIENCES
                </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 lg:p-12">
                <div>
                  <h3 className="text-2xl font-bold text-brutalist-ink lg:text-3xl">
                    BRAND
                  </h3>
                  <p className="mt-3 text-xs uppercase tracking-wide leading-relaxed text-brutalist-muted">
                    IDENTITY SYSTEMS THAT DEFINE YOUR VISUAL LANGUAGE
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brutalist-ink lg:text-3xl">
                    DIGITAL
                  </h3>
                  <p className="mt-3 text-xs uppercase tracking-wide leading-relaxed text-brutalist-muted">
                    WEB EXPERIENCES BUILT FOR IMPACT
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brutalist-ink lg:text-3xl">
                    PRINT
                  </h3>
                  <p className="mt-3 text-xs uppercase tracking-wide leading-relaxed text-brutalist-muted">
                    TANGIBLE DESIGN THAT LEAVES A MARK
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brutalist-ink lg:text-3xl">
                    MOTION
                  </h3>
                  <p className="mt-3 text-xs uppercase tracking-wide leading-relaxed text-brutalist-muted">
                    DYNAMIC VISUALS THAT TELL STORIES
                  </p>
                </div>
              </div>

              {/* Contact CTA Section */}
              <div className="scroll-mt-[72px] border-t-4 border-brutalist-ink p-4 lg:p-6" id="contact">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-brutalist-ink">
                    LET'S WORK TOGETHER
                  </h4>
                  <p className="mt-1 text-xs text-brutalist-muted uppercase tracking-wide">
                    DROP A MESSAGE AND I'LL GET BACK TO YOU WITHIN 24 HOURS
                  </p>
                </div>
                <form className="space-y-4 max-w-xl">
                  <input
                    type="email"
                    placeholder="khanhnguyen.trq@gmail.com"
                    className="w-full border-4 border-brutalist-ink bg-transparent px-4 py-3 text-sm font-bold text-brutalist-ink placeholder:text-brutalist-placeholder focus:outline-none focus:ring-2 focus:ring-brutalist-teal"
                  />
                  <textarea
                    placeholder="YOUR MESSAGE"
                    rows={4}
                    className="w-full border-4 border-brutalist-ink bg-transparent px-4 py-3 text-sm font-bold text-brutalist-ink placeholder:text-brutalist-placeholder focus:outline-none focus:ring-2 focus:ring-brutalist-teal resize-none"
                  />
                  <button
                    type="submit"
                    className="border-4 border-brutalist-ink bg-brutalist-ink px-6 py-3 text-sm font-bold text-brutalist-cream transition-colors hover:bg-brutalist-teal hover:border-brutalist-teal"
                  >
                    SEND →
                  </button>
                </form>
              </div>

              {/* Copyright */}
              <div className="border-t-4 border-brutalist-ink px-6 py-4 flex justify-between items-center">
                <span className="text-xs font-bold text-brutalist-muted">
                  © {new Date().getFullYear()} KHANH NGUYEN
                </span>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/khanhngt"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-brutalist-muted transition-colors hover:text-brutalist-ink"
                  >
                    <img
                      src="/assets/icons/social/linkedin.svg"
                      alt=""
                      className="h-5 w-5"
                    />
                  </a>
                  <a
                    href="https://github.com/TQKNG"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-brutalist-muted transition-colors hover:text-brutalist-ink"
                  >
                    <img src="/assets/icons/social/github.svg" alt="" className="h-5 w-5" />
                  </a>
                  <a
                    href="https://dev.to/khanh_nguyen_04b1205f5a91"
                    aria-label="DEV.to"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brutalist-muted transition-colors hover:text-brutalist-ink"
                  >
                    <img src="/assets/icons/social/devto.svg" alt="" className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
