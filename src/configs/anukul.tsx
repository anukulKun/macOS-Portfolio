import type { AnukulData } from "~/types";

const anukul: AnukulData[] = [
  {
    id: "profile",
    title: "Profile",
    icon: "i-fa-solid:paw",
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: "i-la:dragon",
        excerpt: "Hey there! I'm Anukul, a developer and builder..."
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: "i-icon-park-outline:github",
        excerpt: "Here are some stats about my github account..."
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: "i-octicon:browser",
        excerpt: "Something about this personal portfolio site..."
      }
    ]
  },
  {
    id: "project",
    title: "Projects",
    icon: "i-octicon:repo",
    md: [
      {
        id: "macos-portfolio",
        title: "macOS Portfolio",
        file: "https://raw.githubusercontent.com/anukulKun/macOS-Portfolio/main/README.md",
        icon: "i-ri:gamepad-line",
        excerpt: "My portfolio website simulating macOS's GUI...",
        link: "https://github.com/anukulKun/macOS-Portfolio"
      },
      {
        id: "agent-flow",
        title: "AgentFlow",
        file: "https://raw.githubusercontent.com/anukulKun/AgentFlow/main/README.md",
        icon: "i-mdi:robot",
        excerpt: "Create ur own AI Agents...",
        link: "https://github.com/anukulKun/AgentFlow"
      },
      {
        id: "pandoria",
        title: "Pandoria",
        file: "https://raw.githubusercontent.com/anukulKun/Pandoria/main/README.md",
        icon: "i-mdi:tshirt-crew",
        excerpt: "Designing not so avg clothing brand...",
        link: "https://github.com/anukulKun/Pandoria"
      },
      {
        id: "zen-ai",
        title: "Zen-AI",
        file: "https://raw.githubusercontent.com/anukulKun/Zen-AI/main/README.md",
        icon: "i-mdi:brain",
        excerpt: "Fix ur Mental Health using ur Personal AI...",
        link: "https://github.com/anukulKun/Zen-AI"
      },
      {
        id: "secure-pay",
        title: "Secure-Pay",
        file: "https://raw.githubusercontent.com/anukulKun/Secure-Pay/main/README.md",
        icon: "i-mdi:shield-check",
        excerpt: "DeFi platform with secure transfers and group payments...",
        link: "https://github.com/anukulKun/Secure-Pay"
      },
      {
        id: "codex",
        title: "Codex",
        file: "https://raw.githubusercontent.com/anukulKun/Codex/main/README.md",
        icon: "i-mdi:book-open-page-variant",
        excerpt: "WEB3 Lectures - Practice - Leaderboard...",
        link: "https://github.com/anukulKun/Codex"
      },
      {
        id: "dark-web-scraper",
        title: "DarkWebScraper",
        file: "https://raw.githubusercontent.com/anukulKun/DarkWebScraper/main/README.md",
        icon: "i-mdi:web",
        excerpt: "It scrapes the dark web website...",
        link: "https://github.com/anukulKun/DarkWebScraper"
      },
      {
        id: "knight-fall",
        title: "Knight-Fall",
        file: "https://raw.githubusercontent.com/anukulKun/Knight-Fall/main/README.md",
        icon: "i-mdi:gamepad-variant",
        excerpt: "A Multiplayer Web3 game like fall guys on aptos...",
        link: "https://github.com/anukulKun/Knight-Fall"
      },
      {
        id: "keizer-website",
        title: "Keizer Website",
        file: "https://raw.githubusercontent.com/anukulKun/Keizer-Website/main/README.md",
        icon: "i-mdi:web-box",
        excerpt: "Startup Website Keizer...",
        link: "https://github.com/anukulKun/Keizer-Website"
      },
      {
        id: "squadgame-on-solana",
        title: "SquadGame on Solana",
        file: "https://raw.githubusercontent.com/anukulKun/squadgame-on-solana/main/README.md",
        icon: "i-mdi:sword-cross",
        excerpt: "Squadgame on solana from send arcade...",
        link: "https://github.com/anukulKun/squadgame-on-solana"
      }
    ]
  }
];

export default anukul;
