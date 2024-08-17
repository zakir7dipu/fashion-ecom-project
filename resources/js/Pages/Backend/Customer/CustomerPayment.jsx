import React, {useState} from 'react';
import {Head} from "@inertiajs/react";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import PageLink from "@/Components/Srceen/pagelink";
import SearchAndFilter from "@/Components/SearchPagination/SearchAndFilter";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CustomPagination from "@/Components/SearchPagination/CustomPagination";
import {labelNameRSt, ucwords, useInternalLink} from "@/Library/Helper";
import DropdownActionButton from "@/Components/FormShare/DropdownActionBtn";

export default function CustomerPayment ({orders}){
    const [isLoading,setIsLoading] = useState(false);
    const order = orders.data
    var route_link = "customer.payment"


    return (
        <>
            <AuthenticatedLayout>
                <Head title="Customer Payment Collection" />

                <CircleSpinnerOverlay
                    loading={isLoading}
                    overlayColor="rgba(0,153,255,0.2)"
                    size={30}
                />

                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <PageLink props={"Customer Payment Collection"}/>
                                <div className="iq-card">
                                    <SearchAndFilter maindata={orders} route_link={route_link}/>
                                    <div className="card-body" style={{padding:'5px'}}>
                                        <div className="table-responsive ">
                                            <table className="table table-bordered table-sm text-center table-striped">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="text-center">SL</th>
                                                    <th className="text-center">Name</th>
                                                    <th className="text-center">Phone</th>
                                                    <th className="text-center">{labelNameRSt("date")}</th>
                                                    <th className="text-center">{ucwords("invoice")}</th>
                                                    <th className="text-center">{labelNameRSt("payment type")}</th>
                                                    <th className="text-center">{ucwords("amount")}</th>
                                                    <th className="text-center">{labelNameRSt("shipping")}</th>
                                                    <th className="text-center">{labelNameRSt("payment")}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {order.map((row,i)=>(
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{ucwords(row?.customer?.user?.name)}</td>
                                                        <td>{ucwords(row?.customer?.phone)}</td>
                                                        <td>{(row?.delivery_date)}</td>
                                                        <td>{ucwords(row?.invoice)}</td>
                                                        <td>{ucwords(row?.customer_payment?.payment_type_setting?.name)}</td>
                                                        <td>{(row?.invoice_amount)}</td>
                                                        <td>{(row?.shipping_charge)}</td>
                                                        <td>{parseInt(row?.invoice_amount) + parseInt(row?.shipping_charge)}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <CustomPagination maindata={orders}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}

