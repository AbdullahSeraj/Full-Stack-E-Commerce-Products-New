import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import AdminPanel from "./pages/AdminPanel"
import CategoryProducts from "./pages/CategoryProducts";

import { useGetUserQuery } from "./redux/features/user/userApiSlice"
import Cookies from "js-cookie";

import AdminUsers from "./components/AdminPamel/AdminUsers"
import AdminProducts from "./components/AdminPamel/AdminProducts"
import UpdateAdmin from "./components/AdminPamel/UpdateAdmin"
import AddProduct from "./components/AdminPamel/AddProduct";
import UpdateProduct from "./components/AdminPamel/UpdateProduct";
import ProductDetails from "./pages/ProductDetails";
import { useEffect } from "react";
import Cart from "./pages/Cart";
import Search from "./pages/Search";

function App() {
  const location = useLocation();

  const accessToken = Cookies.get("accessToken")
  const { data: getUser } = useGetUserQuery()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  window.addEventListener("load", (e) => {
    window.scrollTo(0, 0)
  })

  return (
    <>
      <Navbar />
      <ToastContainer />
      <main className="bg-gray-50 mt-[60px]" style={{ minHeight: "calc(100vh - 110px)" }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={accessToken ? <Navigate to={"/"} replace /> : <Login />} />
          <Route path='/signup' element={accessToken ? <Navigate to={"/"} replace /> : <SignUp />} />
          <Route path='/admin-panel' element={accessToken && getUser?.role ? <AdminPanel /> : <Navigate to={"/"} replace />}>
            <Route path='/admin-panel' element={accessToken && getUser?.role ? <AdminUsers /> : <Navigate to={"/"} replace />} >
              <Route path="/admin-panel/:id" element={accessToken && getUser?.role ? <UpdateAdmin /> : <Navigate to={"/"} replace />} />
            </Route>
            <Route path="products" element={accessToken && getUser?.role ? <AdminProducts /> : <Navigate to={"/"} replace />} >
              <Route path="add" element={accessToken && getUser?.role ? <AddProduct /> : <Navigate to={"/"} replace />} />
              <Route path="update/:id" element={accessToken && getUser?.role ? <UpdateProduct /> : <Navigate to={"/"} replace />} />
            </Route>
          </Route>
          <Route path="/category" element={<CategoryProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
