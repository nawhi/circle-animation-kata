"use client";
import { Provider } from "react-redux";
import App from "../components/app";
import store from "../store/store";

export default function Page(): JSX.Element {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
