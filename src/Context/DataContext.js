import React, { createContext, useState } from 'react';

// Create context
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [Data, setData] = useState([]);

  return (
    <DataContext.Provider value={{ Data, setData }}>
      {children}
    </DataContext.Provider>
  );
};