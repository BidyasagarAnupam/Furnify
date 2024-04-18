import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/common/NavBar';
import OpenRoute from './components/Auth/OpenRoute';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import Dashboard from './pages/Dashboard';
import Account from './components/Dashboard/Account';
import Address from './components/Dashboard/Address';
import MyOrders from './components/Dashboard/Customer/Order/MyOrders';
import AddProduct from './components/Dashboard/Merchant/AddProduct';
import MyProducts from './components/Dashboard/Merchant/MyProduct';
import Settings from './components/Dashboard/Settings';
import Wishlist from './components/Dashboard/Customer/Wishlist';
import Merchant from './components/Dashboard/Merchant/Merchant';
import EditProduct from './components/Dashboard/Merchant/EditProduct';
import PrivateRoute from './components/Auth/PrivateRoute';
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';
import 'react-image-crop/dist/ReactCrop.css'
import Error404 from './components/common/Error404';
import AllProducts from './pages/AllProducts';
import ProductDetails from './pages/ProductDetails';
import Cart from './components/Dashboard/Customer/Cart';
import ContactUs from './pages/ContactUs';
import AdminDashboard from './components/Dashboard/Admin/AdminDashboard';


function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="overflow-hidden w-screen min-h-screen flex flex-col font-inter">
      <NavBar />
      <Routes>
        <Route path="/" element={(user?.accountType === "Merchant" || user?.accountType === "Admin") ? <Navigate to="/dashboard/account" /> : <Home />} />
        <Route path="/product/:id" element={(user?.accountType === "Merchant" || user?.accountType === "Admin") ? <Navigate to="/dashboard/account" /> : <ProductDetails />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        {/* Private Route - for Only Logged in User */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Route for all users */}
          <Route path="/dashboard/account" element={<Account />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          {/* Route only for Customers */}
          {user?.accountType === ACCOUNT_TYPE.CUSTOMER && (
            <>
              <Route path="/dashboard/my-orders" element={<MyOrders />} />
              <Route path="/dashboard/wishlist" element={<Wishlist />} />
              <Route path="/dashboard/cart" element={<Cart />} />
              <Route path="/dashboard/address" element={<Address />} />

            </>
          )}

          {/* Route only for Merchant */}
          {user?.accountType === ACCOUNT_TYPE.MERCHANT && (
            <>
              <Route
                path="/dashboard/merchant"
                element={<Merchant />}
              />
              <Route
                path="/dashboard/myProducts"
                element={<MyProducts />}
              />
              <Route
                path="/dashboard/addProduct"
                element={<AddProduct />}
              />
              <Route
                path="/dashboard/edit-product/:productId"
                element={<EditProduct />}
              />
              <Route path="/dashboard/address" element={<Address />} />
            </>
          )}

          {/* Route only for Admin */}
          {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path="/dashboard/adminDashboard" element={<AdminDashboard />} />
            </>
          )}

        </Route>

        <Route path='/allProducts/:categoryId?/:subCategoryId?' element={(user?.accountType === "Merchant" || user?.accountType === "Admin") ? <Navigate to="/dashboard/account" /> : <AllProducts />} />
        <Route path='/contact' element={(user?.accountType === "Admin") ? <Navigate to="/dashboard/account" /> : <ContactUs />} />

        <Route path='*' element={<Error404 />} />
      </Routes>

    </div>
  );
}

export default App;
