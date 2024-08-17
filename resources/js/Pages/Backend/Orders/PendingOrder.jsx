import React, {useState} from 'react';
import {Head, useForm} from "@inertiajs/react";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import PageLink from "@/Components/Srceen/pagelink";
import SearchAndFilter from "@/Components/SearchPagination/SearchAndFilter";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CustomPagination from "@/Components/SearchPagination/CustomPagination";
import {inertiaErrorMessage, labelNameRSt, successMessage, ucwords, useInternalLink} from "@/Library/Helper";
import DropdownActionButton from "@/Components/FormShare/DropdownActionBtn";
import OrderViewModel from "@/Pages/Backend/Orders/OrderViewModel";
import {Button, Col, Modal, Row} from "react-bootstrap";
import InputError from "@/Components/InputError";
import {ModalFormTopLabel} from "@/Components/FormShare/ModalFormTopLabel";

export default function PendingOrder ({orders}){
    const [isLoading,setIsLoading] = useState(false);
    const order = orders.data
    var route_link = "invoice_order.pending"

    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [modalView, setModalView] = useState({ isOpen: false, action: '', id: null });
    const [orderDetails, setOrderDetails] = useState([]);
    const [show, setShow] = useState(false);
    const [editIdData,setEditIdData] = useState(false);
    const [orderLogs, setOrderLogs] = useState([]);

    const { data, setData, errors, processing, post, reset,delete: destroy} = useForm({
        name:'',invoice_id:'',invoice_amount:'',shipping_charge:'', parcel_shipping_details:'', note:'', delivery_date:'', status:'',
    });

    const submit = (e) => {
        e.preventDefault();
        let message ="Customer Order Update Success";
        let url = route('invoice_order.update',editIdData);

        post((url), {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: (data) => {
                setIsLoading(false);
                successMessage(message);
                setShow(false);
                reset()
            },
            onError: (err) => {
                inertiaErrorMessage(err)
                setIsLoading(false);
                setShow(false);
            }
        });
    };

    // console.log(data);

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

        if (action=="circle"){
            setShow(true)
            setEditIdData(id)
            const data_edit = order.filter((type) => type.id === id)
            setData(data => ({ ...data, invoice_id: data_edit[0]?.id}));
            setData(data => ({ ...data, name: data_edit[0]?.customer?.user?.name}));
            setData(data => ({ ...data, invoice_amount: data_edit[0]?.invoice_amount}));
            setData(data => ({ ...data, shipping_charge: data_edit[0]?.shipping_charge}));
            setData(data => ({ ...data, parcel_shipping_details: data_edit[0]?.parcel_shipping_details}));
            setData(data => ({ ...data, delivery_date: data_edit[0]?.delivery_date}));
            setData(data => ({ ...data, note: data_edit[0]?.note}));
            setData(data => ({ ...data, status: data_edit[0]?.status}));
            const {order_details_logs} = data_edit[0];
            setOrderLogs(order_details_logs)
        };
    };

    const handleClose = () => {
        reset()
        setShow(false);
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
                <Head title="Pending Order list" />

                <CircleSpinnerOverlay
                    loading={isLoading}
                    overlayColor="rgba(0,153,255,0.2)"
                    size={30}
                />

                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <PageLink props={"Pending Order Lists"}/>
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
                                                                circle={true}
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

                <Modal size="lg" show={show}  onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Customer Order Update</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(e)=>submit(e)}>
                        <Modal.Body>
                            <Row className="mb-3">
                                <ModalFormTopLabel label="Customer name" type="text" xs="12" mdl="6" mdin="6" id="name" name="name" value={data.name} readOnly={true}/>

                                <ModalFormTopLabel label="invoice_amount" type="number" xs="12" mdl="6" mdin="6" id="invoice_amount" name="invoice_amount" value={data.invoice_amount} onChange={(e) => setData('invoice_amount', e.target.value)} error={errors?.invoice_amount} readOnly={true}/>

                                <ModalFormTopLabel label="shipping_charge" type="number" xs="12" mdl="6" mdin="6" id="shipping_charge" name="shipping_charge" value={data.shipping_charge} onChange={(e) => setData('shipping_charge', e.target.value)} error={errors?.shipping_charge}/>

                                <ModalFormTopLabel label="order note" type="text" xs="12" mdl="6" mdin="6" id="note" name="note" value={data.note} readOnly={true}/>


                                <ModalFormTopLabel className="text-danger" label="delivery_date" type="date" xs="12" mdl="6" mdin="6" id="delivery_date" name="delivery_date" value={data.delivery_date?data.delivery_date:""} onChange={(e) => setData('delivery_date', e.target.value)} error={errors?.delivery_date} required={true}/>

                                <Col xs={12} md={6}>
                                    <label> {labelNameRSt("delivery status")} <strong className="text-danger ml-1"> *</strong></label>
                                    <select name="status" className="form-control" onChange={(e) => setData('status', e.target.value)} value={data?.status} style={{fontSize:'13px',color:'black'}} required={true}>
                                        <option value="" disabled={data?.status ? null : true} >Select Status</option>
                                        <option value="1">{ucwords('pending')}</option>
                                        <option value="2">{ucwords('process')}</option>
                                        <option value="3">{ucwords('delivery')}</option>
                                        <option value="4">{ucwords('success')}</option>
                                        <option value="5">{ucwords('return')}</option>
                                    </select>
                                    {errors && <InputError message={errors.status} />}
                                </Col>

                                <Col xs={12} md={12}>
                                    <label> {labelNameRSt("parcel_shipping_details")} <strong className="text-danger ml-1"> *</strong></label>

                                    <textarea className="form-control mb-3" aria-label="With textarea" style={{height: 80}} placeholder="Parcel Shipping Details" id="parcel_shipping_details" onChange={(e) => setData('parcel_shipping_details', e.target.value)} value={data.parcel_shipping_details?data.parcel_shipping_details:""} required={true}> </textarea>
                                    {errors && <InputError message={errors?.parcel_shipping_details} />}
                                </Col>
                            </Row>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" disabled={processing}>
                                Update
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>

            </AuthenticatedLayout>
        </>
    );
}

