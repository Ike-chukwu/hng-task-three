import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import SignIn from "./Components/SignIn/SignIn";
import Protected from "./Components/Protected/Protected";
import { useContext } from "react";
import { AuthContext } from "./context";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
        {user ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<SignIn />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
