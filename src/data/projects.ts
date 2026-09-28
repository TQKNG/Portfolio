import { Project } from "@/types";

export const technologyIcons = {
  react: "/assets/icons/technologies/react.svg",
  typescript: "/assets/icons/technologies/typescript.svg",
  nextjs: "/assets/icons/technologies/nextjs.svg",
  python: "/assets/icons/technologies/python.svg",
  fastApi: "/assets/icons/technologies/fastapi.svg",
  langChain: "/assets/icons/technologies/langchain.svg",
  openAi: "/assets/icons/technologies/openai.svg",
  azure: "/assets/icons/technologies/azure.svg",
  aspNet: "/assets/icons/technologies/aspnet.svg",
  csharp: "/assets/icons/technologies/csharp.svg",
  jquery: "/assets/icons/technologies/jquery.svg",
  postgresql: "/assets/icons/technologies/postgresql.svg",
  socketIo: "/assets/icons/technologies/socketio.svg",
  oauth: "/assets/icons/technologies/oauth.svg",
  githubActions: "/assets/icons/technologies/github-actions.svg",
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
const chatBokChatUI =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/chatBok_chatUI.png";
const chatBokConversation =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/chatBok_conversation.png";
const chatBokConversationHistorical =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/chatBok_conversation-historical.png";
const chatBokConversationAnalytic =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/chatBok_conversation-analytic.png";
const chatBokTestCase =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/chatBok_test-case.png";

const careHomeHero =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/carehome_brochure.png";
const careHomeAdmin =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/carehome_admin.jpg";
const careHomeApiService =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/carehome_api-service.png";
const careHomeResponsiveDesign =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/carehome_responsive-design.png";
const careHomeDemo =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/video/carehome_intro.mp4";
const robotSuiteHero =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_brochure.png";
const robotSuiteDemo =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/video/robotsuite_intro.mp4";

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
      "An AI database agent that turns natural-language questions into SQL queries and actionable data insights.",
    category: "AI / Data engineering",
    year: "2024",
    description:
      "ChatBOK helps users explore business databases through natural language, using relevant schema context to generate SQL and support historical, descriptive, predictive, and diagnostic analysis.",
    role: "Software Engineer",
    responsibilities:
      "AI agent architecture, semantic retrieval, SQL generation, database integration, testing, and deployment",
    users: "Internal teams working with private, domain-specific enterprise data",
    platform: "Internal chatbot interface for enterprise data",
    technologies: [
      { name: "Next.js 14", icon: technologyIcons.nextjs },
      { name: "TypeScript", icon: technologyIcons.typescript },
      { name: "FastAPI", icon: technologyIcons.fastApi },
      { name: "Python", icon: technologyIcons.python },
      { name: "LangChain", icon: technologyIcons.langChain },
      { name: "OpenAI", icon: technologyIcons.openAi },
      { name: "SQL databases", icon: technologyIcons.sql },
      { name: "Azure / containers", icon: technologyIcons.azure },
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
        label: "Accuracy improvement",
        detail: "Measured on medium-complexity joins and aggregations.",
      },
    ],
    sections: [
      {
        id: "context",
        title: "Context",
        paragraphs: [
          "I built ChatBOK as an internal tool to help my team and me work with private enterprise data more efficiently, using natural-language questions instead of hand-written SQL.",
          "I worked across the agent architecture, semantic retrieval, SQL generation, multi-database integration, evaluation, and deployment for historical, descriptive, predictive, and diagnostic analysis workflows.",
        ],
      },
      {
        id: "problem",
        title: "Problem",
        paragraphs: [
          "LangChain's predefined SQL agent did not have enough business or schema context to translate natural-language questions into dependable queries, especially when a request required multiple joins or aggregations.",
          "Even simple descriptive and historical questions could take about 20 seconds, and the experience needed to work across SQL Server, MongoDB, and MariaDB while keeping generated results practical to validate.",
        ],
      },
      {
        id: "approach",
        title: "Approach",
        paragraphs: [
          "The agent breaks each question into important nouns and verbs, embeds that intent, and uses semantic search to retrieve the most relevant tables, columns, schema descriptions, and business examples.",
          "Retrieval-augmented generation, few-shot prompts, clearer column names, and representative SQL test cases give the model focused domain context before it generates a query.",
        ],
        decisions: [
          {
            observation:
              "A generic SQL agent lacked the database context required for reliable joins, aggregations, and business-specific questions.",
            decision:
              "Encode table and schema descriptions as embeddings, then retrieve only the context relevant to each question.",
            result:
              "Accuracy on medium-complexity questions improved by 85 to 90 percent.",
          },
          {
            observation:
              "Schema retrieval alone could not capture every domain rule or clarify inconsistent database terminology.",
            decision:
              "Add domain-specific examples through few-shot prompting and standardize column names so they describe their meaning clearly.",
            result:
              "The agent produced more consistent SQL while simple query time fell from about 20 seconds to 4 seconds.",
          },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        paragraphs: [
          "The resulting application combines database selection, conversational querying, and four analysis modes in one responsive interface built with Next.js and FastAPI.",
          "The LangChain and OpenAI agent retrieves targeted schema context before generating SQL, while a test matrix compares generated queries with expected results across retrieval, joins, and aggregation cases.",
        ],
        workflow: {
          title: "From question to validated SQL",
          description:
            "A retrieval and evaluation pipeline supplies the agent with focused context before presenting an answer.",
          steps: [
            {
              title: "Ask question",
              detail: "Express the required business information in natural language.",
            },
            {
              title: "Retrieve context",
              detail: "Find the relevant schema descriptions and domain examples through semantic search.",
            },
            {
              title: "Generate and test",
              detail: "Create SQL and compare it with representative expected-query cases.",
            },
            {
              title: "Return insight",
              detail: "Present the result through the selected analysis workflow.",
            },
          ],
        },
      },
      {
        id: "results",
        title: "Results",
        paragraphs: [
          "Response time for simple descriptive and historical questions fell from about 20 seconds to approximately 4 seconds.",
          "For medium-complexity questions involving multiple joins and aggregations, query accuracy improved by 85 to 90 percent.",
        ],
      },
      {
        id: "learnings",
        title: "Learnings",
        paragraphs: [
          "Reliable text-to-SQL depends less on a broad prompt than on the quality of the retrieved schema, business context, examples, and evaluation cases supplied to the model.",
          "The next iteration should expand the test matrix, expose confidence and failure states more clearly, and keep domain knowledge maintainable as connected databases evolve.",
        ],
      },
    ],
    images: [
      {
        id: "chatbok-product-overview",
        url: chatBokHero,
        alt: "ChatBOK product overview introducing its natural-language database analysis capabilities",
        width: "full",
        caption:
          "See ChatBOK's natural-language database analysis workflows at a glance.",
      },
      {
        id: "chatbok-chat-ui",
        url: chatBokChatUI,
        alt: "ChatBOK interface with database connections and four analysis modes",
        width: "full",
        caption:
          "Switch databases and start historical, predictive, descriptive, or diagnostic analysis.",
      },
      {
        id: "chatbok-conversation",
        url: chatBokConversation,
        alt: "ChatBOK conversation showing natural-language questions and database answers",
        width: "full",
        caption:
          "Ask a question in plain language and receive a database-backed answer.",
      },
      {
        id: "chatbok-conversation-historical",
        url: chatBokConversationHistorical,
        alt: "ChatBOK historical analysis answering questions about temperature records",
        width: "full",
        caption:
          "Review record counts, historical trends, and summary statistics.",
      },
      {
        id: "chatbok-conversation-analytic",
        url: chatBokConversationAnalytic,
        alt: "ChatBOK diagnostic analysis explaining temperature anomalies",
        width: "full",
        caption:
          "Investigate anomalies and get a plain-language diagnostic explanation.",
      },
      {
        id: "chatbok-test-case",
        url: chatBokTestCase,
        alt: "ChatBOK evaluation matrix comparing expected and generated SQL queries",
        width: "full",
        caption:
          "Compare expected and generated SQL across test cases and complexity levels.",
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
      "An internal, robot-assisted reception platform for safer, paperless, and more reliable visitor check-in across devices.",
    category: "Care operations / Robotics",
    year: "2024",
    description:
      "The Care Home Reception App combines a visitor-facing robot workflow, an administrative portal, and service APIs to manage check-in, health screening, navigation, real-time alerts, and visitor identification.",
    role: "Software Engineer",
    responsibilities:
      "Visitor workflows, responsive UI, service APIs, WebSocket reliability, Azure monitoring, and recovery automation",
    users: "Care-home visitors, reception teams, administrators, and hosts",
    platform:
      "Robot Android webview, administrative portal, desktop, tablet, and mobile web",
    technologies: [
      { name: "ASP.NET", icon: technologyIcons.aspNet },
      { name: "C#", icon: technologyIcons.csharp },
      { name: "jQuery", icon: technologyIcons.jquery },
      { name: "PostgreSQL", icon: technologyIcons.postgresql },
      { name: "Socket.IO", icon: technologyIcons.socketIo },
      { name: "Google OAuth 2.0", icon: technologyIcons.oauth },
      { name: "Azure Web App", icon: technologyIcons.azure },
      { name: "GitHub Actions", icon: technologyIcons.githubActions },
    ],
    heroImage: careHomeHero,
    previewVideo: careHomeDemo,
    metrics: [
      {
        value: "5s → 5m",
        label: "WebSocket heartbeat",
        detail: "Lower keep-alive traffic without losing voice-command connectivity.",
      },
      {
        value: "<1 hour",
        label: "Issue resolution",
        detail: "Production issues identified and resolved within one hour.",
      },
      {
        value: "99%",
        label: "Service uptime",
        detail: "Availability maintained for the visitor-facing experience.",
      },
    ],
    sections: [
      {
        id: "context",
        title: "Context",
        paragraphs: [
          "I built the Care Home Reception App to replace paperwork and create a safer, more welcoming visitor experience in care homes.",
          "The product combined three connected surfaces: a visitor-facing robot workflow, an administrative portal, and service APIs for robot and platform integrations. I worked across responsive visitor workflows, health screening, navigation, real-time notifications, badge printing, administration, and communication between the robot webview and Azure-hosted services.",
        ],
      },
      {
        id: "problem",
        title: "Problem",
        paragraphs: [
          "The robot's Android webview relied on a persistent WebSocket connection for navigation and voice commands. The client sent a keep-alive request every five seconds, increasing traffic from hundreds of requests to peaks around 1,000 and contributing to HTTP 500, 502, and 503 errors during working hours.",
          "A lost connection could interrupt a visitor during check-in. The platform needed to reduce unnecessary traffic, remain consistent across devices, and recover automatically when the Azure service became unhealthy.",
        ],
      },
      {
        id: "approach",
        title: "Approach",
        paragraphs: [
          "I reviewed Azure App Service metrics, application logs, request volume, response times, CPU usage, and server errors to identify the source of the instability.",
          "I increased the WebSocket heartbeat interval from five seconds to five minutes, introduced monitoring alerts, and configured auto-heal rules based on actual request volume, memory usage, and operating schedules.",
          "I also kept visitor configuration and operational controls in an administrative portal while exposing maps, locations, schedules, logs, and notifications through documented service APIs.",
        ],
        decisions: [
          {
            observation:
              "The robot sent a WebSocket keep-alive request every five seconds, creating unnecessary traffic and contributing to service instability.",
            decision:
              "Increase the heartbeat interval from five seconds to five minutes while preserving the voice-command connection.",
            result:
              "Keep-alive request frequency fell 60-fold, lowering pressure on the Azure-hosted service.",
          },
          {
            observation:
              "Restarting the service restored availability, but manual intervention was not sufficient for a visitor-facing system.",
            decision:
              "Add Azure alerts and auto-heal rules for request spikes, private-memory thresholds, and a scheduled daily restart.",
            result:
              "Production issues could be identified and resolved within one hour while maintaining 99 percent service uptime.",
          },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        paragraphs: [
          "The completed platform supports contactless check-in, health screening, navigation and scheduling, real-time host notifications, responsive access, and badge printing.",
          "The visitor workflow adapts across the reception robot, desktop displays, tablets, and mobile devices. Administrators can manage outbreak guidance, visitor limits, language, session timeout, and office contacts through a dedicated settings interface.",
          "ASP.NET Core service APIs connect the robot to maps, locations, schedules, operational logs, and battery notifications.",
        ],
        workflow: {
          title: "A reliable visitor arrival",
          description:
            "One guided workflow carries visitors from arrival through screening, guidance, notification, and identification.",
          steps: [
            {
              title: "Check in",
              detail: "Capture visitor and destination details through the robot or another device.",
            },
            {
              title: "Screen",
              detail: "Collect the required health and safety information.",
            },
            {
              title: "Guide",
              detail: "Provide navigation and scheduling information for the destination.",
            },
            {
              title: "Notify",
              detail: "Send a real-time alert to the appropriate staff member.",
            },
            {
              title: "Print badge",
              detail: "Produce visitor identification for the duration of the visit.",
            },
          ],
        },
      },
      {
        id: "results",
        title: "Results",
        paragraphs: [
          "Increasing the WebSocket heartbeat interval from five seconds to five minutes reduced keep-alive request frequency 60-fold while preserving the robot's voice-command functionality.",
          "Azure alerts and auto-heal rules helped the team identify and resolve issues within one hour and maintain 99 percent uptime for the visitor-facing experience.",
        ],
      },
      {
        id: "learnings",
        title: "Learnings",
        paragraphs: [
          "Real-time features must be evaluated against their cumulative production traffic. A heartbeat that appears inexpensive in isolation can become a reliability problem when it runs continuously across active clients.",
          "Separating visitor workflows, administrative configuration, and robot services made each part of the platform easier to understand, operate, and recover.",
        ],
      },
    ],
    images: [
      {
        id: "care-home-product-overview",
        url: careHomeHero,
        alt: "Care Home Reception App overview showing a reception robot, laptop, tablet, and mobile interface",
        width: "full",
        caption:
          "The platform connects contactless check-in, health screening, navigation, real-time alerts, responsive access, and badge printing across the reception robot and personal devices.",
      },
      {
        id: "care-home-responsive-design",
        url: careHomeResponsiveDesign,
        alt: "Care Home visitor sign-in and health-screening form shown across mobile, tablet, and desktop breakpoints",
        width: "full",
        caption:
          "The visitor sign-in and health-screening form adapts across device sizes without changing the arrival workflow.",
      },
      {
        id: "care-home-admin",
        url: careHomeAdmin,
        alt: "Care Home administration interface for general, outbreak, and office settings",
        width: "full",
        caption:
          "Reception administrators can configure visitor limits, outbreak guidance, language, session timeout, and office contacts from one settings view.",
      },
      {
        id: "care-home-api-service",
        url: careHomeApiService,
        alt: "Care Home API documentation for robot maps, locations, schedules, logs, and battery notifications",
        width: "full",
        caption:
          "Documented service APIs connect the robot to maps, locations, schedules, operational logs, and battery alerts.",
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
      { name: "REST APIs", icon: technologyIcons.restApi },
      { name: "SQL", icon: technologyIcons.sql },
      { name: "Responsive Web", icon: technologyIcons.responsiveWeb },
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
    previewVideo: robotSuiteDemo,
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
      {
        id: "robot-suite-alert-dashboard",
        url: "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_alert-dashboard.png",
        alt: "KCODE Robot Suite alert dashboard",
        width: "full",
        caption: "The alert dashboard helps operators review and prioritize fleet issues.",
      },
      {
        id: "robot-suite-dashboard",
        url: "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_dashboard.png",
        alt: "KCODE Robot Suite fleet dashboard",
        width: "full",
        caption: "The fleet dashboard summarizes the current operational state at a glance.",
      },
      {
        id: "robot-suite-engage-enjoy-config",
        url: "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_engage-enjoy-config.png",
        alt: "KCODE Robot Suite Engage and Enjoy configuration screen",
        width: "full",
        caption: "The configuration screen supports setup of the Engage and Enjoy experience.",
      },
      {
        id: "robot-suite-engage-enjoy-dashboard",
        url: "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_engage-enjoy-dashboard.png",
        alt: "KCODE Robot Suite Engage and Enjoy dashboard",
        width: "full",
        caption: "The dashboard tracks engagement activity across the robot fleet.",
      },
      {
        id: "robot-suite-entertainment-library",
        url: "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_engage-enjoy-entertainment-library.png",
        alt: "KCODE Robot Suite entertainment library",
        width: "full",
        caption: "The entertainment library organizes content available to connected robots.",
      },
      {
        id: "robot-suite-engage-enjoy-main",
        url: "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_engage-enjoy-main.png",
        alt: "KCODE Robot Suite Engage and Enjoy main screen",
        width: "full",
        caption: "The main Engage and Enjoy screen brings robot interactions into focus.",
      },
      {
        id: "robot-suite-release-schedule",
        url: "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_engage-enjoy-release-schedule.png",
        alt: "KCODE Robot Suite release schedule",
        width: "full",
        caption: "The release schedule coordinates content and software rollouts.",
      },
      {
        id: "robot-suite-robot-deployment",
        url: "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_engage-enjoy-robot-deployment.png",
        alt: "KCODE Robot Suite robot deployment screen",
        width: "full",
        caption: "The deployment view helps teams manage robot rollout status.",
      },
      {
        id: "robot-suite-fleet-suite-dashboard",
        url: "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_fleet-suite-dashboard.png",
        alt: "KCODE Robot Suite fleet suite dashboard",
        width: "full",
        caption: "The fleet suite dashboard provides a consolidated view of robot operations.",
      },
      {
        id: "robot-suite-login",
        url: "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_login.png",
        alt: "KCODE Robot Suite login screen",
        width: "full",
        caption: "The login screen provides a clear entry point for authorized operators.",
      },
      {
        id: "robot-suite-main-dashboard",
        url: "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_main.png",
        alt: "KCODE Robot Suite main operational dashboard",
        width: "full",
        caption:
          "The main dashboard gives operators a focused view of fleet health, active robots, alerts, and operational activity.",
      },
      {
        id: "robot-suite-talk-to-me-ai-note",
        url: "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_talk-to-me-ai-note.png",
        alt: "KCODE Robot Suite Talk to Me AI note screen",
        width: "full",
        caption: "The AI note view captures contextual notes from the Talk to Me workflow.",
      },
      {
        id: "robot-suite-talk-to-me-main",
        url: "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_talk-to-me-main.png",
        alt: "KCODE Robot Suite Talk to Me main screen",
        width: "full",
        caption: "The Talk to Me workspace supports direct interaction with connected robots.",
      },
      {
        id: "robot-suite-talk-to-me",
        url: "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_talk-to-me.png",
        alt: "KCODE Robot Suite Talk to Me interface",
        width: "full",
        caption: "The interaction interface gives operators a focused communication workflow.",
      },
      {
        id: "robot-suite-where-my-bot-path-execution",
        url: "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/image/robotsuite_where-my-bot-path-execution.png",
        alt: "KCODE Robot Suite Where My Bot path execution screen",
        width: "full",
        caption: "The path execution view makes robot movement and task progress easier to inspect.",
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
