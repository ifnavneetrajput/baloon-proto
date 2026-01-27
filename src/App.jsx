import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import Signup from "./Components/Signup";
import JourneyPage from "./Components/JourneyPage";
import YTPage from "./Components/YTPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import Body from "./Components/Body";
import PublicLayout from "./Components/PublicLayout";
import Home from "./Components/Home";
import Participate from "./Components/Participate";
import Profile from './Components/Profile';
import Questionaries from "./Components/Questionaries";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <Body />
            </ProtectedRoute>
          }
        >
          <Route path="/onboarding" element={<Questionaries />} />
          <Route path="/home" element={<Home />} />
          <Route path="/participate" element={<Participate />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/main" element={<YTPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
