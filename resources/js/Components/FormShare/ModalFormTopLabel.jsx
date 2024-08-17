
import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {ucwords} from "@/Library/Helper";
import InputError from "@/Components/InputError";


export const ModalFormTopLabel = ({xs="", mdin="", type, id='',label="",error="",className="", ...inputProp})=> {
    return (
        <>
            <Col xs={xs} md={mdin} className="mb-2">
                <label> {ucwords(label)} <strong className={className}> *</strong></label>
                <input
                    id={id}
                    type={type}
                    placeholder={ucwords(label)}
                    className="form-control"
                    {...inputProp}
                    />
                {error && <InputError message={error} />}
            </Col>
        </>
    );
}


