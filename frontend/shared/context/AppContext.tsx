import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { LoadingComponent } from "@/components/Loading";

interface AppContextType {}
const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const { user, accessToken, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingGlobal = useSelector(
    (state: RootState) => state.loading.global
  );

  useEffect(() => {}, []);

  return (
    <AppContext.Provider value={{}}>
      {isLoadingGlobal ? (
        <div className="w-[100%] h-[100vh]">
          <LoadingComponent />
        </div>
      ) : (
        children
      )}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a GlobalProvider");
  }
  return context;
};
