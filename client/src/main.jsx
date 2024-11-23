import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SelectedContextProvider from "./contexts/SelectedContextProvider.jsx";
import FilterContextProvider from "./contexts/FIlterContextProvider.jsx";
import OnlineStatusContextProvider from "./contexts/OnlineStatusContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <OnlineStatusContextProvider>
    <SelectedContextProvider>
      <FilterContextProvider>
        <App />
      </FilterContextProvider>
    </SelectedContextProvider>
  </OnlineStatusContextProvider>
);
