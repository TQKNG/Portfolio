import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MermaidDiagram } from "@/components/blog/MermaidDiagram";

interface MarkdownContentProps {
  content: string;
}

const getCodeChild = (children: ReactNode) => {
  const child = Children.toArray(children)[0];
  return isValidElement(child) ? (child as ReactElement<{ className?: string; children?: ReactNode }>) : null;
};

export const MarkdownContent = ({ content }: MarkdownContentProps) => (
  <div className="text-sm leading-8 text-brutalist-ink">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h1 className="mb-5 mt-10 text-3xl font-bold leading-tight">{children}</h1>,
        h2: ({ children }) => <h2 className="mb-4 mt-10 text-2xl font-bold leading-tight">{children}</h2>,
        h3: ({ children }) => <h3 className="mb-3 mt-8 text-xl font-bold leading-tight">{children}</h3>,
        p: ({ children }) => <p className="my-5">{children}</p>,
        a: ({ href, children }) => (
          <a
            href={href}
            className="font-bold text-brutalist-teal underline decoration-2 underline-offset-4"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noreferrer" : undefined}
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-6 border-l-4 border-brutalist-teal bg-brutalist-ink/5 px-5 py-1 italic">
            {children}
          </blockquote>
        ),
        ul: ({ children }) => <ul className="my-5 list-disc space-y-2 pl-6">{children}</ul>,
        ol: ({ children }) => <ol className="my-5 list-decimal space-y-2 pl-6">{children}</ol>,
        li: ({ children }) => <li className="pl-1">{children}</li>,
        hr: () => <hr className="my-10 border-0 border-t-4 border-brutalist-ink" />,
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt ?? ""}
            loading="lazy"
            className="my-8 h-auto w-full border-2 border-brutalist-ink bg-white object-contain"
          />
        ),
        table: ({ children }) => (
          <div className="my-8 overflow-x-auto border-2 border-brutalist-ink">
            <table className="w-full min-w-[36rem] border-collapse text-left text-xs">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-brutalist-ink text-brutalist-cream">{children}</thead>,
        th: ({ children }) => <th className="border border-brutalist-muted px-3 py-2 font-bold">{children}</th>,
        td: ({ children }) => <td className="border border-brutalist-muted px-3 py-2 align-top">{children}</td>,
        pre: ({ children }) => {
          const code = getCodeChild(children);
          const className = code?.props.className ?? "";
          const language = className.match(/language-([\w-]+)/)?.[1];
          const source = String(code?.props.children ?? "").replace(/\n$/, "");

          if (language === "mermaid") return <MermaidDiagram chart={source} />;

          return (
            <div className="my-6 overflow-hidden border-2 border-brutalist-ink bg-brutalist-ink">
              {language ? (
                <div className="border-b border-brutalist-cream/30 px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-brutalist-cream/70">
                  {language}
                </div>
              ) : null}
              <pre className="overflow-x-auto p-4 text-xs leading-6 text-brutalist-cream">{children}</pre>
            </div>
          );
        },
        code: ({ children, className }) => (
          <code className={className ?? "rounded-sm bg-brutalist-ink/10 px-1.5 py-0.5 font-mono text-[0.9em]"}>
            {children}
          </code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);
