import React, {useState} from 'react';
import {Head} from "@inertiajs/react";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import PageLink from "@/Components/Srceen/pagelink";
import SearchAndFilter from "@/Components/SearchPagination/SearchAndFilter";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CustomPagination from "@/Components/SearchPagination/CustomPagination";
import {labelNameRSt, ucwords, useInternalLink} from "@/Library/Helper";
import DropdownActionButton from "@/Components/FormShare/DropdownActionBtn";

export default function CustomerList ({customers}){
    const [isLoading,setIsLoading] = useState(false);
    const customer = customers.data
    var route_link = "customer.index"

    // console.log(customer)

    //toggle view btn
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const handleToggle = (id) => {
        setOpenDropdownId(prevState => (prevState === id ? null : id));
    };

    const handleEditAction = (action, id) => {
        // if (action=="edit"){
        //     get(route('product_list.edit',id))
        // };
    };

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Customer list" />

                <CircleSpinnerOverlay
                    loading={isLoading}
                    overlayColor="rgba(0,153,255,0.2)"
                    size={30}
                />

                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <PageLink props={"Customer Lists"}/>
                                <div className="iq-card">
                                    <SearchAndFilter maindata={customers} route_link={route_link}/>
                                    <div className="card-body" style={{padding:'5px'}}>
                                        <div className="table-responsive ">
                                            <table className="table table-bordered table-sm text-center table-striped">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="text-center">SL</th>
                                                    <th className="text-center">Name</th>
                                                    <th className="text-center">Phone</th>
                                                    <th className="text-center">{ucwords("email")}</th>
                                                    <th className="text-center">{ucwords("address")}</th>
                                                    <th className="text-center">{labelNameRSt("district")}</th>
                                                    <th className="text-center">{labelNameRSt("post_code")}</th>
                                                    <th className="text-center">{labelNameRSt("Affiliate_code")}</th>
                                                    {/*<th className="text-center">Action</th>*/}
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {customer.map((row,i)=>(
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{ucwords(row?.user?.name)}</td>
                                                        <td>{ucwords(row?.phone)}</td>
                                                        <td>{(row?.email)}</td>
                                                        <td>{ucwords(row?.address)}</td>
                                                        <td>{ucwords(row?.district)}</td>
                                                        <td>{(row?.post_code)}</td>
                                                        <td>{(row?.slug)}</td>
                                                        {/*<td>*/}
                                                        {/*    <DropdownActionButton*/}
                                                        {/*        id={row.id}*/}
                                                        {/*        isOpen={openDropdownId === row?.id}*/}
                                                        {/*        onToggle={() => handleToggle(row?.id)}*/}
                                                        {/*        onEditAction={handleEditAction}*/}
                                                        {/*        edit={true}*/}
                                                        {/*        view={true}*/}
                                                        {/*        del={true}*/}
                                                        {/*    />*/}
                                                        {/*</td>*/}
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <CustomPagination maindata={customers}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}

