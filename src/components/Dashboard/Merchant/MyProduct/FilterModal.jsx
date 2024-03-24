import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { Slider } from "@nextui-org/react";
import { fetchCategories } from '../../../../services/operations/categoriesAPI';
import { fetchsubCategories } from '../../../../services/operations/subCategories';

const FilterModal = ({ setQuery, setFilterModal }) => {
    const [value, setValue] = useState([1000, 50000]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [subCategory, setSubCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [filterData, setFilterData] = useState({
        priceRange: value,
        discount: null,
        category: "",
        subCategory: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const categoriesData = await fetchCategories();
            if (categoriesData) {
                setCategories(categoriesData);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const getSubCategories = async (cid) => {
            setLoading(true);
            if (!cid) return;

            const subCategoriesData = await fetchsubCategories(cid);
            if (subCategoriesData.length > 0) {
                setSubCategory(subCategoriesData);
                setFilterData(prevData => ({
                    ...prevData,
                    subCategory: subCategoriesData[0]._id // Set default subcategory
                }));
            }
            setLoading(false);
        };

        getSubCategories(selectedCategory);
    }, [selectedCategory]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilterData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleApplyFilter = async () => {
        // Apply filter logic here using filterData state
        setQuery(filterData)
        setFilterModal(false)
       
    };

    const handleSliderChange = (newValue) => {
        setValue(newValue);
        setFilterData(prevData => ({
            ...prevData,
            priceRange: newValue
        }));
    };

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[400px] rounded-lg border border-richblack-400 p-6 bg-neutral-10">
                <div div className='flex gap-x-3 items-center flex-row-reverse' >
                    <div onClick={() => setFilterModal(false)} className='cursor-pointer'><RxCross2 className='text-2xl bg-secondary-red text-white rounded-md' /></div>
                    <button onClick={handleApplyFilter} className='bg-secondary-darkblue px-2 py-1 text-white font-medium rounded-md'>Apply Filter</button>
                    <div />
                </div>
                <div className="mt-10 flex flex-col gap-2 w-full h-full items-start justify-center">
                    <p className='font-semibold text-medium'>PRICE RANGE</p>
                    <Slider
                        size='sm'
                        formatOptions={{ style: "currency", currency: "INR" }}
                        step={1}
                        label
                        maxValue={50000}
                        minValue={0}
                        showTooltip={true}
                        value={value}
                        onChange={handleSliderChange}
                        className="w-full -mt-4"
                    />
                    <div className='h-[0.5px] w-full bg-neutral-11'></div>

                    <div className='flex flex-col gap-1'>
                        <p className='font-semibold text-medium'>DISCOUNT</p>
                        <div className='flex flex-col gap-1'>
                            {[10, 20, 30, 40, 50].map(discount => (
                                <div key={discount} className="flex gap-2">
                                    <input type="radio" name='discount' id={`discount${discount}`} value={discount} onChange={handleInputChange} />
                                    <label htmlFor={`discount${discount}`} className='font-semibold'>
                                        {`${discount}% or more`}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor="category" className='font-semibold text-medium'>Choose Category</label>
                        <select
                            name="category"
                            id="category"
                            className='p-1 w-full rounded-md bg-neutral-10 border-1 border-neutral-11'
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                handleInputChange(e);
                            }}
                        >
                            <option>Select Category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor="subCategory" className='font-semibold text-medium'>Choose Subcategory</label>
                        <select name="subCategory" id="subCategory" className='p-1 w-full rounded-md bg-neutral-10 border-1 border-neutral-11' value={filterData.subCategory} onChange={handleInputChange}>
                            <option>Select subcategory</option>
                            {subCategory.map((subcategory) => (
                                <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default FilterModal;
