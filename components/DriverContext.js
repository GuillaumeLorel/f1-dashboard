"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const DriverContext = createContext();

export const useDrivers = () => {
  return useContext(DriverContext);
};

export const DriverProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);

  const value = {
    drivers,
    setDrivers,
  };

  return (
    <DriverContext.Provider value={value}>{children}</DriverContext.Provider>
  );
};
