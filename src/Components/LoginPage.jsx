import React, { useState,useEffect } from "react";
import Frame108 from "../assets/Frame_108.svg";
import GoogleLogo from "../assets/GoogleLogo.svg";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "../assets/login-animation.json";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/too-many-requests":
        return "Too many attempts. Try again later.";
      case "auth/popup-closed-by-user":
        return "Google login was cancelled.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

const handleLogin = async () => {
  setError("");

  if (!email || !password) {
    setError("Email and password are required.");
    return;
  }

  try {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/home"); 
  } catch (err) {
    setError(getErrorMessage(err.code));
  } finally {
    setLoading(false);
  }
};

const handleGoogleLogin = async () => {
  setError("");

  try {
    setLoading(true);
    await signInWithPopup(auth, googleProvider);
    navigate("/home"); 
  } catch (err) {
    setError(getErrorMessage(err.code));
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
   
    document.body.style.overflow = "hidden";

    return () => {

      document.body.style.overflow = "auto";
    };
  }, []);

return (
  <div className="h-screen overflow-hidden bg-white">
    <div className="fixed inset-0 z-0 pointer-events-none hidden md:block">
      <Lottie
        animationData={loginAnimation}
        loop={!loading}
        autoplay
        renderer="svg"
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        className="absolute left-[6%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] xl:left-[8%] xl:w-[560px] xl:h-[560px]"
      />
    </div>

    <div className="relative z-10 flex h-full w-full items-center">
      <div className="flex w-full h-full">
        <div className="hidden md:block w-1/2" />

        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md px-6">
            <h1 className="text-lg font-medium text-center mb-6">Log In</h1>

            {error && (
              <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full py-2 rounded-full text-white ${
                loading
                  ? "bg-pink-300 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <p className="text-sm text-center mt-4">
              New to app?{" "}
              <Link to="/signup" className="text-pink-600 font-medium">
                Sign up
              </Link>
            </p>

            <div className="flex items-center my-6 text-xs text-gray-400">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="px-3">Or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="flex justify-center">
              <img
                src={GoogleLogo}
                alt="Google"
                onClick={handleGoogleLogin}
                className={`h-6 cursor-pointer ${
                  loading ? "opacity-50 pointer-events-none" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default LoginPage;
