import React, { useState, useEffect } from "react";
import MyInput from "./MyInput";
import { SendDataApi } from "./DataApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const NameGamer = () => {
  const state = useSelector((state) => state.loginReduser);
  const [name, setTextName] = useState("");
  const [password, setPassword] = useState("");
  const [dataErr, setDataErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameGamerF = (e) => {
    setTextName(e.currentTarget.value);
  };
  const passGamerF = (e) => {
    setPassword(e.currentTarget.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SendDataApi(name, password));

    reset();
  };
  useEffect(() => {
    if (state.loading) {
      navigate("/game");
    } else if (state.res.length) {
      setDataErr(state.res[0].data.message);
    }
  }, [navigate, state]);

  const reset = () => {
    setTextName("");
    setPassword("");
  };
  return (
    <div className="regist-form">
      <form onSubmit={handleSubmit}>
        <MyInput
          value={name}
          onChange={nameGamerF}
          className="form-control mt-3"
          placeholder="name gamer"
        />

        <MyInput
          value={password}
          onChange={passGamerF}
          className="form-control mt-3"
          type="password"
          placeholder="password"
        />
        <br />
        <button className="buttonAdd" type="submit">
          Add name
        </button>
      </form>
      <div class="error-regist">{dataErr ? <p>{dataErr}</p> : <></>}</div>
    </div>
  );
};
export default NameGamer;
