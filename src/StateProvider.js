import React, { createContext, useReducer, useContext } from "react";

export const StateContext = createContext(); //preparing data layer, context is where data layer actually lives

//higher order component, children going to be the App later
export const StateProvider = ({ reducer, initialState, children }) => (
  //   allow to set up data layer
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext); //pull information from data layer
