
import React from 'react';
import {ucwords} from "@/Lib/Helper";
import InputError from "@/Components/UI/InputError";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from 'react-select'

export const FormSelect2TopLabel = ({xs="", mdin="",label="",options=[],error="",className="", ...inputProp})=> {
    return (
        <>
            <Col xs={xs} md={mdin} className="mb-2">
                <label> {ucwords(label)} <strong className={className}> *</strong></label>
                <Select
                    isMulti
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="Select Office"
                    {...inputProp}
                />
                {error && <InputError message={error} />}
            </Col>
        </>
    );
}


