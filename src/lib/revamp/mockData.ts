import {
  ServiceItem,
  PortfolioItem,
  RevampTeamMember,
  Testimonial,
  MetricStat,
  FaqItem,
} from './types';

export const HERO_STATS: MetricStat[] = [
  {
    label: "Projects Delivered",
    value: "40+",
    subtext: "High impact software & web builds",
    iconName: "FolderCheck"
  },
  {
    label: "Happy Clients",
    value: "85+",
    subtext: "Global startups & enterprises",
    iconName: "Smile"
  },
  {
    label: "Years Experience",
    value: "5+",
    subtext: "Engineering & design mastery",
    iconName: "Calendar"
  },
  {
    label: "Client Satisfaction",
    value: "98%",
    subtext: "Proven client retention rate",
    iconName: "Award"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Web Development",
    subtitle: "Modern, scalable web platforms",
    description: "Professional web development services using modern technologies like React, Next.js, and Node.js to build responsive and performant websites.",
    iconName: "Code",
    popular: true,
    features: ["Custom React/Next.js Apps", "RESTful & GraphQL APIs", "Performance & SEO Optimization", "Headless CMS Integration"],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"]
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    subtitle: "Cross-platform iOS & Android apps",
    description: "Cross-platform mobile app development for iOS and Android using React Native and Flutter frameworks.",
    iconName: "Smartphone",
    popular: true,
    features: ["Native Performance", "Offline Sync Capabilities", "Push Notifications", "App Store & Play Store Deployment"],
    techStack: ["React Native", "Flutter", "iOS", "Android", "Firebase"]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    subtitle: "User-centered design systems",
    description: "User-centered design solutions including wireframing, prototyping, and visual design to create engaging digital experiences.",
    iconName: "Palette",
    popular: true,
    features: ["User Journey Mapping", "Interactive Wireframes", "Design System Systems", "Usability Testing"],
    techStack: ["Figma", "Adobe XD", "Prototyping", "Design Tokens"]
  },
  {
    id: "ecommerce",
    title: "E-Commerce Solutions",
    subtitle: "High-converting online storefronts",
    description: "End-to-end e-commerce development with secure payment integrations, inventory management, and customizable storefronts.",
    iconName: "ShoppingBag",
    popular: false,
    features: ["Custom Checkout Flows", "Multi-currency Support", "Inventory & Order Sync", "Payment Gateways (Stripe/PayPal)"],
    techStack: ["Shopify", "React", "Node.js", "Stripe API", "PostgreSQL"]
  },
  {
    id: "cloud-services",
    title: "Cloud Services",
    subtitle: "Scalable infrastructure & DevOps",
    description: "Cloud infrastructure setup, migration, and management using AWS, Azure, and Google Cloud platforms.",
    iconName: "Cloud",
    popular: false,
    features: ["CI/CD Automated Pipelines", "Docker Containerization", "Serverless Architecture", "24/7 Uptime Monitoring"],
    techStack: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    subtitle: "Growth strategy & online presence",
    description: "Comprehensive digital marketing strategies including SEO, social media marketing, and content marketing to grow your online presence.",
    iconName: "Megaphone",
    popular: false,
    features: ["Technical SEO Audits", "Targeted PPC Campaigns", "Social Media Strategy", "Conversion Rate Optimization"],
    techStack: ["Google Analytics", "SEMrush", "Meta Ads", "Content Strategy"]
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "velox",
    title: "Velox Download Manager",
    category: "Desktop Application",
    badge: "Featured",
    description: "A multi-threaded, cross-platform download manager with an ability to download your files in high speed with pause & resume support.",
    fullDetails: "Velox is engineered with Rust and React for ultra-fast multi-segment downloading. It features real-time bandwidth throttling, scheduling, browser extension hooks, and encrypted storage.",
    technologies: ["Rust", "Tauri", "React TypeScript"],
    year: "2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    metrics: "10x Faster Downloads • Zero Memory Leaks",
    liveUrl: "https://thedigiorb.com"
  },
  {
    id: "bitflow",
    title: "BitFlow Network Monitor",
    category: "Desktop Application",
    badge: "Utility",
    description: "A lightweight, real-time network speed monitor built with modern technology (Tauri, React, TypeScript). Monitor all your network interfaces with beautiful visualizations.",
    fullDetails: "BitFlow provides system administrators and power users with latency graphs, bandwidth leak alerts, protocol breakdown, and tray notifications.",
    technologies: ["Tauri", "React", "TypeScript"],
    year: "2026",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    metrics: "3MB Footprint • Realtime Canvas Graphs"
  },
  {
    id: "eschool-erp",
    title: "eSchool ERP",
    category: "Web Design",
    badge: "Featured",
    description: "LMS + School Management System. Built a comprehensive ERP system combining LMS features with school management, administrative functions, student portals, and grade tracking.",
    fullDetails: "eSchool ERP manages 15,000+ active students across multiple campuses, handling automated attendance, fee collection, parent-teacher portals, and exam grade distribution.",
    technologies: ["React JS", "Laravel", "MySQL"],
    year: "2024-2025",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
    metrics: "15,000+ Students • 99.9% Uptime"
  },
  {
    id: "hrpay",
    title: "HRPay Management System",
    category: "Mobile Design",
    badge: "Enterprise",
    description: "HR Management System. Developed a web-based HR system for managing companies and employees, including payroll processing and attendance tracking.",
    fullDetails: "HRPay streamlines human resources operations with instant geolocation check-ins, automated tax calculations, direct bank payout integrations, and leaves workflow.",
    technologies: ["Laravel", "React JS", "Firebase"],
    year: "2023-2024",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    metrics: "Automated Payroll • 80% Time Saved"
  },
  {
    id: "hr-manager",
    title: "HR Manager Advanced",
    category: "Web Design",
    badge: "Platform",
    description: "Advanced HR Platform. Designed an advanced HR management system enabling organizations to manage employees, payroll, performance reviews, and recruitment.",
    fullDetails: "Empowers enterprises with automated onboarding funnels, AI applicant scoring, shift planning, performance KPI trackers, and custom compliance reports.",
    technologies: ["Next.js", "Django", "PostgreSQL"],
    year: "2023-2024",
    image: "https://images.unsplash.com/photo-1542744801-30d08f362193?auto=format&fit=crop&w=800&q=80",
    metrics: "AI Resume Screening • 50+ Enterprise Clients"
  },
  {
    id: "cloudcom",
    title: "CloudCom E-Commerce Platform",
    category: "Web Design",
    badge: "SaaS",
    description: "E-Commerce Integration Platform. Built a platform integrating multiple e-commerce stores into a unified system, allowing centralized inventory and order sync.",
    fullDetails: "Aggregates orders from Shopify, Amazon, WooCommerce, and eBay into a single real-time dashboard with unified fulfillment, tracking, and analytics.",
    technologies: ["React JS", "Node.js", "Redis"],
    year: "2023-2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    metrics: "500k+ Sync Operations/Day"
  },
  {
    id: "installer-on-air",
    title: "InstallerOnAir",
    category: "Web Design",
    badge: "Distribution",
    description: "Build Distribution Platform. Developed a web-based portal for sharing mobile application builds (IPA/APK) among teams and testers seamlessly.",
    fullDetails: "Enables instant over-the-air distribution for iOS and Android test builds with expiry rules, device UDID tracking, and slack notification triggers.",
    technologies: ["React JS", "Node.js", "AWS S3"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    metrics: "Instant Testflight Alternative"
  },
  {
    id: "webchater",
    title: "WebChater Realtime Messaging",
    category: "Web Design",
    badge: "Realtime",
    description: "Web Chat Application. Developed a real-time web chat application with a modern UI for seamless communication, voice notes, and file sharing.",
    fullDetails: "Features end-to-end encryption, WebSocket audio calling, message reactions, group channels, and code snippet formatting.",
    technologies: ["React JS", "Laravel", "Pusher"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=800&q=80",
    metrics: "<50ms Latency Message Delivery"
  },
  {
    id: "financeflow",
    title: "FinanceFlow Dashboard",
    category: "UI/UX",
    badge: "Top Rated",
    description: "Fintech UI/UX Design. Designed a comprehensive financial dashboard for a fintech startup, focusing on data visualization and transaction monitoring.",
    fullDetails: "Crafted with dark & light high-contrast themes, interactive financial charts, crypto portfolio balances, and smart alert rules.",
    technologies: ["React JS", "Figma", "Recharts"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    metrics: "Awarded Best Fintech Interface Design"
  }
];

export const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Research & Discovery",
    description: "We analyze your target market, user persona, and business goals to chart a foolproof technical trajectory."
  },
  {
    step: "02",
    title: "Architecture & Blueprint",
    description: "Designing responsive UI/UX prototypes and high-performance server architecture built for infinite scale."
  },
  {
    step: "03",
    title: "Agile Build & Iteration",
    description: "Developing clean, test-driven code with bi-weekly client sprints and continuous integration pipelines."
  },
  {
    step: "04",
    title: "Refine & Launch",
    description: "Rigorous automated QA, security stress testing, and seamless Cloud Run / AWS production deployment."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Emily R.",
    role: "Product Manager",
    company: "TechStart Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "DigitalOrb brought a fresh perspective to our mobile app development project. They suggested innovative features and design elements that significantly enhanced the user experience. We've seen a noticeable increase in user engagement since the launch.",
    tags: ["Mobile App", "UI/UX Design"]
  },
  {
    id: "2",
    name: "Marcus Vance",
    role: "Chief Technology Officer",
    company: "Aetheria Cloud Systems",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "Working with Abbas and the TheDigiOrb team was a game changer. Their mastery of Rust, React, and cloud serverless architecture delivered our platform 3 weeks ahead of schedule with zero post-launch bugs.",
    tags: ["Desktop App", "Cloud Infra"]
  },
  {
    id: "3",
    name: "Sophia Chen",
    role: "Head of Digital Growth",
    company: "OmniVentures",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "TheDigiOrb team transformed our legacy ERP into a sleek, lightning-fast web application. Their 24/7 support and attention to pixel perfection is truly unmatched in the software industry.",
    tags: ["E-Commerce", "Web ERP"]
  }
];

export const TEAM_MEMBERS: RevampTeamMember[] = [
  {
    id: "aq",
    name: "Abbas Q.",
    initials: "AQ",
    role: "Front End Lead Developer",
    bio: "Specializing in React, Next.js, motion design, and high-performance WebUI interfaces that captivate users.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind", "Animation"],
    avatarGradient: "from-cyan-500 to-blue-600"
  },
  {
    id: "sa-1",
    name: "Sunail Abbas",
    initials: "SA",
    role: "Full Stack Lead Developer",
    bio: "Architecting robust cloud microservices, Node.js & Rust backends, and full-stack enterprise web platforms.",
    skills: ["Node.js", "Rust", "Laravel", "PostgreSQL", "Docker"],
    avatarGradient: "from-blue-600 to-indigo-700"
  },
  {
    id: "sa-2",
    name: "Sibtain Ali",
    initials: "SA",
    role: "Backend Lead Developer",
    bio: "Mastering complex database optimization, distributed systems, API security, and serverless infrastructure.",
    skills: ["Python", "Django", "GraphQL", "Redis", "AWS"],
    avatarGradient: "from-sky-500 to-cyan-600"
  },
  {
    id: "zm",
    name: "Zafar Mirza",
    initials: "ZM",
    role: "Creative UI/UX Lead",
    bio: "Pioneering sleek user interfaces, interactive motion systems, micro-interactions, and visual design systems.",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
    avatarGradient: "from-indigo-500 to-sky-500"
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    category: "Process",
    question: "What does the typical project development cycle look like at TheDigiOrb?",
    answer: "Our structured cycle moves through 4 key phases: 1) Strategic Discovery & Architecture Mapping, 2) Interactive Wireframing & High-Fidelity UI/UX Design, 3) Full-Stack Agile Engineering with bi-weekly preview sprints, and 4) Automated Testing, Security Audit & Cloud Deployment with ongoing support."
  },
  {
    id: "faq-2",
    category: "Pricing & Delivery",
    question: "How long does a web or mobile application build take?",
    answer: "Project timelines vary by functional complexity. Standard landing experiences and corporate web applications take approximately 2–3 weeks, whereas full-scale SaaS platforms or custom cross-platform mobile apps typically range between 4 to 8 weeks."
  },
  {
    id: "faq-3",
    category: "General",
    question: "Can TheDigiOrb take over or optimize an existing codebase?",
    answer: "Absolutely. We conduct thorough Codebase Integrity Audits and refactoring roadmaps for ongoing projects. We optimize slow database queries, modernize UI components, fix security vulnerabilities, and seamlessly upgrade legacy frameworks."
  },
  {
    id: "faq-4",
    category: "Tech & Security",
    question: "Which technology stack do you specialize in?",
    answer: "Our core engineering ecosystem revolves around modern React, Next.js, TypeScript, Node.js, Python, Flutter, Tailwind CSS, PostgreSQL, and cloud serverless architectures (GCP, AWS, Vercel, Cloud Run) built for maximum scalability and sub-second load times."
  },
  {
    id: "faq-5",
    category: "Pricing & Delivery",
    question: "What pricing models does TheDigiOrb offer?",
    answer: "We offer both Milestone-Based Fixed Pricing for clearly defined project scopes, and Dedicated Developer Sprints (Time & Materials) for dynamic startups needing continuous product iteration and agile feature additions."
  },
  {
    id: "faq-6",
    category: "Process",
    question: "How do we communicate and track daily progress during development?",
    answer: "Transparency is paramount. You receive access to a dedicated Slack/Discord channel, a live staging URL updated in real time with continuous deployment (CI/CD), bi-weekly video syncs, and a clear Notion/Jira sprint board tracking every deliverable."
  },
  {
    id: "faq-7",
    category: "Tech & Security",
    question: "Do you provide post-launch maintenance and technical support?",
    answer: "Yes, every project includes 30 days of complimentary post-launch warranty and bug fixes. Following launch, we offer flexible SLA Maintenance Retainers covering server monitoring, dependency security patches, performance tuning, and feature extensions."
  }
];
