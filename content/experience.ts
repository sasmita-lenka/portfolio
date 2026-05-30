export type ExperienceEntry = {
  kind: "work" | "education";
  period: string;
  tag: string;
  title: string;
  org: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    kind: "work",
    period: "Nov 2022 - Present",
    tag: "Module Lead",
    title: "Module Lead",
    org: "IServeU Technology Pvt. Ltd. · Bangalore, India",
    bullets: [
      "Designed scalable backends for AEPS, MATM, POS, BBPS on microservices.",
      "Refactored core transaction modules: +40% throughput, -30% latency, 2x deploy velocity.",
      "Migrated to Kubernetes (HPA), cutting cloud infra cost ~30%.",
      "Led backend team, code reviews, 100% on-time sprint delivery.",
    ],
  },
  {
    kind: "work",
    period: "Apr 2022 - Nov 2022",
    tag: "Intern",
    title: "Software Engineer Intern",
    org: "IServeU Technology Pvt. Ltd. · Bangalore, India",
    bullets: [
      "Built core MATM and POS services on ISO 8583 transaction flows.",
      "Integrated payment APIs, configured cloud envs, real-time transaction handling.",
    ],
  },
  {
    kind: "education",
    period: "2020 - 2022",
    tag: "MCA",
    title: "Master of Computer Application",
    org: "Biju Patnaik University of Technology · CGPA 8.6",
    bullets: [],
  },
];
