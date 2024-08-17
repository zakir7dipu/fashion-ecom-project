import React, { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import google from '../../../home_asset/images/Google__G__logo.png';

import { useInternalLink } from "@/Library/Helper";
import logo from "../../../home_asset/common/logo.png";
import AdminLayout from "@/AdminLayout/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesData, getCompanyData } from "@/Pages/reducers/CommonDataGetSlice";
import { route } from "ziggy-js";
import { Col, Container, Form, Row } from "react-bootstrap";
import Style from "@/Pages/Auth/Login.module.css";

export default function Login({ status, canResetPassword }) {
    const dispatch = useDispatch();
    const { isLoading, company, categories, error } = useSelector(state => state.commonData);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        dispatch(getCompanyData());
        dispatch(getCategoriesData());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin_login.store'));
    };

    return (
        <AdminLayout>
            <Head title="Admin Log in" />

            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Col md={6} lg={6} className="p-4 shadow-sm rounded">
                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                    <div className="text-center mb-4">
                        <a>
                            <img
                                src={company.length ? useInternalLink(company?.company_logo) : logo}
                                className="img-fluid rounded mb-3"
                                alt="logo"
                                width={80}
                                height={80}
                            />
                            <h3 className="fs-3" style={{ color: "black" }}>{company ? company.name : "Am Fashion"}</h3>
                        </a>
                    </div>

                    <Form onSubmit={submit}>
                        <Row className="mb-4">
                            <Col>
                                <InputLabel htmlFor="email" value="Phone Number/Email Address" className="mb-2" />

                                <TextInput
                                    id="email"
                                    type="text"
                                    name="email"
                                    placeholder="Email Address"
                                    value={data.email}
                                    className="form-control border border-dark"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-1 text-danger" />
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col>
                                <InputLabel htmlFor="password" value="Password" className="mb-2" />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={data.password}
                                    className="form-control border border-dark"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-1 text-danger" />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <PrimaryButton className="btn btn-success w-100" disabled={processing}>
                                    Log in
                                </PrimaryButton>
                            </Col>
                        </Row>

                        {/* Uncomment the following section if password reset link is needed */}
                        {/*<div className="text-center mt-3">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-danger text-decoration-none"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div>*/}
                    </Form>
                </Col>
            </Container>
        </AdminLayout>
    );
}
