import { useEffect } from 'react';
import { RxCross1 } from "react-icons/rx";
import SubCategoryCard from './SubCategoryCard';
import { useNavigate } from 'react-router-dom';

export default function SubCategoryModal({ modalData }) {
    const navigate = useNavigate();

    useEffect(() => {
        // Add a class to the HTML element to prevent scrolling
        const htmlElement = document.querySelector('html');
        if (htmlElement) {
            htmlElement.classList.add('modal-open');
        }

        // Clean up function to remove the class when the component unmounts
        return () => {
            if (htmlElement) {
                htmlElement.classList.remove('modal-open');
            }
        };
    }, []);

    // Render the modal
    return (

        <div onClick={modalData.closeIconHandler} aria-hidden='true' className="side-modal-overlay" >
            <div onClick={(e) => e.stopPropagation()} aria-hidden='true' className=" sideModalAnimation w-2/5 bg-white overflow-auto  absolute top-0 right-0 h-full">
                <div className="w-full bg-[#FFE7EE] p-6">
                    <div className='flex justify-between items-center w-11/12 mx-auto '>
                        <p className="text-2xl font-semibold text-richblack-5">
                            {modalData?.heading}
                        </p>
                        <div className='h-[30px] w-[30px] rounded-full flex items-center justify-center'>
                            <RxCross1 onClick={modalData.closeIconHandler} className='text-2xl' />
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-10 w-11/12 mx-auto px-6 py-10'>
                    <div className='flex cursor-pointer flex-col gap-3 items-center' onClick={() => navigate(`/allProducts/${modalData.categoryId}`)}>
                        <img loading='lazy' src={modalData.categoryImage} alt="All items" className='rounded-md h-[125px]' />
                        <p>All Items</p>
                    </div>
                    {
                        modalData.subCategory.map((item) => {
                            return <SubCategoryCard key={item._id} subCategory={item} categoryId={modalData.categoryId} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}
