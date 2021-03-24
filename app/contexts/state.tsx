import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const [text, setText] = useState('');

  const sharedState = {
    text: text,
    setText: (value) => {
      setText(value);
    },
  };

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
