import { FadeIn } from "@/components/animations/FadeIn";
import { RevealRule } from "@/components/animations/RevealRule";

export const HomeContact = () => (
  <FadeIn viewportAmount={0.1}>
    <section className="scroll-mt-[72px] border-t-4 border-brutalist-ink p-4 lg:p-6" id="contact" data-nav-id="mail" aria-labelledby="contact-heading">
      <FadeIn>
        <div className="mb-6"><RevealRule className="mb-5 h-1 w-24 bg-brutalist-teal" /><h2 id="contact-heading" className="text-xl font-bold text-brutalist-ink">LET&apos;S WORK TOGETHER</h2><p className="mt-1 text-xs uppercase tracking-wide text-brutalist-muted">DROP A MESSAGE AND I&apos;LL GET BACK TO YOU WITHIN 24 HOURS</p></div>
      </FadeIn>
      <FadeIn>
        <form className="max-w-xl space-y-4">
          <input type="email" placeholder="khanhnguyen.trq@gmail.com" aria-label="Email address" className="w-full border-4 border-brutalist-ink bg-transparent px-4 py-3 text-sm font-bold text-brutalist-ink placeholder:text-brutalist-placeholder focus:outline-none focus:ring-2 focus:ring-brutalist-teal" />
          <textarea placeholder="YOUR MESSAGE" aria-label="Message" rows={4} className="w-full resize-none border-4 border-brutalist-ink bg-transparent px-4 py-3 text-sm font-bold text-brutalist-ink placeholder:text-brutalist-placeholder focus:outline-none focus:ring-2 focus:ring-brutalist-teal" />
          <button type="submit" className="border-4 border-brutalist-ink bg-brutalist-ink px-6 py-3 text-sm font-bold text-brutalist-cream transition-colors hover:border-brutalist-teal hover:bg-brutalist-teal">SEND →</button>
        </form>
      </FadeIn>
    </section>
  </FadeIn>
);
