import React, {useEffect, useState} from 'react';
import UserAuthLayout from "@/Layouts/UserAuthLayout";
import {Head, Link, useForm, usePage} from "@inertiajs/react";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import {Col, Container, Row} from "react-bootstrap";
import Style from "./Profile.module.css"
import Card from "react-bootstrap/Card";

import {inertiaErrorMessage, successMessage, warningMessage} from "@/Library/Helper";
import Button from "react-bootstrap/Button";
import {InputFormUser} from "@/Components/FormShare/InputFormUser";
import {route} from "ziggy-js";

export default function Index ({users}){
    const [isLoading,setIsLoading] = useState(false);
    const [editIdData,setEditIdData] = useState(false);

    const { data, setData, errors,progress, processing, post, reset} = useForm({
        'user_id':"",'name':"",'email':"",'phone':"",
    });

    const submit = (e) => {
        e.preventDefault();
        post((route('user.profile_update',editIdData)), {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: (data) => {
                setIsLoading(false);
                successMessage("User Profile Update Success");
                reset()
            },
            onError: (err) => {
                inertiaErrorMessage(err)
                setIsLoading(false);
            }
        });
    };

    useEffect(() => {
        setEditIdData(users.id)
        setData(data => ({ ...data, user_id: users.id}));
        setData(data => ({ ...data, name: users.name}));
        setData(data => ({ ...data, email: users.email}));
        setData(data => ({ ...data, phone: users.phone}));
    }, [users]);

    const handleMobileNo = (e) => {
        const limit = 11;
        const value = e.target.value.slice(0, limit);
        if (e.target.value.length > limit) {
            warningMessage("Please Enter 11 Digit Mobile No ");
        }
        setData('phone', value);
    };

    return (
        <UserAuthLayout>
            <Head title= "User Profile" />
            <CircleSpinnerOverlay
                loading={isLoading}
                overlayColor="rgba(0,153,255,0.2)"
                size={30}
            />

            <Container>
                <Row className="g-4">
                    <form onSubmit={(e)=>submit(e)} encType="multipart/form-data" >
                        <Col sm={12}>
                            <Card className={Style.card}>
                                <Card.Body className={Style.cardBody}>
                                    <Card.Title className={Style.cardTitle}>Personal Information</Card.Title>

                                    <Row>
                                        <InputFormUser col_name="12" className="text-danger" type="text" label="Full Name" name="name" value={data?.name} onChange={(e) => setData('name', e.target.value)} error={errors?.name} required={true}/>

                                        <InputFormUser col_name="col-md-6" className="text-danger" type="email" label="email" name="email" value={data?.email} onChange={(e) => setData('email', e.target.value)} error={errors?.email} required={true}/>

                                        <InputFormUser col_name="col-md-6" className="text-danger" type="number" label="Phone Number" name="phone" maxLength={11} onChange={handleMobileNo} value={data.phone} error={errors?.phone} required={true}/>

                                    </Row>

                                    <Button variant="success" className={Style.bottomPaymentBtn} type="submit" disabled={processing}> Save
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
