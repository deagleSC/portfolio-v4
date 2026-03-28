"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import SplashScreen from "@/components/SplashScreen";

const PageRevealContext = createContext(false);

export function PageRevealProvider({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <PageRevealContext.Provider value={revealed}>
      <SplashScreen onDismiss={() => setRevealed(true)} />
      {children}
    </PageRevealContext.Provider>
  );
}

export function usePageReveal() {
  return useContext(PageRevealContext);
}
