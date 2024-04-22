import { useSelector } from "react-redux"
import RenderSteps from "./RenderSteps"

export default function Cart() {
    const { step } = useSelector((state) => state.cart)
    console.log("STEP------------", step);
    return (
        <div className="w-full flex justify-center">
            <RenderSteps />
        </div>
    )

}