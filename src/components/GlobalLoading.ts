import { createContext, useContext } from "react";

export const GlobalLoadingContext = createContext<{
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  loading: false,
  setLoading: () => {},
});

export function useGlobalLoading(): [boolean, (loading: boolean) => void] {
  const { loading, setLoading } = useContext(GlobalLoadingContext);
  return [loading, setLoading];
}
