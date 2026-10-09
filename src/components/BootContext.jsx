"use client";

import { createContext, useContext } from "react";

/** true once the stored token (if any) has been verified by `loadUser`. */
const BootContext = createContext(false);
export const BootProvider = BootContext.Provider;
export const useBooted = () => useContext(BootContext);
