import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import { Footer } from "./Components/Footer/Footer";
import { HomePage } from "./Components/HomePage/HomePage";
import { AllProducts } from "./Components/AllProducts/AllProducts";
import { ProductsByCategory } from "./Components/ProductsByCategory/ProductsByCategory";
import { DetailProduct } from "./Components/DetailProduct/DetailProduct";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";
import { UserContext } from "./Context/Context";
import useLocalStorage from "./Hooks/useLocalStorige";
import { Profile } from "./Components/Profile/Profile";
import { ShoppingBag } from "./Components/ShoppingBag/ShoppingBag";
import { CountProvider } from "./Context/Context";



function App() {
  const [loggedInUser, setLoggedInUser] = useLocalStorage(null, "token");


  const login = (userData) => {
    const { token } = userData;
    setLoggedInUser(token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ loggedInUser, login, logout }}>
      <CountProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<DetailProduct/>} />
          <Route path="/all/:filterByGender" element={<ProductsByCategory />} />
          <Route path="/shoppingBag" element={<ShoppingBag/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </CountProvider>
    </UserContext.Provider>
  );
}

export default App;
