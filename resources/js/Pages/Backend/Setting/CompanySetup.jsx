import React, {useEffect, useRef, useState} from 'react';
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import {Modal,Button, Col, Row} from 'react-bootstrap';
import {ModalForm} from "@/Components/FormShare/ModalForm";
import InputError from "@/Components/InputError";
import {
    errorMessage,
    inertiaErrorMessage,
    infoMessage, labelNameRSt,
    successMessage,
    ucwords,
    useInternalLink
} from "@/Library/Helper";
import PageLink from "@/Components/Srceen/pagelink";
import {InputForm} from "@/Components/FormShare/InputForm";
import {TagsInput} from "react-tag-input-component";

import { Editor } from 'primereact/editor';

export default function CompanySetup({ companies }) {

    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [modelTitle, setModelTitle] = useState("Create Company Setup");
    const [modelFooter, setModelFooter] = useState("Save");
    const [editIdData, setEditIdData] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [requiredStatus, setRequiredStatus] = useState(true);
    const [socialLink, setSocialLink] = useState([]);

    const { data, setData, errors, processing, post, reset, delete: destroy } = useForm({
        name: "", address: "", contact: "", payment_no: "", email: "", social_link: "", company_logo: "", trending: "", trending_image: ""
    });

    // console.log(data);

    const submit = (e) => {
        e.preventDefault();
        let message, url;
        if (!isEdit) {
            message = "Company Setup Save Success";
            url = route('company.store');
        } else {
            message = "Company Setup Update Success";
            url = route('company.update', editIdData);
        }

        post(url, {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: (data) => {
                setIsLoading(false);
                successMessage(message);
                setShow(false);
                setIsEdit(false);
                reset();
            },
            onError: (err) => {
                inertiaErrorMessage(err);
                setIsLoading(false);
                setShow(false);
            }
        });
    };

    const EditHandler = (editId) => {
        setShow(true);
        setEditIdData(editId);
        setIsEdit(true);
        setModelTitle("Update Company Setup");
        setModelFooter("Update");
        setData(data => ({
            ...data,
            name: companies.name,
            address: companies.address,
            contact: companies.contact,
            payment_no: companies.payment_no,
            email: companies.email,
            trending: companies.trending
        }));

        const colorsString = companies?.social_link;
        if (colorsString) {
            const colorsArray = colorsString.split(",");
            setSocialLink(colorsArray);
        }
        setRequiredStatus(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        reset();
        setShow(false);
        setModelTitle("Create Company Setup");
        setModelFooter("Save");
        setRequiredStatus(true);
    };

    useEffect(() => {
        setData(data => ({ ...data, social_link: socialLink }));
    }, [socialLink]);

    const [selectedCompanyLogo, setSelectedCompanyLogo] = useState(null);
    const [selectedImageUrlLogo, setSelectedImageUrlLogo] = useState("");
    const companyLogoHandle = (e) => {
        setSelectedCompanyLogo(e.target.files[0]);
        setData('company_logo', e.target.files[0]);
        setSelectedImageUrlLogo(URL.createObjectURL(e.target.files[0]));
    };

    const [selectedTrendImage, setSelectedTrendImage] = useState(null);
    const [selectedImageUrlTrend, setSelectedImageUrlTrend] = useState("");
    const trendImageHandle = (e) => {
        setSelectedTrendImage(e.target.files[0]);
        setData('trending_image', e.target.files[0]);
        setSelectedImageUrlTrend(URL.createObjectURL(e.target.files[0]));
    };

    const socialLinkHandle = (row) => {
        const colorsString = row?.social_link;
        if (colorsString) {
            const colorsArray = colorsString.split(",");
            return colorsArray.map(item => (
                <span key={item} className="badge bg-primary m-1">{item}</span>
            ));
        }
    };

    const [editorState, setEditorState] = useState('');

    const handleEditorChange = (value) => {
        setEditorState(value);
    };

    const HtmlContent = (trending) => {
        const content = trending || '';
        return (
            <span dangerouslySetInnerHTML={{ __html: content }} />
        );
    };



    return (
        <>
            <AuthenticatedLayout>
                <Head title="Companies Setup" />

                <CircleSpinnerOverlay
                    loading={isLoading}
                    overlayColor="rgba(0,153,255,0.2)"
                    size={30}
                />

                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <PageLink props={"Companies Details"} />
                                <div className="iq-card">
                                    <div className="iq-card-header text-right">
                                        {companies ?
                                            <button className="btn btn-primary btn-sm mr-2 mb-2" onClick={() => EditHandler(companies?.id)}>
                                                <i className="las la-plus"></i> &nbsp; Edit Company
                                            </button>
                                            :
                                            <button className="btn btn-primary btn-sm mr-2 mb-2" onClick={handleShow}>
                                                <i className="las la-plus"></i> &nbsp; Add Company
                                            </button>
                                        }
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-sm text-center table-striped">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="text-center">{labelNameRSt("name")}</th>
                                                    <th className="text-center">{labelNameRSt("address")}</th>
                                                    <th className="text-center">{labelNameRSt("email")}</th>
                                                    <th className="text-center">{labelNameRSt("payment_no")}</th>
                                                    <th className="text-center">{labelNameRSt("social_link")}</th>
                                                    <th className="text-center">{labelNameRSt("trending")}</th>
                                                    <th className="text-center">{labelNameRSt("trending_image")}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {companies && (
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex">
                                                                <img src={useInternalLink(companies?.company_logo)} alt="image" className="rounded-2 avatar avatar-55 img-fluid" />
                                                                <div className="d-flex flex-column ms-3 justify-content-center ml-2" style={{ fontSize: '14px', textAlign: 'left' }}>
                                                                    <h6 className="text-capitalize">{companies?.name}</h6>
                                                                    <span className="badge bg-success mr-2">{companies?.contact}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{ucwords(companies?.address)}</td>
                                                        <td>{ucwords(companies?.email)}</td>
                                                        <td>{ucwords(companies?.payment_no)}</td>
                                                        <td>{socialLinkHandle(companies)}</td>
                                                        <td>{HtmlContent(companies?.trending)}</td>
                                                        <td>
                                                            <img src={useInternalLink(companies?.trending_image)} alt="image" className=" avatar avatar-55 img-fluid" />
                                                        </td>
                                                    </tr>
                                                )}
                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{modelTitle}</Modal.Title>
                </Modal.Header>
                <form onSubmit={submit}>
                    <Modal.Body>
                        <Row>
                            <InputForm col_name="col-md-6" className="text-danger ml-1" type="text" label="company name" name="name" value={data?.name} onChange={(e) => setData('name', e.target.value)} error={errors?.name} required={true} />
                            <InputForm col_name="col-md-6" className="text-danger ml-1" type="text" label="address" name="address" value={data?.address} onChange={(e) => setData('address', e.target.value)} error={errors?.address} required={true} />
                            <InputForm col_name="col-md-6" className="text-danger ml-1" type="text" label="contact" name="contact" value={data?.contact} onChange={(e) => setData('contact', e.target.value)} error={errors?.contact} required={true} />
                            <InputForm col_name="col-md-6" className="text-danger ml-1" type="email" label="email address" name="email" value={data?.email} onChange={(e) => setData('email', e.target.value)} error={errors?.email} required={true} />
                            <InputForm col_name="col-md-6" className=" ml-1" type="text" label="payment_no" name="payment_no" value={data?.payment_no} onChange={(e) => setData('payment_no', e.target.value)} error={errors?.payment_no} />
                            <div className="col-md-6 mb-2">
                                <label htmlFor="social_link" className="form-label">{labelNameRSt("social_link")}</label>
                                <TagsInput
                                    value={socialLink}
                                    onChange={setSocialLink}
                                    name="social_link"
                                    placeHolder="Enter Social Link tags here"
                                    separators={[',', 'Enter']}
                                />
                                <em>Press comma or enter to add new tag</em>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label>{labelNameRSt("trending")}<strong className="text-danger ml-1"> *</strong></label>

                                <Editor value={data?.trending} onTextChange={(e) => setData('trending',e.htmlValue)} style={{ height: '200px' }} />

                                <InputError message={errors.trending} className="mt-2" />
                            </div>


                            <div className="col-md-6 mb-3">
                                <label>{labelNameRSt("company_logo")}<strong className="text-danger ml-1"> *</strong></label>
                                <input type="file" className="form-control" name="company_logo" onChange={companyLogoHandle} required={requiredStatus} />
                                {errors?.company_logo && <InputError message={errors.company_logo} />}
                                {selectedCompanyLogo &&
                                <img
                                    alt="not available"
                                    style={{ width: '70px', height: '70px', marginTop: '5px', objectFit: 'cover' }}
                                    src={selectedImageUrlLogo}
                                />
                                }
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>{labelNameRSt("trending_image 400X235")}<strong className="text-danger ml-1"> *</strong></label>
                                <input type="file" className="form-control" name="trending_image" onChange={trendImageHandle} required={requiredStatus} />
                                {errors?.trending_image && <InputError message={errors.trending_image} />}
                                {selectedTrendImage &&
                                <img
                                    alt="not available"
                                    style={{ width: '70px', height: '70px', marginTop: '5px', objectFit: 'cover' }}
                                    src={selectedImageUrlTrend}
                                />
                                }
                            </div>
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
        </>
    );
}
