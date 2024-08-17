import React, {useEffect, useState} from 'react';
import UserAuthLayout from "@/Layouts/UserAuthLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { Col, Container, Row } from "react-bootstrap";
import Style from "./Order.module.css";
import Card from "react-bootstrap/Card";
import AllOrderComponent from "@/Pages/Frontend/Customer/Orders/AllOrderComponent";
import {uid} from "@/Library/Helper.js";
import TabSection from "@/Pages/Backend/Orders/TabSection/index.jsx";
import {router} from "@inertiajs/react";
import {pickBy} from "lodash";

export default function Index({ orders}) {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState('5 order');
    const [tabKey, setTabKey] = useState('all');
    const [orderInvoices, setOrderInvoices] = useState([]);

    const tabSections = [
        {
            name: "all",
            tabKey: "all",
            childSection: <AllOrderComponent orderInvoices={orderInvoices}/>
        },
        {
            name: "processing",
            tabKey: "processing",
            childSection: <AllOrderComponent orderInvoices={orderInvoices}/>
        },
        {
            name: "completed",
            tabKey: "completed",
            childSection: <AllOrderComponent orderInvoices={orderInvoices}/>
        }
    ]

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        let search = event.target.value
        getData(search)
    };

    const handleSelect = (eventKey) => {
        let orderTabs = document.querySelectorAll(".cOrderTabs")
        Array.from(orderTabs).map((tab) => {
            setTabKey(eventKey)
            getDataPage(eventKey)
            tab.dataset.id === eventKey?
                tab.classList.remove("d-none")
                : tab.classList.add("d-none")
        })
    }

    const currentYear = new Date().getFullYear();

    const getData = (search) =>{
        router.get(route('customer.orders'),
            pickBy({
                search:search,
                pageTab:tabKey
            })
            ,{
                preserveScroll:true,
                preserveState:true,
            });
    }

    const getDataPage = (eventKey) =>{
        router.get(route('customer.orders'),
            pickBy({
                search:selectedOption,
                pageTab:eventKey
            })
            ,{
                preserveScroll:true,
                preserveState:true,
            });
    }

    useEffect(() => {
        if (orders){
            setOrderInvoices(orders?.customer?.order_invoices)
        }
    }, [orders]);

    return (
        <UserAuthLayout>
            <Head title="User Order Info" />
            <CircleSpinnerOverlay
                loading={isLoading}
                overlayColor="rgba(0,153,255,0.2)"
                size={30}
            />

            <Container className="mb-5">
                <Row className="g-4">
                    <Card.Title className={Style.cardTitleAddress}>My Order History</Card.Title>

                    <TabSection navItems={tabSections} tabSelect={handleSelect}/>

                    <div className={Style.formRow}>
                        <label htmlFor="selectInput">Show:</label>
                            <select id="selectInput" name="selectInput" value={selectedOption} onChange={(e) => handleSelectChange(e)}>
                            <option value="5 order">Last 05 Orders</option>
                            <option value="15 days">Last 15 Days</option>
                            <option value="30 days">Last 30 Days</option>
                            <option value="3 month">Last 03 Month</option>
                            <option value="6 month">Last 06 Month</option>
                            <option value="last year">Order Place In {currentYear}</option>
                            <option value="all">All Orders </option>
                        </select>
                    </div>

                    {tabSections.map((item, i) => {
                        const {tabKey,  childSection} = item
                        return (
                            <div
                                data-id={tabKey && tabKey}
                                className={`${i === 0 ? "" : "d-none"} cOrderTabs`}
                                key={uid()}
                            >{childSection && childSection}</div>
                        )
                    })}
                </Row>
            </Container>
        </UserAuthLayout>
    );
}
