
import React from 'react';
import {ucwords} from "@/Lib/Helper";
import InputError from "@/Components/UI/InputError";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from 'react-select'

export const ModalFormSelect = ({xs="", mdl="", mdin="",label="",options=[],prefix="",error="", ...inputProp})=> {
    return (
        <>
            <Row className="mb-3">
                <Col xs={xs} md={mdl}>
                    <label className="mt-2"><strong>{ucwords(label)} : </strong></label>
                </Col>
                <Col xs={xs} md={mdin}>
                    <Select
                        options={options}
                        className="basic-single"
                        classNamePrefix={prefix}
                        {...inputProp}
                    />
                    {error && <InputError message={error} />}
                </Col>
            </Row>
        </>
    );
}







