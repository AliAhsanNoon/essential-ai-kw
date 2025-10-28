"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalContextType {
  globalString: string;
  setGlobalString: (value: string) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);


export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [globalString, setGlobalString] = useState<string>("");

  return (
    <GlobalContext.Provider value={{ globalString, setGlobalString }}>
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
