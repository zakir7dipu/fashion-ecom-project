import React, {useEffect, useState} from 'react';
import logo from "../../../home_asset/common/logo.png";
import profile from "../../../home_asset/common/avature.png";

import {usePage} from "@inertiajs/react";
import {inertiaErrorMessage, successMessage, ucwords, useInternalLink} from "@/Library/Helper";
import {Link, useForm} from "@inertiajs/react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import {ModalForm} from "@/Components/FormShare/ModalForm";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import SideNavBar from "@/Components/AdminUI/SideNavBar";
import InputError from "@/Components/InputError";

export default function TopNav (){
    const { auth } = usePage().props
    const user = auth.user
    const companys = auth.company


    const [isLoading,setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [modelTitle, setModelTitle] = useState("User Profile Update");
    const [modelFooter, setModelFooter] = useState("Update");
    const [selectedImageOne, setSelectedImageOne] = useState(null);
    const [selectedImageUrlOne, setSelectedImageUrlOne] = useState("");
    const [editIdData,setEditIdData] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [iconClass, setIconClass] = useState('las la-bars');

    const { data, setData, errors, processing, post, reset} = useForm({
        'name':'','email':'','password':'','image':''
    });


    const submit = (e) => {
        e.preventDefault();
        post((route('profile.update',editIdData)), {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: (data) => {
                setIsLoading(false);
                successMessage("User Profile Update Success");
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


    const ProfileImage = () =>{
        if (auth.user==null){
            return profile
        }else{
            if (auth.user.image==null){
                return profile
            }else{
                return  useInternalLink(auth.user.image)
            }
        }
    }

    const imageHandle = (e) =>{
        setSelectedImageOne(e.target.files[0]);
        setData('image',e.target.files[0]);
        setSelectedImageUrlOne(URL.createObjectURL(e.target.files[0]))
    }

    const handleShow = () => {
        setShow(true);
        setData(data => ({ ...data, name: user.name}));
        setData(data => ({ ...data, email: user.email}));
        setEditIdData(user.id)
    };

    const handleClose = () => {
        reset()
        setShow(false);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        document.body.classList.toggle('sidebar-main', !sidebarOpen);
        changeIconHandle(!sidebarOpen);
    };

    const changeIconHandle = (isOpen) => {
        if (isOpen) {
            setIconClass('las la-bars');
        } else {
            setIconClass('fa fa-angle-double-right');
        }
    };

    return (
        <>
            <CircleSpinnerOverlay
                loading={isLoading}
                overlayColor="rgba(0,153,255,0.2)"
                size={30}
            />

            <div className={`iq-sidebar ${sidebarOpen ? 'sidebar-visible' : ''}`}>
                <div className="iq-sidebar-logo d-flex justify-content-between">
                    <a href="#" className="header-logo">
                        <img src={companys?useInternalLink(companys?.company_logo):logo} className="img-fluid rounded-normal" alt=""/>
                        <div className="logo-title">
                            <span className="text-warning text-uppercase">{companys?companys.name:"Am Fashion"}</span>
                        </div>
                    </a>
                    <div className="iq-menu-bt-sidebar">
                        <div className="iq-menu-bt align-self-center">
                            <div className={`wrapper-menu ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                                <div className="main-circle"><i className={`${iconClass}`}></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sidebar-scrollbar">
                    <SideNavBar toggleSidebar={toggleSidebar} changeIconHandle={changeIconHandle} />
                </div>
            </div>
            <div className="iq-top-navbar">
                <div className="iq-navbar-custom">
                    <nav className="navbar navbar-expand-lg navbar-light p-0">
                        <div className="iq-menu-bt d-flex align-items-center">
                            <div className={`wrapper-menu ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                                <div className="main-circle"><i className="las la-bars"></i></div>
                            </div>
                            <div className="iq-navbar-logo d-flex justify-content-between">
                                <a href="#" className="header-logo">
                                    <img src={companys?useInternalLink(companys?.company_logo):logo} className="img-fluid rounded-normal" alt=""/>
                                    <div className="logo-title">
                                        <span className="text-white text-uppercase">{companys?companys.name:"Am Fashion"}</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="iq-search-bar ml-auto">
                            <form action="#" className="searchbox mt-2">
                                <input type="text" className="text search-input" placeholder="Search Here..."/>
                                <a className="search-link" href="#"><i className="ri-search-line"></i></a>
                            </form>
                        </div>
                        <div className=" navbar-collapse" id="navbarSupportedContent" style={{visibility: 'visible'}}>
                            <ul className="navbar-nav ml-auto navbar-list" >
                                <li className="line-height pt-2">
                                    <a href="#" className="search-toggle iq-waves-effect d-flex align-items-center">
                                        <img src={ProfileImage()} className="img-fluid rounded-circle mr-3"
                                             alt="user"/>
                                    </a>
                                    <div className="iq-sub-dropdown iq-user-dropdown">
                                        <div className="iq-card shadow-none m-0">
                                            <div className="iq-card-body p-0 ">
                                                <div className="bg-primary p-3">
                                                    <h5 className="mb-0 text-white line-height">{ucwords(auth?.user?.name?auth?.user?.name:"Name")}</h5>
                                                    <span className="text-white font-size-12">Available</span>
                                                </div>
                                                {/*<a href="#" className="iq-sub-card iq-bg-primary-hover">*/}
                                                {/*    <div className="media align-items-center">*/}
                                                {/*        <div className="rounded iq-card-icon iq-bg-primary">*/}
                                                {/*            <i className="ri-file-user-line"></i>*/}
                                                {/*        </div>*/}
                                                {/*        <div className="media-body ml-3">*/}
                                                {/*            <h6 className="mb-0 ">My Profile</h6>*/}
                                                {/*            <p className="mb-0 font-size-12">View personal profile*/}
                                                {/*                details.</p>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*</a>*/}
                                                <a href="#" className="iq-sub-card iq-bg-primary-hover" onClick={(e)=>handleShow(e)}>
                                                    <div className="media align-items-center">
                                                        <div className="rounded iq-card-icon iq-bg-primary">
                                                            <i className="ri-profile-line"></i>
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0 ">Edit Profile</h6>
                                                            <p className="mb-0 font-size-12">Modify your personal
                                                                details.</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <div className="d-inline-block w-100 text-center p-3">
                                                    <Link href={route('logout')} method="post" as="button" className="bg-primary iq-sign-btn"> Sign out<i className="ri-login-box-line ml-2"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>

            <Modal size="md" show={show}  onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{modelTitle}</Modal.Title>
                </Modal.Header>
                <form onSubmit={(e)=>submit(e)}>
                    <Modal.Body>

                        <ModalForm label="user name" type="text" xs="12" mdl="5" mdin="7" id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors?.name} required={true}/>

                        <ModalForm label="user email" type="email" xs="12" mdl="5" mdin="7" id="email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} error={errors?.email} required={true}/>

                        <ModalForm label="user password" type="password" xs="12" mdl="5" mdin="7" id="password" name="password" value={data.password} onChange={(e) => setData('password', e.target.value)} error={errors?.password}/>

                        <Row className="mb-3">
                            <Col xs={12} md={5}>
                                <label className="mt-2"><strong>{ucwords('image')} : </strong></label>
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
        </>
    );
}
