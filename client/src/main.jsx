import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SelectedContextProvider from "./contexts/SelectedContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <SelectedContextProvider>
    <App />
  </SelectedContextProvider>
);
