import UserContext from "./useContext";
import { useState, useReducer } from "react";

const instalState = {
  storeData: null,
};
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "store":
      return { ...state, storeData: action.payload };
    default:
      return state;
  }
};

const UseState = (props: any) => {
  const [appState, dispatch] = useReducer(reducer, instalState);

  return (
    <UserContext.Provider value={{ appState, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UseState;
