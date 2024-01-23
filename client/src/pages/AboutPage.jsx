import React, {useEffect} from 'react';
import Layout from "../components/layout/Layout.jsx";
import LegalContext from "../components/feature/LegalContext.jsx";
import FeatureStore from "../store/FeatureStore.js";

const AboutPage = () => {
    const {LegalListRequest} = FeatureStore();

    useEffect(() => {
        (async ()=>{
            await LegalListRequest('about');
        })()
    }, []);

    return (
        <Layout>
            <LegalContext />
        </Layout>
    );
};

export default AboutPage;