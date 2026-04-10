import React from "react";
import { motion } from "framer-motion";
import { SectionGroup } from "~/components/mobile/iOSComponents";

const socials = [
  {
    platform: "GitHub",
    handle: "anukulKun",
    url: "https://github.com/anukulKun",
    icon: "i-mdi:github"
  },
  {
    platform: "Twitter",
    handle: "@anukulKun",
    url: "https://x.com/anukulKun",
    icon: "i-mdi:twitter"
  },
  {
    platform: "Telegram",
    handle: "@anukulKun",
    url: "https://t.me/anukulKun",
    icon: "i-mdi:telegram"
  },
  {
    platform: "LinkedIn",
    handle: "anukulKun",
    url: "https://linkedin.com/in/anukulKun",
    icon: "i-mdi:linkedin"
  },
  {
    platform: "Discord",
    handle: "@anukul.og",
    url: "https://discord.com/users/1198214412142661706",
    icon: "i-ic:baseline-discord"
  }
];

const experience = [
  { role: "Co-Founder & CTO", company: "Keizerworks", url: "https://keizerworks.com/" },
  { role: "Software Developer", company: "ICP", url: "https://internetcomputer.org/" },
  {
    role: "Software Engineer Intern",
    company: "DRDO, Ministry of Defence, Govt. of India",
    url: "https://drdo.gov.in/drdo/en"
  }
];

const contactLinks = [
  { icon: "i-mdi:email", href: "mailto:anukulpandit30s@gmail.com", label: "Email" },
  { icon: "i-mdi:calendar", href: "https://cal.com/anukulkun/15min", label: "Meeting" }
];

