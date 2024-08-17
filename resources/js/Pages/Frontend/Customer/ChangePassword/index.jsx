import React, { useState, useRef } from 'react';
import UserAuthLayout from "@/Layouts/UserAuthLayout";
import { Head, useForm } from "@inertiajs/react";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { Col, Container, Row } from "react-bootstrap";
import Style from "../Profile/Profile.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { InputFormUser } from "@/Components/FormShare/InputFormUser";
import { route } from "ziggy-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Index() {
    const [isLoading, setIsLoading] = useState(false);

    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <UserAuthLayout>
            <Head title="Change Password" />
            <CircleSpinnerOverlay
                loading={isLoading}
                overlayColor="rgba(0,153,255,0.2)"
                size={30}
            />

            <Container>
                <Row className="g-4">
                    <form onSubmit={updatePassword} encType="multipart/form-data">
                        <Col sm={12}>
                            <Card className={Style.card}>
                                <Card.Body className={Style.cardBody}>
                                    <Card.Title className={Style.cardTitleUser}>Change Your Password</Card.Title>

                                    <Row>
                                        <div className={`${Style.input_wrapper} col-md-12`}>
                                            <InputFormUser
                                                col_name="12"
                                                className="text-danger"
                                                type={showCurrentPassword ? "text" : "password"}
                                                label="Current Password"
                                                name="current_password"
                                                id="current_password"
                                                value={data.current_password}
                                                onChange={(e) => setData('current_password', e.target.value)}
                                                ref={currentPasswordInput}
                                                error={errors.current_password}
                                                required={true}
                                            />
                                            <FontAwesomeIcon
                                                icon={showCurrentPassword ? faEyeSlash : faEye}
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                className={Style.toggle_password_icon}
                                            />
                                        </div>

                                        <div className={`${Style.input_wrapper} col-md-6`}>
                                            <InputFormUser
                                                col_name="col-md-12"
                                                className="text-danger"
                                                type={showNewPassword ? "text" : "password"}
                                                label="New Password"
                                                name="password"
                                                ref={passwordInput}
                                                id="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                error={errors.password}
                                                autoComplete="new-password"
                                                required={true}
                                            />
                                            <FontAwesomeIcon
                                                icon={showNewPassword ? faEyeSlash : faEye}
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className={Style.toggle_password_icon}
                                            />
                                        </div>

                                        <div className={`${Style.input_wrapper} col-md-6`}>
                                            <InputFormUser
                                                col_name="col-md-12"
                                                className="text-danger"
                                                type={showConfirmPassword ? "text" : "password"}
                                                label="Confirm Password"
                                                name="password_confirmation"
                                                id="password_confirmation"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                error={errors.password_confirmation}
                                                autoComplete="new-password"
                                                required={true}
                                            />
                                            <FontAwesomeIcon
                                                icon={showConfirmPassword ? faEyeSlash : faEye}
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className={Style.toggle_password_icon}
                                            />
                                        </div>
                                    </Row>

                                    <Button variant="success" className={Style.bottomPaymentBtn} type="submit" disabled={processing}>
                                        Save
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </form>
                </Row>
            </Container>
        </UserAuthLayout>
    );
}
