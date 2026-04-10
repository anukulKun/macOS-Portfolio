import React from "react";
import AppWindow from "./AppWindow";
import { apps } from "~/configs";

interface DesktopAppWindowsProps {
  showApps: { [key: string]: boolean };
  appsZ: { [key: string]: number };
  maxApps: { [key: string]: boolean };
  minApps: { [key: string]: boolean };
  closeApp: (id: string) => void;
  setAppMax: (id: string, target?: boolean) => void;
  minimizeApp: (id: string) => void;
  openApp: (id: string) => void;
}

export const DesktopAppWindows: React.FC<DesktopAppWindowsProps> = ({
  showApps,
  appsZ,
  maxApps,
  minApps,
  closeApp,
  setAppMax,
  minimizeApp,
  openApp
}) => {
  return (
    <>
      {apps.map((app) => {
        if (app.desktop && showApps[app.id]) {
          return (
            <AppWindow
              key={`desktop-app-${app.id}`}
              id={app.id}
              title={app.title}
              width={app.width}
              height={app.height}
              minWidth={app.minWidth}
              minHeight={app.minHeight}
              aspectRatio={app.aspectRatio}
              x={app.x}
              y={app.y}
              z={appsZ[app.id]}
              max={maxApps[app.id]}
              min={minApps[app.id]}
              close={closeApp}
              setMax={setAppMax}
              setMin={minimizeApp}
              focus={openApp}
            >
              {app.content}
            </AppWindow>
          );
        }
        return null;
      })}
    </>
  );
};

export default DesktopAppWindows;
