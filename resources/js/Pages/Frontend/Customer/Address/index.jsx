import React, {useEffect, useState} from 'react';
import UserAuthLayout from "@/Layouts/UserAuthLayout";
import {Head, useForm} from "@inertiajs/react";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import {Col, Container, Row} from "react-bootstrap";
import Style from "../Profile/Profile.module.css";
import Card from "react-bootstrap/Card";

import {inertiaErrorMessage, labelNameRSt, successMessage, warningMessage} from "@/Library/Helper";
import Button from "react-bootstrap/Button";
import {InputFormUser} from "@/Components/FormShare/InputFormUser";
import BdDistrict from "@/Components/BdDistrict";
import Select from 'react-select';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";


export default function Index ({users}){
    const [isLoading,setIsLoading] = useState(false);
    const [editIdData,setEditIdData] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const districtOptions = BdDistrict();

    const { data, setData, errors,progress, processing, post, reset} = useForm({
        'user_id':"",'name':"",'email':"",'phone':"",'address':"",'district':"",'post_code':"",
    });


    const submit = (e) => {
        e.preventDefault();
        post((route('user.address_info_update',editIdData)), {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: (data) => {
                setIsLoading(false);
                successMessage("User Contact Info Update Success");
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
        setData(data => ({ ...data, address: users?.customer?.address}));
        setData(data => ({ ...data, district: users?.customer?.district}));
        setData(data => ({ ...data, post_code: users?.customer?.post_code}));
        setSelectedDistrict({label: users?.customer?.district, value: users?.customer?.district})
    }, [users]);

    const handleMobileNo = (e) => {
        const limit = 11;
        const value = e.target.value.slice(0, limit);
        if (e.target.value.length > limit) {
            warningMessage("Please Enter 11 Digit Mobile No ");
        }
        setData('phone', value);
    };


    const distChangeHandle = (selectedOption) => {
        setSelectedDistrict(selectedOption);
        setData('district', selectedOption.value);
    };

    return (
        <UserAuthLayout>
            <Head title= "User Contact Info" />
            <CircleSpinnerOverlay
                loading={isLoading}
                overlayColor="rgba(0,153,255,0.2)"
                size={30}
            />

            <Container>
                <Row className="g-4">
                    <form onSubmit={(e)=>submit(e)} encType="multipart/form-data" >
                        <Col lg={12}>
                            <Card className={Style.card}>
                                <Card.Body className={Style.cardBody}>
                                    <Card.Title className={Style.cardTitleAddress}>Contact Info</Card.Title>

                                    <Row>
                                        <InputFormUser col_name="12" className="text-danger" type="text" label="Full Name" name="name" value={data?.name} onChange={(e) => setData('name', e.target.value)} error={errors?.name} required={true}/>

                                        <InputFormUser col_name="col-md-6" className="text-danger" type="email" label="email" name="email" value={data?.email} onChange={(e) => setData('email', e.target.value)} error={errors?.email} required={true}/>

                                        <InputFormUser col_name="col-md-6" className="text-danger" type="number" label="Phone Number" name="phone" maxLength={11} onChange={handleMobileNo} value={data.phone} error={errors?.phone} required={true}/>

                                    </Row>

                                    <Card.Title className={Style.cardTitleAddress}>Shipping Info</Card.Title>

                                    <Row>
                                        <InputFormUser col_name="12" className="text-danger" type="text" label="Detailed Address" name="address" value={data?.address} onChange={(e) => setData('address', e.target.value)} error={errors?.address} required={true}/>

                                        <Col lg={6}>
                                            <InputLabel htmlFor="district" value={labelNameRSt("District")} className={Style.inputLabel}/><span className="text-danger">&nbsp;*</span>
                                            <div className="dropdown-container">
                                                <Select
                                                    id="district"
                                                    name="district"
                                                    options={districtOptions}
                                                    value={selectedDistrict}
                                                    placeholder="Select District(জেলা)"
                                                    onChange={distChangeHandle}
                                                />
                                                {errors && <InputError message={errors?.district} />}
                                            </div>

                                        </Col>

                                        <InputFormUser col_name="col-md-6" className="" type="text" label="Post code (Optional)" name="post_code" value={data?.post_code} onChange={(e) => setData('post_code', e.target.value)} error={errors?.post_code}/>

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
