import React, {useState} from 'react';
import {Head} from "@inertiajs/react";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import PageLink from "@/Components/Srceen/pagelink";
import SearchAndFilter from "@/Components/SearchPagination/SearchAndFilter";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CustomPagination from "@/Components/SearchPagination/CustomPagination";
import {labelNameRSt, ucwords} from "@/Library/Helper";

export default function AffiliateProfit ({profits}){
    const [isLoading,setIsLoading] = useState(false);
    const profit = profits.data
    var route_link = "affiliate.profit"

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Affiliate Profits List" />

                <CircleSpinnerOverlay
                    loading={isLoading}
                    overlayColor="rgba(0,153,255,0.2)"
                    size={30}
                />

                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <PageLink props={"Affiliate Profits List"}/>
                                <div className="iq-card">
                                    <SearchAndFilter maindata={profits} route_link={route_link}/>
                                    <div className="card-body" style={{padding:'5px'}}>
                                        <div className="table-responsive ">
                                            <table className="table table-bordered table-sm text-center table-striped">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="text-center">SL</th>
                                                    <th className="text-center">Date</th>
                                                    <th className="text-center">Customer</th>
                                                    <th className="text-center">Invoice</th>
                                                    <th className="text-center">Product Price</th>
                                                    <th className="text-center">Affiliate ID</th>
                                                    <th className="text-center">Affiliate %</th>
                                                    <th className="text-center">Affiliate Amount</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                {profit.map((row,i)=>(
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{ucwords(row?.date)}</td>
                                                        <td>{ucwords(row?.user?.name)}</td>
                                                        <td>{ucwords(row?.order_invoice?.invoice)}</td>
                                                        <td>{row?.order_invoice?.sale_price}</td>
                                                        <td>{row?.user?.customer?.slug}</td>
                                                        <td>{row?.affiliate_percent} %</td>
                                                        <td>{row?.affiliate_amount} tk</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <CustomPagination maindata={profits}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}

