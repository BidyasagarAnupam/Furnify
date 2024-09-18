
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'; // Assuming you're using a date picker library
import 'react-datepicker/dist/react-datepicker.css';
import Spinner from '../../common/Spinner';
import DateImage from '../../../assets/icons/selectDate.svg'
import { FaPen } from "react-icons/fa6";
import { Pagination, Radio, RadioGroup, cn } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { useSelector } from 'react-redux';
import { updateOrder } from '../../../services/operations/orderAPI';
import toast from 'react-hot-toast';

const ManageOrder = ({ orders, loading, setIsStatusChanged, isStatusChanged }) => {

    const { token } = useSelector((state) => state.auth)
    const [newOrdersToday, setNewOrdersToday] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5); // Adjust as needed
    const today = new Date().setHours(0, 0, 0, 0); // Get today's date without time
    const [showOrders, setShowOrders] = useState([])
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedStatusId, setSelectedStatusId] = useState("");
    const [defaultStatus, setDefaultStatus] = useState("")

    const statusData = [
        {
            index: 1,
            status: 'Confirmed',
            textColor: '#F86624',
            bgColor: '#FFF0EA'
        },
        {
            index: 2,
            status: 'Shipped',
            textColor: '#2BB2FE',
            bgColor: '#EAF8FF'
        },
        {
            index: 3,
            status: 'Out for Delivery',
            textColor: '#BB960B',
            bgColor: '#FEF4CF'
        },
        {
            index: 4,
            status: 'Delivered',
            textColor: '#1A9882',
            bgColor: '#E9FAF7'
        },
        {
            index: 5,
            status: 'Cancelled',
            textColor: '#EB3D4D',
            bgColor: '#FBD8DB'
        },
    ]

    useEffect(() => {
        // Filter orders that were placed today
        setShowOrders(orders)
        const todayOrders = orders.filter(order => {
            const orderDate = new Date(order.orderedAt).setHours(0, 0, 0, 0); // Assuming order.date is the order date
            return orderDate === today;
        });
        setNewOrdersToday(todayOrders.length);
    }, [orders])


    useEffect(() => {
        // Filter orders based on the selected date
        const selectedDateOrders = orders.filter(order => {
            if (!selectedDate) {
                return true; // Return true for all orders when selectedDate is null
            }
            const orderDate = new Date(order.orderedAt).setHours(0, 0, 0, 0); // Assuming order.date is the order date
            if (selectedDate) {
                return orderDate === selectedDate.setHours(0, 0, 0, 0);
            }
            // return orderDate === selectedDate.setHours(0, 0, 0, 0);
        });
        setShowOrders(selectedDateOrders)
        console.log("selectedDateOrders", selectedDateOrders);
    }, [selectedDate])

    // Pagination
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = showOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const modalHandler = (id, orderStatus) => {
        onOpen()
        setSelectedStatusId(id);
        setDefaultStatus(orderStatus);
    }
    const updateStatus = async (onClose) => {
        const result = await updateOrder(token, selectedStatusId, selectedStatus)
        const res = await result();
        onClose()
        console.log("RES", res, selectedStatusId, selectedStatus);
        setIsStatusChanged(!isStatusChanged)
    }

    if (loading) {
        return (
            <div className='mx-auto w-full h-full flex justify-center items-center'>
                <Spinner />
            </div>
        )
    }

    console.log("AABHI orders", orders);

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center  px-4 pb-4 border-b">
                <div className='flex gap-2 items-center'>
                    <h2 className="text-2xl font-medium text-[#1D1F2C]">Recent Orders</h2>
                    <span className="bg-[#E9FAF7] text-sm px-1 py-1 text-[#1A9882] rounded-lg">+{newOrdersToday} Orders</span>
                </div>

                <div className='flex gap-2'>
                    <div className="flex items-center gap-1 border cursor-pointer border-[#E0E2E7] rounded-lg w-fit px-4 py-2">
                        <img src={DateImage} alt="" />
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            placeholderText="Select Date"
                            className='w-[90px] outline-none'
                        />
                    </div>
                    <div onClick={() => setSelectedDate(null)} className='bg-[#F4ECFB] px-2 text-[#883DCF] py-2 cursor-pointer rounded-lg'>
                        See All
                    </div>

                </div>

            </div>

            {/* Table */}
            <table className="w-full  border-none outline-none">
                <thead className=''>
                    <tr className="bg-[#f9f9fc]">
                        <th className="py-4 border-b px-2 text-[#1D1F2C] font-medium">Product</th>
                        <th className="py-4 border-b px-4 text-[#1D1F2C] font-medium">Customer</th>
                        <th className="py-4 border-b px-4 text-[#1D1F2C] font-medium">Total</th>
                        <th className="py-4 border-b px-4 text-[#1D1F2C] font-medium">Status</th>
                        <th className="py-4 border-b px-4 text-[#1D1F2C] font-medium">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((order) => (
                        <tr key={order._id}>
                            <td className="py-4 px-2 w-1/4 text-center border-b ">
                                <div className='flex gap-2 items-center '>
                                    <img src={order?.product?.image} alt="" className='h-[50px] w-[50px] rounded-lg object-cover' />
                                    <div className='flex flex-col items-start'>
                                        <p className='text-[#1D1F2C] text-sm'>{order.product.name}</p>
                                        <p className='text-xs text-dashboard-grey-2'>Quantity : {order.quantity}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-4 text-center border-b w-1/4 ">
                                <div className='flex flex-col gap-1'>
                                    <p className='text-sm font-medium text-dashboard-black'>{order.user.firstName} {order.user.lastName}</p>
                                    <p className='text-xs text-dashboard-grey-2'>{order.user.email}</p>
                                </div>
                            </td>
                            <td className="py-4 px-4 text-center border-b ">₹{((Math.round(order.product.price - (order.product.price * (order.product.discount / 100)))) * order.quantity).toLocaleString('en-In')}</td>
                            <td className="  border-b ">
                                <p className=
                                    {`w-fit mx-auto px-3 py-1 text-sm rounded-lg
                                     ${order.status === 'Confirmed' && "bg-[#FFF0EA] text-[#F86624]"}
                                     ${order.status === 'Shipped' && "bg-[#EAF8FF] text-[#2BB2FE]"}
                                     ${order.status === 'Out for Delivery' && "bg-[#FEF4CF] text-[#BB960B]"}
                                     ${order.status === 'Delivered' && "bg-[#E9FAF7] text-[#1A9882]"}
                                     ${order.status === 'Cancelled' && "bg-[#FBD8DB] text-[#EB3D4D]"}
`}>
                                    {order?.status}
                                </p>
                            </td>
                            <td className="py-4 px-4 text-center border-b ">
                                <FaPen className='mx-auto cursor-pointer' onClick={() => modalHandler(order._id, order.status)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between mt-4 px-4">
                <p className='text-[#667085]'>{`Showing ${indexOfFirstOrder + 1} - ${currentPage === Math.ceil(orders.length / ordersPerPage) ? Math.ceil(orders.length) : indexOfLastOrder} from ${orders.length}`}</p>
                <Pagination
                    loop
                    color='primary'
                    showControls
                    total={Math.ceil(orders.length / ordersPerPage)}
                    initialPage={1}
                    onChange={(page) => {
                        paginate(page)
                    }}
                />
            </div>

            {/* Modal */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Update Status</ModalHeader>
                            <ModalBody>
                                <RadioGroup size='md' defaultValue={defaultStatus} onChange={(e) => {
                                    setSelectedStatus(e.target.value)
                                }}>
                                    {
                                        statusData.map((element, index) => (
                                            <CustomRadio textColor='#F86624' bgColor='#FFF0EA' value={element.status} >
                                                {
                                                    `${element.status} `
                                                }

                                            </CustomRadio>
                                        ))
                                    }
                                </RadioGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={() => updateStatus(onClose)}>
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};


export default ManageOrder

export const CustomRadio = (props) => {
    const { children, textColor, bgColor, ...otherProps } = props;
    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    `m-0 bg-content1 hover:bg-content2 items-center `,
                    "flex-row w-full font-medium cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent",
                    `data-[selected=true]:border-primary`
                ),
                // label: "text-green-500 !w-full",
                description: "text-neutral-4",

            }}
        >
            {children}
        </Radio>
    );
};