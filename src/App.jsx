import { BrowserRouter, Routes, Route } from "react-router-dom";

import UploadPage from "./pages/UploadVideo";
import VideosPage from "./pages/Videos";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/upload" element={<UploadPage />}/>

        <Route path="/videos" element={<VideosPage />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;