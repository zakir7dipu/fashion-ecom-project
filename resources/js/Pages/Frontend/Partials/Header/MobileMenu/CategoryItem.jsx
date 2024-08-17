import React, {createRef, useEffect, useState} from 'react';
import Style from "./CategoryItem.module.css";
import {IoMdAdd} from "react-icons/io";
import {Link} from "@inertiajs/react";
import {route} from "ziggy-js";

function CategoryItem({category, icon, secondIcon, children, hasChild}) {
    const {name, slug} = category
    const childrenRef = createRef();
    const [isActive, setActive] = useState(false)

    const accordionFeature = (e) => {
        e.preventDefault()
        if (hasChild > 0) setActive(!isActive);
    }

    useEffect(() => {
        if (isActive === true) {
            childrenRef.current.classList.remove("d-none")
            childrenRef.current.classList.add(Style.slideInDown)
        } else {
            childrenRef.current.classList.add(`d-none`)
            childrenRef.current.classList.remove(Style.slideInDown)
        }
    }, [isActive])

    return (
        <div className={Style.categoryItem}>
            <div className={Style.header} onClick={accordionFeature}>
                {
                    hasChild > 0 ?
                        <>
                            <h4 className={Style.title}>{name}</h4>
                            {
                                isActive ?
                                    <>{secondIcon}</>
                                    :
                                    <>{icon}</>
                            }
                        </>
                        :
                        <Link href={route('shop.product', slug)} className={Style.title}>{name}</Link>
                }
            </div>
            {children && <div className={`${Style.body} d-none`} ref={childrenRef}>{children}</div>}
        </div>
    );
}

export default CategoryItem;
