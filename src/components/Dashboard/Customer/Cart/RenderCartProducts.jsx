import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartProducts() {
    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    return (
        <div className="flex flex-1 flex-col">
            {cart.map((product, indx) => (
                <div
                    key={product._id}
                    className={`flex w-full flex-wrap items-start justify-between gap-6 ${indx !== cart.length - 1 && "border-b border-b-slate-900 pb-6"
                        } ${indx !== 0 && "mt-6"} `}
                >
                    <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                        <img
                            src={product?.image}
                            alt={product?.name}
                            className="h-[148px] w-[220px] rounded-lg object-cover"
                        />
                        <div className="flex flex-col space-y-1">
                            <p className="text-lg font-medium text-neutral-5">
                                {product?.name}
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-neutral-5">4.5</span>
                                <ReactStars
                                    count={5}
                                    // value={product?.ratingAndReviews?.length}
                                    // TODO: Add rating and reviews
                                    value={4.5}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<FaStar />}
                                    fullIcon={<FaStar />}
                                />
                                <span className="text-richblack-400">
                                     {/* TODO: Add rating and reviews */}
                                    {/* {product?.ratingAndReviews?.length} Ratings */}
                                    45 Ratings
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <button
                            onClick={() => dispatch(removeFromCart(product._id))}
                            className="flex items-center gap-x-1 rounded-md  bg-red-500 py-3 px-[12px] text-white"
                        >
                            <RiDeleteBin6Line />
                            <span>Remove</span>
                        </button>
                        <p className="mb-6 text-3xl font-medium text-neutral-7">
                             {`₹${(Math.round(product.price - (product.price * (product.discount / 100)))).toLocaleString('en-IN')}`}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}