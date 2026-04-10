import React, { useState } from "react";
import { useStore } from "~/stores";
import { websites, wallpapers } from "~/configs";
import { checkURL } from "~/utils";
import type { SiteSectionData, SiteData } from "~/types";

interface SafariState {
  goURL: string;
  currentURL: string;
}

interface SafariProps {
  width?: number;
}

interface NavProps {
  width: number;
  setGoURL: (url: string) => void;
}

interface NavSectionProps extends NavProps {
  section: SiteSectionData;
}

const NavSection = ({ width, section, setGoURL }: NavSectionProps) => {
  const grid = "grid-cols-[repeat(auto-fit,minmax(80px,1fr))]";

  return (
    <div className="mx-auto w-full max-w-screen-md px-4 pt-6 snap-start">
      <div className="font-medium ml-2 text-xl sm:text-2xl">{section.title}</div>

      {/* FIXED GRID */}
      <div className={`mt-3 grid ${grid} gap-4`}>
        {section.sites.map((site: SiteData) => (
          <div
            key={`safari-nav-${site.id}`}
            className="flex flex-col items-center gap-2 py-2"
          >
            {/* ICON (FIXED BACKGROUND ISSUE HERE) */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl overflow-hidden bg-transparent border border-gray-300/50 dark:border-gray-700/50 shadow-none">
              {site.img ? (
                <img
                  src={site.img}
                  alt={site.title}
                  title={site.title}
                  className="w-full h-full object-contain p-1 bg-transparent"
                  onClick={
                    site.inner ? () => setGoURL(site.link) : () => window.open(site.link)
                  }
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-black"
                  onClick={
                    site.inner ? () => setGoURL(site.link) : () => window.open(site.link)
                  }
                >
                  <span className="text-sm">{site.title}</span>
                </div>
              )}
            </div>

            {/* TEXT */}
            <span className="text-xs text-center text-gray-700 dark:text-gray-300">
              {site.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const numTracker = Math.floor(Math.random() * 99 + 1);

const NavPage = ({ width, setGoURL }: NavProps) => {
  const dark = useStore((state) => state.dark);

  const grid = width < 640 ? "grid-cols-1" : "grid-cols-8";
  const textSpan = width < 640 ? "col-span-1" : "col-span-7";

  return (
    <div
      className="w-full safari-content overflow-y-auto snap-y snap-mandatory scroll-smooth bg-center bg-cover text-c-black"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`,
        WebkitOverflowScrolling: "touch"
      }}
    >
      <div className="w-full min-h-full pt-8 bg-c-100/80 backdrop-blur-2xl space-y-6">
        {/* Favorites */}
        <NavSection section={websites.favorites} setGoURL={setGoURL} width={width} />

        {/* Frequently Visited */}
        <NavSection section={websites.freq} setGoURL={setGoURL} width={width} />

        {/* Privacy Report */}
        <div className="mx-auto w-full max-w-screen-md px-4 pb-16 snap-start">
          <div className="font-medium text-xl sm:text-2xl">Privacy Report</div>
          <div
            className={`w-full mt-4 grid ${grid} gap-3 shadow-md rounded-xl p-3 text-sm bg-white/80 dark:bg-gray-900/90`}
          >
            <div className="flex items-center space-x-2">
              <span className="i-fa-solid:shield-alt text-2xl" />
              <span className="text-xl font-semibold">{numTracker}</span>
            </div>
            <div
              className={`${textSpan} text-sm leading-5 text-gray-800 dark:text-gray-200`}
            >
              In the last seven days, Safari has prevented {numTracker} trackers from
              profiling you.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoInternetPage = () => {
  const dark = useStore((state) => state.dark);

  return (
    <div
      className="w-full safari-content overflow-y-auto snap-y snap-mandatory scroll-smooth bg-blue-50 bg-center bg-cover"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`,
        WebkitOverflowScrolling: "touch"
      }}
    >
      <div className="w-full h-full pb-10 backdrop-blur-2xl flex-center text-c-600 bg-c-100/80">
        <div className="text-center">
          <div className="text-2xl font-bold">You Are Not Connected to the Internet</div>
          <div className="pt-4 text-sm">
            This page can't be displayed because your computer is currently offline.
          </div>
        </div>
      </div>
    </div>
  );
};

const Safari = ({ width }: SafariProps) => {
  const wifi = useStore((state) => state.wifi);
  const [state, setState] = useState<SafariState>({
    goURL: "",
    currentURL: ""
  });

  const setGoURL = (input: string) => {
    let url = input.trim();

    if (url === "") {
      setState({ goURL: "", currentURL: "" });
      return;
    }

    const isValid = checkURL(url);
    if (isValid) {
      if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
    } else {
      url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    }

    const canEmbed = (() => {
      try {
        const parsed = new URL(url);
        const host = window.location.host;
        return parsed.host === host;
      } catch {
        return false;
      }
    })();

    if (!canEmbed) {
      window.open(url, "_blank", "noopener,noreferrer");
      setState({ goURL: "", currentURL: url });
      return;
    }

    setState({
      goURL: url,
      currentURL: url
    });
  };

  const pressURL = (e: React.KeyboardEvent) => {
    const keyCode = e.key;
    if (keyCode === "Enter") setGoURL((e.target as HTMLInputElement).value);
  };

  const buttonColor = state.goURL === "" ? "text-c-400" : "text-c-700";
  const grid = (width as number) < 640 ? "grid-cols-2" : "grid-cols-3";
  const hideLast = (width as number) < 640 ? "hidden" : "flex";

  return (
    <div className="w-full h-full">
      {/* browser topbar */}
      <div className={`h-10 grid ${grid} items-center bg-c-white`}>
        <div className="flex px-2">
          <button
            className={`safari-btn w-7 ${buttonColor}`}
            onClick={() => setGoURL("")}
          >
            <span className="i-jam:chevron-left text-xl" />
          </button>
          <button className="safari-btn w-7 text-c-400">
            <span className="i-jam:chevron-right text-xl" />
          </button>
          <button className="safari-btn w-9 ml-3 text-c-700">
            <span className="i-bi:layout-sidebar text-sm" />
          </button>
        </div>
        <div className="hstack space-x-2 px-2">
          <button className="safari-btn w-9 -ml-10 text-c-400">
            <span className="i-fa-solid:shield-alt text-sm" />
          </button>
          <input
            type="text"
            value={state.currentURL}
            onChange={(e) => setState({ ...state, currentURL: e.target.value })}
            onKeyPress={pressURL}
            className="h-6 w-full p-2 rounded font-normal no-outline text-sm text-center text-c-500 bg-c-200"
            border="2 transparent focus:blue-400 dark:focus:blue-500"
            placeholder="Search or enter website name"
          />
        </div>
        <div className={`${hideLast} justify-end space-x-2 px-2`}>
          <button className={`safari-btn w-9 ${buttonColor}`}>
            <span className="i-ion:share-outline" />
          </button>
          <button className="safari-btn w-9 text-c-700">
            <span className="i-ion:copy-outline" />
          </button>
        </div>
      </div>

      {/* browser content */}
      {wifi ? (
        state.goURL === "" ? (
          <NavPage setGoURL={setGoURL} width={width as number} />
        ) : (
          <iframe
            title={"Safari clone browser"}
            src={state.goURL}
            className="safari-content w-full bg-white"
          />
        )
      ) : (
        <NoInternetPage />
      )}
    </div>
  );
};

export default Safari;
