import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import WorkSnake from "./WorkSnake";
import NameGamer from "./NameGamer";

const AppRoute = () => {
  const state = useSelector((state) => state.loginReduser);
  // console.log(state);
  return (
    <Routes>
      <Route path="/" element={<NameGamer />} exact />
      {state.loading && <Route path="/game" element={<WorkSnake />} exact />}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRoute;
