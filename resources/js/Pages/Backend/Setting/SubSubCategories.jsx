import React, {useState} from 'react';
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import {Modal,Button, Col, Row} from 'react-bootstrap';
import {ModalForm} from "@/Components/FormShare/ModalForm";
import InputError from "@/Components/InputError";
import {errorMessage, inertiaErrorMessage, infoMessage, successMessage, ucwords} from "@/Library/Helper";
import PageLink from "@/Components/Srceen/pagelink";
import VirtualAlert from "@/Library/VirtualAlert";
import CustomPagination from "@/Components/SearchPagination/CustomPagination";
import SearchAndFilter from "@/Components/SearchPagination/SearchAndFilter";


export default function SubSubCategories ({ subsubcategories ,subCategorie}) {
    const subsubCategorie = subsubcategories.data
    var route_link = "sub_sub_categories.index"

    const virtualAlert = new VirtualAlert()
    const [isLoading,setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [modelTitle, setModelTitle] = useState("Create Sub & Sub Categories");
    const [modelFooter, setModelFooter] = useState("Save");
    const [editIdData,setEditIdData] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const { data, setData, errors, processing, post, reset,delete: destroy} = useForm({
        'sub_categorie_id':'', 'name':'', 'status':''
    });

    // console.log(subsubCategorie);

    const submit = (e) => {
        e.preventDefault();
        let message,url
        if (!isEdit){
            message ="Sub Sub Categories Save Success";
            url = route('sub_sub_categories.store');
        }else{
            message ="Sub Sub Categories Update Success";
            url = route('sub_sub_categories.update',editIdData);
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
        setModelTitle("Update Sub & Sub Categories")
        setModelFooter("Update")
        const data_edit = subsubCategorie.filter((type) => type.id === editId)
        setData(data => ({ ...data, sub_categorie_id: data_edit[0].sub_categorie_id}));
        setData(data => ({ ...data, name: data_edit[0].name}));
        setData(data => ({ ...data, status: data_edit[0].status}));
    }

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        reset()
        setShow(false);
        setModelTitle("Create Sub Categories")
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
            destroy(route('sub_sub_categories.destroy',editId), {
                onStart: () => {
                    setIsLoading(true)
                    infoMessage("Sub & Sub Categories Delete Process")
                },
                onSuccess: (data) => {
                    setIsLoading(false)
                    successMessage("Sub & Sub Categories Delete Success");
                    reset()
                },
                onError: () => {
                    setIsLoading(false)
                    console.log("data error");
                    errorMessage("Sub & Sub Categories Delete Not Success !")
                }
            });
        }
    }


    return (
        <>
            <AuthenticatedLayout>
                <Head title="Sub & Sub Categories" />

                <CircleSpinnerOverlay
                    loading={isLoading}
                    overlayColor="rgba(0,153,255,0.2)"
                    size={30}
                />

                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <PageLink props={"Sub & Sub Categories Lists"}/>
                                <div className="iq-card">
                                    <div className="iq-card-header text-right">
                                        <button className="btn btn-primary btn-sm mr-2 mb-2" onClick={(e)=>handleShow(e)}>
                                            <i className="las la-plus"></i> &nbsp; Sub & Sub Categories
                                        </button>
                                    </div>
                                    <SearchAndFilter maindata={subsubcategories} route_link={route_link}/>
                                    <div className="card-body">
                                        <div className="table-responsive ">
                                            <table className="table table-bordered table-sm text-center table-striped">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="text-center">SL</th>
                                                    <th className="text-center">Categories</th>
                                                    <th className="text-center">Sub Categories</th>
                                                    <th className="text-center">Name</th>
                                                    <th className="text-center">Status</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {subsubCategorie.map((row,i)=>(
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{ucwords(row?.sub_categorie?.categorie?.name)}</td>
                                                        <td>{ucwords(row?.sub_categorie?.name)}</td>
                                                        <td>{ucwords(row?.name)}</td>
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
                                        <CustomPagination maindata={subsubcategories}/>
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

                            <Row className="mb-3">
                                <Col xs={12} md={5}>
                                    <label className="mt-1"><strong>{ucwords("sub categories type")} : </strong></label>
                                </Col>
                                <Col xs={12} md={7}>
                                    <select name="sub_categorie_id" className="form-control" onChange={(e) => setData('sub_categorie_id', e.target.value)} value={data?.sub_categorie_id} required={true} style={{fontSize:'13px',color:'black'}}>

                                        <option value="" disabled={data?.sub_categorie_id ? null : true} >Select One</option>
                                        {subCategorie.map((row,i)=>(
                                            <option key={i} value={row?.id}>{row?.name}</option>
                                        ))}
                                    </select>
                                    {errors && <InputError message={errors.sub_categorie_id} />}
                                </Col>
                            </Row>

                            <ModalForm label="Sub Categories name" type="text" xs="12" mdl="5" mdin="7" id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors?.name} required={true}/>

                            <Row className="mb-3">
                                <Col xs={12} md={5}>
                                    <label className="mt-2"><strong>{ucwords('Sub Categories Status')} : </strong></label>
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
