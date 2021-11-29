import React, { useEffect } from "react";
import "./app.css"
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/slices/userSlices";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Homepage from "./components/homepage/HomePage";
import Signup from "./components/login-signup/Signup";
import Signin from "./components/login-signup/Signin";
import Menu from "./components/Menu";

// setImg1(`./sprites-animations/${pokes.name}-front.gif`)
// {imgUrl1?<img src={require(`${imgUrl1}`).default}></img>:null}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchUser())
    }// eslint-disable-next-line
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/game" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
