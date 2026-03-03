import React from "react";

interface Project {
  title: string;
  date: string;
  summary: string;
  link?: string;
}

const projectsByYear: Record<string, Project[]> = {
  "2026": [
    { title: "macOS-Portfolio", date: "2026-03-07", summary: "made macOS Portfolio cuzz i wanted too", link: "https://github.com/anukulKun/macOS-Portfolio" },
    { title: "AgentFlow", date: "2026-02-22", summary: "Create ur own AI Agents", link: "https://github.com/anukulKun/AgentFlow" },
    { title: "Pandoria", date: "2026-02-22", summary: "Designing not so avg clothing brand", link: "https://github.com/anukulKun/Pandoria" }
  ],
  "2025": [
    { title: "Twitter-Diddy", date: "2025-11-15", summary: "Used to scrape tweets for arweave and create a weekly newsletter", link: "https://github.com/anukulKun/Twitter-Diddy" },
    { title: "Surendra-samriddhi-square", date: "2025-11-15", summary: "Empowering minds through dedicated education and counseling since 1986", link: "https://github.com/anukulKun/Surendra-samriddhi-square" },
    { title: "Zen-AI", date: "2025-11-15", summary: "Fix ur Mental Health using ur Personal AI", link: "https://github.com/anukulKun/Zen-AI" },
    { title: "Codex", date: "2025-11-15", summary: "WEB3 Lectures - Practice - Leaderboard", link: "https://github.com/anukulKun/Codex" },
    { title: "Secure-Pay", date: "2025-06-08", summary: "DeFi platform on multiple chains that provides secure transfers, group payments, and smart savings features.", link: "https://github.com/anukulKun/Secure-Pay" },
    { title: "EduBabel", date: "2025-03-23", summary: "Learn new web3 language and compete for the rank in leaderboard - Educhain", link: "https://github.com/anukulKun/EduBabel" },
    { title: "Edulingoo", date: "2025-03-21", summary: "Duolingo on chain", link: "https://github.com/anukulKun/Edulingoo" },
  ],
  "2024": [
    { title: "DarkWebScraper", date: "2024-11-15", summary: "It scrapes the dark web website", link: "https://github.com/anukulKun/DarkWebScraper" },
    { title: "Homomorphic-encryption-Seal", date: "2024-11-15", summary: "A cloud service that uses homomorphic encryption to process sensitive healthcare data.", link: "https://github.com/anukulKun/Homomorphic-encryption-Seal-using-Docker" },
    { title: "squadgame-on-solana", date: "2024-12-31", summary: "Squadgame on solana from send arcade", link: "https://github.com/anukulKun/squadgame-on-solana" },
    { title: "UNI-3.0", date: "2024-12-16", summary: "A university in VR on edu chain", link: "https://github.com/anukulKun/UNI-3.0" },
    { title: "AI-website-generator", date: "2024-11-10", summary: "AI Website Generator for arweave", link: "https://github.com/anukulKun/AI-website-generator" },
    { title: "refokus-clone", date: "2024-11-03", summary: "Refokus website clone", link: "https://github.com/anukulKun/refokus-clone-mommy-too-thicc" },
    { title: "Vest-IN", date: "2024-10-01", summary: "A Vesting Platform built on edu", link: "https://github.com/anukulKun/Vest-IN" },
    { title: "Keizer-Website", date: "2024-09-21", summary: "Startup Website Keizer", link: "https://github.com/anukulKun/Keizer-Website" },
    { title: "Knight-Fall", date: "2024-08-28", summary: "A Multiplayer Web3 game just like fall guys built on aptos", link: "https://github.com/anukulKun/Knight-Fall" },
    { title: "Decentralized-Health-Record", date: "2024-07-16", summary: "Decentralized Health record Database", link: "https://github.com/anukulKun/Decentralized-Health-Record-Database" },
    { title: "TO-DO", date: "2024-07-11", summary: "yeeah we meet again", link: "https://github.com/anukulKun/TO-DO" },
    { title: "ARCHers_Vision", date: "2024-04-15", summary: "A ecosystem for ARCHers Vision Pro", link: "https://github.com/anukulKun/ARCHers_Vision" },
    { title: "Dark Pattern Analyzer", date: "2024-03-01", summary: "AI Model - Extension that can detect dark patterns in websites and flag them.", link: "https://github.com/anukulKun/DPBH-Sharktooth-Hackathon" }
  ],
  "2023": [
    { title: "ai-resume-analyzer", date: "2023-11-15", summary: "AI-powered resume analyzer", link: "https://github.com/anukulKun/ai-resume-analyzer" },
    { title: "3d-planets", date: "2023-11-15", summary: "3D planets visualization app", link: "https://github.com/anukulKun/nasaspaceapp" },
    { title: "Decentralized-Voting-Dapp", date: "2023-07-30", summary: "Decentralized Voting Dapp", link: "https://github.com/anukulKun/Decentralized-Voting-Dapp" }
  ],
  "2022": [
    { title: "nike-ecommerce", date: "2022-11-25", summary: "Nike-style eCommerce built with Devin AI, Next.js, TS, Tailwind, and Better Auth.", link: "https://github.com/anukulKun/nike-ecommerce" }
  ]
};

const FolderIcon = () => (
  <svg viewBox="0 0 32 32" width="32" height="32" className="shrink-0">
    <defs>
      <linearGradient id="pf-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#5b9ef4" }} />
        <stop offset="100%" style={{ stopColor: "#2d6fd9" }} />
      </linearGradient>
    </defs>
    <path d="M3 7 L9 7 L11 9 L29 9 L29 27 L3 27 Z" fill="#3b7dd8" />
    <path d="M2 13 L30 13 L30 26 Q30 28 28 28 L4 28 Q2 28 2 26 Z" fill="url(#pf-body)" />
  </svg>
);

export default function Projects() {
  const years = Object.keys(projectsByYear).sort((a, b) => {
    const numA = parseInt(a.split("-")[0]);
    const numB = parseInt(b.split("-")[0]);
    return numB - numA;
  });

  return (
    <div className="projects-app h-full overflow-y-auto bg-white dark:bg-gray-900">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <span className="text-lg">📁</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Projects</span>
        <span className="ml-auto text-xs text-gray-400">
          {Object.values(projectsByYear).reduce((a, b) => a + b.length, 0)} items
        </span>
      </div>

      <div className="p-4 space-y-6">
        {years.map((year) => (
          <div key={year}>
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 sticky top-10 bg-white dark:bg-gray-900 py-1 z-[5]">
              {year}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {projectsByYear[year].map((project) => (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center text-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer hover:shadow-md"
                >
                  <FolderIcon />
                  <div className="mt-2 text-xs font-medium text-gray-800 dark:text-gray-200 leading-tight">
                    {project.title}
                  </div>
                  <div className="mt-1 text-[10px] text-gray-400 leading-tight line-clamp-2">
                    {project.summary}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
