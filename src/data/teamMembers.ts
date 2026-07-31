export interface SkillItem {
  name: string;
  level: number;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface HobbyItem {
  label: string;
  icon: string;
}

export interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  photo?: string;
  yearsExperience: number;
  bio: string;
  stack: string[];
  skills: SkillItem[];
  experience: ExperienceItem[];
  projectsCount: number;
  hobbies: HobbyItem[];
  social?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Abbas Q.",
    role: "Co-Founder & CEO",
    yearsExperience: 5,
    bio: "Full-Stack Developer, React JS, Flutter, React Native, Swift, Laravel, Django. 5+ years of experience working with multinational clients, delivering scalable web and mobile solutions.",
    stack: ["React JS", "Flutter", "React Native", "Swift", "Laravel", "Django"],
    skills: [],
    experience: [
      {
        role: "Co-Founder & CEO",
        company: "TheDigiOrb",
        period: "2025 — Present",
        description: "Co-founded and leads TheDigiOrb, driving product vision and full-stack delivery for multinational clients.",
      },
      {
        role: "Computer Programmer",
        company: "Planning & Development Department",
        period: "2025 — Present",
        description: "Developing and maintaining digital systems for the department, ensuring reliability and efficiency.",
      },
      {
        role: "Senior Full Stack Developer",
        company: "Siliconplex",
        period: "2022 — 2025",
        description: "Built scalable front-end applications for clients at Siliconplex.",
      },
    ],
    projectsCount: 6,
    hobbies: [],
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    id: 2,
    name: "Sunail Abbas",
    role: "Full Stack Lead Developer",
    yearsExperience: 5,
    bio: "Developer, Full-Stack, Laravel, React JS, Flutter. 5+ years of experience building solutions for government departments, with a focus on reliability and efficiency.",
    stack: ["Laravel", "React JS", "Flutter", "Firebase", "GitHub"],
    skills: [],
    experience: [
      {
        role: "Full Stack Lead Developer",
        company: "TheDigiOrb",
        period: "2025 — Present",
        description: "Leading web and mobile delivery, building reliable and efficient solutions.",
      },
      {
        role: "Full Stack Developer",
        company: "WAPDA Gilgit",
        period: "2021 — 2025",
        description: "Developing and maintaining web applications for WAPDA Gilgit.",
      },
      {
        role: "Full-Stack Developer",
        company: "Freelance",
        period: "2020 — 2021",
        description: "Built applications using Laravel, React JS and Flutter.",
      },
    ],
    projectsCount: 5,
    hobbies: [],
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    id: 3,
    name: "Sibtain Ali",
    role: "Lead Backend Developer",
    yearsExperience: 5,
    bio: "Backend Developer, Laravel, Django, Yii. 5+ years of experience building robust and scalable server-side systems.",
    stack: ["PHP", "Laravel", "Yii", "Python", "Django"],
    skills: [],
    experience: [
      {
        role: "Lead Backend Developer",
        company: "TheDigiOrb",
        period: "2025 — Present",
        description: "Leading backend architecture and API development.",
      },
      {
        role: "Backend Developer",
        company: "Siliconplex Karachi",
        period: "2023 — 2025",
        description: "Built scalable backend systems using Laravel, Yii and Django.",
      },
      {
        role: "Backend Developer",
        company: "Freelance",
        period: "2020 — 2021",
        description: "Built scalable backend systems and integrations.",
      },
    ],
    projectsCount: 5,
    hobbies: [],
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    id: 4,
    name: "Zafar Mirza",
    role: "Creative UI/UX Lead",
    yearsExperience: 5,
    bio: "UI/UX Designer passionate about creating intuitive and engaging digital experiences. Skilled in user research, wireframing, prototyping, and visual design.",
    stack: ["Figma", "Adobe XD", "Sketch", "Illustrator", "Photoshop"],
    skills: [],
    experience: [
      {
        role: "Creative UI/UX Lead",
        company: "TheDigiOrb",
        period: "2021 — Present",
        description: "Leading design strategy and user experience for digital products.",
      },
      {
        role: "UI/UX Designer",
        company: "LiveWire Karachi",
        period: "2023 — Present",
        description: "Designing intuitive, engaging interfaces for web and mobile.",
      },
      {
        role: "UI/UX Designer",
        company: "Freelance",
        period: "2020 — 2021",
        description: "Designed intuitive, engaging interfaces for web and mobile.",
      },
    ],
    projectsCount: 10,
    hobbies: [],
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
];
