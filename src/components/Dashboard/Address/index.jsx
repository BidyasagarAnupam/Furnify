import React, { useEffect, useState } from 'react'
import { FaRegPlusSquare } from "react-icons/fa";
import RenderAddressForm from './RenderAddressForm';
import { getAllAddresses } from '../../../services/operations/addressAPI';
import AddressCard from './AddressCard';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IoMdArrowDropright } from 'react-icons/io';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import AddressSkeleton from '../../common/skeleton/AddressSkeleton';
import { Image } from "@nextui-org/react";
import noAddress from '../../../assets/Images/no-address.png'

const Address = () => {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { editAddress } = useSelector((state) => state.address);

  

  useEffect(() => {
    console.log("IN USE EFFECT THE isSaved", isSaved)
    const getAddresses = async () => {
      setLoading(true);
      const res = await getAllAddresses(token);
      if (res) {
        setAddresses(res);
        console.log("AFTER ADTER THE ALL ADDRESSES ARE, ", addresses)
      }
      setLoading(false);
    }

    getAddresses();

  }, [isSaved])
  return (
    <div>
      {/* Header */}
      <div
        className='flex justify-between items-center border-1 mb-8 py-4 px-6 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
        {/* Left part */}
        <div className='flex flex-col gap-1'>
          <div className='text-2xl font-semibold text-neutral-5'>Manage Addresses</div>
          <div className='flex flex-row items-center text-[#3F00FF] font-medium '>
            <span className='hover:underline'>
              <NavLink to={'/dashboard/account'}>Dashboard</NavLink>
            </span>
            <span><IoMdArrowDropright className='text-lg text-neutral-4' /></span>
            <span className='text-neutral-4'>
              <span>My Address</span>
            </span>
          </div>
        </div>
        {/* Right Part */}
        <div className='flex flex-row gap-x-2'>
          <Button onPress={() => onOpen()}>Add Address</Button>
        </div>
      </div>
      <Modal
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        placement='auto'
        size='4xl'
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton={true}
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
              <ModalHeader className="flex flex-col gap-1">{`${editAddress ? "Edit Address" : "Add Address"}`}</ModalHeader>
              <ModalBody>
                <RenderAddressForm setIsSaved={setIsSaved} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      {
        loading ? (
          <div className='grid grid-cols-2 gap-6'>
            {[1, 2, 3, 4].map((item) => {
              return (
                <AddressSkeleton key={item.toString()}/>
              )
            })
            }
          </div>
        ) :
          (
            addresses.length > 0 ? (
              <div className='grid grid-cols-2 gap-6'>
                {addresses.map((address, index) => {
                  return (
                    <AddressCard
                      key={index}
                      address={address}
                      setShowForm={setShowForm}
                      setIsSaved={setIsSaved}
                      isSaved={isSaved}
                      showForm={showForm}
                      onOpen={onOpen}
                    />
                  )
                })
                }
              </div >
            ) : (
                <div className='flex flex-col'>
                  <div className='flex flex-col items-center justify-center h-fit'>
                    <img
                      className="object-cover"
                      height={200}
                      shadow="md"
                      alt="no address"
                      src={noAddress}
                    />
                    <div className='text-center flex flex-col gap-2'>
                      <p className='text-3xl font-semibold'> No address added!</p>
                      <p className='text-lg leading-6'>To see the saved address here, add your <br /> work or home address</p>
                    </div>
                  </div>
                  
                </div>
            )
          )
      }

    </div>
  )
}

export default Address