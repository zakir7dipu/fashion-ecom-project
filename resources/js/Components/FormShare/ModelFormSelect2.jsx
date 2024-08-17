
import React from 'react';
import {ucwords} from "@/Library/Helper";
import InputError from "@/Components/InputError";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from 'react-select'

export const ModalFormSelect2 = ({xs="", mdl="", mdin="",label="",options=[],error="", ...inputProp})=> {
    return (
        <>
            <Row className="mb-3">
                <Col xs={xs} md={mdl}>
                    <label className="mt-1"><strong>{ucwords(label)} : </strong></label>
                </Col>
                <Col xs={xs} md={mdin}>
                    <Select
                        isMulti
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="Select Office"
                        {...inputProp}
                    />
                    {error && <InputError message={error} />}
                </Col>
            </Row>
        </>
    );
}


