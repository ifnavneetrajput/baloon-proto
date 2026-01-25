import { useState } from "react";

const VideoPlayer = ({ videoId, isActive }) => {
  const [paused, setPaused] = useState(false);

  const src =
    isActive && !paused
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&playsinline=1&controls=0`
      : `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&playsinline=1&controls=0`;

  return (
    <div
      className="w-full h-full cursor-pointer"
      onClick={() => setPaused((p) => !p)}
    >
      <iframe
        key={`${isActive}-${paused}`}
        className="w-full h-full rounded-t-xl pointer-events-none"
        src={src}
        title="Video"
        allow="autoplay"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
