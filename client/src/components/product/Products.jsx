import React from 'react';
import ProductStore from "../../store/ProductStore.js";
import ProductSkeleton from "../../skeleton/Product-Skeleton.jsx";

const Products = () => {
    const {ListByRemark} = ProductStore()

    if(ListByRemark === null){
        return <ProductSkeleton />
    }
    else {
        return (
            <div>

            </div>
        );
    }

};

export default Products;