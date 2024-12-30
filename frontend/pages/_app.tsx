import "antd/dist/reset.css";
import "../styles/globals.scss";
import "@/styles/index.css";
import { AppProvider } from "@/shared/context/ContextApp";
import { Provider } from "react-redux";
import store, { persistor } from "@/shared/redux/store";
import AuthInitializer from "@/components/AuthInitializer";
import LayoutWrapper from "@/shared/layout-components/LayoutWrapper";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppProvider>
          <LayoutWrapper layout={Component.layout}>
            <AuthInitializer />
            <Component {...pageProps} />
          </LayoutWrapper>
        </AppProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
