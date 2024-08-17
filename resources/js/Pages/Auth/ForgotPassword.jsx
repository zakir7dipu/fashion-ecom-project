import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, useForm} from '@inertiajs/react';
import {route} from "ziggy-js";
import {Col, Container, Form} from "react-bootstrap";
import Style from "@/Pages/Auth/Login.module.css";
import React from "react";
import InputLabel from "@/Components/InputLabel.jsx";

export default function ForgotPassword({status}) {
    const {data, setData, post, processing, errors} = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password"/>


            <Container fluid>
                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                <Col lg={5} className="col-12 mx-auto mt-5 text-center">
                    <h2 className={Style.pageTitle}>Reset Password</h2>
                </Col>
                <Col lg={5} className={`col-12 mx-auto ${Style.forgotPasswordForm}`}>
                    <Form onSubmit={submit} >
                        <InputLabel htmlFor="email" value="Phone Number/Email Address" className="mb-2"/>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="form-control border border-dark"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2"/>

                        <div className="mt-4 d-flex flex-column">
                            <PrimaryButton className="btn btn-dark" disabled={processing}>
                                Continue
                            </PrimaryButton>
                        </div>
                    </Form>
                </Col>
            </Container>
        </GuestLayout>
    );
}