const AboutMeContent = () => (
  <div className="flex-1 overflow-y-auto bg-[#f2f2f7] dark:bg-black pt-[max(env(safe-area-inset-top),24px)] pb-10 px-4 overscroll-y-auto">
    <div className="max-w-md mx-auto space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="rounded-3xl bg-[#e5e5ea] dark:bg-[#1c1c1e] backdrop-blur-xl shadow-md p-5 flex flex-col items-center gap-4"
      >
        <img
          src="logo/121.jpg"
          alt="Anukul"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="text-center">
          <div className="text-lg font-semibold text-slate-900 dark:text-white">
            Anukul
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-300">
            Software Engineer
          </div>
        </div>

        <div className="w-full">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            SOCIALS
          </div>
          <div className="flex justify-center gap-4">
            {socials.map((s) => (
              <motion.a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                className="w-10 h-10 rounded-full bg-white/90 dark:bg-[#242426] flex items-center justify-center text-gray-500 dark:text-gray-300 shadow-sm hover:text-gray-700 dark:hover:text-white transition-all duration-150"
                aria-label={s.platform}
              >
                <span className={`${s.icon} text-xl`} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 mt-2">
            CONTACT
          </div>
          <div className="flex justify-center gap-4">
            {contactLinks.map((c) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                className="w-9 h-9 rounded-full bg-white/90 dark:bg-[#242426] flex items-center justify-center text-gray-500 dark:text-gray-300 shadow-sm hover:text-gray-700 dark:hover:text-white transition-all duration-150"
                aria-label={c.label}
              >
                <span className={`${c.icon} text-base`} />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      <SectionGroup title="Experience">
        {experience.map((exp, i) => (
          <React.Fragment key={exp.company}>
            <motion.a
              href={exp.url}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.98 }}
              className="min-h-[60px] px-4 flex items-center justify-between gap-2 active:bg-gray-50 dark:active:bg-[#2c2c2e] transition-colors"
            >
              <div className="flex-1 min-w-0 flex flex-col">
                <span className="text-[15px] font-medium text-slate-900 dark:text-white truncate">
                  {exp.role}
                </span>
                <span className="text-[13px] text-gray-500 dark:text-gray-300 truncate">
                  {exp.company}
                </span>
              </div>
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-300 flex-shrink-0"
                fill="none"
                viewBox="0 0 12 20"
              >
                <path
                  d="M2 2l8 8-8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
            {i < experience.length - 1 && (
              <div className="ml-4 border-b border-gray-200 dark:border-gray-700" />
            )}
          </React.Fragment>
        ))}
      </SectionGroup>

      <SectionGroup title="About">
        <div className="px-4 py-4 leading-relaxed space-y-4 text-[15px] text-gray-700 dark:text-gray-300">
          <p>
            I build developer tools that scale. As an{" "}
            <strong className="font-semibold">Entrepreneur</strong>, I shipped 5+
            production-ready apps used by 1K+ people — including{" "}
            <a
              href="https://chem0.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007aff] hover:underline"
            >
              CHEM0
            </a>{" "}
            (Pre-seed).
          </p>
          <p>
            At <strong className="font-semibold">CHEM0</strong>, I led development of an
            AI-powered chemistry simulation platform, supporting 1,000+ beta users across
            academic institutions.
          </p>
          <p>
            At <strong className="font-semibold">DRDO, Ministry of Defence</strong>, I
            developed a thermal vision system for human detection using computer vision
            across 20+ environments, achieving 94.36% real-time accuracy.
          </p>
          <p>
            My journey started before blockchain — building robots, mini-satellites, and
            making objects levitate with sound waves.
          </p>
          <p>
            Since 2022, I've competed in 20+ hackathons across Ethereum, Solana, Arweave
            and more — earning 12+ prizes. One project became{" "}
            <a
              href="https://arlink.ar.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007aff] hover:underline"
            >
              bazARmash
            </a>{" "}
            — Arweave's AO Game JAM, winning $2.5k.
          </p>
          <p>
            In 2024, I won the first EDU Chain Semester.{" Watch "}
            <a
              href="https://www.youtube.com/watch?v=Tt6rNBYPn4M&t=11s"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007aff] hover:underline"
            >
              my YouTube talk
            </a>
            .
          </p>
          <p>
            Outside coding, I share ideas and live builds{"on "}
            <a
              href="https://youtube.com/@AnukulKun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007aff] hover:underline"
            >
              my YouTube channel
            </a>
            .
          </p>
        </div>
      </SectionGroup>
    </div>
  </div>
);

const AboutMeSidebar = () => (
  <>
    <div className="w-56 shrink-0 bg-white/80 dark:bg-gray-900/80 text-black dark:text-white overflow-y-auto p-4 flex flex-col items-center backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50">
      <img
        src="logo/121.jpg"
        alt="Anukul"
        className="w-24 h-24 rounded-full object-cover mb-3 shadow-lg"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
      />
      <div className="font-semibold text-lg tracking-tight">Anukul</div>
      <div className="text-gray-500 dark:text-gray-400 text-xs mb-4">
        Software Engineer
      </div>

      <div className="w-full">
        <div className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 font-semibold">
          Socials
        </div>
        <div className="space-y-1">
          {socials.map((s) => (
            <motion.a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-xs"
            >
              <span className={`${s.icon} text-base`} />
              <span>{s.platform}</span>
            </motion.a>
          ))}
        </div>

        <div className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-4 mb-2 font-semibold">
          Contact
        </div>
        <motion.a
          href="mailto:anukulpandit30s@gmail.com"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-xs"
        >
          <span className="i-mdi:email text-base" />
          <span>Email</span>
        </motion.a>
        <motion.a
          href="https://cal.com/anukulkun/15min"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-xs"
        >
          <span className="i-mdi:calendar text-base" />
          <span>Book Meeting</span>
        </motion.a>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-2xl">
        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">
            Experience
          </h3>
          <div className="space-y-3">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-sm p-3 rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-gray-900 dark:text-gray-100 font-medium mb-1 sm:mb-0">
                  {exp.role}
                </span>
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {exp.company}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">
            About
          </h3>
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
            <p>
              I build developer tools that scale. As an{" "}
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                Entrepreneur
              </strong>
              , I shipped 5+ production-ready apps used by 1K+ people — including{" "}
              <a
                href="https://chem0.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                CHEM0
              </a>{" "}
              (Pre-seed).
            </p>
            <p>
              At{" "}
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                CHEM0
              </strong>
              , I led development of an AI-powered chemistry simulation platform,
              supporting 1,000+ beta users across academic institutions.
            </p>
            <p>
              At{" "}
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                DRDO, Ministry of Defence
              </strong>
              , I developed a thermal vision system for human detection using computer
              vision across 20+ environments, achieving 94.36% real-time accuracy.
            </p>
            <p>
              My journey started before blockchain — building robots, mini-satellites, and
              making objects levitate with sound waves.
            </p>
            <p>
              Since 2022, I've competed in 20+ hackathons across Ethereum, Solana, Arweave
              and more — earning 12+ prizes. One project became{" "}
              <a
                href="https://arlink.ar.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                bazARmash
              </a>{" "}
              — Arweave's AO Game JAM, winning $2.5k.
            </p>

            <p>
              In 2024, I won the first EDU Chain Semester.{" Watch "}
              <a
                href="https://www.youtube.com/watch?v=Tt6rNBYPn4M&t=11s"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                my YouTube talk
              </a>
              .
            </p>
            <p>
              Outside coding, I share ideas and live builds{"on "}
              <a
                href="https://youtube.com/@AnukulKun"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                my YouTube channel
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default function AboutMe({ width }: { width?: number }) {
  const isMobile = (width || 600) <= 640;

  if (isMobile) {
    return (
      <div className="about-me-app h-full flex flex-col">
        <AboutMeContent />
      </div>
    );
  }

  return (
    <div className="about-me-app h-full flex">
      <AboutMeSidebar />
    </div>
  );
}
