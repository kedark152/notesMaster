import { LandingPage } from "../pages/LandingPage";
import { Home } from "../pages/Home";
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import { LabelsPage } from "../pages/LabelsPage";
import { ArchivePage } from "../pages/ArchivePage";
import { TrashPage } from "../pages/TrashPage";
import { ProfilePage } from "../pages/ProfilePage";

export const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/labels" element={<LabelsPage />} />
      <Route path="/archive" element={<ArchivePage />} />
      <Route path="/trash" element={<TrashPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/mock" element={<Mockman />} />
    </Routes>
  );
};
