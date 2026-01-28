import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaSignOutAlt,
  FaEnvelope,
  FaBirthdayCake,
  FaVenusMars,
} from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setProfile(snap.data());
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-500 text-center">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6 text-sm text-gray-500 text-center">
        Profile not found
      </div>
    );
  }

  const isIncomplete = !profile.age || !profile.gender;

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-6">
        <div className="flex flex-col items-center text-center">
          <FaUserCircle className="text-pink-500 text-6xl mb-3" />

          <h2 className="text-lg font-semibold text-gray-900">
            {profile.fullName || "Unnamed User"}
          </h2>

          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <FaEnvelope className="text-xs" />
            {profile.email}
          </p>

          {isIncomplete && (
            <span className="mt-3 text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
              Profile incomplete
            </span>
          )}
        </div>

        <div className="mt-6 space-y-4 text-sm">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3 text-gray-600">
              <FaBirthdayCake />
              <span>Age</span>
            </div>
            <span className="font-medium text-gray-900">
              {profile.age ? profile.age : "Not added"}
            </span>
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3 text-gray-600">
              <FaVenusMars />
              <span>Gender</span>
            </div>
            <span className="font-medium capitalize text-gray-900">
              {profile.gender ? profile.gender : "Not added"}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate("/profile/edit")}
            className="w-full bg-pink-500 text-white text-sm py-2 rounded-lg
             hover:bg-pink-600 transition"
          >
            {isIncomplete ? "Complete Profile" : "Edit Profile"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2
                       text-sm text-red-600 border border-red-200 rounded-lg py-2
                       hover:bg-red-50 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
