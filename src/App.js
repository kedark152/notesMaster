import "./styles/layouts/scrollbar.css";
import "react-toastify/dist/ReactToastify.min.css";

import { PageRoutes } from "./routes/PageRoutes";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      <PageRoutes />
    </div>
  );
}

export default App;
