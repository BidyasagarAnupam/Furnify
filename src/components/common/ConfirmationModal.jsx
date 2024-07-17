import IconBtn from "./IconBtn"
import { Button } from "@nextui-org/react"

export default function ConfirmationModal({ modalData }) {
    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-30 backdrop-blur-sm">
            <div className="w-11/12 max-w-[350px] rounded-lg border border-stone-700 bg-white p-6">
                <p className="text-2xl font-semibold text-richblack-5">
                    {modalData?.text1}
                </p>
                <p className="mt-3 mb-5 leading-6 text-richblack-200">
                    {modalData?.text2}
                </p>
                <div className="flex items-center gap-x-4">
                    <IconBtn
                        text={modalData?.btn1Text}
                        onclick={ modalData?.btn1Handler}
                    />
                        
                   
                    <Button
                        color="primary"
                        variant="bordered"
                        onClick={ modalData?.btn2Handler}
                    >
                        {modalData?.btn2Text}
                    </Button>
                </div>
            </div>
        </div>
    )
}