import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { RevealRule } from "@/components/animations/RevealRule";
import { PageTransition } from "@/components/animations/PageTransition";
import { BlogSection } from "@/components/blog/BlogSection";
import { SiteNav } from "@/components/navigation/SiteNav";
import { ProjectPreviewMedia } from "@/components/projects";
import { TextEffect } from "@/components/ui/text-effect";
import { getAllProjects } from "@/data/projects";

const Index = () => {
  const projects = getAllProjects();
  const shouldReduceMotion = useReducedMotion();

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
                <TextEffect
                  as="h1"
                  per="line"
                  preset="slide"
                  delay={0.12}
                  className="text-6xl font-bold leading-none text-brutalist-ink md:text-8xl lg:text-[clamp(5rem,7vw,10rem)]"
                >
                  {"KHANH\nNGUYEN"}
                </TextEffect>
              </FadeIn>
              <FadeIn>
                <motion.div
                  initial={shouldReduceMotion ? false : { scaleX: 0, transformOrigin: "left" }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 h-4 w-32 bg-brutalist-teal"
                />
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
            <FadeIn viewportAmount={0.05}>
              <section id="work" data-nav-id="work" className="scroll-mt-[72px]">
              <FadeIn>
                <div className="p-4 pb-4 lg:p-6 lg:pb-4">
                  <RevealRule className="mb-5 h-1 w-24 bg-brutalist-teal" />
                  <h4 className="text-xl font-bold text-brutalist-ink">
                    LET&apos;S EXPLORE
                  </h4>
                  <p className="mt-1 text-xs uppercase tracking-wide text-brutalist-muted">
                    SELECT A PROJECT TO VIEW THE FULL CASE STUDY
                  </p>
                </div>
              </FadeIn>
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
            </FadeIn>

            <BlogSection />

            {/* Footer inside scroll area */}
            <footer
              className="mt-8 scroll-mt-[72px] border-t-4 border-brutalist-ink"
              id="about"
              data-nav-id="info"
            >
              {/* Info Manifesto */}
              <FadeIn viewportAmount={0.05}>
                <section aria-labelledby="info-heading">
                <FadeIn>
                  <div className="border-b-4 border-brutalist-ink p-4 lg:p-6">
                    <RevealRule className="mb-8 h-1 w-24 bg-brutalist-teal" />
                    <TextEffect
                      as="h2"
                      id="info-heading"
                      per="word"
                      preset="slide"
                      delay={0.08}
                      className="max-w-4xl text-5xl font-bold leading-[0.92] tracking-[-0.06em] text-brutalist-ink sm:text-6xl lg:text-8xl"
                    >
                      I BUILD SOFTWARE FOR PEOPLE DOING DIFFICULT WORK.
                    </TextEffect>
                    <FadeIn>
                      <p className="mt-8 max-w-2xl text-sm uppercase leading-relaxed tracking-wide text-brutalist-muted lg:text-base">
                        Complex data, connected devices, and operational workflows should not feel chaotic. I design and engineer interfaces that make systems easier to understand and act on.
                      </p>
                    </FadeIn>
                  </div>
                </FadeIn>

                <FadeInStagger className="grid border-b-4 border-brutalist-ink md:grid-cols-3" staggerDelay={0.1}>
                  <FadeIn className="border-b-4 border-brutalist-ink p-6 last:border-b-0 md:border-b-0 md:border-r-4 lg:p-8">
                    <p className="text-4xl font-bold tracking-[-0.06em] text-brutalist-teal">01</p>
                    <h3 className="mt-8 text-xl font-bold uppercase text-brutalist-ink lg:text-2xl">
                      Make complexity visible
                    </h3>
                    <p className="mt-4 text-xs uppercase leading-relaxed tracking-wide text-brutalist-muted">
                      Give people the context they need to make better decisions.
                    </p>
                  </FadeIn>
                  <FadeIn className="border-b-4 border-brutalist-ink p-6 last:border-b-0 md:border-b-0 md:border-r-4 lg:p-8">
                    <p className="text-4xl font-bold tracking-[-0.06em] text-brutalist-teal">02</p>
                    <h3 className="mt-8 text-xl font-bold uppercase text-brutalist-ink lg:text-2xl">
                      Reduce friction
                    </h3>
                    <p className="mt-4 text-xs uppercase leading-relaxed tracking-wide text-brutalist-muted">
                      Remove unnecessary steps from important workflows.
                    </p>
                  </FadeIn>
                  <FadeIn className="p-6 lg:p-8">
                    <p className="text-4xl font-bold tracking-[-0.06em] text-brutalist-teal">03</p>
                    <h3 className="mt-8 text-xl font-bold uppercase text-brutalist-ink lg:text-2xl">
                      Build for the real workflow
                    </h3>
                    <p className="mt-4 text-xs uppercase leading-relaxed tracking-wide text-brutalist-muted">
                      Design around how people actually work, not how systems are organized.
                    </p>
                  </FadeIn>
                </FadeInStagger>

                <FadeIn className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
                  <div>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-brutalist-teal">
                      #DATA #AUTOMATION #ROBOTICS #PRODUCT SYSTEMS
                    </p>
                  </div>
                  <p className="max-w-sm text-xs uppercase leading-relaxed tracking-wide text-brutalist-muted lg:text-right">
                    From the first question to the final interface, I look for the clearer path through the system.
                  </p>
                </FadeIn>
                </section>
              </FadeIn>

              {/* Contact CTA Section */}
              <FadeIn viewportAmount={0.1}>
                <div className="scroll-mt-[72px] border-t-4 border-brutalist-ink p-4 lg:p-6" id="contact" data-nav-id="mail">
                <FadeIn>
                  <div className="mb-6">
                    <RevealRule className="mb-5 h-1 w-24 bg-brutalist-teal" />
                    <h4 className="text-xl font-bold text-brutalist-ink">
                      LET&apos;S WORK TOGETHER
                    </h4>
                    <p className="mt-1 text-xs text-brutalist-muted uppercase tracking-wide">
                      DROP A MESSAGE AND I&apos;LL GET BACK TO YOU WITHIN 24 HOURS
                    </p>
                  </div>
                </FadeIn>
                <FadeIn>
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
                </FadeIn>
                </div>
              </FadeIn>

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
