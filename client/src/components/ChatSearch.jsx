import { useEffect, useState } from "react"
import { USERS_SEARCH } from "../backendapi"

const ChatSearch = () => {
    const[searchQuery,setSearchQuery] = useState("")
    const[searchResults,setSearchResults] = useState([])
    const[isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        const handleFindPeople  = async()=>{
            await fetch(USERS_SEARCH + `${searchQuery}`,{
                method:'GET'
            }).then((res)=>res.json()).then((data)=>{
                setSearchResults(data.results)
                setIsLoading(false)
            }).catch((err)=>console.log("CLIENT error while getting user search results",err))
        }
        if(searchQuery) handleFindPeople()
    },[searchQuery])
  return (
    <>
      <div className="w-full flex justify-center mt-[150px] mr-[40px]">
            <div>
              <input type="text" placeholder="find people ..."  autoFocus className="w-[600px] h-[45px] rounded-md border border-gray-500 shadow-md shadow-gray-400 font-doto text-xl font-bold  p-1" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
              {!isLoading && 
                <div className="w-[600px] h-fit p-1 mt-1 rounded-md shadow-md shadow-gray-400">
                    {searchResults.map((item,index)=>(
                        <div key={index} className="w-full h-[40px] font-bold text-xl font-doto cursor-pointer rounded-md flex justify-center items-center hover:bg-purple-400">
                                {item.user_name}
                        </div>
                    ))}
                </div>
                }
            </div>
      </div>
    </>
  )
}

export default ChatSearch
