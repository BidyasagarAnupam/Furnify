import { ACCOUNT_TYPE } from "../utils/constants";
export const NavbarLinks = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "Shop",
    path: '/allProducts',
  },
  {
    id: 3,
    title: "Products",
    path: "/#product",
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
];

