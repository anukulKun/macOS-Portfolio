import React from "react";

export default function Resume() {
  return (
    <div className="h-full w-full bg-gray-100 dark:bg-gray-800 flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
        <span className="i-mdi:file-pdf-box text-red-500 text-xl" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Resume - Anukul</span>
        <a
          href="https://drive.google.com/file/d/14C8Jyg0v6x-DxcH4kMBwfEN6zRVnfZGf/view"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-blue-500 hover:underline flex items-center gap-1"
        >
          <span className="i-mdi:open-in-new text-sm" />
          Open in new tab
        </a>
      </div>
      <div className="flex-1">
        <iframe
          src="https://drive.google.com/file/d/14C8Jyg0v6x-DxcH4kMBwfEN6zRVnfZGf/preview"
          className="w-full h-full border-none"
          title="Resume"
          allow="autoplay"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    </div>
  );
}
