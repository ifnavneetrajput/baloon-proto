import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FaTrophy, FaVideo, FaCheckCircle } from "react-icons/fa";

const Participate = () => {
  const [answer, setAnswer] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleNo = () => navigate("/journey");

  const isValidDriveLink = (link) =>
    /^https?:\/\/(drive\.google\.com)\/.+/.test(link);

  const handleSubmit = async () => {
    setError("");

    if (!videoLink) {
      setError("Please paste your Google Drive video link.");
      return;
    }

    if (!isValidDriveLink(videoLink)) {
      setError("Only Google Drive video links are allowed.");
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
            <li>• Only Google Drive links allowed</li>
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
                    Google Drive Video Link
                  </label>

                  <input
                    type="text"
                    placeholder="https://drive.google.com/..."
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-pink-500"
                  />

                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-6 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit Entry"}
                  </button>

                  <p className="mt-3 text-xs text-gray-500 flex items-center gap-1">
                    <FaCheckCircle className="text-green-500" />
                    Only Google Drive links are accepted
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
            <li>🥇 1st Prize – ₹5,000 + Feature</li>
            <li>🥈 2nd Prize – ₹3,000</li>
            <li>🥉 3rd Prize – ₹1,000</li>
            <li>🎖 Top 10 – Featured in Explore</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Participate;
