import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Spinner from '../../common/Spinner'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const RevenueSalesChart = ({ orders, loading }) => {
    // const [orders, setOrders] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [selectedDataType, setSelectedDataType] = useState('revenue'); // Default to revenue

    useEffect(() => {
        if (orders.length > 0) {
            const monthlyStats = Array.from({ length: 12 }, (_, monthIndex) => {
                const filteredOrders = orders.filter((order) => {
                    const orderDate = new Date(order.orderedAt);
                    return orderDate.getMonth() === monthIndex;
                });
                const monthlyRevenue = filteredOrders.reduce((total, order) => {
                    return total + (Math.round(order.product.price - (order.product.price * (order.product.discount / 100)))) * order.quantity;
                }, 0);
                const monthlySales = filteredOrders.length;
                return { month: monthIndex + 1, revenue: monthlyRevenue, sales: monthlySales };
            });
            setMonthlyData(monthlyStats);
            console.log('Monthly Stats:', monthlyStats);
        }
    }, [orders]);
    

    if (loading) {
        return (
            <div className='mx-auto w-full h-full flex justify-center items-center'>
                <Spinner />
            </div>
        )
    }

    return (
        <>
            {/* Page Content */}
            <div className=" mx-auto">
                {/* Monthly Revenue and Sales Chart */}
                {monthlyData.length > 0 && (
                    <div>
                        <Bar
                            data={{
                                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                                datasets: [
                                    {
                                        label: 'Revenue',
                                        backgroundColor: '#883DCF',
                                        borderColor: '#883DCF',
                                        borderWidth: 1,
                                        hoverBackgroundColor: '#B88BE2',
                                        hoverBorderColor: '#B88BE2',
                                        data: monthlyData.map((data) => data.revenue),
                                    },
                                    {
                                        label: 'Sales',
                                        backgroundColor: '#F86624',
                                        borderColor: '#F86624',
                                        borderWidth: 1,
                                        hoverBackgroundColor: '#F98550',
                                        hoverBorderColor: '#F98550',
                                        data: monthlyData.map((data) => data.sales),
                                    },
                                ],
                            }}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            stepSize: Math.ceil(Math.max(...monthlyData.map((data) => (selectedDataType === 'revenue' ? data.revenue : data.sales))) / 10) || 1,
                                        },
                                        title: {
                                            display: true,
                                            text: selectedDataType === 'revenue' ? 'Rupees (₹)' : 'Number of Sales',
                                            color: 'black',
                                            font: {
                                                size: 16,
                                            },
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Month',
                                            color: 'black',
                                            font: {
                                                size: 16,
                                            },
                                        },
                                        ticks: {
                                            font: {
                                                weight: 'bold',
                                            },
                                        },
                                    },
                                },
                            }}
                            height={300} // Increase chart height
                        />
                    </div>
                )}

                {/* Add more sections and components for additional features */}
            </div>
        </>
    );
};

export default RevenueSalesChart;