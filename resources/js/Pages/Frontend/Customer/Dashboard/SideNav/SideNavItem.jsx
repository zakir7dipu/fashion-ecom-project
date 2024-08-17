import React, {createRef, useEffect, useRef} from 'react';
import Style from "@/Pages/Frontend/Customer/Dashboard/SideNav/SideNav.module.css";
import {route} from "ziggy-js";
import {Link, usePage} from "@inertiajs/react";

function SideNavItem({info}) {
    const linkRef = createRef();
    const {name, link} = info
    const {url} = usePage()

    function trimHostFromLink(link, host) {
        const regex = new RegExp(`\\b${host}\\b`, 'g');
        return link.replace(regex, '').trim();
    }

    const handleRemoveQueryParams = (url) => {
        const urlWithoutParams = url.split('?')[0];
        // window.history.replaceState({}, document.title, urlWithoutParams);
        return urlWithoutParams
    };

    useEffect(()=>{
        const currentLink = trimHostFromLink(link, window.location.origin);
        const userlink = handleRemoveQueryParams(url)
        if (userlink === currentLink) {
            linkRef.current.classList.add(Style.active)
        } else {
            linkRef.current.classList.remove(Style.active)
        }
    },[url])


    return (
        <Link
            ref={linkRef}
            className={Style.cDashSideNavLink}
            href={link}
        >
            <li className={Style.cDashSideNavItem}>{name}</li>
        </Link>
    );
}

export default SideNavItem;
