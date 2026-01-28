import { Navigate, useLocation } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    let unsubUserDoc = null;

    const unsubAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setUserData(null);
        return;
      }

      setUser(firebaseUser);

      unsubUserDoc = onSnapshot(doc(db, "users", firebaseUser.uid), (snap) => {
        setUserData(snap.exists() ? snap.data() : {});
      });
    });

    return () => {
      unsubAuth();
      if (unsubUserDoc) unsubUserDoc();
    };
  }, []);

  if (user === undefined || userData === undefined) return null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!userData.onboardingCompleted && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  if (userData.onboardingCompleted && location.pathname === "/onboarding") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
