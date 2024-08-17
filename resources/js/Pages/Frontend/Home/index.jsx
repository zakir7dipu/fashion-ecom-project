import React, {useEffect, useState} from 'react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import {Head} from "@inertiajs/react";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import appIcon from "../../../../home_asset/images/Logo (1).png";
import BannerCarousel from "@/Pages/Frontend/Home/Carousel/index.jsx";
import NewArrival from "@/Pages/Frontend/Home/NewArrival/index.jsx";
import Trending from "@/Pages/Frontend/Home/Trending/index.jsx";
import ProductShowcase from "@/Pages/Frontend/Home/ProductShowcase/index.jsx";
import BulkOrder from "@/Pages/Frontend/Home/BulkOrder/index.jsx";
import PartnerShowcase from "@/Pages/Frontend/Home/PartnerShowcase/index.jsx";
import NewsLetter from "@/Pages/Frontend/Home/NewsLetter/index.jsx";
import BottomNav from "@/Pages/Frontend/BottomNav/index.jsx";

function Index(props) {
    const [isLoading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <GuestLayout>
            <Head>
                <title>Welcome to</title>
                <meta head-key="description" name="description" content="This is the default description" />
                <meta head-key="keywords" name="keywords"
                      content="ecommerce, Fashion store, clean, minimal, modern, online store, responsive, retail, shopping, ecommerce store"/>
                <link rel="icon" type="image/svg+xml" href={appIcon} />
            </Head>

            <CircleSpinnerOverlay
                loading={isLoading}
                overlayColor="rgba(0,153,255,0.2)"
                size={30}
            />

            <BannerCarousel/>

            <NewArrival isMCat={false}/>

            <Trending/>

            <ProductShowcase/>

            <BulkOrder/>

            <PartnerShowcase/>

            <NewsLetter/>

            <BottomNav/>

        </GuestLayout>
    );
}

export default Index;
