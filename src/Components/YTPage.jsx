import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import bgAnimation from "../assets/BG-animation.json";
import VideoCard from "./VideoCard";
import { auth, db } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const videos = [
  "Uas6iTUAm-4",
  "knGYJMq5xg8",
  "3hbUkSfAFcg",
  "9bZkp7q19f0",
  "dQw4w9WgXcQ",
  "M7FIvfx5J10",
];

const YTPage = () => {
  const [current, setCurrent] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const lock = useRef(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return setHasVoted(false);
      const ref = doc(db, "userVotes", user.uid);
      const snap = await getDoc(ref);
      setHasVoted(snap.exists());
    });
    return () => unsub();
  }, []);

  const next = () => setCurrent((i) => (i + 1) % videos.length);
  const prev = () => setCurrent((i) => (i - 1 + videos.length) % videos.length);

  const onWheel = (e) => {
    if (lock.current) return;
    lock.current = true;
    e.deltaY > 0 ? next() : prev();
    setTimeout(() => (lock.current = false), 600);
  };

  const onTouchStart = (e) => (touchStartY.current = e.touches[0].clientY);
  const onTouchEnd = (e) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  return (
    <div
      className="relative h-screen overflow-hidden bg-black"
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0 z-0">
        <Lottie
          animationData={bgAnimation}
          loop
          autoplay
          className="w-full h-full"
        />
      </div>

      <div
        className="relative z-10 transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(-${current * 100}vh)` }}
      >
        {videos.map((id, index) => (
          <VideoCard
            key={id}
            videoId={id}
            isActive={index === current}
            hasVoted={hasVoted}
            setHasVoted={setHasVoted}
          />
        ))}
      </div>
    </div>
  );
};

export default YTPage;
