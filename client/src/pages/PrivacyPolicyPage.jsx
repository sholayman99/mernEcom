import React, {useEffect} from 'react';
import FeatureStore from "../store/FeatureStore.js";
import Layout from "../components/layout/Layout.jsx";
import LegalContext from "../components/feature/LegalContext.jsx";

const PrivacyPolicyPage = () => {
    const {LegalListRequest} = FeatureStore();

    useEffect(() => {
        (async ()=>{
            await LegalListRequest('privacy');
        })()
    }, []);

    return (
        <Layout>
            <LegalContext />
        </Layout>
    );
};

export default PrivacyPolicyPage;