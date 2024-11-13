import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home';
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';
import Feeds from './components/Feeds';
import Profile from './components/Profile';
function App(){
  return (
      <RouterProvider router={appRouter}/>    
  ) 
}

export default App;


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/chat",
    element:<Chat/>
  },
  {
    path:"/feeds",
    element:<Feeds/>
  },
  {
    path:"/profile",
    element:<Profile/>
  }
])