import React from "react";

const socials = [
  { platform: "GitHub", handle: "anukulKun", url: "https://github.com/anukulKun", icon: "i-mdi:github" },
  { platform: "Twitter", handle: "@anukulKun", url: "https://x.com/anukulKun", icon: "i-mdi:twitter" },
  { platform: "Telegram", handle: "@anukulKun", url: "https://t.me/anukulKun", icon: "i-mdi:telegram" },
  { platform: "LinkedIn", handle: "anukulKun", url: "https://linkedin.com/in/anukulKun", icon: "i-mdi:linkedin" },
  { platform: "Discord", handle: "@anukul.og", url: "https://discord.com/users/1198214412142661706", icon: "i-ic:baseline-discord" }
];

const experience = [
  { role: "Co-Founder & CTO", company: "Keizerworks", url: "https://keizerworks.com/" },
  { role: "Software Developer", company: "ICP", url: "https://internetcomputer.org/" },
  { role: "Software Engineer Intern", company: "DRDO, Ministry of Defence, Govt. of India", url: "https://drdo.gov.in/drdo/en" }
];

export default function AboutMe() {
  return (
    <div className="about-me-app h-full flex">
      {/* Sidebar */}
      <div className="w-56 shrink-0 bg-gray-800 text-white overflow-y-auto p-4 flex flex-col items-center">
        <img
          src="logo/121.jpg"
          alt="Anukul"
          className="w-24 h-24 rounded-full object-cover mb-3"
          style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
        />
        <div className="font-semibold text-lg">Anukul</div>
        <div className="text-gray-400 text-xs mb-4">Software Engineer</div>

        <div className="w-full">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 font-semibold">Socials</div>
          <div className="space-y-1">
            {socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-700 transition-colors text-gray-300 hover:text-white text-xs"
              >
                <span className={`${s.icon} text-base`} />
                <span>{s.platform}</span>
              </a>
            ))}
          </div>

          <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-4 mb-2 font-semibold">Contact</div>
          <a
            href="mailto:anukulpandit30s@gmail.com"
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-700 transition-colors text-gray-300 hover:text-white text-xs"
          >
            <span className="i-mdi:email text-base" />
            <span>Email</span>
          </a>
          <a
            href="https://cal.com/anukulkun/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-700 transition-colors text-gray-300 hover:text-white text-xs"
          >
            <span className="i-mdi:calendar text-base" />
            <span>Book Meeting</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 p-6">
        <div className="max-w-2xl">
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">
              Experience
            </h3>
            <div className="space-y-2">
              {experience.map((exp) => (
                <div key={exp.company} className="flex justify-between items-baseline text-sm">
                  <span className="text-gray-600 dark:text-gray-300">{exp.role}</span>
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline ml-2 shrink-0"
                  >
                    {exp.company}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">
              About
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                I build developer tools that scale. As an <strong>Entrepreneur</strong>,
                I shipped 5+ production-read Apps used by 1K+ people — including{" "}
                <a href="https://chem0.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">CHEM0</a> (Pre-seed Funding Stage),{" "}
              </p>
              <p>
                At <strong>CHEM0</strong>,I led development of an AI-powered chemistry simulation and reaction prediction platform.
  The system supported 1,000+ beta users across multiple academic institutions.
  
              </p>
            <p>
  Earlier, at <strong>DRDO, Ministry of Defence (Govt. of India)</strong>, I developed a thermal vision system for human detection using computer vision.
  The model was trained and validated across 20+ environments, achieving 94.36% real-time detection accuracy.
</p>
              <p>
                My journey into tech started long before blockchain — building robots, mini-satellites,
                and making objects levitate with sound waves.
              </p>
              <p>
                Since 2022, I've competed in 20+ hackathons across ecosystems like Ethereum, Solana, Arweave,
                and more — earning more than a dozen prizes. One of my favorite projects evolved into{" "}
                <a href="https://arlink.ar.io" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">bazARmash</a> —
                Arweave's AO Game JAM Product that won a $2.5k.
              </p>
              <p>
                In 2024, I won the first EDU Chain Semester.{" "}
                <a href="https://www.youtube.com/watch?v=Tt6rNBYPn4M&t=11s" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Watch my "Youtube" talk about it
                </a>.
              </p>
              <p>
                Outside of coding, I share ideas, experiments, and live builds on my{" "}
                <a href="https://youtube.com/@AnukulKun" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">YouTube channel</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
