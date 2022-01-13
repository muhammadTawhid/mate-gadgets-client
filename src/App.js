import React, { createContext, useState } from 'react';
import Admin from './components/Admin/Admin';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Orders from './components/Orders/Orders';
import Login from './components/Login/Login';
import NotMatch from './components/NotMatch/NotMatch';

export const loginContext = createContext();

function App() {
  const user = {name:"", email:"", img:""}
  const [loggedInUser, setLoggedInUser] = useState(user)
  console.log(loggedInUser)
  return (
    <div>
      <loginContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotMatch />} />
        </Routes>
      </loginContext.Provider>
    </div>
  );
}

export default App;
