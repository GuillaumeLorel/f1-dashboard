"use client";

import { createContext, useContext, useState } from "react";

const SeasonContext = createContext();

export const useSeason = () => {
  return useContext(SeasonContext);
};

export const SeasonProvider = ({ children }) => {
  const [season, setSeason] = useState("");

  return (
    <SeasonContext.Provider value={{ season, setSeason }}>
      {children}
    </SeasonContext.Provider>
  );
};
