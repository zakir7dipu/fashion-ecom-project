import React, {useState} from 'react';
import {Head, useForm} from "@inertiajs/react";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import PageLink from "@/Components/Srceen/pagelink";
import SearchAndFilter from "@/Components/SearchPagination/SearchAndFilter";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CustomPagination from "@/Components/SearchPagination/CustomPagination";
import {labelNameRSt,  ucwords} from "@/Library/Helper";
import DropdownActionButton from "@/Components/FormShare/DropdownActionBtn";
import OrderViewModel from "@/Pages/Backend/Orders/OrderViewModel";

export default function CompleteOrder ({orders}){
    const [isLoading,setIsLoading] = useState(false);
    const order = orders.data
    var route_link = "invoice_order.complete"

    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [modalView, setModalView] = useState({ isOpen: false, action: '', id: null });
    const [orderDetails, setOrderDetails] = useState([]);


    const handleToggle = (id) => {
        setOpenDropdownId(prevState => (prevState === id ? null : id));
    };

    const handleCloseModalView = () => {
        setModalView({ isOpen: false, action: '', id: null });
    };

    const handleEditAction = (action, id) => {
        if (action=="view"){
            setModalView({ isOpen: true, action, id });
            const data_edit = order.filter((type) => type.id === id)
            setOrderDetails(data_edit[0])
        };
    };

    const statussHandle =(row)=>{
        if (row.status=="1"){
            return (
                <span className="badge bg-warning mr-2"> No payment</span>
            )
        }else if (row.status=="2"){
            return (
                <span className="badge bg-primary mr-2"> Processing</span>
            )
        }else if (row.status=="3"){
            return (
                <span className="badge bg-info mr-2"> Delivery</span>
            )
        }else if (row.status=="4"){
            return (
                <span className="badge bg-success mr-2"> Success</span>
            )
        }else{
            return (
                <span className="badge bg-danger mr-2"> Returned</span>
            )
        }
    }

    const couponAmountManage=(row)=>{
        return (
            <>
                <div className="d-flex">
                    <div className="d-flex flex-column ms-3 justify-content-center ml-2" style={{fontSize:'14px',textAlign:'left'}}>
                        <small className="text-capitalize">AF - {row.affiliate_amount_total > 0 ? row.affiliate_amount_total+" tk":"0"}</small>
                        <small className="text-capitalize">CU - {row.coupon_discount_amount > 0 ? row.coupon_discount_amount+" tk":"0"}</small>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Complete Order list" />

                <CircleSpinnerOverlay
                    loading={isLoading}
                    overlayColor="rgba(0,153,255,0.2)"
                    size={30}
                />

                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <PageLink props={"Complete Order Lists"}/>
                                <div className="iq-card">
                                    <SearchAndFilter maindata={orders} route_link={route_link}/>
                                    <div className="card-body" style={{padding:'5px'}}>
                                        <div className="table-responsive ">
                                            <table className="table table-bordered table-sm text-center table-striped">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="text-center">SL</th>
                                                    <th className="text-center">Customer</th>
                                                    <th className="text-center">Invoice</th>
                                                    <th className="text-center">{labelNameRSt("sale_price")}</th>
                                                    <th className="text-center">{ucwords("coupon")}</th>
                                                    <th className="text-center">{labelNameRSt("invoice_amount")}</th>
                                                    <th className="text-center">{labelNameRSt("shipping_charge")}</th>
                                                    <th className="text-center">{labelNameRSt("parcel_shipping_details")}</th>
                                                    <th className="text-center">{labelNameRSt("delivery_date")}</th>
                                                    <th className="text-center">{labelNameRSt("status")}</th>
                                                    <th className="text-center">{labelNameRSt("update_by")}</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                {order.map((row,i)=>(
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{ucwords(row?.customer?.user?.name)}</td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <div className="d-flex flex-column ms-3 justify-content-center ml-2" style={{fontSize:'14px',textAlign:'left'}}>
                                                                    <h6 className="text-capitalize">{row?.invoice}</h6>
                                                                    <small className="text-capitalize">{row?.delivery}</small>
                                                                    <small className="text-capitalize">{row?.note}</small>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{ucwords(row?.sale_price)}</td>
                                                        <td>{couponAmountManage(row)}</td>
                                                        <td>{(row?.invoice_amount)}</td>
                                                        <td>{(row?.shipping_charge)}</td>
                                                        <td>{(row?.parcel_shipping_details?row?.parcel_shipping_details:"")}</td>
                                                        <td>{(row?.delivery_date?row?.delivery_date:"")}</td>
                                                        <td>{statussHandle(row)}</td>
                                                        <td>{(row?.update_by?row?.update_by?.name:"")}</td>
                                                        <td>
                                                            <DropdownActionButton
                                                                id={row.id}
                                                                isOpen={openDropdownId === row?.id}
                                                                onToggle={() => handleToggle(row?.id)}
                                                                onEditAction={handleEditAction}
                                                                // edit={true}
                                                                view={true}
                                                                // circle={true}
                                                                // del={true}
                                                            />
                                                        </td>
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

                {modalView.isOpen && (
                    <OrderViewModel action={modalView.isOpen} invoiceOrder={orderDetails} id={modalView.id} onClose={handleCloseModalView} />
                )}

            </AuthenticatedLayout>
        </>
    );
}

