import React, { createContext, useState } from 'react';
import Admin from './components/Admin/Admin';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Orders from './components/Orders/Orders';
import Login from './components/Login/Login';
import NotMatch from './components/NotMatch/NotMatch';
import CheckOut from './components/CheckOut/CheckOut';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PrivetRoute from './components/PrivetRoute/PrivetRoute';

export const loginContext = createContext();

function App() {
  const user = { name: "", email: "", img: "", }
  const [loggedInUser, setLoggedInUser] = useState(user)
  console.log(loggedInUser)
  return (
    <div>
      <loginContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkOut/:id" element={<PrivetRoute><CheckOut /></PrivetRoute>} />
          <Route path="/orders" element={<PrivetRoute><Orders /></PrivetRoute>} />
          <Route path="/admin" element={<PrivetRoute><Admin /></PrivetRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotMatch />} />
        </Routes>
      </loginContext.Provider>
    </div>
  );
}

export default App;
