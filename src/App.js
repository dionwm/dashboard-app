import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Details from "./Pages/Details";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/run/:run_id" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
