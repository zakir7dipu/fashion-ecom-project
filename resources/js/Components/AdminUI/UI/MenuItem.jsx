import React, {createRef, useEffect, useRef, useState} from 'react';
import {Link, usePage} from "@inertiajs/react";
import {labelNameRSt, ucwords} from "@/Library/Helper";


function MenuItem({icon, name, routeurl,weburl="null",toggleSidebar}) {

    const [activeUrl,setActiveUrl] = useState(false);
    const navRef = useRef(null)
    const fullpath = window.location.href


    useEffect(() => {
        const wordIndex = fullpath.search(weburl);
        if (wordIndex !== -1) {
            navRef.current.parentElement.parentElement.parentElement.classList.add("active")
            navRef.current.parentElement.parentElement.parentElement.classList.add("show")
            navRef.current.parentElement.parentElement.classList.add("active")
            navRef.current.parentElement.parentElement.classList.add("show")
            navRef.current.parentElement.classList.add("active")
            navRef.current.parentElement.classList.add("show")
            setActiveUrl(true)
        } else {
            setActiveUrl(false)
        }
    }, [fullpath])

    const handleClick = () => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            toggleSidebar();
        }
    };

    return (
        <>
            <li ref={navRef} className={activeUrl ? 'iq-waves-effect active active-menu' : 'iq-waves-effect'} onClick={handleClick}>
                <Link aria-current="page"  href={routeurl}>
                    <i className="icon" data-bs-toggle="tooltip" data-bs-placement="right"
                       aria-label={name} data-bs-original-title={name}>
                        {icon}
                    </i>
                    <span className="item-name">{labelNameRSt(name)}</span>
                </Link>
            </li>
        </>
    );
}

export default MenuItem;
