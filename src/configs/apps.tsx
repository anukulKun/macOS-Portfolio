import { appBarHeight } from "~/utils";
import type { AppsData } from "~/types";
import TimelineIcon from "~/components/icons/TimelineIcon";

const apps: AppsData[] = [
  {
    id: "launchpad",
    title: "Launchpad",
    desktop: false,
    img: "img/icons/launchpad.png"
  },
  {
    id: "resume",
    title: "Resume",
    desktop: true,
    width: 800,
    height: 600,
    img: "img/icons/launchpad/resume.png",
    content: <Resume />
  },
  {
    id: "timeline",
    title: "Timeline",
    desktop: true,
    width: 760,
    height: 620,
    minWidth: 360,
    minHeight: 420,
    img: "img/icons/safari.png",
    icon: TimelineIcon,
    content: <ExperienceTimeline />
  },
  {
    id: "projects",
    title: "Projects",
    desktop: true,
    width: 900,
    height: 550,
    img: "img/icons/projects.png",
    content: <Projects />
  },
  {
    id: "irc-chat",
    title: "IRC Chat",
    desktop: true,
    width: 900,
    height: 550,
    img: "img/icons/irc-chat.svg",
    content: <IRCChat />
  },
  {
    id: "typora",
    title: "Typora",
    desktop: true,
    width: 600,
    height: 580,
    y: -20,
    img: "img/icons/typora.png",
    content: <Typora />
  },
  {
    id: "about-me",
    title: "About Me",
    desktop: true,
    show: true,
    width: 800,
    height: 500,
    img: "logo/121.jpg",
    content: <AboutMe />
  },
  {
    id: "safari",
    title: "Safari",
    desktop: true,
    width: 840,
    height: 620,
    minWidth: 380,
    minHeight: 360,
    x: -20,
    img: "img/icons/safari.png",
    content: <Safari />
  },
  {
    id: "vscode",
    title: "VSCode",
    desktop: true,
    width: 900,
    height: 600,
    x: 80,
    y: -30,
    img: "img/icons/vscode.png",
    content: <VSCode />
  },
  {
    id: "facetime",
    title: "FaceTime",
    desktop: true,
    img: "img/icons/facetime.png",
    width: 500 * 1.7,
    height: 500 + appBarHeight,
    minWidth: 350 * 1.7,
    minHeight: 350 + appBarHeight,
    aspectRatio: 1.7,
    x: -80,
    y: 20,
    content: <FaceTime />
  },
  {
    id: "terminal",
    title: "Terminal",
    desktop: true,
    img: "img/icons/terminal.png",
    content: <Terminal />
  },
  {
    id: "github",
    title: "Github",
    desktop: false,
    img: "img/icons/github.png",
    link: "https://github.com/anukulKun/macOS-Portfolio"
  }
];

export default apps;
