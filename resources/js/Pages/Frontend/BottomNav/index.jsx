import React, {createRef, useEffect, useState} from 'react';
import Style from "./BottomNav.module.css"
import {route} from "ziggy-js";
import {Link, usePage} from "@inertiajs/react";
import {uid} from "@/Library/Helper.js";
import {MdOutlineHome, MdOutlineMenuOpen} from "react-icons/md";
import {CiGrid41, CiUser} from "react-icons/ci";
import {isObject} from "lodash";
import {IoCloseOutline} from "react-icons/io5";
import SideNav from "@/Pages/Frontend/Customer/Dashboard/SideNav/index.jsx";

const ClientNav = ({isShow, info}) => {
    const {user} = info;
    const wrapRef = createRef();

    useEffect(()=>{
        if(isShow) {
            wrapRef.current.classList.add(Style.activeNav)
            wrapRef.current.classList.add("slideInRight")
        } else {
            wrapRef.current.classList.remove(Style.activeNav)
            wrapRef.current.classList.remove("slideInRight")
        }
    },[isShow]);

    return (
        <div ref={wrapRef} className={`${Style.clientNavWrapper}`}>
            <div className={`${Style.clientNavHeader} d-lg-none`}>
                <span className={Style.title}>{user?.name}</span>
                <IoCloseOutline className={Style.closeBtn} onClick={e => {
                    event.preventDefault();
                    wrapRef.current.classList.remove(Style.activeNav)
                    wrapRef.current.classList.remove("slideInRight")
                }}/>
            </div>

            <div style={{margin: "20px 10px"}}>
                <SideNav />
            </div>
        </div>
    );
}

const CNavLinks = ({navData}) => {
    const {linkUrl, icon, customClass, name} = navData;
    const linkRef = createRef();
    const {url} = usePage()

    useEffect(() => {
        const currentLink = window.location.href
        if (linkUrl === currentLink) {
            linkRef.current.classList.add(Style.active)
        }
        else if(!linkUrl && currentLink.includes("user")) {
            linkRef.current.classList.add(Style.active)
        }
    }, [url])

    return (
        <Link
            ref={linkRef}
            href={linkUrl}
            className={customClass}
            onClick={e=>{
                !linkRef && e.preventDefault()
            }}
        >
            {icon}
            <span>{name}</span>
        </Link>
    )
}

function Index() {
    const {auth} = usePage().props
    const [isLogin, setLogin] = useState(false)
    const [isClientNavShow, setClientNavShow] = useState(false)

    const hrefUrl = [
        {
            linkUrl: route("home")+"/",
            icon: <MdOutlineHome
                fontSize={`24px`}
                fontWeight={`600`}
            />,
            name: "Home"
        },
        {
            linkUrl: route("mCategory"),
            icon: <CiGrid41
                fontSize={`24px`}
                fontWeight={`600`}
            />,
            name: "Categories"
        },
        {
            linkUrl: !isLogin && route('login'),
            icon: isLogin ? <MdOutlineMenuOpen
                    fontSize={`24px`}
                    fontWeight={`600`}
                    onClick={e=>{
                        e.preventDefault()
                        setClientNavShow(!isClientNavShow)
                    }}
                />:<CiUser
                    fontSize={`24px`}
                    fontWeight={`600`}
                />,
            name: isLogin ? "Menu":"Account"
        }
    ];

    useEffect(()=>{
        setLogin(isObject(auth?.user))
    },[auth?.user])

    return (
        <>
            {isObject(auth?.user) && <ClientNav isShow={isClientNavShow} info={auth}/>}
            <div className={`${Style.bottomNav} d-lg-none d-block`}>
                <ul className="p-0">
                    {hrefUrl.map((item, index) => {
                        return (
                            <li key={uid()} >
                                <CNavLinks
                                    navData={item}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
}

export default Index;
