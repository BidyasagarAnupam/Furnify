import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../../common/IconBtn"
import { buyProduct } from "../../../../services/operations/customerFeaturesAPI"
// import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

export default function RenderTotalAmount() {
    const { total, cart } = useSelector((state) => state.cart)
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBuyProduct = () => {
        const products = cart.map((product) => product._id)
        buyProduct(token, products, user, navigate, dispatch)
    }

    return (
        <div className="min-w-[280px] rounded-md border-[1px] border-neutral-9 p-6">
            <p className="mb-1 text-md font-medium text-neutral-6">Total:</p>
            <p className="mb-6 text-3xl font-medium text-neutral-7">₹ {total.toLocaleString('en-IN')}</p>
            <IconBtn
                text="Buy Now"
                onclick={handleBuyProduct}
                customClasses="w-full justify-center"
            />
        </div>
    )
}