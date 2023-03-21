import { useColorMode } from "@chakra-ui/react";

import React, { createContext,  useState } from "react";

export const MyContext = createContext();

export function MyContextProvider({ children }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [refresh, setRefresh] = useState(false);

  return (
    <MyContext.Provider
      value={{
        colorMode,
        toggleColorMode,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
