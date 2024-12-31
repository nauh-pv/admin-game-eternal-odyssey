import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "@/shared/redux/store";
import Header from "../header/header";
import Switcher from "../switcher/switcher";
import Backtotop from "../backtotop/backtotop";
import { ThemeChanger } from "@/shared/redux/action";
import { useRouter } from "next/router";
import { DashboardProvider } from "@/shared/context/DashboardContext";

const ContentLayout = ({ children }: any) => {
  const [lateLoad, setlateLoad] = useState(false);

  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const Add = () => {
    document.querySelector("body")?.classList.remove("error-1");
    document.querySelector("body")?.classList.remove("landing-body");
  };

  useEffect(() => {
    ThemeChanger({
      class: "light",
    });
  });

  useEffect(() => {
    Add();
    setlateLoad(true);
  });

  useEffect(() => {
    import("preline");
  }, []);

  const [MyclassName, setMyClass] = useState("");
  const Bodyclickk = () => {
    const theme = store.getState().main;
    if (localStorage.getItem("ynexverticalstyles") == "icontext") {
      setMyClass("");
    }
    if (window.innerWidth > 992) {
      let html = document.documentElement;
      if (html.getAttribute("icon-overlay") === "open") {
        html.setAttribute("icon-overlay", "");
      }
    }
  };

  // useEffect(() => {
  //   console.log("Check layout", user?.role, user);

  //   if (!isAuthenticated || user?.role !== "admin") {
  //     router.replace("/");
  //   }
  // }, [isAuthenticated, user?.role]);

  // if (!isAuthenticated || user?.role !== "admin") {
  //   return null;
  // }

  return (
    <Fragment>
      <Provider store={store}>
        <DashboardProvider>
          <div style={{ display: `${lateLoad ? "block" : "none"}` }}>
            <Switcher />
            <div className="page">
              <Header />
              <Sidebar />
              <div className="content">
                <div className="main-content" onClick={Bodyclickk}>
                  {children}
                </div>
              </div>
            </div>
            <Backtotop />
          </div>
        </DashboardProvider>
      </Provider>
    </Fragment>
  );
};

export default ContentLayout;
