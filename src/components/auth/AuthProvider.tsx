"use client";

import React, { createContext, useContext } from "react";

// Dummy user context for now
const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Ici, on pourrait ajouter la logique d'authentification Supabase plus tard
  const user = null;
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
