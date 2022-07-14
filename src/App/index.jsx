import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../common/Home";
import Questions from "../component/Questions";

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/questions' element={<Questions />} />
    </Routes>
  );
};

export default App;
