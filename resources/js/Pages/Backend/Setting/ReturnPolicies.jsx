import React, {useState} from 'react';
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import {Modal,Button} from 'react-bootstrap';
import InputError from "@/Components/InputError";
import {inertiaErrorMessage, labelNameRSt, successMessage, ucwords} from "@/Library/Helper";
import PageLink from "@/Components/Srceen/pagelink";
import VirtualAlert from "@/Library/VirtualAlert";


export default function ReturnPolicies({ returnPolicies }) {
    const virtualAlert = new VirtualAlert()
    const [isLoading,setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [modelTitle, setModelTitle] = useState("Create Return Policies");
    const [modelFooter, setModelFooter] = useState("Save");
    const [editIdData,setEditIdData] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const { data, setData, errors, processing, post, reset,delete: destroy} = useForm({
        'offer_for_you':'','return_exchange_policy':''
    });

    const submit = (e) => {
        e.preventDefault();
        let message,url
        if (!isEdit){
            message ="Return Policies Save Success";
            url = route('return_policies.store');
        }else{
            message ="Return Policies Update Success";
            url = route('return_policies.update',editIdData);
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
        setModelTitle("Update Return Policies")
        setModelFooter("Update")
        const data_edit = returnPolicies.filter((type) => type.id === editId)
        setData(data => ({ ...data, offer_for_you: data_edit[0].offer_for_you}));
        setData(data => ({ ...data, return_exchange_policy: data_edit[0].return_exchange_policy}));
    }

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        reset()
        setShow(false);
        setModelTitle("Create Return Policies")
        setModelFooter("Save")
    };

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Return Policies List" />

                <CircleSpinnerOverlay
                    loading={isLoading}
                    overlayColor="rgba(0,153,255,0.2)"
                    size={30}
                />

                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <PageLink props={"Return Policies Lists"}/>
                                <div className="iq-card">
                                    <div className="iq-card-header text-right">
                                        <button className="btn btn-primary btn-sm mr-2 mb-2" onClick={(e)=>handleShow(e)}>
                                            <i className="las la-plus"></i> &nbsp; Add Return Policies
                                        </button>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive ">
                                            <table className="table table-bordered table-sm text-center table-striped">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="text-center">SL</th>
                                                    <th className="text-center">Offer For</th>
                                                    <th className="text-center">Exchange Policy</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {returnPolicies.map((row,i)=>(
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{ucwords(row?.offer_for_you)}</td>
                                                        <td>{ucwords(row?.return_exchange_policy)}</td>
                                                        <td style={{width:'102px'}}>
                                                            <button className="btn btn-sm bg-success mr-2" onClick={()=>{EditHandler(row.id)}}> <i className="ri-pencil-line"></i></button>
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

                            <div className="mb-2">
                                <label> {labelNameRSt("offer_for_you")} <strong className="text-danger ml-1"> * </strong></label>

                                <textarea className="form-control" aria-label="With textarea" style={{height: 100}} placeholder={labelNameRSt("offer_for_you")} id="offer_for_you" onChange={(e) => setData('offer_for_you', e.target.value)} value={data.offer_for_you} required={true}> </textarea>

                                {errors && <InputError message={errors?.offer_for_you} />}
                            </div>

                            <div className="mb-2">
                                <label> {labelNameRSt("return_exchange_policy")} <strong className="text-danger ml-1"> *</strong></label>

                                <textarea className="form-control" aria-label="With textarea" style={{height: 100}} placeholder={labelNameRSt("return_exchange_policy")} id="return_exchange_policy" onChange={(e) => setData('return_exchange_policy', e.target.value)} value={data.return_exchange_policy} required={true}> </textarea>
                                {errors && <InputError message={errors?.return_exchange_policy} />}
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
