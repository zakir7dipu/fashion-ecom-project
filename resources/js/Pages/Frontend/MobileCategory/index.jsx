import React from 'react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import NewArrival from "@/Pages/Frontend/Home/NewArrival/index.jsx";
import BottomNav from "@/Pages/Frontend/BottomNav/index.jsx";
import appIcon from "../../../../home_asset/images/Logo (1).png";
import {Head} from "@inertiajs/react";

function Index() {
    return (
        <GuestLayout>
            <Head>
                <title>All New Categories</title>
                <meta head-key="description" name="description" content="This is the default description" />
                <meta head-key="keywords" name="keywords"
                      content="ecommerce, Fashion store, clean, minimal, modern, online store, responsive, retail, shopping, ecommerce store"/>
                <link rel="icon" type="image/svg+xml" href={appIcon} />
            </Head>

            <div style={{padding: '0 0 30px 0'}}>
                <NewArrival isMCat={true}/>
            </div>

            <BottomNav/>
        </GuestLayout>
    );
}

export default Index;
