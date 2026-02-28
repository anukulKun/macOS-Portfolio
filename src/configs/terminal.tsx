import type { TerminalData } from "~/types";

const terminal: TerminalData[] = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-bio",
        title: "bio.txt",
        type: "file",
        content: (
          <div className="py-1">
            <div>
              Hi, this is Anukul. I am a CS major student at Chandigarh university.
            </div>
          </div>
        )
      },
      {
        id: "about-interests",
        title: "interests.txt",
        type: "file",
        content: "Machine Learning / Full-Stack / Cloud Computing"
      },
      {
        id: "about-who-cares",
        title: "who-cares.txt",
        type: "file",
        content:
          "I'm available for hire. Looking for a engineering?"
      },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href="mailto:anukulpandit30s@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                anukulpandit30s@gmail.com
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href="https://github.com/anukulKun"
                target="_blank"
                rel="noreferrer"
              >
                @anukulKun
              </a>
            </li>
            <li>
              <a
                className="text-blue-300"
                href="https://scholar.google.com/citations?hl=en&user=-JvusN8AAAAJ"
                target="_blank"
                rel="noreferrer"
              >
                Google Scholar
              </a>
            </li>
            <li>
              Linkedin:{" "}
              <a
                className="text-blue-300"
                href="https://www.linkedin.com/in/anukulKun"
                target="_blank"
                rel="noreferrer"
              >
                anukulKun
              </a>
            </li>
            <li>
              Personal Website:{" "}
              <a
                className="text-blue-300"
                href="https://anukulKun.xyz"
                target="_blank"
                rel="noreferrer"
              >
                https://anukulKun.xyz
              </a>
            </li>
       
          </ul>
        )
      }
    ]
  },
  {
    id: "about-dream",
    title: "my-dream.cpp",
    type: "file",
    content: (
      <div className="py-1">
        <div>
          <span className="text-yellow-400">while</span>(
          <span className="text-blue-400">sleeping</span>) <span>{"{"}</span>
        </div>
        <div>
          <span className="text-blue-400 ml-9">money</span>
          <span className="text-yellow-400">++</span>;
        </div>
        <div>
          <span>{"}"}</span>
        </div>
      </div>
    )
  }
];

export default terminal;
