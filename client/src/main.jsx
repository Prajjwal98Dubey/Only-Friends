import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SelectedContextProvider from "./contexts/SelectedContextProvider.jsx";
import FilterContextProvider from "./contexts/FIlterContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <SelectedContextProvider>
    <FilterContextProvider>
      <App />
    </FilterContextProvider>
  </SelectedContextProvider>
);
