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


export default function HomeSlider ({sliders}) {

    const virtualAlert = new VirtualAlert()
    const [isLoading,setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [modelTitle, setModelTitle] = useState("Create Home Slider");
    const [modelFooter, setModelFooter] = useState("Save");
    const [editIdData,setEditIdData] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedImageOne, setSelectedImageOne] = useState(null);
    const [selectedImageUrlOne, setSelectedImageUrlOne] = useState(null);

    const { data, setData, errors, processing, post, reset,delete: destroy} = useForm({
         'name':'','image':''
    });


    const submit = (e) => {
        e.preventDefault();
        let message,url
        if (!isEdit){
             message ="Home Slider Save Success";
             url = route('home_slider.store');
        }else{
             message ="Home Slider Update Success";
             url = route('home_slider.update',editIdData);
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
        setModelTitle("Update Home Slider")
        setModelFooter("Update")
        const data_edit = sliders.filter((type) => type.id === editId)
        setData(data => ({ ...data, name: data_edit[0].name}));

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
        setModelTitle("Create Home Slider")
        setModelFooter("Save")
    };


    const imageHandle = (e) =>{
        setSelectedImageOne(e.target.files[0]);
        setData('image',e.target.files[0]);
        setSelectedImageUrlOne(URL.createObjectURL(e.target.files[0]))
    }

    const DeleteHandler = async (editId) =>{
        let {isConfirmed} = await virtualAlert.confirmAlert(`Are you sure?`, `Once you delete this you can't able to recover this data`);
        if (isConfirmed) {
            destroy(route('home_slider.destroy',editId), {
                onStart: () => {
                    setIsLoading(true)
                    infoMessage("Home Slider Delete Process")
                },
                onSuccess: (data) => {
                    setIsLoading(false)
                    successMessage("Home Slider Delete Success");
                    reset()
                },
                onError: () => {
                    setIsLoading(false)
                    console.log("data error");
                    errorMessage("Home Slider Delete Not Success !")
                }
            });
        }
    }

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Home Slider" />

                <CircleSpinnerOverlay
                    loading={isLoading}
                    overlayColor="rgba(0,153,255,0.2)"
                    size={30}
                />

                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <PageLink props={"Home Slider Lists"}/>
                                <div className="iq-card">
                                    <div className="iq-card-header text-right">
                                        <button className="btn btn-primary btn-sm mr-2 mb-2" onClick={(e)=>handleShow(e)}>
                                            <i className="las la-plus"></i> &nbsp; Add Home Slider
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
                                                    <th className="text-center">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {sliders.map((row,i)=>(
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{ucwords(row?.name)}</td>
                                                        <td><img src={useInternalLink(row?.image)} alt="image" width={300}/></td>
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

                            <ModalForm label="slider name" type="text" xs="12" mdl="5" mdin="7" id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors?.name} required={true}/>

                            <Row className="mb-3">
                                <Col xs={12} md={5}>
                                    <label className="mt-2"><strong>{ucwords('Slider Image 1920X900')} : </strong></label>
                                </Col>
                                <Col xs={12} md={7}>
                                    <input type="file" className="form-control" name="image" onChange={imageHandle} required={true}/>
                                    {errors && <InputError message={errors.image} />}
                                    {selectedImageOne != null ?
                                        <img
                                            alt="not"
                                            width={100}
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
