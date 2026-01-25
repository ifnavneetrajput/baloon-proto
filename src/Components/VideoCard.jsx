import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import VoteButton from "./VoteButton";

const VideoCard = ({ videoId, isActive }) => {
  const [votes, setVotes] = useState(0);

  return (
    <div className="h-screen w-full flex items-center justify-center pb-6 mt-2 sm:pb-0">
      <div className="relative bg-white rounded-xl shadow-md w-full max-w-md h-[75vh]">
        <VideoPlayer videoId={videoId} isActive={isActive} />

        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 border-t bg-white">
          <span className="font-semibold">{votes} votes</span>
          <VoteButton videoId={videoId} onCountChange={setVotes} />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
