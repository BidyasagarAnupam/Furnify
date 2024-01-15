exports.getFilteredBrand = (
    {
        query,
    }
) =>{
    const filter = {}

    if(query.category){
        filter.category = query.category;
    }

    if(query.subCategory){
        filter.subCategory = query.subCategory;
    }

    return filter;
}

