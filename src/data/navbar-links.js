import { ACCOUNT_TYPE } from "../utils/constants";
export const NavbarLinks = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  // {
  //   id: 2,
  //   title: "Shop",
  //   path: '/#product',
  // },
  {
    id: 3,
    title: "Products",
    path: "/allProducts",
  },
  {
    key: 4,
    title: "Add Product",
    path: "/dashboard/addProduct",
    type: ACCOUNT_TYPE.MERCHANT,
  },
  {
    key: 5,
    title: "My Products",
    path: "/dashboard/myProducts",
    type: ACCOUNT_TYPE.MERCHANT,
  },
  {
    key: 6,
    title: "Dashboard",
    path: "/dashboard/merchant",
    type: ACCOUNT_TYPE.MERCHANT,
  },
  {
    key: 7,
    title: "Contact Us",
    path: "/contact",
  },
  {
    key: 8,
    title: "Account",
    path: "/dashboard/account",
    type: ACCOUNT_TYPE.ADMIN,
  },
  {
    key: 9,
    title: "Dashboard",
    path: "/dashboard/adminDashboard",
    type: ACCOUNT_TYPE.ADMIN,
  },
];

