import React, {useEffect} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';
// import BottomNav from "@/Pages/Frontend/Partials/BottomNav/index.jsx";
import {Col, Container, Form} from "react-bootstrap";
import Style from "@/Pages/Auth/Login.module.css";
import {route} from "ziggy-js";
import google from "../../../home_asset/images/Google__G__logo.png";

export default function Register() {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register"/>

            <Container fluid>
                <Col lg={5} className="col-12 mx-auto mt-5 text-center">
                    <h2 className={Style.pageTitle}>Create Account</h2>
                </Col>
                <Col lg={5} className="col-12 mx-auto ">
                    <Form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Your Name" className="mb-2"/>

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="form-control border border-dark"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Enter Your Name"
                            />

                            <InputError message={errors.name} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Phone Number" className="mb-2"/>

                            <TextInput
                                id="email"
                                type="tel"
                                name="phone"
                                value={data.phone}
                                className="form-control border border-dark"
                                autoComplete="username"
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                                placeholder="Enter Your Phone Number"
                            />

                            <InputError message={errors.phone} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email Address" className="mb-2"/>

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="form-control border border-dark"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                placeholder="Enter Your Email Address"
                            />

                            <InputError message={errors.email} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" className="mb-2"/>

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="form-control border border-dark"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />

                            <InputError message={errors.password} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="mb-2"/>

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="form-control border border-dark"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />

                            <InputError message={errors.password_confirmation} className="mt-2"/>
                        </div>

                        <div className="mt-4 d-flex flex-column">
                            <PrimaryButton className="btn btn-dark" disabled={processing}>
                                Register
                            </PrimaryButton>
                        </div>

                        <div className="mt-2">
                            <Link
                                href={route('login')}
                                className={Style.loginHereBtn}
                            >
                                Already Have an account <span>Login Here</span>
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

            {/*<BottomNav/>*/}
        </GuestLayout>
    );
}
