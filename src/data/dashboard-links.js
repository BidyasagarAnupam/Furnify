import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "Account",
    path: "/dashboard/account",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Address",
    path: "/dashboard/address",
    icon: "FaHome",
    type: ACCOUNT_TYPE.CUSTOMER || ACCOUNT_TYPE.MERCHANT,
  },
  {
    id: 3,
    name: "Orders",
    path: "/dashboard/my-orders",
    type: ACCOUNT_TYPE.CUSTOMER,
    icon: "VscTasklist",
  },
  {
    id: 4,
    name: "Wishlist",
    path: "/dashboard/wishlist",
    type: ACCOUNT_TYPE.CUSTOMER,
    icon: "VscHeart",
  },
  {
    id: 5,
    name: "Dashboard",
    path: "/dashboard/adminDashboard",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscDashboard",
  },
  
  {
    id: 7,
    name: "My Products",
    path: "/dashboard/myProducts",
    type: ACCOUNT_TYPE.MERCHANT,
    icon: "VscThreeBars",
  },
  {
    id: 8,
    name: "Add Product",
    path: "/dashboard/addProduct",
    type: ACCOUNT_TYPE.MERCHANT,
    icon: "VscDiffAdded",
  },
  {
    id: 9,
    name: "Dashboard",
    path: "/dashboard/merchant",
    type: ACCOUNT_TYPE.MERCHANT,
    icon: "VscDashboard",
  },
  {
    id: 10,
    name: "Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.CUSTOMER,
    icon: "FaShoppingCart",
  },
  {
    id:11,
    name: "Address",
    path: "/dashboard/address",
    icon: "FaHome",
    type: ACCOUNT_TYPE.MERCHANT,
  },
];
