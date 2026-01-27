import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

import { FaTrophy, FaVideo, FaCheckCircle } from "react-icons/fa";

const Participate = () => {
  const [answer, setAnswer] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleNo = () => navigate("/journey");
const getVideoPlatform = (link) => {
  if (/^https?:\/\/(www\.)?drive\.google\.com\/.+/.test(link)) {
    return "google_drive";
  }

  if (/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/.test(link)) {
    return "youtube";
  }

  if (/^https?:\/\/(www\.)?instagram\.com\/(reel|p)\/.+/.test(link)) {
    return "instagram";
  }

  return null;
};


  const handleSubmit = async () => {
    setError("");

   if (!videoLink) {
     setError("Please paste your video link.");
     return;
   }

   const platform = getVideoPlatform(videoLink);

   if (!platform) {
     setError(
       "Only Google Drive, YouTube, or Instagram Reel links are allowed.",
     );
     return;
   }


    try {
      setLoading(true);
      const user = auth.currentUser;

    await setDoc(
      doc(db, "participations", user.uid),
      {
        userId: user.uid,
        email: user.email,
        videoLink,
        platform, 
        competition: "Reel Royale – Season 1",
        status: "pending",
        participated: true,
        createdAt: serverTimestamp(),
      },
      { merge: true },
    );


      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const checkParticipation = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "participations", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setSubmitted(true); 
      }
    };

    checkParticipation();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          🎬 Reel Royale – Season 1
        </h1>
        <p className="text-gray-600 mt-2">
          Show your talent. Compete. Win exciting rewards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaVideo className="text-pink-500" />
            Competition Rules
          </h2>

          <ul className="space-y-3 text-sm text-gray-600">
            <li>• Submit only original content</li>
            <li>• Video duration: max 60 seconds</li>
            <li>• Google Drive, YouTube & Instagram Reel links are accepted</li>
            <li>• One entry per user</li>
            <li>• Top 10 videos go live in Explore</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border flex flex-col justify-center">
          {!submitted ? (
            <>
              <h2 className="text-xl font-semibold text-pink-500 mb-6 text-center">
                Want to Participate?
              </h2>

              {!answer && (
                <div className="flex justify-center gap-6">
                  <button
                    onClick={() => setAnswer("yes")}
                    className="bg-pink-500 text-white px-8 py-2 rounded-lg hover:bg-pink-600 transition"
                  >
                    Yes
                  </button>

                  <button
                    onClick={handleNo}
                    className="border border-pink-500 text-pink-500 px-8 py-2 rounded-lg hover:bg-pink-500 hover:text-white transition"
                  >
                    No
                  </button>
                </div>
              )}

              {answer === "yes" && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Link (Google Drive / YouTube / Instagram)
                  </label>

                  <input
                    type="text"
                    placeholder="Paste Google Drive, YouTube, or Instagram Reel link"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-pink-500"
                  />

                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 bg-pink-500 text-white py-2 rounded-lg
               hover:bg-pink-600 transition disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Submit Entry"}
                    </button>

                    <button
                      onClick={handleNo}
                      disabled={loading}
                      className="flex-1 border border-pink-500 text-pink-500 py-2 rounded-lg
               hover:bg-pink-500 hover:text-white transition"
                    >
                      No
                    </button>
                  </div>

                  <p className="mt-3 text-xs text-gray-500 flex items-center gap-1">
                    <FaCheckCircle className="text-green-500" />
                    Google Drive, YouTube & Instagram Reel links are accepted
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Submission Successful!
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Our team will verify your video.
                <br />
                If you are in the <span className="font-medium">Top 10</span>,
                your video will appear in the{" "}
                <span className="font-medium">Explore</span> section.
              </p>

              <button
                onClick={() => navigate("/journey")}
                className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
              >
                Go to Journey
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaTrophy className="text-pink-500" />
            Prize Distribution
          </h2>

          <ul className="space-y-3 text-sm text-gray-600">
            <li>🥇 1st Prize – ₹21,000 </li>
            <li>🥈 2nd Prize – ₹15,000</li>
            <li>🥉 3rd Prize – ₹10,000</li>
            <li>🎖 Rest Top 7 – ₹2,000 for each </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Participate;
