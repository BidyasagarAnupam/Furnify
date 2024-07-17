import React, { useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { setAddress, setEditAddress } from '../../../slices/addressSlice';
import { getFullAddressDetails, deleteAddress } from '../../../services/operations/addressAPI';
import ConfirmationModal from '../../common/ConfirmationModal';
import HomeImage from '../../../assets/Images/home.svg';
import WorkImage from '../../../assets/Images/work.svg';
import { Card, CardBody, Image, Chip } from "@nextui-org/react";


const AddressCard = ({ address, setIsSaved, isSaved, showForm, onOpen }) => {

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
        console.log("THE NEXT ADDRESS IS", addressDetails);
        dispatch(setAddress(addressDetails))
        dispatch(setEditAddress(true));
        // open the modal
        onOpen()
        
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
            <Card
                isBlurred
                className="border-none bg-white max-w-[610px]"
                shadow="sm"
            >
                <CardBody>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                        <div className="relative col-span-6 md:col-span-4">
                            <Image
                                className="object-cover"
                                height={200}
                                shadow="md"
                                alt={`${address.addressType === 'Work' ? "Work Image" : "Home Image"}`}
                                src={`${address.addressType === 'Work' ? WorkImage : HomeImage}`}
                                width="100%"
                            />
                        </div>

                        <div className="flex flex-col gap-y-10 col-span-6 md:col-span-8">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-0  gap-y-2">
                                    <Chip radius="sm" color="primary">{address.addressType}</Chip>
                                    <div className='flex flex-col'>
                                        <h3 className="font-semibold text-foreground/90">{`${address.name} `}</h3>
                                        <p className="text-small text-foreground/80">{`${address.contactNumber}`}</p>
                                        <div className="text-small font-medium mt-2">
                                            <span> {`${address.address}, ${address.city}, ${address.state} - `}</span>
                                            <span className='font-semibold'>{address.zipCode}</span>
                                        </div>
                                   </div>
                                </div>
                                <div onMouseOver={handleMouseOver}
                                    onMouseOut={handleMouseOut} className='relative'>
                                    <HiDotsVertical />

                                    {
                                        isHovering && (
                                            <div className='flex flex-col absolute -top-2 -right-1 gap-2 shadow-md bg-white p-3 rounded-sm'>
                                                <button onClick={() => handleEditBtn(address._id)} className='text-sm hover:text-[#55AA8F] cursor-pointer'>Edit</button>
                                                {
                                                    !showForm && <button disabled={showForm} onClick={() => deleteHandler(address._id)} className='text-sm hover:text-[#55AA8F] cursor-pointer '>Delete</button>
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>

    )
}

export default AddressCard