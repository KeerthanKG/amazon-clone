import React, { createContext, useContext, useReducer } from "react";

// Prepares Data Layer
export const StateContext = createContext()

// Wraps entire app and provides data layer to each component
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pulls the information from the data layer
export const useStateValue = () => useContext(StateContext)