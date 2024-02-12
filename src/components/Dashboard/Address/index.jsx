import React, { useEffect, useState } from 'react'
import { FaRegPlusSquare } from "react-icons/fa";
import RenderAddressForm from './RenderAddressForm';
import { getAllAddresses } from '../../../services/operations/addressAPI';
import AddressCard from './AddressCard';
import { useSelector } from 'react-redux';

const Address = () => {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth)

  // TODO:
  const [resetFunction, setResetFunction] = useState();
  
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
      <h1>Manage Addresses</h1>
      {
        showForm ?
          (<div>
            <RenderAddressForm setShowForm={setShowForm} setIsSaved={setIsSaved} />
          </div>) :
          (<div>
            <div onClick={() => setShowForm(true)}
              className='flex gap-x-4 border-2 items-center border-neutral-9'>
              <FaRegPlusSquare />
              <p>Add new Address</p>
            </div>
          </div>)
      }
      {
        loading ? (
          <div>Loading...</div>
        ) :
          (<div className='flex flex-col gap-4 w-full'>
            {addresses.map((address, index) => {
              {/* To avoid the null address */}
              return (
                <AddressCard
                  key={index}
                  address={address}
                  setShowForm={setShowForm}
                  setIsSaved={setIsSaved}
                  isSaved={isSaved}
                  showForm={showForm}
                />
              )
            })
            }
          </div >)
      }

    </div>
  )
}

export default Address