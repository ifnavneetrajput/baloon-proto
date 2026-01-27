import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
    window.location.href = "/login";
  };

  if (loading) {
    return <div className="p-4 text-sm text-gray-500">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="p-4 text-sm text-gray-500">Profile not found</div>;
  }

  return (
    <div className="p-4 border-t">
      <h3 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
        <FaUserCircle className="text-pink-500 text-lg" />
        Profile
      </h3>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="text-gray-500">Name</span>
          <span className="font-medium">{profile.fullName || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Email</span>
          <span className="font-medium">{profile.email || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Age</span>
          <span className="font-medium">{profile.age ?? "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Gender</span>
          <span className="font-medium capitalize">
            {profile.gender || "-"}
          </span>
        </div>
      </div>

      <button
        disabled
        className="mt-4 w-full text-sm border border-gray-300 rounded-md py-1.5 text-gray-400 cursor-not-allowed"
      >
        Edit Profile (Coming Soon)
      </button>

      <button
        onClick={handleLogout}
        className="mt-2 w-full flex items-center justify-center gap-2 text-sm text-red-600 border border-red-200 rounded-md py-1.5 hover:bg-red-50 transition"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default Profile;
