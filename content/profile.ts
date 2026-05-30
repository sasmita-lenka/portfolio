export const profile = {
  name: "Sasmita Lenka",
  role: "Software Engineer",
  focus: "Fintech & Payments",
  location: "Bangalore, India",
  email: "lenkasasmita94@gmail.com",
  linkedin: "https://linkedin.com/in/sasmita-lenka",
  resumeUrl: "/sasmita-lenka-resume.pdf",
  available: true,
  headline: { lead: "Building", emphasis: "secure", trail: "payment systems." },
  summary:
    "I build secure, high-scale payment systems (AEPS, BBPS, MATM, POS, ISO 8583) that move 2M+ transactions a day. 4+ years across Java, Spring Boot, microservices, and React.",
  metrics: [
    { value: "2M+", label: "Daily transactions" },
    { value: "40%", label: "Throughput gain" },
    { value: "30%", label: "Lower latency" },
    { value: "4+", label: "Years experience" },
  ],
  about: {
    lead:
      "I build the backbone of digital payments, from Micro-ATM and POS to Aadhaar payments and bill pay.",
    body:
      "Four years and counting at IServeU, shipping systems that stay correct under load: ISO 8583 switching, NPCI and UIDAI compliance, AES-256 and HSM-backed security, and Kubernetes autoscaling that cut infra cost 30%. I lead a backend team and deliver on time.",
    pillars: [
      { title: "Payments core", body: "ISO 8583, AEPS, BBPS, MATM, POS, NPCI routing." },
      { title: "Scale & DevOps", body: "Microservices, K8s (HPA), Docker, Jenkins, Grafana." },
      { title: "Security", body: "AES-256, HSM tokenization, mutual SSL, HMAC, PCI-DSS." },
    ],
  },
} as const;
