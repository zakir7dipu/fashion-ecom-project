
import {Head } from '@inertiajs/react';
import {usePage} from "@inertiajs/react";
import React from "react";
import dashboard01 from "../../../../admin_asset/images/dashboard/01.jpg";
import PageLink from "@/Components/Srceen/pagelink";
import AdminAuthenticated from "@/AdminLayout/AdminAuthenticatedLayout";

export default function MainDashboard({ }) {
    const { auth } = usePage().props
    return (
        <>
            <Head title="Welcome" />

            <AdminAuthenticated
                user={auth.user}
            >
                <Head title="Dashboard" />

                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <PageLink props={"Welcome To Dashboard"}/>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-sm-6 col-lg-6 col-xl-3">
                                        <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                            <div className="iq-card-body">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="iq-cart-text text-capitalize">
                                                        <p className="mb-0">
                                                            view
                                                        </p>
                                                    </div>
                                                    <div className="icon iq-icon-box-top rounded-circle bg-primary">
                                                        <i className="las la-eye"></i>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-3">
                                                    <h4 className=" mb-0">+24K</h4>
                                                    <p className="mb-0 text-primary"><span><i
                                                        className="fa fa-caret-down mr-2"></i></span>35%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-6 col-xl-3">
                                        <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                            <div className="iq-card-body">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="iq-cart-text text-capitalize">
                                                        <p className="mb-0 font-size-14">
                                                            Rated This App
                                                        </p>
                                                    </div>
                                                    <div className="icon iq-icon-box-top rounded-circle bg-warning">
                                                        <i className="lar la-star"></i>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-3">
                                                    <h4 className=" mb-0">+55K</h4>
                                                    <p className="mb-0 text-warning"><span><i
                                                        className="fa fa-caret-up mr-2"></i></span>50%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-6 col-xl-3">
                                        <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                            <div className="iq-card-body">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="iq-cart-text text-capitalize">
                                                        <p className="mb-0 font-size-14">
                                                            Downloaded
                                                        </p>
                                                    </div>
                                                    <div className="icon iq-icon-box-top rounded-circle bg-info">
                                                        <i className="las la-download"></i>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-3">
                                                    <h4 className=" mb-0">+1M</h4>
                                                    <p className="mb-0 text-info"><span><i
                                                        className="fa fa-caret-up mr-2"></i></span>80%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-6 col-xl-3">
                                        <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                            <div className="iq-card-body">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="iq-cart-text text-uppercase">
                                                        <p className="mb-0 font-size-14">
                                                            Visitors
                                                        </p>
                                                    </div>
                                                    <div className="icon iq-icon-box-top rounded-circle bg-success">
                                                        <i className="lar la-user"></i>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-3">
                                                    <h4 className=" mb-0">+2M</h4>
                                                    <p className="mb-0 text-success"><span><i
                                                        className="fa fa-caret-up mr-2"></i></span>80%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="iq-card">
                                    <div className="iq-card-header d-flex justify-content-between align-items-center">
                                        <div className="iq-header-title">
                                            <h4 className="card-title">Top Rated Item </h4>
                                        </div>
                                        <div id="top-rated-item-slick-arrow"
                                             className="slick-aerrow-block  iq-rtl-direction"></div>
                                    </div>
                                    <div className="iq-card-body">
                                        <ul className="list-unstyled row top-rated-item mb-0 iq-rtl-direction">
                                            <li className="col-sm-6 col-lg-4 col-xl-3 iq-rated-box mb-2">
                                                <div className="iq-card mb-0">
                                                    <div className="iq-card-body p-0">
                                                        <div className="iq-thumb">
                                                            <a href="#">
                                                                <img src={dashboard01}
                                                                     className="img-fluid w-100 img-border-radius" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="iq-feature-list">
                                                            <h6 className="font-weight-600 mb-0">The Last Breath</h6>
                                                            <p className="mb-0 mt-2">T.v show</p>
                                                            <div
                                                                className="d-flex align-items-center my-2 iq-ltr-direction">
                                                                <p className="mb-0 mr-2"><i
                                                                    className="lar la-eye mr-1"></i> 134</p>
                                                                <p className="mb-0 "><i
                                                                    className="las la-download ml-2"></i> 30 k</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="col-sm-6 col-lg-4 col-xl-3 iq-rated-box mb-2">
                                                <div className="iq-card mb-0">
                                                    <div className="iq-card-body p-0">
                                                        <div className="iq-thumb">
                                                            <a href="#">
                                                                <img src={dashboard01}
                                                                     className="img-fluid w-100 img-border-radius" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="iq-feature-list">
                                                            <h6 className="font-weight-600 mb-0">Last Night</h6>
                                                            <p className="mb-0 mt-2">Movie</p>
                                                            <div
                                                                className="d-flex align-items-center my-2 iq-ltr-direction">
                                                                <p className="mb-0 mr-2"><i
                                                                    className="lar la-eye mr-1"></i> 133</p>
                                                                <p className="mb-0 "><i
                                                                    className="las la-download ml-2"></i> 20 k</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="col-sm-6 col-lg-4 col-xl-3 iq-rated-box mb-2">
                                                <div className="iq-card mb-0">
                                                    <div className="iq-card-body p-0">
                                                        <div className="iq-thumb">
                                                            <a href="#">
                                                                <img src={dashboard01}
                                                                     className="img-fluid w-100 img-border-radius" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="iq-feature-list">
                                                            <h6 className="font-weight-600 mb-0">Jeon Woochie</h6>
                                                            <p className="mb-0 mt-2">Movie</p>
                                                            <div
                                                                className="d-flex align-items-center my-2 iq-ltr-direction">
                                                                <p className="mb-0 mr-2"><i
                                                                    className="lar la-eye mr-1"></i> 222</p>
                                                                <p className="mb-0 "><i
                                                                    className="las la-download ml-2"></i> 40 k</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="col-sm-6 col-lg-4 col-xl-3 iq-rated-box mb-2">
                                                <div className="iq-card mb-0">
                                                    <div className="iq-card-body p-0">
                                                        <div className="iq-thumb">
                                                            <a href="#">
                                                                <img src={dashboard01}
                                                                     className="img-fluid w-100 img-border-radius" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="iq-feature-list">
                                                            <h6 className="font-weight-600 mb-0">Dino Land</h6>
                                                            <p className="mb-0 mt-2">T.v show</p>
                                                            <div
                                                                className="d-flex align-items-center my-2 iq-ltr-direction">
                                                                <p className="mb-0 mr-2"><i
                                                                    className="lar la-eye mr-1"></i> 122</p>
                                                                <p className="mb-0 "><i
                                                                    className="las la-download ml-2"></i> 25 k</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="iq-card iq-card iq-card-block iq-card-stretch iq-card-height">
                                    <div className="iq-card-header">
                                        <div className="iq-header-title">
                                            <h4 className="card-title text-center">User's Of Product</h4>
                                        </div>
                                    </div>
                                    <div className="iq-card-body pb-0">
                                        <div id="view-chart-01">
                                        </div>
                                        <div className="row mt-1">
                                            <div className="col-sm-6 col-md-3 col-lg-6 iq-user-list">
                                                <div className="iq-card">
                                                    <div className="iq-card-body">
                                                        <div className="media align-items-center">
                                                            <div className="iq-user-box bg-primary"></div>
                                                            <div className="media-body text-white">
                                                                <p className="mb-0 font-size-14 line-height">New <br/>
                                                                    Customer
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-3 col-lg-6 iq-user-list">
                                                <div className="iq-card">
                                                    <div className="iq-card-body">
                                                        <div className="media align-items-center">
                                                            <div className="iq-user-box bg-warning"></div>
                                                            <div className="media-body text-white">
                                                                <p className="mb-0 font-size-14 line-height">Exsisting <br/>
                                                                    Subscriber
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-3 col-lg-6 iq-user-list">
                                                <div className="iq-card">
                                                    <div className="iq-card-body">
                                                        <div className="media align-items-center">
                                                            <div className="iq-user-box bg-info"></div>
                                                            <div className="media-body text-white">
                                                                <p className="mb-0 font-size-14 line-height">Daily<br/>
                                                                    Visitor's
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-3 col-lg-6 iq-user-list">
                                                <div className="iq-card">
                                                    <div className="iq-card-body">
                                                        <div className="media align-items-center">
                                                            <div className="iq-user-box bg-danger"></div>
                                                            <div className="media-body text-white">
                                                                <p className="mb-0 font-size-14 line-height">Extented <br/>
                                                                    Subscriber's
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </AdminAuthenticated>
        </>
    );
}
