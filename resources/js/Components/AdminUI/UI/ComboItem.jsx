import React, {createRef, useEffect, useState} from 'react';
import {Link, usePage} from "@inertiajs/react";
import {FaChevronRight} from "react-icons/fa";


function ComboItem({icon, name, combourl, children}) {
    const parentRef = createRef()
    const childRef = createRef()
    const { url, component } = usePage()


    const [activeUrl,setActiveUrl] = useState(false);

    // console.log(url)
    // console.log(activeUrl)

    const navAction = (e) => {
        e.preventDefault()
        childRef.current.classList.toggle('show')
        childRef.current.closest("li").classList.toggle("active")
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (childRef.current && parentRef.current && !childRef.current.contains(event.target) && !parentRef.current.contains(event.target)) {
                childRef.current.classList.remove("show")
                childRef.current.closest("li").classList.remove("active")
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [childRef])


    // const web_url = children?.props?.children;
    //
    // useEffect(() => {
    //     if (web_url.length >0){
    //         web_url.map((arr,i) => {
    //             if (arr.props?.weburl==url){
    //                 setActiveUrl(arr.props?.weburl)
    //             }
    //         })
    //     }
    // }, [children])


    return (
        <li className='iq-submenu'>
            <Link href={combourl} className="iq-waves-effect collapsed" data-toggle="collapse"
                  aria-expanded="false" onClick={e=>navAction(e)}>
                {icon}
                <span className="item-name">{name}</span>
                <FaChevronRight className={`ri-arrow-right-s-line iq-arrow-right`}/>
            </Link>
            <ul ref={childRef} id="category" className='iq-submenu collapse' data-parent="#iq-sidebar-toggle" style={{visibility: 'visible'}}>
                {children}
            </ul>
        </li>
    );
}

export default ComboItem;


{/*<li className={url === activeUrl ? 'iq-submenu active show' : 'iq-submenu'}>*/}
{/*    <Link href={combourl} className="iq-waves-effect collapsed" data-toggle="collapse"*/}
{/*          aria-expanded="false" onClick={e=>navAction(e)}>*/}
{/*        {icon}*/}
{/*        <span className="item-name">{name}</span>*/}
{/*        <FaChevronRight className={`ri-arrow-right-s-line iq-arrow-right`}/>*/}
{/*    </Link>*/}
{/*    <ul ref={childRef} id="category" className={url === activeUrl ? 'iq-submenu collapse show' : 'iq-submenu collapse'} data-parent="#iq-sidebar-toggle" style={{visibility: 'visible'}}>*/}
{/*        {children}*/}
{/*    </ul>*/}
{/*</li> */}
