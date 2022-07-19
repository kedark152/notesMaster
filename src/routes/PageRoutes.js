import { LandingPage } from "../pages/LandingPage";
import { Home } from "../pages/Home";
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import { LabelsPage } from "../pages/LabelsPage";
import { ArchivePage } from "../pages/ArchivePage";
import { TrashPage } from "../pages/TrashPage";
import { ProfilePage } from "../pages/ProfilePage";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { RequiresAuth } from "./RequiresAuth";
import { ErrorPage } from "../pages/ErrorPage";

export const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mock" element={<Mockman />} />
      <Route path="*" element={<ErrorPage />} />

      <Route element={<RequiresAuth />}>
        <Route path="/home" element={<Home />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/trash" element={<TrashPage />} />
        <Route path="/label/:labelName" element={<LabelsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};
