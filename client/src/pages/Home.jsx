import { useContext } from "react";
import LeftSideBar from "../components/LeftSideBar";
import NavBar from "../components/NavBar";
import OnlineStatusComp from "../components/OnlineStatusComp";
import { OnlineStatusContext } from "../contexts/OnlineStatusContext";

const Home = () => {
  const { onlineCount } = useContext(OnlineStatusContext);

  return (
    <>
      <NavBar />
      <LeftSideBar />
      {onlineCount > 0 && <OnlineStatusComp onlineCount={onlineCount} />}
    </>
  );
};

export default Home;
