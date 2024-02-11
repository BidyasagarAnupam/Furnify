import React, { useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { setAddress, setEditAddress } from '../../../slices/addressSlice';
import { getFullAddressDetails, deleteAddress } from '../../../services/operations/addressAPI';
import ConfirmationModal from '../../common/ConfirmationModal';


const AddressCard = ({ address, setShowForm, setIsSaved, isSaved }) => {

    const [isHovering, setIsHovering] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null)

    const dispatch = useDispatch();

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const handleEditBtn = async (addressId) => {
        console.log("ADDRESS ID", addressId);
        const addressDetails = await getFullAddressDetails(addressId, token)
        // console.log("THE DATA IS ", res)
        dispatch(setAddress(addressDetails))
        dispatch(setEditAddress(true));
        setShowForm(true);
        // console.log("ADDRESS DETAILS---------", res)
    }

    const onPressDelete = async (addressId) => {
        await deleteAddress(addressId, token);
        setIsSaved(!isSaved)
    }

    const deleteHandler = async (addressId) => {
        setConfirmationModal({
            text1: "Are you sure?",
            text2: "You want to delete the address.",
            btn1Text: "Delete",
            btn2Text: "Cancel",
            btn1Handler: () => onPressDelete(addressId),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    return (
        <>
            <div className='flex flex-col gap-3 border-2 border-neutral-9 p-4 mt-4 '>
                <div className='flex w-full justify-between'>
                    <div className='bg-neutral-9 uppercase text-xs p-1 font-semibold text-neutral-4'>{address.addressType}</div>
                    <div onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut} className='relative'>
                        <HiDotsVertical />

                        {
                            isHovering && (
                                <div className='flex flex-col absolute -top-2 -right-1 gap-2 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] bg-white p-3 rounded-sm'>
                                    <p onClick={() => handleEditBtn(address._id)} className='text-sm hover:text-richBlue-500 cursor-pointer'>Edit</p>
                                    <p onClick={() => deleteHandler(address._id)} className='text-sm hover:text-richBlue-500 cursor-pointer'>Delete</p>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className='w-full flex flex-col gap-2 text-neutral-5'>
                    <span className='font-semibold'>{`${address.name} ${address.contactNumber}`}</span>
                    <div className='flex gap-x-2'>
                        <span> {`${address.address}, ${address.city}, ${address.state}, 
                    ${address.country} - `}</span>
                        <span className='font-semibold'>{address.zipCode}</span>
                    </div>
                </div>

            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>

    )
}

export default AddressCard