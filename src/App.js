import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import SignIn from "./Components/SignIn/SignIn";
import Protected from "./Components/Protected/Protected";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={
            <Protected>
              <SignIn />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

