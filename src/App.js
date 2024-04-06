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
import MyOrders from './components/Dashboard/Customer/MyOrders';
import AddProduct from './components/Dashboard/Merchant/AddProduct';
import MyProducts from './components/Dashboard/Merchant/MyProduct';
import Settings from './components/Dashboard/Settings';
import Wishlist from './components/Dashboard/Customer/Wishlist';
import Merchant from './components/Dashboard/Merchant/Merchant';
import EditProduct from './components/Dashboard/Merchant/EditProduct';
import PrivateRoute from './components/Auth/PrivateRoute';
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';
import AddCategory from './components/Dashboard/Admin/Category/AddCategory'
import AllCategory from './components/Dashboard/Admin/Category/AllCategory'
import EditCategory from './components/Dashboard/Admin/Category/EditCategory'
import AddSubCategory from './components/Dashboard/Admin/SubCategory/AddSubCategory'
import AllSubCategory from './components/Dashboard/Admin/SubCategory/AllSubCategory'
import EditSubCategory from './components/Dashboard/Admin/SubCategory/EditSubCategory'
import AddBrand from './components/Dashboard/Admin/Brand/AddBrand'
import AllBrand from './components/Dashboard/Admin/Brand/AllBrand'
import EditBrand from './components/Dashboard/Admin/Brand/EditBrand'
import 'react-image-crop/dist/ReactCrop.css'
import Error404 from './components/common/Error404';
import AllProducts from './pages/AllProducts';


function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="overflow-hidden w-screen min-h-screen flex flex-col font-inter ">
      <NavBar />
      <Routes>
        <Route path="/" element={user?.accountType === "Merchant" ? <Navigate to="/dashboard/account" /> : <Home />} />
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
          <Route path="dashboard/account" element={<Account />} />
          <Route path="dashboard/settings" element={<Settings />} />
          <Route path="dashboard/address" element={<Address />} />

          {/* Route only for Customers */}
          {user?.accountType === ACCOUNT_TYPE.CUSTOMER && (
            <>
              <Route path="dashboard/my-orders" element={<MyOrders />} />
              <Route path="dashboard/wishlist" element={<Wishlist />} />
            </>
          )}

          {/* Route only for Merchant */}
          {user?.accountType === ACCOUNT_TYPE.MERCHANT && (
            <>
              <Route
                path="dashboard/merchant"
                element={<Merchant />}
              />
              <Route
                path="dashboard/myProducts"
                element={<MyProducts />}
              />
              <Route
                path="/dashboard/addProduct"
                element={<AddProduct />}
              />
              <Route
                path="dashboard/edit-product/:productId"
                element={<EditProduct />}
              />
            </>
          )}

          {/* Route only for Admin */}
          {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path="/dashboard/addcategory" element={<AddCategory />} />
              <Route path="/dashboard/mycategory" element={<AllCategory />} />
              <Route path="/dashboard/editcategory/:categoryId" element={<EditCategory />} />
              <Route path="/dashboard/addsubcategory" element={<AddSubCategory />} />
              <Route path="/dashboard/mysubcategory" element={<AllSubCategory />} />
              <Route path="/dashboard/editsubcategory/:subCategoryId" element={<EditSubCategory />} />
              <Route path="/dashboard/addbrand" element={<AddBrand />} />
              <Route path="/dashboard/allbrand" element={<AllBrand />} />
              <Route path="/dashboard/editBrand/:brandId" element={<EditBrand />} />

            </>
          )}

        </Route>

        <Route path='*' element={<Error404 />} />
        <Route path='/allProducts' element={<AllProducts />} />

      </Routes>

    </div>
  );
}

export default App;
