import "@/styles/global.css";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@redux/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
