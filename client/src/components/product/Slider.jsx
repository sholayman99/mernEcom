import React from 'react';
import ProductStore from "../../store/ProductStore.js";
import FeatureSkeleton from "../../skeleton/Feature-Skeleton.jsx";
import SliderSkeleton from "../../skeleton/Slider-Skeleton.jsx";

const Slider = () => {

    const {SliderList} = ProductStore()

    if(SliderList === null){
        return <SliderSkeleton />
    }
    else {
        return (
            <div>

            </div>
        );
    }

};

export default Slider;