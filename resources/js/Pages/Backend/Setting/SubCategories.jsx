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
import CustomPagination from "@/Components/SearchPagination/CustomPagination";
import SearchAndFilter from "@/Components/SearchPagination/SearchAndFilter";


export default function SubCategories ({ categories ,subcategories}) {
    const subcategorie = subcategories.data
    var route_link = "sub_categories.index"

    const virtualAlert = new VirtualAlert()
    const [isLoading,setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [modelTitle, setModelTitle] = useState("Create Sub Categories");
    const [modelFooter, setModelFooter] = useState("Save");
    const [editIdData,setEditIdData] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedImageOne, setSelectedImageOne] = useState(null);
    const [selectedImageUrlOne, setSelectedImageUrlOne] = useState(null);

    const { data, setData, errors, processing, post, reset,delete: destroy} = useForm({
        'categorie_id':'', 'name':'','new_arrival':'', 'status':'', 'image':'', 'home_show':''
    });


    const submit = (e) => {
        e.preventDefault();
        let message,url
        if (!isEdit){
             message ="Sub Categories Save Success";
             url = route('sub_categories.store');
        }else{
             message ="Sub Categories Update Success";
             url = route('sub_categories.update',editIdData);
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
        setModelTitle("Update Sub Categories")
        setModelFooter("Update")
        const data_edit = subcategorie.filter((type) => type.id === editId)
        setData(data => ({ ...data, categorie_id: data_edit[0].categorie_id}));
        setData(data => ({ ...data, name: data_edit[0].name}));
        setData(data => ({ ...data, status: data_edit[0].status}));
        setData(data => ({ ...data, new_arrival: data_edit[0].new_arrival}));
        setData(data => ({ ...data, home_show: data_edit[0].home_show}));

        setSelectedImageOne(data_edit[0].image);
        setSelectedImageUrlOne(useInternalLink(data_edit[0].image));
    }

    const handleShow = () => {
        setShow(true);
        setSelectedImageOne(null)
        setSelectedImageUrlOne(null)
    };

    const handleClose = () => {
        reset()
        setShow(false);
        setSelectedImageOne(null)
        setSelectedImageUrlOne(null)
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

    const newArrivalHandle =(arrival)=>{
        if (arrival=="1"){
            return (
                <span className="badge bg-success mr-2"> Yes</span>
            )
        }else{
            return (
                <span className="badge bg-primary mr-2"> No</span>
            )
        }
    }

    const homeShowHandle =(home_show)=>{
        if (home_show=="1"){
            return (
                <span className="badge bg-success mr-2"> Yes</span>
            )
        }else{
            return (
                <span className="badge bg-primary mr-2"> No</span>
            )
        }
    }

    const imageHandle = (e) =>{
        setSelectedImageOne(e.target.files[0]);
        setData('image',e.target.files[0]);
        setSelectedImageUrlOne(URL.createObjectURL(e.target.files[0]))
    }

    const DeleteHandler = async (editId) =>{
        let {isConfirmed} = await virtualAlert.confirmAlert(`Are you sure?`, `Once you delete this you can't able to recover this data`);
        if (isConfirmed) {
            destroy(route('sub_categories.destroy',editId), {
                onStart: () => {
                    setIsLoading(true)
                    infoMessage("Sub Categories Delete Process")
                },
                onSuccess: (data) => {
                    setIsLoading(false)
                    successMessage("Sub Categories Delete Success");
                    reset()
                },
                onError: () => {
                    setIsLoading(false)
                    console.log("data error");
                    errorMessage("Sub Categories Delete Not Success !")
                }
            });
        }
    }

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Sub Categories" />

                <CircleSpinnerOverlay
                    loading={isLoading}
                    overlayColor="rgba(0,153,255,0.2)"
                    size={30}
                />

                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <PageLink props={"Sub Categories Lists"}/>
                                <div className="iq-card">
                                    <div className="iq-card-header text-right">
                                        <button className="btn btn-primary btn-sm mr-2 mb-2" onClick={(e)=>handleShow(e)}>
                                            <i className="las la-plus"></i> &nbsp; Add Sub Categories
                                        </button>
                                    </div>
                                    <SearchAndFilter maindata={subcategories} route_link={route_link}/>
                                    <div className="card-body">
                                        <div className="table-responsive ">
                                            <table className="table table-bordered table-sm text-center table-striped">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="text-center">SL</th>
                                                    <th className="text-center">Name</th>
                                                    <th className="text-center">Categories</th>
                                                    <th className="text-center">New Arrival</th>
                                                    <th className="text-center">Home Screen</th>
                                                    <th className="text-center">Status</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {subcategorie.map((row,i)=>(
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <img src={useInternalLink(row?.image)} alt="image" className="rounded-2 avatar avatar-55 img-fluid"/>
                                                                <div className="d-flex flex-column ms-3 justify-content-center ml-2" style={{fontSize:'14px',textAlign:'left'}}>
                                                                    <h6 className="text-capitalize">{row?.name}</h6>
                                                                </div>
                                                            </div>

                                                        </td>
                                                        <td>{ucwords(row?.categorie?.name)}</td>
                                                        <td>{newArrivalHandle(row?.new_arrival)}</td>
                                                        <td>{homeShowHandle(row?.home_show)}</td>
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
                                        <CustomPagination maindata={subcategories}/>
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
                                    <label className="mt-1"><strong>{ucwords("categories type")} : </strong></label>
                                </Col>
                                <Col xs={12} md={7}>
                                    <select name="categorie_id" className="form-control" onChange={(e) => setData('categorie_id', e.target.value)} value={data?.categorie_id} required={true} style={{fontSize:'13px',color:'black'}}>

                                        <option value="" disabled={data?.categorie_id ? null : true} >Select One</option>
                                        {categories.map((row,i)=>(
                                            <option key={i} value={row?.id}>{row?.name}</option>
                                        ))}
                                    </select>
                                    {errors && <InputError message={errors.categorie_id} />}
                                </Col>
                            </Row>

                            <ModalForm label="Sub Categories name" type="text" xs="12" mdl="5" mdin="7" id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors?.name} required={true}/>


                            <Row className="mb-3">
                                <Col xs={12} md={5}>
                                    <label className="mt-2"><strong>{ucwords('new arrival Status')} : </strong></label>
                                </Col>
                                <Col xs={12} md={7}>
                                    <select name="new_arrival" className="form-control" onChange={(e) => setData('new_arrival', e.target.value)} value={data?.new_arrival} style={{fontSize:'13px',color:'black'}} required={true}>
                                        <option value="" disabled={data?.new_arrival ? null : true} >Select One</option>
                                        <option value="1">{ucwords('Yes')}</option>
                                        <option value="0">{ucwords('No')}</option>
                                    </select>
                                    {errors && <InputError message={errors.new_arrival} />}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col xs={12} md={5}>
                                    <label className="mt-2"><strong>{ucwords('home screen show')} : </strong></label>
                                </Col>
                                <Col xs={12} md={7}>
                                    <select name="home_show" className="form-control" onChange={(e) => setData('home_show', e.target.value)} value={data?.home_show} style={{fontSize:'13px',color:'black'}} required={true}>
                                        <option value="" disabled={data?.home_show ? null : true} >Select One</option>
                                        <option value="1">{ucwords('Yes')}</option>
                                        <option value="0">{ucwords('No')}</option>
                                    </select>
                                    {errors && <InputError message={errors.home_show} />}
                                </Col>
                            </Row>


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

                            <Row className="mb-3">
                                <Col xs={12} md={5}>
                                    <label className="mt-2"><strong>{ucwords('Sub Categories Image 400X400')} : </strong></label>
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
