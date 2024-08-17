import React, {createRef, useEffect, useState} from 'react';
import Style from "./Megamenu.module.css";
import {Col, Container, Row, Accordion} from "react-bootstrap";
import MobileMenuIcon from "@/Library/CustomIconLibrary/MobileMenuIcon.jsx";
import {useDispatch, useSelector} from "react-redux";

import {getCategoriesData, getCompanyData} from "@/Pages/reducers/CommonDataGetSlice";
import {route} from "ziggy-js";
import {Link, usePage} from "@inertiajs/react";
import {IoCloseOutline, IoMenu} from "react-icons/io5";
import CategoryItem from "@/Pages/Frontend/Partials/Header/MobileMenu/CategoryItem.jsx";
import {SlArrowDown, SlArrowRight} from "react-icons/sl";
import {IoMdAdd} from "react-icons/io";
import {CgMathMinus} from "react-icons/cg";

function Index() {
    const {categories} = usePage().props
    const menuData = categories.original;
    const dropdownRef = createRef()

    return (
        <ul className={Style.menuWrap}>
            <li>
                <a href="" className={Style.menuParent} onClick={e => e.preventDefault()}>
                    <span className={`d-none d-lg-inline ${Style.menuLinkTitle}`}>Shop</span>
                    <span className={`d-inline d-lg-none ${Style.mobileMenuIcon}`}>
                        <IoMenu
                            fontSize={`22px`}
                            onClick={e => {
                                event.preventDefault();
                                dropdownRef.current.style.display = "block"
                            }}/>
                    </span>
                </a>

                <div ref={dropdownRef} className={`${Style.menuDropdown} zoomIn`}>
                    <div className={`${Style.mobileMenuHeader} d-lg-none`}>
                        <span className={Style.title}>Categories</span>
                        <IoCloseOutline className={Style.closeBtn} onClick={e => {
                            event.preventDefault();
                            dropdownRef.current.style.display = "none"
                        }}/>
                    </div>

                    <Container fluid className={`${Style.megaMenuWrapper} d-none d-lg-block`}>
                        <Row className="g-3">
                            {menuData?.map((row, i) => (

                                <Col lg={4} className={Style.categoryItem} key={i}>
                                    <h4 className={Style.categoryTitle}><span
                                        className={Style.categoryTitleSpan}>{row?.name}</span></h4>
                                    <Row>
                                        {row?.sub_categories ?
                                            row?.sub_categories.map((row, k) => (
                                                <Col lg={6} key={k}>
                                                    <Link href={route('shop.product', row?.slug)}
                                                          className={Style.subCategoryItem}>{row?.name}</Link>
                                                    <ul className={Style.subCategoryChild}>
                                                        {row?.sub_sub_categorys.map((row, s) => (
                                                            <li key={s}><Link
                                                                href={route('shop.product_sub', row?.id)}>{row?.name}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Col>
                                            ))
                                            : ""
                                        }
                                    </Row>
                                </Col>
                            ))}
                        </Row>
                    </Container>

                    <Container fluid className={`${Style.mobileMenuWrapper} d-lg-none`}>
                        {menuData?.map((row, i) =>
                            <CategoryItem
                                category={row}
                                key={i}
                                icon={<SlArrowRight/>}
                                secondIcon={<SlArrowDown/>}
                                hasChild={2}
                            >
                                {row?.sub_categories?.map((sRow, k) =>
                                    <CategoryItem
                                        category={sRow}
                                        key={k}
                                        icon={<IoMdAdd/>}
                                        secondIcon={<CgMathMinus/>}
                                        hasChild={sRow?.sub_sub_categorys.length}
                                    >
                                        {sRow?.sub_sub_categorys &&
                                            <ul className={`${Style.mobileSubCategoryChild}`}>
                                                {sRow?.sub_sub_categorys?.map((sCRow, s) => (
                                                    <li key={s}><Link
                                                        href={route('shop.product_sub', sCRow?.id)}>{sCRow?.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                    </CategoryItem>)}
                            </CategoryItem>)}
                    </Container>
                </div>
            </li>
        </ul>
    );
}

export default Index;
