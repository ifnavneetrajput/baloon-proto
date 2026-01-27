import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleSignup = async () => {
    setError("");

    if (!fullName || !email || !password || !age || !gender) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Save name in Auth profile
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      // Save extra data in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName,
        email,
        age: Number(age),
        gender,
        createdAt: new Date(),
      });

      navigate("/home");
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-6">
        <h1 className="text-lg font-medium text-center mb-6">Create Account</h1>

        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full py-2 rounded-full text-sm font-medium text-white transition ${
            loading
              ? "bg-pink-300 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
