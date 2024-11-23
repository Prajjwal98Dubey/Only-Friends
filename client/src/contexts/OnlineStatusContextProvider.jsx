/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { OnlineStatusContext } from "./OnlineStatusContext";
import { io } from "socket.io-client";
import { CHECK_ONLINE_STATUS, MY_DETAILS } from "../backendapi";

function OnlineStatusContextProvider({ children }) {
  const socket = useRef(null);
  const [onlineCount, setOnlineCount] = useState(0);
  useEffect(() => {
    const connectOnlineStatus = async () => {
      await fetch(MY_DETAILS, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((results) => {
          if (results.message) {
            throw new Error("not logged in.");
          } else {
            socket.current = io(CHECK_ONLINE_STATUS);
            socket.current.emit("details", {
              userName: JSON.parse(localStorage.getItem("of-auth")).userName,
            });
            socket.current.on("online_count", (payload) => {
              setOnlineCount(payload.count);
            });
          }
        })
        .catch((err) => console.log(err));
    };
    const handleBeforeUnLoad = () => {
      console.log("user is being disconnected");
      if (socket.current) {
        socket.current.emit("early_disconnect", {
          userName: JSON.parse(localStorage.getItem("of-auth")).userName,
        });
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnLoad);
    connectOnlineStatus();
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnLoad);
    };
  }, []);
  return (
    <OnlineStatusContext.Provider value={{ onlineCount, setOnlineCount }}>
      {children}
    </OnlineStatusContext.Provider>
  );
}
export default OnlineStatusContextProvider;
