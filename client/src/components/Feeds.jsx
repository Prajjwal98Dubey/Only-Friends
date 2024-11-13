import { useContext, useEffect } from "react"
import { SelectedContext } from "../contexts/SelectedContext"
import NavBar from "./NavBar"
import LeftSideBar from "./LeftSideBar"

const Feeds = () => {
    const{setSelected} = useContext(SelectedContext)
    useEffect(()=>{
        setSelected("/feeds")
    },[setSelected])
    return (
    <>
        <NavBar/>
        <LeftSideBar/>
    </>
  )
}

export default Feeds
