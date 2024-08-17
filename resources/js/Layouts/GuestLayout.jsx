import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/guest_style.css";
import 'react-loading-skeleton/dist/skeleton.css'
import TopHeader from "@/Pages/Frontend/Partials/Header/TopHeader/index.jsx";
import MenuTop from "@/Pages/Frontend/Partials/Header/MenuTop/index.jsx";
import Footer from "@/Pages/Frontend/Partials/Footer/Footer.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function GuestLayout({ children }) {

    return (
        <div id="app">
            {/*header section */}
            <header>
                <TopHeader/>
                {/*<Header company={company} categories={categories}/>*/}
                <MenuTop
                    // company={company} categories={categories}
                />
            </header>
            {/*header section */}

            {children}

            <Footer/>
        </div>
    );
}
