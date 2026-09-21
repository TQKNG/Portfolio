import { useEffect, useId, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram = ({ chart }: MermaidDiagramProps) => {
  const reactId = useId();
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: {
            background: "#f4efe5",
            primaryColor: "#f4efe5",
            primaryTextColor: "#161616",
            primaryBorderColor: "#161616",
            lineColor: "#161616",
            secondaryColor: "#20c9a6",
            tertiaryColor: "#d7d0c4",
            fontFamily: "Inter, sans-serif",
          },
        });

        const diagramId = `mermaid-${reactId.replace(/[^a-zA-Z0-9-]/g, "")}`;
        const result = await mermaid.render(diagramId, chart);

        if (!cancelled) setSvg(result.svg);
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    void render();

    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  if (failed) {
    return (
      <pre className="overflow-x-auto border-2 border-brutalist-ink bg-brutalist-ink p-4 text-xs leading-6 text-brutalist-cream">
        <code>{chart}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="border-2 border-brutalist-ink p-4 text-xs font-bold uppercase tracking-wide text-brutalist-muted">
        Rendering diagram…
      </div>
    );
  }

  return (
    <div
      className="overflow-x-auto border-2 border-brutalist-ink bg-white p-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
