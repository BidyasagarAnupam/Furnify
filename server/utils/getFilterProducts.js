
exports.getFiltered = (
        query,
        merchantId = null,
) => {
    // Build the filter object based on provided parameters
    const filter = {};

    if (merchantId) {
        filter.merchant = merchantId;
    }

    //filter the products on the basis of these parameters.
    if (query.name) {
        filter.name = { $regex: new RegExp(query.name, 'i') }; // Case-insensitive partial match
    }

    // if (query.brand) {
    //     filter.brand = { $regex: new RegExp(query.brand, 'i') };
    // }

    if (query.priceRange) {
        // Assuming priceRange is an array [min, max]
        filter.price = { $gte: query.priceRange[0], $lte: query.priceRange[1] };
    }

    if (query.discount) {
        filter.discount = { $gte: query.discount }; // set the discount to >=
    }

    if (query.category) {
        filter.category = query.category;
    }

    if (query.subcategory) {
        filter.subcategory = query.subcategory;
    }

    if (query.status) {
        filter.status = query.status;
    }

    //TODO 
    // if (query.rating) {

    //     filter.rating = { $gte: query.rating }; // Filter products with rating greater than or equal to the provided value
    // }

    return filter;
} 