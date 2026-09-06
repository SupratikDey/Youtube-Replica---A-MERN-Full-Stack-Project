import Header from "./Components/Header.jsx"; // default export
import{ createBrowserRouter, routerProvider} from "react-router-dom";

import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx"; // taking in login page
//createbroswer router takes an array of paths along with .jsx files accordingly
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home />
  },
  {
    path:"/login",
    element:<Login />
  }
])

function App(){
  return(
    <div>
      <Header />
      <routerProvider router={router} />     
      
    </div>
  )
}

export default App;