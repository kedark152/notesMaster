import { LandingPage } from "../pages/LandingPage";
import { Home } from "../pages/Home";
import Mockman from "mockman-js";
import {Routes, Route} from "react-router-dom";

export const PageRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/mock" element={<Mockman />}/>
        </Routes>
    )
}
