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
import { getAllUsers } from "@/services/apiServicesAdmin";
import { UsersData } from "../types/commonTypes";

interface DashboardContextType {
  listUsers: UsersData[];
  setListUsers: React.Dispatch<React.SetStateAction<UsersData[]>>;
}
const AppContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [listUsers, setListUsers] = useState<UsersData[]>([]);

  const { user, accessToken, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingGlobal = useSelector(
    (state: RootState) => state.loading.global
  );

  const fetchListUsers = useCallback(async () => {
    console.log(accessToken);

    try {
      const response = await getAllUsers();
      console.log("response users:", response);

      setListUsers(response.data);
    } catch (error) {
      console.log("error users:", error);
    }
  }, []);

  useEffect(() => {
    fetchListUsers();
  }, []);

  return (
    <AppContext.Provider value={{ listUsers, setListUsers }}>
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
export const useDashboardContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within a GlobalProvider");
  }
  return context;
};
