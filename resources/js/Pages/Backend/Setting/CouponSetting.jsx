import React, {useState} from 'react';
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import {Modal,Button, Col, Row} from 'react-bootstrap';
import InputError from "@/Components/InputError";
import {errorMessage, inertiaErrorMessage, infoMessage, labelNameRSt, successMessage, ucwords} from "@/Library/Helper";
import PageLink from "@/Components/Srceen/pagelink";
import VirtualAlert from "@/Library/VirtualAlert";
import {InputForm} from "@/Components/FormShare/InputForm";


export default function CouponSetting ({ coupons }) {
    const virtualAlert = new VirtualAlert()
    const [isLoading,setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [modelTitle, setModelTitle] = useState("Create Coupon Setting");
    const [modelFooter, setModelFooter] = useState("Save");
    const [editIdData,setEditIdData] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [readOnlyPercent, setReadOnlyPercent] = useState(false);
    const [readOnly, setReadOnly] = useState(false);

    const { data, setData, errors, processing, post, reset,delete: destroy} = useForm({
        'coupon_name':"", 'order_count':"", 'order_amount':"", 'coupon_percent':"",'coupon_fixed_amount':"", 'details':"", 'coupon_validity_date':"", 'status':""
    });

    const submit = (e) => {
        e.preventDefault();
        let message,url
        if (!isEdit){
             message ="Coupon Setting Save Success";
             url = route('coupon.store');
        }else{
             message ="Coupon Setting Update Success";
             url = route('coupon.update',editIdData);
        }

        post((url), {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: (data) => {
                setIsLoading(false);
                successMessage(message);
                setShow(false);
                setIsEdit(false)
                reset()
            },
            onError: (err) => {
                inertiaErrorMessage(err)
                setIsLoading(false);
                setShow(false);
            }
        });
    };

    const EditHandler = (editId) =>{
        setEditIdData(editId);
        setShow(true);
        setIsEdit(true)
        setModelTitle("Update Coupon Setting")
        setModelFooter("Update")
        const data_edit = coupons.filter((type) => type.id === editId)
        setData(data => ({ ...data, coupon_name: data_edit[0].coupon_name}));
        // setData(data => ({ ...data, order_count: data_edit[0].order_count}));
        setData(data => ({ ...data, order_amount: data_edit[0].order_amount}));
        setData(data => ({ ...data, coupon_percent: data_edit[0].coupon_percent}));
        setData(data => ({ ...data, coupon_fixed_amount: data_edit[0].coupon_fixed_amount}));
        setData(data => ({ ...data, details: data_edit[0].details}));
        setData(data => ({ ...data, coupon_validity_date: data_edit[0].coupon_validity_date}));
        setData(data => ({ ...data, status: data_edit[0].status}));
    }

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        reset()
        setShow(false);
        setModelTitle("Create Coupon Setting")
        setModelFooter("Save")
    };

    const statusHandle =(row)=>{
        if (row.status==="1"){
            return (
                <span className="badge bg-success mr-2"> Active</span>
            )
        }else{
            return (
                <span className="badge bg-primary mr-2"> Inactive</span>
            )
        }
    }

    const DeleteHandler = async (editId) =>{
        let {isConfirmed} = await virtualAlert.confirmAlert(`Are you sure?`, `Once you delete this you can't able to recover this data`);
        if (isConfirmed) {
            destroy(route('coupon.destroy',editId), {
                onStart: () => {
                    setIsLoading(true)
                    infoMessage("Coupon Setting Delete Process")
                },
                onSuccess: (data) => {
                    setIsLoading(false)
                    successMessage("Coupon Setting Delete Success");
                    reset()
                },
                onError: () => {
                    setIsLoading(false)
                    console.log("data error");
                    errorMessage("Coupon Setting Delete Not Success !")
                }
            });
        }
    }

    const handleCouponPercent = (e)=>{
        const couponPercent =  e.target.value
        setData('coupon_percent', couponPercent)
        if (couponPercent > 0){
            setReadOnly(true)
        }else{
            setReadOnly(false)
        }
    }

    const handleCouponFixed = (e)=>{
        const couponAmount =  e.target.value
        setData('coupon_fixed_amount', couponAmount)
        if (couponAmount > 0){
            setReadOnlyPercent(true)
        }else{
            setReadOnlyPercent(false)
        }
    }



    return (
        <>
            <AuthenticatedLayout>
                <Head title="Coupon Setting List" />

                <CircleSpinnerOverlay
                    loading={isLoading}
                    overlayColor="rgba(0,153,255,0.2)"
                    size={30}
                />

                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <PageLink props={"Coupon Setting Lists"}/>
                                <div className="iq-card">
                                    <div className="iq-card-header text-right">
                                        <button className="btn btn-primary btn-sm mr-2 mb-2" onClick={(e)=>handleShow(e)}>
                                            <i className="las la-plus"></i> &nbsp; Add Coupon
                                        </button>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive ">
                                            <table className="table table-bordered table-sm text-center table-striped">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="text-center">SL</th>
                                                    <th className="text-center">Coupon Name</th>
                                                    {/*<th className="text-center">{ucwords("order count")}</th>*/}
                                                    <th className="text-center">{ucwords("order amount")}</th>
                                                    <th className="text-center">{ucwords("coupon percent")}</th>
                                                    <th className="text-center">{labelNameRSt("coupon_fixed_amount")}</th>
                                                    <th className="text-center">{ucwords("details")}</th>
                                                    <th className="text-center">{ucwords("coupon validity date")}</th>
                                                    <th className="text-center">{ucwords("status")}</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {coupons.map((row,i)=>(
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{(row?.coupon_name)}</td>
                                                        {/*<td>{(row?.order_count)}</td>*/}
                                                        <td>{(row?.order_amount)}</td>
                                                        <td>{(row?.coupon_percent?row?.coupon_percent:"")+" % Discount"}</td>
                                                        <td>{(row?.coupon_fixed_amount?row?.coupon_fixed_amount:0)}</td>
                                                        <td>{ucwords(row?.details)}</td>
                                                        <td>{(row?.coupon_validity_date)}</td>
                                                        <td>{statusHandle(row)}</td>
                                                        <td style={{width:'102px'}}>
                                                            <button className="btn btn-sm bg-success mr-2" onClick={()=>{EditHandler(row.id)}}> <i className="ri-pencil-line"></i></button>
                                                            <button className="btn btn-sm bg-danger mr-2" onClick={()=>{DeleteHandler(row.id)}}> <i className="fa fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <Modal size="lg" show={show}  onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>{modelTitle}</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(e)=>submit(e)}>
                        <Modal.Body>
                            <div className="row">

                                <InputForm col_name="col-md-6" className="text-danger ml-1" type="text" label="coupon_name" name="coupon_name" value={data?.coupon_name} onChange={(e) => setData('coupon_name', e.target.value)} error={errors?.coupon_name} required={true}/>

                                {/*<InputForm col_name="col-md-6" className="ml-1" type="number" label="order_count" name="order_count" value={data?.order_count} onChange={(e) => setData('order_count', e.target.value)} error={errors?.order_count} />*/}

                                <InputForm col_name="col-md-6" className=" ml-1" type="number" label="order_amount" name="order_amount" value={data?.order_amount} onChange={(e) => setData('order_amount', e.target.value)} error={errors?.order_amount} />

                                <InputForm col_name="col-md-6" className="text-danger ml-1" type="number" label="coupon_percent" name="coupon_percent" value={data?.coupon_percent} onChange={(e) => handleCouponPercent(e)} error={errors?.coupon_percent} readOnly={readOnlyPercent} required={readOnlyPercent}/>

                                <InputForm col_name="col-md-6" className="text-danger ml-1" type="number" label="coupon_fixed_amount" name="coupon_fixed_amount" value={data?.coupon_fixed_amount} onChange={(e) => handleCouponFixed(e)} error={errors?.coupon_fixed_amount} readOnly={readOnly} required={readOnly}/>

                                <InputForm col_name="col-md-4" className=" ml-1" type="text" label="details" name="details" value={data?.details} onChange={(e) => setData('details', e.target.value)} error={errors?.details} />

                                <InputForm col_name="col-md-4" className="text-danger ml-1" type="date" label="coupon_validity_date" name="coupon_validity_date" value={data?.coupon_validity_date} onChange={(e) => setData('coupon_validity_date', e.target.value)} error={errors?.coupon_validity_date} required={true}/>

                                <div className="col-md-4 mb-2">
                                    <label> {labelNameRSt("coupon status")} <strong className="text-danger ml-1"> *</strong></label>
                                    <select name="status" className="form-control" onChange={(e) => setData('status', e.target.value)} value={data?.status} style={{fontSize:'13px',color:'black'}} required={true}>
                                        <option value="" disabled={data?.status ? null : true} >Select One</option>
                                        <option value="1">{ucwords('active')}</option>
                                        <option value="2">{ucwords('inactive')}</option>
                                    </select>
                                    {errors && <InputError message={errors?.status} />}
                                </div>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" disabled={processing}>
                                {modelFooter}
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </AuthenticatedLayout>

        </>
    );
}
