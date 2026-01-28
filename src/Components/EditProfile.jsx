import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
       navigate("/profile");

        return;
      }

      setUser(u);
      const snap = await getDoc(doc(db, "users", u.uid));
      if (snap.exists()) {
        const data = snap.data();
        setFullName(data.fullName || "");
        setAge(data.age || "");
        setGender(data.gender || "");
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleSave = async () => {
    if (!age || !gender) {
      setError("Please fill all required fields");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateDoc(doc(db, "users", user.uid), {
        fullName,
        age: Number(age),
        gender,
      });
      navigate("/profile");

    } catch {
      setError("Failed to update profile");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-sm text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-6">
        <button
          onClick={() => (window.location.href = "/profile")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <FaArrowLeft />
          Back
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">
          Edit Profile
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Your age"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {error && (
            <div className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className={`w-full py-2 rounded-lg text-sm font-semibold transition ${
              saving
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-pink-500 text-white hover:bg-pink-600"
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
