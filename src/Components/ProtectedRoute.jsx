import { Navigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(undefined); 

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsub();
  }, []);

  
  if (user === undefined) {
    return null; 
  }


  if (!user) {
    return <Navigate to="/login" replace />;
  }


  return children;
};

export default ProtectedRoute;
