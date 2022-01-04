import Admin from './components/Admin/Admin';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Orders from './components/Orders/Orders';
import Login from './components/Login/Login';
import NotMatch from './components/NotMatch/NotMatch';
import AddProduct from './components/AddProduct/AddProduct';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/orders" element={<Login />} />
        {/* <Route path="/addProduct" element={<AddProduct />} /> */}
        <Route path="/*" element={<NotMatch />} />
        </Routes>
    </div>
  );
}

export default App;
