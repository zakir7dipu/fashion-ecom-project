import React from 'react';
import {Link, usePage} from "@inertiajs/react";
import {route} from "ziggy-js";
import Style from "./SideNav.module.css";
import SideNavItem from "@/Pages/Frontend/Customer/Dashboard/SideNav/SideNavItem.jsx";
import {uid} from "@/Library/Helper";
import {useSelector} from "react-redux";

export default function Index() {
    const {navLinks} = useSelector((state) => state.clientNav);

    return (
        <ul className={Style.cDashSideNav}>

            {
                navLinks.map(item =>
                    <SideNavItem
                        key={uid()}
                        info={item}
                    />
                )
            }

            <Link
                className={Style.cDashSideNavLink}
                href={route('logout')}
                method="post"
                as="button"
            >
                <li className={Style.cDashSideNavItem}>Logout</li>
            </Link>

            {/*<Link*/}
            {/*    className={Style.cDashSideNavLink}*/}
            {/*    href={route('logout')}*/}
            {/*    method="post"*/}
            {/*>*/}
            {/*    <li className={Style.cDashSideNavItem}>Logout</li>*/}
            {/*</Link>*/}
        </ul>
    );
}
