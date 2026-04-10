import React from "react";
import { Pencil } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  logo?: string;
  logoClassName?: string;
}

const experiences: ExperienceItem[] = [
  {
    role: "Chief Technology Officer",
    company: "CHEM0 · Full-time",
    duration: "Mar 2025 - Sep 2025 · 7 mos",
    location: "",
    logo: "/logo/chem0_logo.svg",
    description: [
      "Leading development of an AI-powered chemical intelligence platform to predict formulation failures before wet-lab testing.",
      "Architected scalable ML systems (GNN-based) for molecular interaction, stability, and compatibility analysis."
    ]
  },
  {
    role: "Marketing Team Lead",
    company: "myorbit.ai · Full-time",
    duration: "Mar 2025 - Aug 2025 · 6 mos",
    location: "San Francisco Bay Area · Remote",
    logo: "/logo/myorbit_ai_logo.jpg",
    description: [
      "Managed digital marketing for myorbit.ai including campaign planning, ad execution, and multi-platform growth strategy across X, Instagram, and YouTube."
    ]
  },
  {
    role: "Co-Founder & CTO",
    company: "Keizerworks · Full-time",
    duration: "Oct 2024 - Aug 2025 · 11 mos",
    location: "On-site",
    logo: "/logo/keizerworks_logo.jpg",
    description: [
      "A product studio dedicated to building tools that drive startup growth. We also partner with startups to help them develop their technology."
    ]
  },
  {
    role: "Founding Member",
    company: "ARCHers · Full-time",
    duration: "Mar 2024 - Feb 2025 · 1 yr",
    location: "",
    logo: "/logo/archers001_logo.jpg",
    description: [
      "ARCHers - A group people who got together and are actively Building cool tech."
    ]
  },
  {
    role: "Practical Training",
    company: "DRDO, Ministry of Defence, Govt. of India · Internship",
    duration: "Jan 2025 · 1 mo",
    location: "On-site",
    logo: "/logo/drdo.png",
    logoClassName: "object-contain p-0.5 bg-white",
    description: [
      "Developed a ML Model that Detect Humans Through Thermal Camera In Different Environments."
    ]
  },
  {
    role: "Frontend Developer",
    company: "ICP · Internship",
    duration: "Sep 2024 · 1 mo",
    location: "Remote",
    logo: "/logo/icp_3_logo.jpg",
    description: ["Worked on a Project - The Zori"]
  },
  {
    role: "Machine Learning Intern",
    company: "Indian Institute of Information Technology Una · Internship",
    duration: "Jun 2024 - Jul 2024 · 2 mos",
    location: "India · Remote",
    logo: "/logo/iiituna_logo.jpg",
    description: ["Developed a ML Model on Siamese network."]
  },
  {
    role: "Back End Developer",
    company: "SOUTH BIHAR POWER DISTRIBUTION COMPANY LIMITED · Internship",
    duration: "Jun 2024 - Jul 2024 · 2 mos",
    location: "On-site",
    logo: "/logo/sbpdcl.png",
    description: ["Developed backend for an - Office Management System."]
  },
  {
    role: "Contributor",
    company: "GirlScript Summer of Code · Full-time",
    duration: "May 2024 - Jun 2024 · 2 mos",
    location: "India · Remote",
    logo: "/logo/girlscriptsoc_logo.jpg",
    description: ["Contributed to Open-Source projects"]
  },
  {
    role: "Full Stack Developer",
    company: "Nexus info · Internship",
    duration: "May 2024 - Jun 2024 · 2 mos",
    location: "India · Remote",
    logo: "/logo/nexus_software_pvt_ltd_logo.jpg",
    description: ["Developed a Resutrant Managemt System"]
  },
  {
    role: "Competition Coordinator CSE",
    company: "CU Academic Competitions · Full-time",
    duration: "Feb 2024 · 1 mo",
    location: "Chandigarh University · On-site",
    logo: "/logo/cu_academic_competitions_logo.jpg",
    description: [
      "Overseeing - Planning, coordination, and execution of Chandigarh University."
    ]
  },
  {
    role: "Frontend Developer",
    company: "eComlancer · Internship",
    duration: "Dec 2023 - Feb 2024 · 3 mos",
    location: "India · Remote",
    logo: "/logo/ecomlancer_logo.jpg",
    description: ["Worked with clients to build their SaaS Frontends."]
  },
  {
    role: "Data Scientist",
    company:
      "TEACHNOOK (TEACHSCAPE ONLINE LEARNING SERVICES PRIVATE LIMITED) · Internship",
    duration: "Apr 2023 - May 2023 · 2 mos",
    location: "India · Remote",
    logo: "/logo/teachnook_logo.jpg",
    description: ["Exploratory Data Analysis and Data Analysis"]
  }
];

export default function ExperienceTimeline() {
  const [brokenLogos, setBrokenLogos] = React.useState<Record<string, boolean>>({});

  return (
    <div className="h-full w-full overflow-y-auto bg-[#f3f2ef] p-3 sm:p-5 md:p-6">
      <div className="mx-auto w-full max-w-[700px] bg-transparent shadow-none">
        <div>
          {experiences.map((exp, index) => (
            <div
              key={`${exp.role}-${exp.company}-${exp.duration}`}
              className={`px-4 py-5 sm:px-5 ${
                index !== experiences.length - 1 ? "border-b border-[#ebebeb]" : ""
              }`}
            >
              <div className="flex gap-3.5 sm:gap-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[6px] border border-[#e2e8f0] bg-[#f8fafc]">
                  {exp.logo && !brokenLogos[exp.company] ? (
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-full ${exp.logoClassName || "object-cover"}`}
                      onError={() =>
                        setBrokenLogos((prev) => ({
                          ...prev,
                          [exp.company]: true
                        }))
                      }
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[14px] font-semibold text-[#475569]">
                      {exp.company.slice(0, 1)}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-[16px] font-semibold leading-[1.3] text-[#191919]">
                        {exp.role}
                      </h3>
                      <p className="mt-[1px] text-[14px] leading-[1.45] text-[#191919]">
                        {exp.company}
                      </p>
                      <p className="text-[14px] leading-[1.45] text-[#666666]">
                        {exp.duration}
                      </p>
                      {exp.location ? (
                        <p className="text-[14px] leading-[1.45] text-[#666666]">
                          {exp.location}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-3 space-y-1.5">
                    {exp.description.map((line) => (
                      <p key={line} className="text-[14px] leading-[1.55] text-[#191919]">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
