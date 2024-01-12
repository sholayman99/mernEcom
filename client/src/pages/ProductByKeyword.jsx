import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import ProductList from "../components/product/ProductList.jsx";

const ProductByKeyword = () => {
    const {ListByKeywordRequest} = ProductStore();
    const {keyword} = useParams();

    useEffect(() => {
        (async()=>{
            await ListByKeywordRequest(keyword);
        })()
    }, []);

    return (
        <Layout>
            <ProductList />
        </Layout>
    );
};

export default ProductByKeyword;