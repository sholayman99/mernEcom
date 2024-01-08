import React from 'react';
import Layout from "../components/layout/Layout.jsx";
import SliderSkeleton from "../skeleton/Slider-Skeleton.jsx";
import FeatureSkeleton from "../skeleton/Feature-Skeleton.jsx";
import CategorySkeleton from "../skeleton/Category-Skeleton.jsx";
import ProductSkeleton from "../skeleton/Product-Skeleton.jsx";
import BrandSkeleton from "../skeleton/Brand-Skeleton.jsx";

const HomePage = () => {
    return (
        <Layout>
            <SliderSkeleton />
            <FeatureSkeleton />
            <CategorySkeleton />
            <ProductSkeleton />
            <BrandSkeleton />
        </Layout>
    );
};

export default HomePage;