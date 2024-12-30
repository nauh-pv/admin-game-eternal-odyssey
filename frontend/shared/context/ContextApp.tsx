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
import { getFileUpload, getListPage } from "@/services/apiServices";
import { LoadingComponent } from "@/components/Loading";
import { fetchTotalBalance } from "../redux/payment/paymentSlice";
import { setLoading } from "../redux/loading/loadingSlice";
import { message } from "antd";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/ultis/localstoragePageManager";
import { diff } from "deep-diff";

interface AppContextType {
  accessTokenFB: string;
  usename: string;
  handleConnectFacebook: () => void;
  listAccountFB: any[];
  pathName: string;
  setPathName: any;
  listFile: any[];
  setListFile: any;
  listFbPageManager: any[];
}
const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

interface MessageEventData {
  access_token?: string;
  error?: string;
}

interface listFileNew {
  fileName: string;
  dateModified: string;
  category: string;
  size: string;
  collectionName: string;
  key: number;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [usename, setUsername] = useState<string>("");
  const [accessTokenFB, setAccessTokenFB] = useState<string>("");
  const [listAccountFB, setListAccountFB] = useState<any[]>([]);
  const [pathName, setPathName] = useState<string>("");
  const [listFile, setListFile] = useState<listFileNew[]>([]);
  const [listFbPageManager, setListPageManager] = useState<any[]>([]);

  const { user, accessToken, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingGlobal = useSelector(
    (state: RootState) => state.loading.global
  );

  let authWindow: Window | null = null;

  const handleConnectFacebook = useCallback(() => {
    const fbAuthURL = `https://www.facebook.com/v20.0/dialog/oauth?client_id=1054545482977612&redirect_uri=https://social-media-bot.mekongai.com/api/v1/facebook/connect&client_secret=7b985a0d06456e7fb38205681d21d991&scope=pages_show_list,pages_messaging,public_profile,pages_manage_metadata&response_type=code&state=${user?.userId}`;
    authWindow = window.open(fbAuthURL, "fbAuthWindow", "width=600,height=700");
    if (!authWindow) {
      console.log("Popup bị chặn! Vui lòng cho phép popup để tiếp tục.");
    }
  }, [user]);

  const fetchListPage = useCallback(async () => {
    dispatch(setLoading({ key: "listPage", value: true }));
    try {
      const res = await getListPage();
      if (res.data.status === 200 && res.data.data) {
        setListPageManager(res.data.data);
        await handleConvertData(res.data?.data);
      }
      dispatch(setLoading({ key: "listPage", value: false }));
    } catch (e) {
      console.log(e);
      dispatch(setLoading({ key: "listPage", value: false }));
    }
  }, [isAuthenticated, accessToken, dispatch]);

  const handleConvertData = (listFB: any[]) => {
    setListAccountFB(() => {
      let list: any[] = [];
      listFB.map((item) => {
        const childrens =
          item.page_data && item.page_data.length > 0
            ? item.page_data.map((page: any, index: number) => ({
                title: page.page_name,
                value: page.page_id,
                key: page.page_id,
                accessToken: page.page_access_token,
              }))
            : [];

        list.push({
          title: item.name_fb,
          value: item.id_user_fb,
          accessToken: item.access_token_user,
          key: item.id_user_fb,
          children: childrens,
        });
      });
      return list;
    });
  };

  const handleFetchTotalBalance = useCallback(async () => {
    if (user?.userId) {
      const res = await dispatch(
        fetchTotalBalance({ user_id: user?.userId as number })
      );
    }
  }, [dispatch, user]);

  const addDataToListFile = (list: any[], listLocal: any[]) => {
    const listFileNew: listFileNew[] = list.map((itemList, index) => ({
      key: index + 1,
      fileName: itemList.file_name,
      collectionName: itemList.collection_name,
      dateModified: "",
      category: "Docx",
      size: "10kB",
    }));
    const checkSame = diff(listFileNew, listLocal);
    if (checkSame) {
      setListFile(listFileNew);
      saveToLocalStorage("listFiles", listFileNew);
    }
  };

  const fetchListFileUserUpload = async () => {
    let listFiles = loadFromLocalStorage("listFiles") || [];
    if (listFiles.length > 0) {
      setListFile(listFiles);
    }
    try {
      const res = await getFileUpload(`${user?.userId}`);
      if (res.data.status === 200) {
        addDataToListFile(res.data.data, listFiles);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent<MessageEventData>) => {
      if (event.origin === "https://social-media-bot.mekongai.com") {
        if (event.data && event.data.access_token) {
          message.success("Kết nối thành công!");
          setAccessTokenFB(event.data.access_token);
          if (authWindow) authWindow.close();
        } else if (event.data && event.data.error) {
          console.log("Error: " + event.data.error);
          if (authWindow) authWindow.close();
        } else {
          console.log("Lỗi: Không nhận được mã code hoặc access_token.");
        }
      }
    };

    window.addEventListener("message", handleMessage, false);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    console.log("Check user:", user);
    if (isAuthenticated && accessToken) {
      fetchListPage();
      handleFetchTotalBalance();
      fetchListFileUserUpload();
    }
  }, [isAuthenticated, accessToken, handleFetchTotalBalance]);

  return (
    <AppContext.Provider
      value={{
        accessTokenFB,
        usename,
        handleConnectFacebook,
        listAccountFB,
        pathName,
        setPathName,
        listFile,
        setListFile,
        listFbPageManager,
      }}
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
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a GlobalProvider");
  }
  return context;
};
