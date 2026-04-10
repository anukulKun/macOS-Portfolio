import Webcam from "react-webcam";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { useStore } from "../../stores";

interface SidebarProps {
  state: FaceTimeState;
  onSelect: (src: string) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

interface SidebarItemProps {
  date: string;
  active: boolean;
}

interface FaceTimeState {
  canSave: boolean;
  curImage: string | null;
}

const SidebarItem = ({ date, active }: SidebarItemProps) => {
  const [hover, setHover] = useState(false);

  const { deleteImage } = useStore((state) => ({
    deleteImage: state.delFaceTimeImage
  }));

  return (
    <div
      className={`hstack h-16 px-2.5 rounded-md space-x-2 ${active && "bg-[#508041]"}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="size-11 rounded-full bg-zinc-600 flex-center" />

      <div className="text-left">
        <div className="font-medium leading-4 text-white text-sm">FaceTime Link</div>
        <div className="flex space-x-1 text-white/60 text-xs">
          <span>FaceTime · {format(Number(date), "hh:mm:ss")}</span>
        </div>
      </div>

      <span
        className={`absolute right-2.5 text-white/60 hover:text-white ${
          !hover && "opacity-0"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          deleteImage(date);
        }}
      >
        ✕
      </span>
    </div>
  );
};

const Sidebar = ({ state, onSelect, open, setOpen }: SidebarProps) => {
  const { images } = useStore((state) => ({
    images: state.faceTimeImages
  }));

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed md:relative top-0 left-0 h-full
        w-[85%] max-w-[300px] md:w-72
        z-50 bg-zinc-900/95 backdrop-blur-xl
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 md:hidden">
          <span className="text-white text-sm font-medium">Recent</span>
          <button onClick={() => setOpen(false)} className="text-white">
            ✕
          </button>
        </div>

        <div className="text-xs h-full overflow-y-auto p-3">
          <div className="text-white/60 mb-2 hidden md:block">Recent</div>

          {Object.keys(images)
            .reverse()
            .map((date) => (
              <button
                key={date}
                className="w-full"
                onClick={() => {
                  onSelect(images[date]);
                  setOpen(false);
                }}
              >
                <SidebarItem date={date} active={state.curImage === images[date]} />
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

const FaceTime = () => {
  const webcamRef = useRef<Webcam>(null);

  const { addImage } = useStore((state) => ({
    addImage: state.addFaceTimeImage
  }));

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [state, setState] = useState<FaceTimeState>({
    canSave: false,
    curImage: null
  });

  return (
    <div className="relative h-screen w-full overflow-hidden bg-zinc-800">
      {/* Hamburger */}
      <button
        className="md:hidden absolute top-4 left-4 z-50 text-white text-2xl"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        ☰
      </button>

      {/* Controls */}
      <div className="absolute top-4 left-14 right-4 z-30 flex gap-2 md:left-80">
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-700 text-white text-sm"
          onClick={() => {
            if (!state.curImage) {
              const src = webcamRef.current?.getScreenshot() || "";
              setState({ curImage: src, canSave: true });
            } else {
              setState({ curImage: null, canSave: false });
            }
          }}
        >
          {state.curImage ? "Retake" : "Take a Picture"}
        </button>

        <button
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
            state.canSave
              ? "bg-blue-600 text-white"
              : "bg-stone-500 text-white opacity-70"
          }`}
          disabled={!state.canSave}
          onClick={() => {
            if (!state.canSave) return;
            addImage(state.curImage!);
            setState({ curImage: null, canSave: false });
          }}
        >
          Save Picture
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar
        state={state}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onSelect={(src) => setState({ curImage: src, canSave: false })}
      />

      {/* Webcam Layer */}
      <div className="absolute inset-0 md:left-72">
        {!state.curImage ? (
          <Webcam
            ref={webcamRef}
            className="w-full h-full object-cover"
            mirrored={false}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user",
              width: 1280,
              height: 720
            }}
          />
        ) : (
          <img
            src={state.curImage}
            className="w-full h-full object-cover"
            alt="preview"
          />
        )}
      </div>
    </div>
  );
};

export default FaceTime;
