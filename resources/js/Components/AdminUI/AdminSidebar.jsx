import React from 'react';
import Style from "@/Components/AdminUI/UI/Sidebar.module.css";
import MenuItem from "@/Components/AdminUI/UI/MenuItem";
import {IoHomeOutline} from "react-icons/io5";
import ComboItem from "@/Components/AdminUI/UI/ComboItem";
import {FaCircleDollarToSlot} from "react-icons/fa6";
import {usePage} from "@inertiajs/react";

export default function AdminSidebar ({ toggleSidebar }){
    return (
        <>
            <nav className="iq-sidebar-menu">
                <ul id="iq-sidebar-toggle" className="iq-menu">
                    <li><a href={'/'} target="_blank" className=""><i className="ri-arrow-right-line"></i><span>Visit site</span></a>
                    </li>

                    <MenuItem
                        icon={<i className="fa fa-home" aria-hidden="true"></i>}
                        name={"Dashboard"}
                        routeurl={route('dashboard')}
                        weburl={'/admin/dashboard'}
                        toggleSidebar={toggleSidebar}
                    />

                    <MenuItem
                        icon={<i className="fa fa-solid fa-sliders"></i>}
                        name={"Company Setup"}
                        routeurl={route('company.index')}
                        weburl={'/admin/company'}
                        toggleSidebar={toggleSidebar}
                    />

                    <ComboItem
                        icon={<i className="fa fa-solid fa-gears"></i>}
                        name={"Product Setting"}
                        combourl={`#`}
                    >
                        <>
                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"add categories"}
                                routeurl={route('categories.index')}
                                weburl={'/admin/categories'}
                                toggleSidebar={toggleSidebar}
                            />

                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"sub categories"}
                                routeurl={route('sub_categories.index')}
                                weburl={'/admin/sub-categories'}
                                toggleSidebar={toggleSidebar}
                            />

                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"sub sub categories"}
                                routeurl={route('sub_sub_categories.index')}
                                weburl={'/admin/sub-sub-categories'}
                                toggleSidebar={toggleSidebar}
                            />
                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"Home Slider"}
                                routeurl={route('home_slider.index')}
                                weburl={'/admin/slider'}
                                toggleSidebar={toggleSidebar}
                            />

                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"return policies"}
                                routeurl={route('return_policies.index')}
                                weburl={'/admin/return/policies'}
                                toggleSidebar={toggleSidebar}
                            />

                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"payment setting"}
                                routeurl={route('payment_type.index')}
                                weburl={'/admin/payment/type'}
                                toggleSidebar={toggleSidebar}
                            />


                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"shipping"}
                                routeurl={route('shipping.index')}
                                weburl={'/admin/shipping/charge'}
                                toggleSidebar={toggleSidebar}
                            />

                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"coupon"}
                                routeurl={route('coupon.index')}
                                weburl={'/admin/coupon/index'}
                                toggleSidebar={toggleSidebar}
                            />
                        </>
                    </ComboItem>

                    <ComboItem
                        icon={<i className="fa fa-shopping-basket" aria-hidden="true" style={{fontSize:'17px'}}></i>}
                        name={"Ecommerce"}
                        combourl={`#`}
                    >
                        <>
                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"add product"}
                                routeurl={route('add_product.create')}
                                weburl={'/admin/add/product'}
                                toggleSidebar={toggleSidebar}
                            />


                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"product list"}
                                routeurl={route('product_list.index')}
                                weburl={'/admin/product/list'}
                                toggleSidebar={toggleSidebar}
                            />

                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"product stoke out"}
                                // toggleSidebar={toggleSidebar}
                                // routeurl={route('add_product.create')}
                                // weburl={'/admin/add/product'}
                            />

                        </>
                    </ComboItem>

                    <ComboItem
                        icon={<i className="fa fa-shopping-basket" aria-hidden="true" style={{fontSize:'17px'}}></i>}
                        name={"Orders"}
                        combourl={`#`}
                    >
                        <>
                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"invoice order"}
                                routeurl={route('invoice_order.index')}
                                weburl={'/admin/invoice/order'}
                                toggleSidebar={toggleSidebar}
                            />
                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"complete order"}
                                routeurl={route('invoice_order.complete')}
                                weburl={'/admin/order/complete'}
                                toggleSidebar={toggleSidebar}
                            />
                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"pending order"}
                                routeurl={route('invoice_order.pending')}
                                weburl={'/admin/order/pending'}
                                toggleSidebar={toggleSidebar}
                            />

                        </>
                    </ComboItem>

                    <ComboItem
                        icon={<i className="fa fa-shopping-basket" aria-hidden="true" style={{fontSize:'17px'}}></i>}
                        name={"Customers"}
                        combourl={`#`}
                    >
                        <>
                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"customer list"}
                                routeurl={route('customer.index')}
                                weburl={'/admin/customer/list'}
                                toggleSidebar={toggleSidebar}
                            />


                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"customer payment"}
                                routeurl={route('customer.payment')}
                                weburl={'/admin/customer/payment'}
                                toggleSidebar={toggleSidebar}
                            />

                            <MenuItem
                                icon={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                                name={"Affiliate Profit"}
                                routeurl={route('affiliate.profit')}
                                weburl={'/admin/customer/affiliate/profit'}
                                toggleSidebar={toggleSidebar}
                            />

                        </>
                    </ComboItem>

                </ul>
            </nav>
        </>
    );
}
