
import React from 'react';
import {labelNameRSt, ucwords} from "@/Library/Helper";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputError from "@/Components/InputError";


export const ModalForm = ({xs="", mdl="", mdin="", type,id='',label="",error="", ...inputProp})=> {
    return (
        <>
            <Row className="mb-3">
                <Col xs={xs} md={mdl}>
                    <label className="mt-1"><strong>{labelNameRSt(label)} : </strong></label>
                </Col>
                <Col xs={xs} md={mdin}>
                    <input
                        id={id}
                        type={type}
                        placeholder={labelNameRSt(label)}
                        className="form-control"
                        {...inputProp}
                        />
                    {error && <InputError message={error} />}
                </Col>
            </Row>
        </>
    );
}


