import { postListManagerConfig } from "@/services/apiServices";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchAllData } from "@/ultis/fetchAllDataPageManager";
import { useAppContext } from "./ContextApp";
import { setListPageManager } from "../redux/list/listSlice";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/ultis/localstoragePageManager";
import { diff } from "deep-diff";

interface PageManagerContextProps {}

const PageManagerContext = createContext<PageManagerContextProps | undefined>(
  undefined
);

export const PageManagerProvider = ({ children }: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state: RootState) => state.auth);

  const context = useAppContext();

  const { listFbPageManager } = context;

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!user?.userId) return;
        let listPage = loadFromLocalStorage("listPage") || [];
        dispatch(setListPageManager(listPage));

        if (listFbPageManager && listFbPageManager.length > 0) {
          const res = await postListManagerConfig(
            user?.userId.toString(),
            listFbPageManager
          );
          if (res.data.status === 200) {
            const apiListPage = res.data.data.map((item: any) => ({
              facebook: item.username,
              page: item.page_name,
              facebookID: item.id,
              pageID: item.page_id,
              file: item.files.map((file: any) => ({
                collectionName: file.collection_name,
                fileName: file.file_name,
              })),
              config: item.config_id,
              actionType: item.action,
              key: item.id,
              subscribed: {
                comments: item.subscribed.comments,
                messages: item.subscribed.messages,
              },
            }));
            const differences = diff(apiListPage, listPage);
            if (differences) {
              saveToLocalStorage("listPage", apiListPage);
              dispatch(setListPageManager(apiListPage));
            }
          }
        }
        fetchAllData(user?.userId as number, dispatch);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch, user, listFbPageManager]);

  return (
    <PageManagerContext.Provider value={{}}>
      {children}
    </PageManagerContext.Provider>
  );
};

export const usePageManagerContext = () => {
  const context = useContext(PageManagerContext);
  if (!context) {
    throw new Error(
      "usePageManagerContext must be used within a PageManagerProvider"
    );
  }
  return context;
};
