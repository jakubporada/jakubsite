// Central source of truth for site content.
// Edit anything here and it updates across every page.

export const profile = {
  name: "Jakub Porada",
  // Short tagline used in the hero
  role: "Cybersecurity & Reverse Engineering",
  tagline:
    "Cybersecurity student turning low-level binary analysis and network defense into real systems.",
  location: "Virginia, USA",
  school: "Virginia Tech",
  email: "jakub.porada8@gmail.com",
  phone: "(571) 663-8854",
  github: "https://github.com/jakubporada",
  linkedin: "https://linkedin.com/in/jakubporada",
  resume: "/Jakub_Porada_Resume.pdf",
  summary:
    "Certified cybersecurity student with hands-on experience in network infrastructure, endpoint security, reverse engineering, and security operations. Skilled in Windows/Linux administration, Cisco networking, traffic analysis, and production system deployment. Platinum CyberPatriot Semi-Finalist and Top 15 National Cyber League competitor with experience securing enterprise systems and analyzing live network traffic.",
};

// Headline stats spotlighted on the home page
export const stats: { value: string; label: string }[] = [
  { value: "Top 15", label: "National Cyber League" },
  { value: "Platinum", label: "CyberPatriot Semi-Finalist" },
  { value: "8+", label: "Industry Certifications" },
  { value: "2", label: "Security Internships" },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "ManTech",
    role: "DFEND Intern (Incoming)",
    period: "Summer 2026",
    current: true,
    points: [
      "Selected for a cybersecurity internship focused on reverse engineering and digital forensics within a federal contracting environment.",
      "Will support security investigations and low-level binary analysis using industry-standard reverse engineering and forensic tools.",
    ],
  },
  {
    company: "Obscurity Labs",
    role: "Software Engineer Intern",
    period: "Jun 2025 – Aug 2025",
    points: [
      "Collaborated in a 5-week Agile internship building an Endpoint Detection and Response (EDR) platform to detect and respond to threats across Windows systems.",
      "Developed a real-time Windows Event Log parser in Go using low-level Windows APIs to capture and normalize security events; implemented detection logic for suspicious authentication activity including Pass-the-Hash attacks.",
      "Built backend and frontend for a full alert-management pipeline using Python/FastAPI, MongoDB, and React — REST endpoints, real-time alert dashboards, severity filtering, and automated threat-response workflows.",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  stack: string[];
  points: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "autonomous-security-operations-platform",
    title: "Autonomous Security Operations Platform",
    blurb:
      "A physical SOC that detects live network attacks and fights back automatically.",
    stack: ["Python", "Suricata", "Wazuh", "Raspberry Pi"],
    featured: true,
    points: [
      "Built a physical security operations platform using Suricata IDS, Wazuh SIEM, Raspberry Pi systems, and managed switches to detect and respond to live network attacks in real time.",
      "Developed automated incident-response workflows that correlated IDS alerts and dynamically pushed firewall rules across a multi-router topology to block malicious hosts within seconds.",
    ],
  },
  {
    slug: "network-intrusion-detection-system",
    title: "Network Intrusion Detection System",
    blurb:
      "An ML-powered IDS trained on 2.8M flows that classifies 14 attack types in real time.",
    stack: ["Python", "React", "FastAPI", "AWS", "Docker"],
    featured: true,
    points: [
      "Developed a machine-learning intrusion detection system trained on 2.8M network flows to classify 14 attack types including DDoS, brute force, and SQL injection.",
      "Built a real-time detection pipeline using AWS VPC Flow Logs, FastAPI, and React to monitor network activity and visualize live attack predictions.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "Java", "JavaScript", "C", "Go", "SQL", "HTML/CSS", "React.js"],
  },
  {
    group: "Reverse Engineering",
    items: ["Ghidra", "x64dbg", "IDA", "HxD", "JADX", "Apktool"],
  },
  {
    group: "Security & Networking",
    items: ["Wireshark", "TShark", "PCAP Analysis", "Nmap", "PuTTY", "Suricata", "Wazuh"],
  },
  {
    group: "Platforms & Tools",
    items: ["AWS", "Docker", "MongoDB", "Scikit-learn", "Windows", "Linux", "Cisco IOS"],
  },
];

export type Cert = { name: string; year: string };

export const certifications: Cert[] = [
  { name: "CompTIA Security+", year: "2026" },
  { name: "CompTIA A+", year: "2026" },
  { name: "Cisco Certified Network Associate (CCNA)", year: "2025" },
  { name: "CompTIA Network+", year: "2025" },
  { name: "CS50x: Introduction to Computer Science", year: "2024" },
  { name: "Certified Python Programmer (PCEP)", year: "2021" },
];

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
  note?: string;
};

export const education: EducationItem[] = [
  {
    school: "Virginia Tech",
    degree: "B.S. Computer Engineering",
    period: "Expected May 2030",
    note: "Incoming Freshman",
  },
  {
    school: "Northern Virginia Community College",
    degree: "Dual Enrollment — MATA Cybersecurity & Cisco",
    period: "2024 – 2026",
    note: "Coursework: Cybersecurity, Cisco Networking, Cloud Computing",
  },
];

// Personality for the About page — keep it human.
export const interests: string[] = [
  "Capture-the-Flag competitions & security research",
  "Tearing apart binaries to understand how things really work",
  "Home-lab networking and building physical security setups",
  "Competing as a Division I athlete — discipline that carries into everything I build",
];
