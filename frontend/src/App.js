import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Routing from "./Routing";
import Layout from "./Components/Layout";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import Posts from "./Pages/Posts";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={
              <Routing>
                <Home />
              </Routing>
            }
          />
          <Route
            path="/posts"
            element={
              <Routing>
                <Posts />
              </Routing>
            }
          />
          <Route
            path="/profile"
            element={
              <Routing>
                <Profile />
              </Routing>
            }
          />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
