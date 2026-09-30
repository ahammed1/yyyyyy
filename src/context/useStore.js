import { useContext } from "react";
import { StoreContext } from "./StoreContext.js";

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
