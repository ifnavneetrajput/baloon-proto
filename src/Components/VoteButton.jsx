import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const VoteButton = ({ videoId, onCountChange }) => {
  const [count, setCount] = useState(0);
  const [voted, setVoted] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!videoId) return;

    const fetchVotes = async () => {
      try {
        const ref = doc(db, "votes", videoId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setCount(data.count || 0);
          onCountChange?.(data.count || 0);

          if (user && data.users?.[user.uid]) {
            setVoted(true);
          }
        } else {
          setCount(0);
          onCountChange?.(0);
        }
      } catch {
        setError(true);
      }
    };

    fetchVotes();
  }, [videoId, user, onCountChange]);

  const handleVote = async () => {
    if (!user || voted) return;

    try {
      const ref = doc(db, "votes", videoId);
      const snap = await getDoc(ref);

      let newCount = 1;

      if (!snap.exists()) {
        await setDoc(ref, {
          count: 1,
          users: { [user.uid]: true },
        });
      } else {
        newCount = snap.data().count + 1;
        await updateDoc(ref, {
          count: newCount,
          [`users.${user.uid}`]: true,
        });
      }

      setCount(newCount);
      onCountChange?.(newCount);
      setVoted(true);
    } catch {
      setError(true);
    }
  };

  if (error) {
    return (
      <button className="px-4 py-1.5 rounded-full text-sm bg-gray-300 text-gray-500 cursor-not-allowed">
        Offline
      </button>
    );
  }

  return (
    <button
      onClick={handleVote}
      disabled={!user || voted}
      className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
        !user || voted
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-pink-600 text-white hover:bg-pink-700"
      }`}
    >
      {voted ? "Voted" : "Vote"}
    </button>
  );
};

export default VoteButton;
