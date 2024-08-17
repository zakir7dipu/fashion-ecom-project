import React, {useEffect} from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import google from '../../../home_asset/images/Google__G__logo.png';
import {route} from "ziggy-js";
import {Col, Container, Form} from "react-bootstrap";
import Style from "./Login.module.css"
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import appIcon from "../../../home_asset/images/Logo (1).png";
import BottomNav from "@/Pages/Frontend/BottomNav/index.jsx";

function Login({status, canResetPassword}) {

    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head>
                <title>Login</title>
                <meta head-key="description" name="description" content="This is the default description" />
                <meta head-key="keywords" name="keywords"
                      content="ecommerce, Fashion store, clean, minimal, modern, online store, responsive, retail, shopping, ecommerce store"/>
                <link rel="icon" type="image/svg+xml" href={appIcon} />
            </Head>

            <Container fluid>
                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                <Col lg={5} className="col-12 mx-auto mt-5 text-center">
                    <h2 className={Style.pageTitle}>Login</h2>
                </Col>
                <Col lg={5} className="col-12 mx-auto ">
                    <Form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Phone Number/Email Address" className="mb-2"/>

                            <TextInput
                                id="email"
                                type="text"
                                name="email"
                                placeholder={"Email Address"}
                                value={data.email}
                                className="form-control border border-dark"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-1 text-danger"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" className="mb-2"/>

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                placeholder={"Password"}
                                value={data.password}
                                className="form-control border border-dark"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-1 text-danger"/>
                        </div>

                        <Col className="mt-4 d-flex flex-column">
                            <PrimaryButton className="btn btn-dark" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </Col>

                        <div className="mt-2 d-flex justify-content-between">
                            {canResetPassword && (
                                <Link
                                    // href={route('password.request')}
                                    className={Style.forgotPasswordBtn}
                                >
                                    Forgot your password?
                                </Link>
                            )}
                            <Link
                                href={route('register')}
                                className={Style.createAccountBtn}
                            >
                                Create Account
                            </Link>
                        </div>
                    </Form>

                    <div className={Style.pageOr}>OR</div>
                    <button type="button" className={Style.googleLoginBtn}>
                        <img src={google} alt="Google logo" className='img-fluid me-2'/>
                        Login with Google
                    </button>
                </Col>
            </Container>

            <BottomNav/>
        </GuestLayout>
    );
}

export default Login;
