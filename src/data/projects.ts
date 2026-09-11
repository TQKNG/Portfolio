import { Project } from "@/types";

const technologyIcons = {
  react: "/assets/icons/technologies/react.svg",
  typescript: "/assets/icons/technologies/typescript.svg",
  restApi: "/assets/icons/technologies/rest-api.svg",
  sql: "/assets/icons/technologies/sql.svg",
  responsiveWeb: "/assets/icons/technologies/responsive-web.svg",
  dataVisualization: "/assets/icons/technologies/data-visualization.svg",
  pathSimplification: "/assets/icons/technologies/path-simplification.svg",
} as const;

const chatBokHero =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/chatBok_brochure.png";
const chatBokDemo =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/video/chatBok_Intro.mp4";
const careHomeHero =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/carehome_brochure.png";
  const careHomeDemo =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/video/carehome_intro.mp4";
const robotSuiteHero =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_brochure.png";

/**
 * Project content is intentionally kept separate from the case-study UI.
 * Optional fields are omitted when the source material does not support them.
 */
export const projects: Project[] = [
  {
    id: "1",
    slug: "brand-identity-refresh",
    title: "ChatBOK",
    subtitle:
      "A database assistant that makes querying, diagnostics, and data exploration faster and more approachable.",
    category: "AI / Data tooling",
    year: "2024",
    description:
      "ChatBOK brings database connections, natural-language query workflows, diagnostics, and descriptive analytics into one focused product experience.",
    role: "Software Engineer",
    responsibilities:
      "Database connectivity, query workflows, diagnostics, and analytics",
    users: "Teams working with operational databases",
    platform: "Responsive web application",
    technologies: [
      { name: "React", icon: technologyIcons.react },
      { name: "TypeScript", icon: technologyIcons.typescript },
      { name: "REST APIs", icon: technologyIcons.restApi },
      { name: "SQL", icon: technologyIcons.sql },
    ],
    heroImage: chatBokHero,
    previewVideo: chatBokDemo,
    metrics: [
      {
        value: "20s → 4s",
        label: "Query response",
        detail: "A faster path from question to usable result.",
      },
      {
        value: "85–90%",
        label: "Query accuracy",
        detail: "Reliable enough to support practical exploration workflows.",
      },
      {
        value: "99%",
        label: "Service uptime",
        detail: "Availability maintained for day-to-day use.",
      },
    ],
    sections: [
      {
        id: "context",
        title: "Context",
        paragraphs: [
          "ChatBOK is a database assistant for people who need to explore and understand operational data without moving between disconnected tools.",
          "Khanh contributed across the product engineering surface, including database connectivity, query workflows, diagnostics, and descriptive analytics.",
        ],
      },
      {
        id: "problem",
        title: "Problem",
        paragraphs: [
          "Getting from a question to a trustworthy database result could take about 20 seconds, while the product also needed to work across multiple database connections and surface useful diagnostic context.",
          "The difficult part was not only producing a query. The workflow had to keep results understandable and dependable enough for repeated use.",
        ],
      },
      {
        id: "approach",
        title: "Approach",
        paragraphs: [
          "The workflow was organized around a short path: connect a data source, express the question, inspect the response, and move into diagnostics or descriptive analysis when more context is needed.",
          "Schema-aware context and response validation were prioritized over a broader but less predictable query experience.",
        ],
        decisions: [
          {
            observation:
              "Query responses took about 20 seconds and needed stronger consistency before they could support routine exploration.",
            decision:
              "Tighten the workflow around relevant database context and validate generated responses before presenting them to the user.",
            result:
              "Query response improved to 4 seconds while accuracy reached 85 to 90 percent.",
          },
          {
            observation:
              "Database work spanned connection management, querying, diagnostics, and analysis.",
            decision:
              "Keep these tasks in one coherent product flow instead of treating them as unrelated utilities.",
            result:
              "Users can move from connection to insight without leaving the ChatBOK experience.",
          },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        paragraphs: [
          "The resulting interface combines a friendly query surface with multi-database connection management, issue diagnostics, and descriptive analytics.",
          "The product views show how connection, query, and analysis tasks stay within one focused workflow.",
        ],
        workflow: {
          title: "From question to trusted result",
          description:
            "A short, schema-aware path keeps the user oriented from connection through validation and analysis.",
          steps: [
            {
              title: "Connect source",
              detail: "Choose and establish the operational database connection.",
            },
            {
              title: "Ask question",
              detail: "Express the information need in natural language.",
            },
            {
              title: "Validate query",
              detail: "Use relevant schema context to check the generated response.",
            },
            {
              title: "Inspect result",
              detail: "Review the answer, diagnostics, and descriptive analysis together.",
            },
          ],
        },
      },
      {
        id: "results",
        title: "Results",
        paragraphs: [
          "Query response improved from 20 seconds to 4 seconds, with measured query accuracy of 85 to 90 percent and 99 percent service uptime.",
          "Together, those results made the assistant faster to use and more dependable for recurring database work.",
        ],
      },
      {
        id: "learnings",
        title: "Learnings",
        paragraphs: [
          "A conversational data product is only useful when speed, accuracy, and diagnostic transparency improve together.",
          "A future iteration should continue strengthening validation and make uncertainty even more visible when a question cannot be answered reliably.",
        ],
      },
    ],
    images: [
      {
        id: "chatbok-product-overview",
        url: chatBokHero,
        alt: "ChatBOK interface overview showing query, diagnostics, and analytics capabilities",
        width: "full",
        caption:
          "The core product surface brings database connection, natural-language querying, diagnostics, and descriptive analytics into one workspace.",
      },
      {
        id: "chatbok-product-overview-02",
        url: chatBokHero,
        alt: "ChatBOK interface overview showing query, diagnostics, and analytics capabilities",
        width: "full",
        caption:
          "The core product surface brings database connection, natural-language querying, diagnostics, and descriptive analytics into one workspace.",
      },
      {
        id: "chatbok-product-overview-03",
        url: chatBokHero,
        alt: "ChatBOK interface overview showing query, diagnostics, and analytics capabilities",
        width: "full",
        caption:
          "The core product surface brings database connection, natural-language querying, diagnostics, and descriptive analytics into one workspace.",
      },
    ],
    gridWidth: 12,
    featured: true,
  },
  {
    id: "2",
    slug: "fintech-dashboard",
    title: "Care Home Reception App",
    subtitle:
      "A responsive reception workflow for safer check-ins, visitor guidance, alerts, and badge printing in care homes.",
    category: "Care operations",
    year: "2024",
    description:
      "The Care Home Reception App connects visitor check-in, health screening, navigation, notifications, and badge printing across devices.",
    role: "Software Engineer",
    responsibilities:
      "Reception workflows, health screening, notifications, and responsive UI",
    users: "Care-home visitors and reception teams",
    platform: "Desktop, tablet, and mobile web",
    technologies: [
      { name: "React", icon: technologyIcons.react },
      { name: "TypeScript", icon: technologyIcons.typescript },
      { name: "Responsive Web", icon: technologyIcons.responsiveWeb },
      { name: "REST APIs", icon: technologyIcons.restApi },
    ],
    heroImage: careHomeHero,
    previewVideo: careHomeDemo,
    metrics: [
      {
        value: "6",
        label: "Connected workflows",
        detail: "From arrival and screening through alerts and badge printing.",
      },
    ],
    sections: [
      {
        id: "context",
        title: "Context",
        paragraphs: [
          "The Care Home Reception App supports the first moments of a visit, where speed, safety, and a welcoming experience need to coexist.",
          "Khanh worked across the reception workflow, including check-in, health screening, visitor guidance, notifications, and responsive interaction patterns.",
        ],
      },
      {
        id: "problem",
        title: "Problem",
        paragraphs: [
          "Reception teams needed to coordinate several connected tasks without making visitors repeat information or wait while staff moved between separate processes.",
          "The interface also had to remain clear across shared kiosks, desktop screens, tablets, and phones.",
        ],
      },
      {
        id: "approach",
        title: "Approach",
        paragraphs: [
          "The experience was treated as one arrival journey rather than six isolated features: check in, complete screening, find the destination, notify the right person, and produce identification.",
          "Responsive behavior was considered part of the workflow so the same information could remain usable at reception and on smaller devices.",
        ],
        decisions: [
          {
            observation:
              "Visitor arrival involved several dependent reception tasks with different safety and communication needs.",
            decision:
              "Connect the six core tasks in one guided reception flow with clear status changes.",
            result:
              "Visitors and staff can move from arrival to notification and badge printing within one consistent experience.",
          },
          {
            observation:
              "The reception experience needed to work on a kiosk as well as desktop, tablet, and mobile screens.",
            decision:
              "Design the interaction model as a responsive web experience instead of tying it to one display size.",
            result:
              "The same workflow remains available across the devices used during a visit.",
          },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        paragraphs: [
          "The product combines fast check-in, health screening, navigation and scheduling, real-time alerts, a cross-platform interface, and visitor badge printing.",
          "The product view shows the relationship between the reception robot, shared display, and personal devices.",
        ],
        workflow: {
          title: "A connected visitor arrival",
          description:
            "Each step carries the visitor forward while keeping reception staff and hosts informed.",
          steps: [
            {
              title: "Check in",
              detail: "Capture the visitor and destination details.",
            },
            {
              title: "Screen",
              detail: "Complete the required health and safety questions.",
            },
            {
              title: "Guide",
              detail: "Provide clear navigation to the correct destination.",
            },
            {
              title: "Notify",
              detail: "Alert the appropriate host or reception team member.",
            },
            {
              title: "Print badge",
              detail: "Create visible identification for the visit.",
            },
          ],
        },
      },
      {
        id: "results",
        title: "Results",
        paragraphs: [
          "Six core reception workflows are represented in one product surface, reducing fragmentation across the arrival journey.",
          "The result is a clearer handoff between visitor input, staff awareness, navigation, and identification.",
        ],
      },
      {
        id: "learnings",
        title: "Learnings",
        paragraphs: [
          "In care settings, a faster flow cannot come at the cost of clarity, privacy, or a welcoming tone.",
          "Future iterations should be evaluated with reception teams and visitors across the full range of devices and arrival scenarios.",
        ],
      },
    ],
    images: [
      {
        id: "care-home-product-overview",
        url: careHomeHero,
        alt: "Care Home Reception App across reception robot, desktop, tablet, and mobile devices",
        width: "full",
        caption:
          "The responsive reception workflow connects check-in, health screening, guidance, notifications, and badge printing across shared and personal devices.",
      },
    ],
    gridWidth: 6,
    featured: true,
  },
  {
    id: "3",
    slug: "editorial-magazine",
    title: "KCODE Robot Suite",
    subtitle:
      "An operational command center for observing, managing, and engaging a connected robot fleet.",
    category: "Robotics operations",
    year: "2023",
    description:
      "KCODE Robot Suite brings fleet health, live location, task activity, alerts, and engagement analytics into a single operational view.",
    role: "Software Engineer",
    responsibilities:
      "Operational dashboards, fleet visibility, engagement analytics, and performance",
    users: "Robot fleet operators and system administrators",
    platform: "Responsive web dashboard",
    technologies: [
      { name: "React", icon: technologyIcons.react },
      { name: "TypeScript", icon: technologyIcons.typescript },
      {
        name: "Data Visualization",
        icon: technologyIcons.dataVisualization,
      },
      {
        name: "Ramer-Douglas-Peucker",
        icon: technologyIcons.pathSimplification,
      },
    ],
    heroImage: robotSuiteHero,
    metrics: [
      {
        value: "18s → 2s",
        label: "Dashboard rendering",
        detail: "Four charts became usable without a library replacement.",
      },
      {
        value: "89%",
        label: "Faster visualization",
        detail: "Less time waiting for operational context.",
      },
      {
        value: "10,000+",
        label: "Data points handled",
        detail: "Dense fleet history remained practical to explore.",
      },
    ],
    sections: [
      {
        id: "context",
        title: "Context",
        paragraphs: [
          "KCODE Robot Suite is an operational workspace for teams responsible for connected robot fleets.",
          "Khanh contributed to the dashboards and workflows that bring fleet health, live location, tasks, alerts, and engagement analytics into one system.",
        ],
      },
      {
        id: "problem",
        title: "Problem",
        paragraphs: [
          "Four operational charts took 18 seconds to render even though database queries and API responses completed in less than one second.",
          "The bottleneck was the browser rendering more than 10,000 points, so changing the database or API would not have addressed the root cause.",
        ],
      },
      {
        id: "approach",
        title: "Approach",
        paragraphs: [
          "The performance work followed the data from storage to pixels. Fast query and API timings isolated the problem to the amount and shape of data passed into the chart layer.",
          "Replacing the charting library was considered unnecessary because the existing library was not the underlying problem.",
        ],
        decisions: [
          {
            observation:
              "Four dashboard charts took 18 seconds to render even though database queries and API responses completed in less than one second.",
            decision:
              "Reduce the visible date range, aggregate data by weekday, and simplify chart paths using the Ramer-Douglas-Peucker algorithm.",
            result:
              "Dashboard rendering improved from 18 seconds to 2 seconds without replacing the existing charting library.",
          },
          {
            observation:
              "Operators needed both a fast summary and enough historical detail to investigate fleet behavior.",
            decision:
              "Preserve the underlying history while reducing only the visual complexity sent to the browser.",
            result:
              "The interface continued to handle more than 10,000 data points while visualization became 89 percent faster.",
          },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        paragraphs: [
          "The suite presents operational status, fleet inventory, alerts, task activity, and system health alongside robot configuration and engagement analytics.",
          "The dashboard keeps immediate operational signals prominent while allowing denser historical views to use aggregated and simplified paths.",
        ],
        workflow: {
          title: "From fleet history to fast insight",
          description:
            "The visualization pipeline reduces browser work while preserving the operational history needed for investigation.",
          steps: [
            {
              title: "Collect history",
              detail: "Load fleet events and time-series records.",
            },
            {
              title: "Limit range",
              detail: "Focus the visible data on the selected operating window.",
            },
            {
              title: "Aggregate",
              detail: "Group history into meaningful weekday summaries.",
            },
            {
              title: "Simplify paths",
              detail: "Reduce chart complexity while retaining the important shape.",
            },
            {
              title: "Render insight",
              detail: "Present responsive operational charts for investigation.",
            },
          ],
        },
      },
      {
        id: "results",
        title: "Results",
        paragraphs: [
          "Dashboard rendering fell from 18 seconds to 2 seconds, an 89 percent improvement, while the experience continued to handle more than 10,000 data points.",
          "Operators received faster access to the fleet state without the risk and churn of replacing the visualization library.",
        ],
      },
      {
        id: "learnings",
        title: "Learnings",
        paragraphs: [
          "End-to-end timing matters: a fast database and API do not guarantee a fast product when the browser still has too much work to do.",
          "A future iteration could adapt aggregation dynamically to the selected time range and available display width.",
        ],
      },
    ],
    images: [
      {
        id: "robot-suite-product-overview",
        url: robotSuiteHero,
        alt: "KCODE Robot Suite operational dashboard and robot engagement interface",
        width: "full",
        caption:
          "The operational workspace combines fleet health, live monitoring, task activity, alerts, robot configuration, and engagement analytics.",
      },
    ],
    gridWidth: 6,
    featured: true,
  },
];

export const getAllProjects = (): Project[] => projects;

export const getFeaturedProjects = (): Project[] =>
  projects.filter((project) => project.featured);

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const getNextProject = (currentSlug: string): Project | null => {
  const currentIndex = projects.findIndex(
    (project) => project.slug === currentSlug,
  );

  if (currentIndex === -1) return null;
  return projects[(currentIndex + 1) % projects.length];
};

export const getPreviousProject = (currentSlug: string): Project | null => {
  const currentIndex = projects.findIndex(
    (project) => project.slug === currentSlug,
  );

  if (currentIndex === -1) return null;
  return projects[(currentIndex - 1 + projects.length) % projects.length];
};
