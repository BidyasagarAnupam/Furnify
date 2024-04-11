import { useSelector } from "react-redux"

import RenderCartProducts from "./RenderCartProducts"
import RenderTotalAmount from "./RenderTotalAmount"
import RenderSteps from "./RenderSteps"

export default function Cart() {
    const { step } = useSelector((state) => state.cart)
    console.log("STEP------------", step);
    return (
        <div className="w-full flex justify-center">
            <RenderSteps />
        </div>
    )

    // return (
    //     <>
    //         <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>
    //         <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
    //             {totalItems} Courses in Cart
    //         </p>
    //         {total > 0 ? (
    //             <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
    //                 <RenderCartProducts />
    //                 <RenderTotalAmount />
    //             </div>
    //         ) : (
    //             <p className="mt-14 text-center text-3xl text-richblack-100">
    //                 Your cart is empty
    //             </p>
    //         )}
    //     </>
    // )
}