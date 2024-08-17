import React, {useState} from 'react';
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import {Modal,Button, Col, Row} from 'react-bootstrap';
import {ModalForm} from "@/Components/FormShare/ModalForm";
import InputError from "@/Components/InputError";
import {
    errorMessage,
    inertiaErrorMessage,
    infoMessage,
    successMessage,
    ucwords,
    useInternalLink
} from "@/Library/Helper";
import PageLink from "@/Components/Srceen/pagelink";
import VirtualAlert from "@/Library/VirtualAlert";


export default function PaymentType ({ paymentTypes }) {
    const virtualAlert = new VirtualAlert()
    const [isLoading,setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [modelTitle, setModelTitle] = useState("Create Payment Types");
    const [modelFooter, setModelFooter] = useState("Save");
    const [editIdData,setEditIdData] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedImageOne, setSelectedImageOne] = useState(null);
    const [selectedImageUrlOne, setSelectedImageUrlOne] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const { data, setData, errors, processing, post, reset,delete: destroy} = useForm({
        'name':'', 'image':'', 'status':'', 'is_default':''
    });

    const submit = (e) => {
        e.preventDefault();
        let message,url
        if (!isEdit){
             message ="Payment Types Save Success";
             url = route('payment_type.store');
        }else{
             message ="Payment Types Update Success";
             url = route('payment_type.update',editIdData);
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
        setModelTitle("Update Payment Types")
        setModelFooter("Update")
        const data_edit = paymentTypes.filter((type) => type.id === editId)
        setData(data => ({ ...data, name: data_edit[0].name}));
        setData(data => ({ ...data, is_default: data_edit[0].is_default}));
        setData(data => ({ ...data, status: data_edit[0].status}));
        setIsChecked(data_edit[0].is_default==1?true:false)

    }

    const handleShow = () => {
        setShow(true);
        setIsChecked(false)
        setSelectedImageOne(null)
        setSelectedImageUrlOne(null)
    };

    const handleClose = () => {
        reset()
        setIsChecked(false)
        setShow(false);
        setSelectedImageOne(null)
        setSelectedImageUrlOne(null)
        setModelTitle("Create Payment Types")
        setModelFooter("Save")
    };

    const imageHandle = (e) =>{
        setSelectedImageOne(e.target.files[0]);
        setData('image',e.target.files[0]);
        setSelectedImageUrlOne(URL.createObjectURL(e.target.files[0]))
    }

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
            destroy(route('payment_type.destroy',editId), {
                onStart: () => {
                    setIsLoading(true)
                    infoMessage("Payment Types Delete Process")
                },
                onSuccess: (data) => {
                    setIsLoading(false)
                    successMessage("Payment Types Delete Success");
                    reset()
                },
                onError: () => {
                    setIsLoading(false)
                    console.log("data error");
                    errorMessage("Payment Types Delete Not Success !")
                }
            });
        }
    }

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        setData(data => ({ ...data, is_default: e.target.checked}));
    };

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Payment Types" />

                <CircleSpinnerOverlay
                    loading={isLoading}
                    overlayColor="rgba(0,153,255,0.2)"
                    size={30}
                />

                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <PageLink props={"Payment Types Lists"}/>
                                <div className="iq-card">
                                    <div className="iq-card-header text-right">
                                        <button className="btn btn-primary btn-sm mr-2 mb-2" onClick={(e)=>handleShow(e)}>
                                            <i className="las la-plus"></i> &nbsp; Add Payment Types
                                        </button>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive ">
                                            <table className="table table-bordered table-sm text-center table-striped">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="text-center">SL</th>
                                                    <th className="text-center">Name</th>
                                                    <th className="text-center">Image</th>
                                                    <th className="text-center">is default</th>
                                                    <th className="text-center">Status</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {paymentTypes.map((row,i)=>(
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{ucwords(row?.name)}</td>
                                                        <td><img src={useInternalLink(row?.image)} alt="" width={50}/></td>
                                                        <td>{row?.is_default?"Default":""}</td>
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



                <Modal size="md" show={show}  onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>{modelTitle}</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(e)=>submit(e)}>
                        <Modal.Body>

                            <ModalForm label="Payment Type name" type="text" xs="12" mdl="5" mdin="7" id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors?.name} required={true}/>

                            <Row className="mb-3">
                                <Col xs={12} md={5}>
                                    <label className="mt-2"><strong>{ucwords('payment icon')} : </strong></label>
                                </Col>
                                <Col xs={12} md={7}>
                                    <input type="file" className="form-control" name="image" onChange={imageHandle}/>
                                    {errors && <InputError message={errors.image} />}
                                    {selectedImageOne != null ?
                                        <img
                                            alt="not"
                                            width={"50px"}
                                            src={selectedImageUrlOne}
                                        />
                                        : ""}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col xs={12} md={5}>
                                    <label className="mt-2"><strong>{ucwords('Type Status')} : </strong></label>
                                </Col>
                                <Col xs={12} md={7}>
                                    <select name="status" className="form-control" onChange={(e) => setData('status', e.target.value)} value={data?.status} style={{fontSize:'13px',color:'black'}} required={true}>
                                        <option value="" disabled={data?.status ? null : true} >Select Status</option>
                                        <option value="1">{ucwords('active')}</option>
                                        <option value="2">{ucwords('inactive')}</option>
                                    </select>
                                    {errors && <InputError message={errors.status} />}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col xs={12} md={5}>
                                </Col>
                                <Col xs={12} md={7}>
                                    <div className="custome-checkbox">
                                        <input
                                            style={{ marginRight: "10px", marginTop: "10px"}}
                                            type="checkbox"
                                            name="condition"
                                            id="condition"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="" htmlFor="condition">
                                            <span>Default</span>
                                        </label>
                                    </div>
                                </Col>
                            </Row>

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
