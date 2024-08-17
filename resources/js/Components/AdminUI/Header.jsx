import React, {useRef, useState} from 'react';
import SideNavBar from "@/Components/AdminUI/SideNavBar";
import logo from "../../../home_asset/common/logo.png";
import profile from "../../../home_asset/common/avature.png";
import {usePage} from "@inertiajs/react";
import {useInternalLink} from "@/Library/Helper";

export default function Header (){
    const { auth } = usePage().props
    const user = auth.user
    const companys = auth.company


    return (
        <>
            <div className="iq-sidebar">
                <div className="iq-sidebar-logo d-flex justify-content-between">
                    <a href="#" className="header-logo">
                        <img src={companys?useInternalLink(companys?.company_logo):logo} className="img-fluid rounded-normal" alt=""/>
                        <div className="logo-title">
                            <span className="text-uppercase">{companys?companys.name:"Am Fashion"}</span>
                        </div>
                    </a>
                    <div className="iq-menu-bt-sidebar">
                        <div className="iq-menu-bt align-self-center">
                            <div className="wrapper-menu">
                                <div className="main-circle"><i className="las la-bars"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sidebar-scrollbar">
                    <SideNavBar/>
                </div>
            </div>
        </>
    );
}
