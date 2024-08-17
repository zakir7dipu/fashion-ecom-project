import React from 'react';
import AdminLayout from "@/AdminLayout/AdminLayout";
import Header from "@/Components/AdminUI/Header";
import TopNav from "@/Components/AdminUI/TopNav";
import Footer from "@/Components/AdminUI/Footer";


export default function Authenticated({children}) {
    return (
        <AdminLayout>
            <div className="wrapper">

                <Header/>

                <TopNav/>

                {children}
            </div>
            <Footer/>
        </AdminLayout>
    );
}
