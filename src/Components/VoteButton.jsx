import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const VoteButton = ({ videoId, hasVoted, setHasVoted, onCountChange }) => {
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const fetchVotes = async () => {
      const ref = doc(db, "votes", videoId);
      const snap = await getDoc(ref);
      const c = snap.exists() ? snap.data().count : 0;
      setCount(c);
      onCountChange?.(c);
    };
    fetchVotes();
  }, [videoId, onCountChange]);

  const handleVote = async () => {
    if (!user || hasVoted || loading) return;
    setLoading(true);

    const userVoteRef = doc(db, "userVotes", user.uid);
    const userVoteSnap = await getDoc(userVoteRef);
    if (userVoteSnap.exists()) {
      setHasVoted(true);
      setLoading(false);
      return;
    }

    const voteRef = doc(db, "votes", videoId);
    const voteSnap = await getDoc(voteRef);

    if (!voteSnap.exists()) {
      await setDoc(voteRef, { count: 1 });
      setCount(1);
      onCountChange?.(1);
    } else {
      const newCount = voteSnap.data().count + 1;
      await updateDoc(voteRef, { count: newCount });
      setCount(newCount);
      onCountChange?.(newCount);
    }

    await setDoc(userVoteRef, {
      videoId,
      votedAt: serverTimestamp(),
    });

    setHasVoted(true);
    setLoading(false);
  };

  return (
    <button
      onClick={handleVote}
      disabled={!user || hasVoted || loading}
      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
        !user || hasVoted || loading
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-pink-600 text-white hover:bg-pink-700"
      }`}
    >
      {hasVoted ? "Voted" : "Vote"}
    </button>
  );
};

export default VoteButton;
