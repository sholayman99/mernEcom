import React from 'react';
import ProductStore from "../../store/ProductStore.js";
import StarRatings from "react-star-ratings/build/star-ratings.js";

const Reviews = () => {
    const {ReviewList} =ProductStore()
    console.log(ReviewList)
    return (
        <ul className="list-group my-2 list-group-flush">
            {
                ReviewList!==null?(
                 ReviewList.map((item,i)=>{
                  return <li key={i} className="list-group-item bg-transparent">
                    <h6 className={"p-0 m-0"}><i className="bi bi-person"></i>{item['profile']['cus_name']}</h6>
                    <StarRatings rating={parseFloat(item['rating'])} starRatedColor="red" starDimension="15px" starSpacing="2px"/>
                    <p>{item['des']}</p>
                    </li>
                    })
                ):(<span></span>)
            }

        </ul>
    );
};

export default Reviews;