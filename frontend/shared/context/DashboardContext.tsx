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
import {
  getAllItems,
  getAllUsers,
  getAllWorlds,
} from "@/services/apiServicesAdmin";
import { ItemData, UsersData } from "../types/commonTypes";

interface DashboardContextType {
  listUsers: UsersData[];
  setListUsers: React.Dispatch<React.SetStateAction<UsersData[]>>;
  listItems: any[];
  setListItems: React.Dispatch<React.SetStateAction<ItemData[]>>;
}
const AppContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [listUsers, setListUsers] = useState<UsersData[]>([]);
  const [listItems, setListItems] = useState<ItemData[]>([]);

  const isLoadingGlobal = useSelector(
    (state: RootState) => state.loading.global
  );

  const fetchListUsers = useCallback(async () => {
    try {
      const response = await getAllUsers();
      console.log("response users:", response);
      if (response.status === 200) {
        const usersList = response.data.data.map((item: any) => ({
          id: item.id,
          username: item.username,
          email: item.email,
          role: item.role,
          createdAt: item.created_at,
          status: item.status,
        }));

        setListUsers([...usersList]);
      }
    } catch (error) {
      console.log("error users:", error);
    }
  }, []);

  const fetchListItems = useCallback(async () => {
    try {
      const res = await getAllItems();
      console.log("list items", res);
      if (res.status === 200) {
        const questsList = res.data.data.map((item: any) => ({
          itemID: item.itemId,
          createTime: item.createTime,
          description: item.description,
          name: item.name,
          type: item.type,
          attributes: {
            attackSpeed: item.attributes.attackSpeed,
            damage: item.attributes.damage,
            health: item.attributes.health,
            crit: item.attributes.crit,
            intelligence: item.attributes.intelligence,
            resistance: item.attributes.resistance,
            runSpeed: item.attributes.runSpeed,
          },
          usingTime: item.usingTime,
        }));
        setListItems([...questsList]);
      }
    } catch (error) {
      console.log("error quests:", error);
    }
  }, []);

  useEffect(() => {
    fetchListUsers();
    fetchListItems();
  }, []);

  return (
    <AppContext.Provider
      value={{ listUsers, setListUsers, listItems, setListItems }}
    >
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
