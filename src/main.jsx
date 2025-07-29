import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);
