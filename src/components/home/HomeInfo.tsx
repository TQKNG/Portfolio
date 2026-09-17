import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { RevealRule } from "@/components/animations/RevealRule";
import { TextEffect } from "@/components/ui/text-effect";

const principles = [
  ["01", "Make complexity visible", "Give people the context they need to make better decisions."],
  ["02", "Reduce friction", "Remove unnecessary steps from important workflows."],
  ["03", "Build for the real workflow", "Design around how people actually work, not how systems are organized."],
] as const;

export const HomeInfo = () => (
  <FadeIn viewportAmount={0.05}>
    <section aria-labelledby="info-heading">
      <FadeIn>
        <div className="border-b-4 border-brutalist-ink p-4 lg:p-6">
          <RevealRule className="mb-8 h-1 w-24 bg-brutalist-teal" />
          <TextEffect as="h2" id="info-heading" per="word" preset="slide" delay={0.08} className="max-w-4xl text-5xl font-bold leading-[0.92] tracking-[-0.06em] text-brutalist-ink sm:text-6xl lg:text-8xl">I BUILD SOFTWARE FOR PEOPLE DOING DIFFICULT WORK.</TextEffect>
          <FadeIn><p className="mt-8 max-w-2xl text-sm uppercase leading-relaxed tracking-wide text-brutalist-muted lg:text-base">Complex data, connected devices, and operational workflows should not feel chaotic. I design and engineer interfaces that make systems easier to understand and act on.</p></FadeIn>
        </div>
      </FadeIn>
      <FadeInStagger className="grid border-b-4 border-brutalist-ink md:grid-cols-3" staggerDelay={0.1}>
        {principles.map(([number, title, description], index) => (
          <FadeIn key={number} className={`p-6 lg:p-8 ${index < 2 ? "border-b-4 border-brutalist-ink md:border-b-0 md:border-r-4" : ""}`}>
            <p className="text-4xl font-bold tracking-[-0.06em] text-brutalist-teal">{number}</p>
            <h3 className="mt-8 text-xl font-bold uppercase text-brutalist-ink lg:text-2xl">{title}</h3>
            <p className="mt-4 text-xs uppercase leading-relaxed tracking-wide text-brutalist-muted">{description}</p>
          </FadeIn>
        ))}
      </FadeInStagger>
      <FadeIn className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-brutalist-teal">#DATA #AUTOMATION #ROBOTICS #PRODUCT SYSTEMS</p>
        <p className="max-w-sm text-xs uppercase leading-relaxed tracking-wide text-brutalist-muted lg:text-right">From the first question to the final interface, I look for the clearer path through the system.</p>
      </FadeIn>
    </section>
  </FadeIn>
);
