interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent = ({ content }: MarkdownContentProps) => (
  <div className="space-y-6 text-sm leading-8 text-brutalist-ink">
    {content.split(/\n{2,}/).map((block, index) => {
      const trimmedBlock = block.trim();
      if (!trimmedBlock) return null;
      if (trimmedBlock.startsWith("## ")) {
        return <h2 key={index} className="pt-4 text-2xl font-bold">{trimmedBlock.slice(3)}</h2>;
      }
      if (trimmedBlock.startsWith("# ")) {
        return <h1 key={index} className="pt-4 text-3xl font-bold">{trimmedBlock.slice(2)}</h1>;
      }
      if (trimmedBlock.startsWith("> ")) {
        return <blockquote key={index} className="border-l-4 border-brutalist-red pl-4 italic">{trimmedBlock.slice(2)}</blockquote>;
      }
      return <p key={index}>{trimmedBlock}</p>;
    })}
  </div>
);
