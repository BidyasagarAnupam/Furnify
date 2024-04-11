import React, { useEffect, useState } from 'react'
import { getAllAddresses } from '../../../../../services/operations/addressAPI';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../../common/Spinner'
import { Input } from "@nextui-org/react";
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import {
  Modal, ModalContent, ModalHeader,
  ModalBody, Button, useDisclosure,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom"
import IconBtn from '../../../../common/IconBtn';
import { setStep } from '../../../../../slices/cartSlice';
import { buyProduct } from '../../../../../services/operations/customerFeaturesAPI';

const CheckoutForm = ({ totalMRP, totalDiscountedPrice }) => {

  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [readOnly, SetReadOnly] = useState(true)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [index, setIndex] = useState(0)
  const dispatch = useDispatch();
  const { cart, totalItems, step } = useSelector((state) => state.cart)
  const navigate = useNavigate()

  const handleBuyProduct = () => {
    const products = cart.map((product) => product._id)
    buyProduct(token, products, totalDiscountedPrice, showAddress._id, user, navigate, dispatch)
  }



  useEffect(() => {
    const getAddresses = async () => {
      setLoading(true);
      const res = await getAllAddresses(token);
      if (res) {
        setAddresses(res);
        setShowAddress(res[0])
        console.log("AFTER ADTER THE ALL ADDRESSES ARE, ", addresses)
      }
      setLoading(false);
    }
    getAddresses();
  }, [])

  useEffect(() => {
    console.log("Chala", index);
    setShowAddress(addresses[index])
    console.log("Address", addresses[index]);
  },[index])

  if (loading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }


  return (
    <div className='w-full flex justify-between'>
      {/* Left form Section */}
      <div className='w-3/5 flex flex-col gap-2'>
        <div className='flex flex-col gap-3'>
          {/* Contact Information */}
          <div className='border-1 border-neutral-4 rounded-md mt-12 py-6 px-5'>
            <div className='flex justify-between items-start'>
              <p className='text-xl font-semibold mb-9 mt-2'>Contact Information</p>
              <Button onPress={onOpen} color="primary">Change Address</Button>
            </div>

            <Input

              size='lg'
              isReadOnly={readOnly}
              type="text"
              label="Name"
              labelPlacement='outside'
              variant="bordered"
              defaultValue={showAddress.name}
              value={showAddress.name}
              className="text-neutral-4 max-w-full mb-10"
            />
            <Input

              size='lg'
              isReadOnly={readOnly}
              type="number"
              label="Phone Number"
              labelPlacement='outside'
              variant="bordered"
              defaultValue={showAddress.contactNumber}
              value={showAddress.contactNumber}
              className="text-neutral-4 hover:cursor-not-allowed max-w-full mb-10"
            />
            <Input
              size='lg'
              isReadOnly
              type="email"
              label="Email"
              labelPlacement='outside'
              variant="bordered"
              defaultValue={user.email}
              value={user.email}
              className="text-neutral-4 max-w-full"
            />
          </div>
          {/* Shipping Address */}
          <div className='border-1 border-neutral-4 rounded-md py-4 px-5'>
            <p className='text-xl font-semibold mb-11'>Shipping Address</p>
            <Input
              size='lg'
              isReadOnly
              type="text"
              label="Address(House/Building, Area and Street)"
              labelPlacement='outside'
              variant="bordered"
              defaultValue={showAddress.address}
              value={showAddress.address}
              className="text-neutral-4 max-w-full"
            />
            <div className='flex gap-5 mt-5'>
              <Input

                size='lg'
                isReadOnly={readOnly}
                type="number"
                label="Zip Code"
                labelPlacement='outside'
                variant="bordered"
                defaultValue={showAddress.zipCode}
                value={showAddress.zipCode}
                className="text-neutral-4 max-w-xs"
              />
              <Input

                size='lg'
                isReadOnly={readOnly}
                type="text"
                label="Locality"
                labelPlacement='outside'
                variant="bordered"
                defaultValue={showAddress.locality}
                value={showAddress.locality}
                className="text-neutral-4 max-w-xs"
              />
            </div>

            <div className='flex gap-5 mt-5'>
              <Input

                size='lg'
                isReadOnly={readOnly}
                type="text"
                label="City/District/Town"
                labelPlacement='outside'
                variant="bordered"
                defaultValue={showAddress.city}
                value={showAddress.cit}
                className="text-neutral-4 max-w-xs "
              />
              <Input

                size='lg'
                isReadOnly={readOnly}
                type="text"
                label="State"
                labelPlacement='outside'
                variant="bordered"
                defaultValue={showAddress.state}
                value={showAddress.state}
                className="text-neutral-4 max-w-xs"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Right section Order summary*/}
      <div className='w-[30%] pt-6 h-[48vh] sticky top-10 '>
        <div className='px-5 py-4 w-full h-full bg-white shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] '>
          <p className='text-primary text-2xl font-medium'>Cart summary</p>
          <div className='w-[100%]  h-[1px] bg-neutral-9 mt-2 '></div>
          <div className='mt-6 flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
              <p className='text-medium font-medium'>Price ({totalItems} items)</p>
              <p className='text-medium font-medium'>₹{totalMRP.toLocaleString('en-IN')}</p>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-medium font-medium'>Discount</p>
              <p className='text-medium font-medium text-green-600'>- ₹{(totalMRP - totalDiscountedPrice).toLocaleString('en-IN')}</p>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-medium font-medium'>Delivery Charges</p>
              <div className='flex gap-1 items-center'>
                <p className='text-sm line-through'>₹549</p>
                <span className='text-medium font-medium text-green-600'>Free</span>
              </div>

            </div>
            <div className='flex justify-between items-center'>
              <p className='text-medium font-medium'>Secured Packaging Fee</p>
              <p className='text-sm font-medium'>₹500</p>
            </div>
            <div className='w-full h-[1px] border-dashed border-1 border-neutral-9'></div>
            <div className='flex justify-between items-center'>
              <p className='text-lg font-semibold'>Total Amount</p>
              <p className='text-lg font-medium'>₹{(totalDiscountedPrice + 500).toLocaleString('en-IN')}</p>
            </div>
            <div>
              <IconBtn onclick={() => handleBuyProduct()} text="Buy Now" customClasses="w-full" />
            </div>
          </div>
        </div>
      </div>
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
                <RadioGroup size='md' label="Address" onChange={(e) => {
                  setIndex(e.target.value)
                  onClose();
                } }>
                  {
                    addresses.map((address, index) => (
                      <CustomRadio description={`${address.address},${address.city}`} value={index}>
                        {
                          `${address.name}, ${address.zipCode} ` 
                        }
                        <span className='ml-2 bg-green-500 text-neutral-2 rounded-md px-2 py-[2px] text-xs uppercase  font-semibold'> {address.addressType }</span>
                      </CustomRadio>
                    ))
                  }
                </RadioGroup>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CheckoutForm

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