import React from 'react';
import FeatureStore from "../../store/FeatureStore.js";
import LegalSkeleton from "../../skeleton/LegalSkeleton.jsx";
import parse from "html-react-parser"


const LegalContext = () => {
    const {LegalList} = FeatureStore();

    if(LegalList === null){
        return <LegalSkeleton />
    }else{
        return (
            <div className={"container mt-2"}>
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <div className={"card p-4"}>
                            {
                             parse(LegalList[0]['description'])
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default LegalContext;