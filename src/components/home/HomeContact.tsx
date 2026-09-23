import { FadeIn } from "@/components/animations/FadeIn";
import { RevealRule } from "@/components/animations/RevealRule";
import { ContactForm } from "@/components/forms/ContactForm";

export const HomeContact = () => (
  <FadeIn viewportAmount={0.1}>
    <section className="scroll-mt-[72px] border-t-4 border-brutalist-ink p-4 lg:p-6" id="contact" data-nav-id="mail" aria-labelledby="contact-heading">
      <FadeIn>
        <div className="mb-6"><RevealRule className="mb-5 h-1 w-24 bg-brutalist-teal" /><h2 id="contact-heading" className="text-xl font-bold text-brutalist-ink">LET&apos;S WORK TOGETHER</h2><p className="mt-1 text-xs uppercase tracking-wide text-brutalist-muted">DROP A MESSAGE AND I&apos;LL GET BACK TO YOU WITHIN 24 HOURS</p></div>
      </FadeIn>
      <FadeIn>
        <div className="max-w-xl">
          <ContactForm />
        </div>
      </FadeIn>
    </section>
  </FadeIn>
);
