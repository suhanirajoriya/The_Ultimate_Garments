
import Dashboard from "./Components/Adminstrators/Dashboard";
import AdminLogin from "./Components/Adminstrators/AdminLogin";
import Home from "./Components/UserInterface/Home";
import DisplayAllBanner from "./Components/Adminstrators/DisplayAllBanner";
import Footer from "./Components/UserInterface/UserComponents/Footer";
import ProductList from "./Components/UserInterface/ProductList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FilterComponent from "./Components/UserInterface/UserComponents/FilterComponent";
import CheckOut from "./Components/UserInterface/CheckOut";
import Steppers from "./Components/UserInterface/UserComponents/Stepper";
import ProductInfo from "./Components/UserInterface/ProductInfo";
import SizeRadio from "./Components/UserInterface/UserComponents/SizeRadio";
function App() {



  return (

    <div >

      <Router>
        <Routes>
          <Route element={<Dashboard />} path="/dashboard/*" />
          <Route element={<AdminLogin />} path="/adminlogin" />
          <Route element={<Home />} path="/home" />
          <Route element={DisplayAllBanner} path="/displayallbanner" />
          <Route element={<ProductList />} path="/productlist/:id" />
          <Route element={<CheckOut />} path="/checkout" />
          <Route element={<Steppers />} path="/stepper" />
          <Route element={<ProductInfo />} path="/productinfo" />
        
        </Routes>
      </Router>

    </div>
  );
}

export default App;
