import React, { useEffect, useState } from 'react'
import { LuSettings2 } from "react-icons/lu";
import { Slider } from "@nextui-org/react";
import { fetchCategories } from '../../services/operations/categoriesAPI';
import Spinner from '../common/Spinner';
import { fetchsubCategories } from '../../services/operations/subCategories';
import { Accordion, AccordionItem } from "@nextui-org/react";
import { MdStarOutline } from "react-icons/md";
import { useParams } from 'react-router-dom';

const FilterSection = ({ value, setValue, filterData, setFilterData }) => {
    
    const [categories, setCategories] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [subCategoryLoading, setSubCategoryLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryLoading, setCategoryLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectSubCategory, setSelectSubCategory] = useState("");
    const [isAllSelected, setIsAllSelected] = useState(false)
    
    const [isClear, setIsClear] = useState(false);
    const { categoryId, subCategoryId } = useParams()

    const getSubCategories = async (cid) => {
        setSubCategoryLoading(true);
        if (!cid) return;

        const subCategoriesData = await fetchsubCategories(cid);
        if (subCategoriesData.length > 0) {
            setSubCategory(subCategoriesData);
        }
        setSubCategoryLoading(false);
    };

    const handleCategoryClick = ({ cid }) => {
        setSelectedCategory(cid);
        console.log("CID:", cid);
        getSubCategories(cid);
    }

    useEffect(() => {
        if (categoryId && !subCategoryId) {
            setIsAllSelected(true)
        }
        setSelectSubCategory(subCategoryId)
        handleCategoryClick({cid: categoryId})
    }, [categoryId, subCategoryId])


    const handleSliderChange = (newValue) => {
        setValue(newValue);
        setFilterData(prevData => ({
            ...prevData,
            priceRange: newValue
        }));
    };


    const handleSubCategoryClick = (subCategoryId, categoryId) => {
        setSelectSubCategory(subCategoryId);
        setIsAllSelected(false)
        if (filterData.category === categoryId) {
            setFilterData(prevData => ({
                ...prevData,
                subCategory: subCategoryId
            }));
        } else {
            setFilterData(prevData => ({
                ...prevData,
                subCategory: subCategoryId,
                category: ""
            }));
        }

    }

    const handleCategory = (categoryId) => {
        setSelectSubCategory("")
        setIsAllSelected(true)
        setFilterData(prevData => ({
            ...prevData,
            category: categoryId,
            subCategory: ""
        }));
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilterData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };






    useEffect(() => {
        const fetchData = async () => {
            setCategoryLoading(true);

            const categoriesData = await fetchCategories();
            if (categoriesData) {
                setCategories(categoriesData);
            }

            setCategoryLoading(false);
        };

        fetchData();
    }, []);

    const classNames1 = {
        base: "py-0 w-full ",
        title: "font-bold text-medium",
        indicator: "text-primary",
        content: "text-small",
    };

    const classNames = {
        base: "py-0 w-full ",
        title: "font-normal text-small",
        indicator: "text-primary",
        content: "text-small ",
    };

    return (
        <div className='relative'>
            <div className='flex flex-row justify-between items-center border-b-2 pb-2 sticky top-0 bg-white z-50'>
                <div className="flex gap-x-2 items-center">
                    <LuSettings2 className='font-bold text-xl' />
                    <span className='text-xl font-bold'>Filter</span>
                </div>
                {
                    isClear &&
                    <div className='font-bold text-sm text-cyan-400 mt-2 hover:cursor-pointer'>
                        CLEAR All
                    </div>
                }


            </div>
            <div className='mt-3 flex flex-col gap-2 border-b-2 pb-2'>
                <p className='font-semibold px-1'>Price Range</p>
                <Slider
                    size='sm'
                    formatOptions={{ style: "currency", currency: "INR" }}
                    step={1000}
                    label
                    maxValue={50000}
                    showSteps={true}
                    minValue={0}
                    showTooltip={true}
                    value={value}
                    onChangeEnd={handleSliderChange}
                    className="w-full -mt-1"
                />
            </div>

            {/* Category and SubCategory */}
            <Accordion className='p-0' defaultExpandedKeys={["1"]}>
                {
                    categoryLoading ?
                        (<AccordionItem title="Category & SubCategory" aria-label='Category & SubCategory' classNames={classNames1}>
                            <Spinner small={true} />
                        </AccordionItem>) :
                        (
                            <AccordionItem key={1} aria-label='Category & SubCategory' title='Category & SubCategory' classNames={classNames1}>
                                <Accordion variant='splitted' className='p-0' defaultExpandedKeys={[`${categoryId}`]}>
                                    {
                                        categories.map((category) => (
                                            <AccordionItem onPress={() => handleCategoryClick({ cid: category._id })} key={category._id} aria-label={category.name} title={category.name}
                                                classNames={classNames}
                                            >
                                                {
                                                    subCategoryLoading ?
                                                        (<div className='flex flex-row justify-center items-center mt-1'>
                                                            <Spinner small={true} />
                                                        </div>) :
                                                        (
                                                            <div className='flex flex-col gap-2 font-medium'>
                                                                <div className={`hover:cursor-pointer  hover:font-semibold transition-all duration-200 ${isAllSelected && "font-semibold underline text-medium"}`}
                                                                    onClick={() => handleCategory(category._id)}
                                                                >All Items</div>
                                                                {
                                                                    subCategory.map((item) => (
                                                                        <div onClick={() => handleSubCategoryClick(item._id, category._id)}
                                                                            className={` hover:cursor-pointer  hover:font-semibold transition-all duration-200 ${ selectSubCategory === item._id && "font-semibold underline text-medium"}`}
                                                                        >{item.name}</div>
                                                                    ))
                                                                }
                                                            </div>
                                                        )
                                                }
                                            </AccordionItem>
                                        ))
                                    }
                                </Accordion>
                            </AccordionItem>
                        )
                }
            </Accordion>
            <div className="border-b-2"></div>
            {/* Customer Ratings */}
            <Accordion className='p-0'>
                <AccordionItem key={1} aria-label='Customer Ratings' title='Customer Ratings' classNames={classNames1}>
                    <div className="flex gap-2 items-center font-semibold ml-4 -mt-3">
                        <input type="radio" name="rating" id="4star" value={3} onChange={(e) => handleInputChange(e)} />
                        <label htmlFor="4star" className='flex items-center font-medium text-[15px]'>3 <span><MdStarOutline /></span> and above</label>
                    </div>
                    <div className=" mt-2 flex gap-2 items-center font-semibold ml-4">
                        <input type="radio" name="rating" id="5star" value={4} onChange={(e) => handleInputChange(e)} />
                        <label htmlFor="5star" className='flex items-center font-medium text-[15px] '>4 <span><MdStarOutline /></span>and above</label>
                    </div>
                </AccordionItem>
            </Accordion>
            {/* Discount */}
            <Accordion className='p-0'>
                <AccordionItem key={1} aria-label='Discount' title='Discount' classNames={classNames1}>
                    <div className='flex flex-col gap-1 -mt-3'>
                        {[10, 20, 30, 40, 50].map(discount => (
                            <div key={discount} className="flex gap-2 ml-4">
                                <input type="radio" name='discount' id={`discount${discount}`} value={discount} onChange={handleInputChange} />
                                <label htmlFor={`discount${discount}`} className='font-medium text-[15px]'>
                                    {`${discount}% or more`}
                                </label>
                            </div>
                        ))}
                    </div>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

export default FilterSection