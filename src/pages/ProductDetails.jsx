import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { fetchProductDetails } from '../services/operations/productDeatilsAPI';
import { IoMdArrowDropright } from 'react-icons/io';
import { FaStar } from "react-icons/fa6";
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { addProductToWishList, deleteProductFromWishlist, getAllProductsFromWishlist } from '../services/operations/WishListAPI';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from "../components/common/IconBtn"
import { FaCartArrowDown } from "react-icons/fa";
import { BiPurchaseTag } from "react-icons/bi";
import { useNavigate } from "react-router-dom"
import { ACCOUNT_TYPE } from '../utils/constants';
import toast from "react-hot-toast"
import { addToCart } from '../slices/cartSlice';
import ConfirmationModal from '../components/common/ConfirmationModal'
import { buyProduct } from '../services/operations/customerFeaturesAPI';
import { getAllAddresses } from '../services/operations/addressAPI';
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import {
  Modal, ModalContent, ModalHeader,
  ModalBody, ModalFooter, Button, useDisclosure,
} from "@nextui-org/react";
import RatingAndReview from '../components/ProductDetails/RatingAndReview';
import Spinner from "../components/common/Spinner"


const ProductDetails = () => {
  const [isLiked, setIsLiked] = useState(false);
  const productId = useParams().id;
  const [product, setProduct] = useState({});
  const { token } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)
  

  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [index, setIndex] = useState(0)
  const { cart, step } = useSelector((state) => state.cart)

  let discountedPrice = (Math.round(product.price - (product.price * (product.discount / 100))));
  const handleBuyProduct = (onClose) => {
    onClose();
    console.log("SHOWADDRESS: ", showAddress._id);
    buyProduct(token, [productId], discountedPrice, showAddress._id, user, navigate, dispatch)
  }

  const addProductHandler = async (productId) => {
    const res = await addProductToWishList(productId, token);
    console.log("Result:  ", res);
    if (res) {
      console.log("islikes is: ", isLiked);
      setIsLiked(true);
      console.log("islikes is: ", isLiked);
    }
    console.log("Add hua");
    // setIsLiked(true)
  }

  const removeProductHandler = async (productId) => {
    const res = await deleteProductFromWishlist(productId, token);
    if (res) {
      setIsLiked(false);
    }
    console.log("Remove hua");
    // setIsLiked(false);
  }

  // check whether the product is already exists or not
  const isLikedFunction = async (productId) => {
    if (!token) {
      console.log("LOGOUT");
      return false;
    }
    const res = await getAllProductsFromWishlist(token);
    console.log("Val: ", res[0].products);
    if (res[0].products.some(obj => obj._id === productId)) {
      return true;
    } else {
      return false;
    }
  }

  const handleSelectAddress = async () =>{
    onOpen();
    setLoading(true);
    const res = await getAllAddresses(token);
    if (res) {
      setAddresses(res);
      setShowAddress(res[0])
      if (res.length === 0) {
        // toast.error("Add at least one address")
        navigate('/dashboard/address')
        return
      }

      console.log("AFTER ADTER THE ALL ADDRESSES ARE, ", addresses)
    }
    setLoading(false);
  }

  useEffect(() => {
    console.log("Chala", index);
    setShowAddress(addresses[index])
    console.log("Address", addresses[index]);
  }, [index])

  useEffect(() => {
    const fetchData = async () => {
      await isLikedFunction(productId).then(
        res => setIsLiked(res)
      )
      console.log("Inside useEffect", isLiked);
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchProductDetail = async (productId) => {
      setLoading(true);
      const res = await fetchProductDetails(productId);
      console.log("Product details", res.data[0]);
      setProduct(res.data[0]);
      setLoading(false);
    }
    fetchProductDetail(productId);
  }, [productId])

  let {
    description,
    discount,
    image,
    name,
    price,
    ratingAndReviews,
    weight
  } = product

  const handleAddToCart = () => {
    console.log("USER", user);

    if (user && user?.accountType === ACCOUNT_TYPE.MERCHANT) {
      toast.error("You are a Merchant, you cant buy a product");
      return;
    }
    if (token) {
      console.log("dispatching add to cart")
      dispatch(addToCart(product));
      return;
    }
    setConfirmationModal({
      text1: "you are not logged in",
      text2: "Please login to add to cart",
      btn1Text: "Login",
      btn2Text: "cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  let inPrice = price
  let displayPrice = Math.round(inPrice - (inPrice * (discount / 100)));
  displayPrice = displayPrice.toLocaleString('en-IN')
  // inPrice = inPrice.toLocaleString('en-IN')
  return (
    <div>
      {/* Header */}
      <div
        className='flex justify-between items-center border-1 py-3 px-6 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
        {/* Left part */}
        <div className='flex flex-col gap-1'>
          <div className='text-2xl font-semibold text-neutral-5'>Products</div>
          <div className='flex flex-row items-center text-[#3F00FF] font-medium '>
            <span className='hover:underline'>
              <NavLink to={'/'}>Home</NavLink>
            </span>
            <span><IoMdArrowDropright className='text-lg text-neutral-4' /></span>
            <span className='hover:underline'>
              <NavLink to={'/allProducts'}>All Products</NavLink>
            </span>
            <span><IoMdArrowDropright className='text-lg text-neutral-4' /></span>
            <span className='text-neutral-4'>
              {product.name}
            </span>
          </div>
        </div>
        {/* Right Part */}

      </div>

      {/* Main section */}
      <div className='flex gap-3 my-8 w-full'>
        {/* Image Section */}
        <div className='relative w-2/5 bg-slate-600 mx-6'>
          <button className='absolute top-3 r-1 rounded-full 
            right-3 bottom-32 h-9 w-9 bg-white
            flex items-center justify-center
            '>
                  {
                    isLiked ? <FcLike fontSize="1.5rem" onClick={() => removeProductHandler(product._id)} /> : <FcLikePlaceholder fontSize="1.5rem" onClick={() => addProductHandler(product._id)} />
                  }

          </button>
          <img src={image} alt=""  />
        </div>
        {/* details */}
        <div className='flex flex-col gap-y-6 justify-start w-3/5 mr-10'>
          {/* name */}
          <p className='text-3xl font-semibold '>{name}</p>
          <div className='flex items-center gap-1 '>
            <span className='flex items-center gap-1 w-fit py-1 px-3 rounded-full bg-green-500 text-xs text-white font-semibold'>4.2 <FaStar /></span>
            <span className='text-medium'>2,325 Ratings & 245 Reviews</span>
          </div>
          <p className='w-2/3 leading-7 tracking-wide'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto ipsa provident distinctio veritatis laudantium iusto reiciendis adipisci eius aut voluptate.</p>
          <div className='flex gap-3 items-center'>
            <p className='text-2xl font-semibold text-neutral-5'>
              {`₹${displayPrice}`}
            </p>
            <p className='text-lg line-through text-neutral-4'>
              {
                `₹${inPrice}`
              }
            </p>
            <div className='w-fit py-1 px-3 rounded-full bg-green-500 text-xs text-white font-semibold'>
              {discount}% off
            </div>
          </div>
          <div className='w-4/5 h-[2px] bg-neutral-3'></div>
          <div className='flex flex-col gap-3'>
            <p className='text-xl font-medium text-neutral-11'>Measurements</p>
            <p className='text-medium font-medium'>{weight }</p>
          </div>
          <div className='w-4/5 h-[2px] bg-neutral-3'></div>
          
          {/* Actions */}
          <div className='flex flex-col gap-3 w-2/5'>
            <IconBtn
              onclick={() => handleAddToCart()}
              
              text={"Add to Cart"}
              outline={true}
            >
              <FaCartArrowDown className='text-xl ml-2' />
            </IconBtn>

            <IconBtn
              onclick={() =>handleSelectAddress()}
              text={"Buy Now"}
            >
              <BiPurchaseTag className='text-xl ml-2' />
            </IconBtn>

          </div>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="auto"
        backdrop='opaque'
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}

      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Select Address</ModalHeader>
              <ModalBody className='w-full'>
                <RadioGroup size='md' label="Address" defaultValue={0} onChange={(e) => {
                  setIndex(e.target.value)
                }}>
                  {
                    addresses.map((address, index) => (
                      <CustomRadio description={`${address.address},${address.city}`} value={index}>
                        {
                          `${address.name}, ${address.zipCode} `
                        }
                        <span className='ml-2 bg-green-500 text-neutral-2 rounded-md px-2 py-[2px] text-xs uppercase  font-semibold'> {address.addressType}</span>
                      </CustomRadio>
                    ))
                  }
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Button className='font-semibold' color="primary" onClick={() => handleBuyProduct(onClose)}>
                  Place Order
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
      {/* Rating and Review Section */}
      {
        loading ? (<Spinner/>): (<RatingAndReview ratingAndReviews = { ratingAndReviews } />)
      }
      
    </div>
  )
}

export default ProductDetails

export const CustomRadio = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "m-0 bg-content1  hover:bg-content2 items-center justify-between",
          "flex-row w-full font-medium cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
        // label: "text-green-500 !w-full",
        description: "text-neutral-4"
      }}
    >
      {children}
    </Radio>
  );
};