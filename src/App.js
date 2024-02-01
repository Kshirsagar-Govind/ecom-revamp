import Header from "./components/Header";
import "./global.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import ProductView from "./pages/ProductView";
import WishlistView from "./pages/WishlistView";
import CartView from "./pages/CartView";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RegistrationWrapper from "./pages/authView";
import BuyView from "./pages/buyView";
import MyAccount from "./pages/accountView";
import PurchasedListView from "./pages/purchasedlistView";
function App() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center relative">
      <ToastContainer />
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home/>} exact></Route>
          <Route path="/item-view-page/:id" element={<ProductView/>} exact></Route>
          <Route path='/wish-list' element={<WishlistView/>} exact></Route>
          <Route path='/cart-list' element={<CartView/>} exact></Route>
          <Route path='/purchased-history' element={<PurchasedListView/>} exact></Route>
          <Route path='/auth' element={<RegistrationWrapper/>} exact></Route>
          <Route path='/buy-now/:id' element={<BuyView/>} exact></Route>
          <Route path='/my-account' element={<MyAccount/>} exact></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
