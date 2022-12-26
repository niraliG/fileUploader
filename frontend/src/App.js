import { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(()=>{
    setIsLoggedIn(localStorage.getItem("googleId"))
  },[])
  return <div>{isLoggedIn ? <Home /> : <Login onLogin={()=>{setIsLoggedIn(true)}}/>}</div>;
}

export default App;
