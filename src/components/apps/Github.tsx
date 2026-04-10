import React from "react";

const GITHUB_URL = "https://github.com/anukulKun/macOS-Portfolio";

export default function GithubApp() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <img src="img/icons/github.png" alt="Github" className="w-16 h-16 mb-4" />
      <h2 className="text-lg font-bold mb-2">macOS Portfolio on Github</h2>
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Open Github
      </a>
    </div>
  );
}
