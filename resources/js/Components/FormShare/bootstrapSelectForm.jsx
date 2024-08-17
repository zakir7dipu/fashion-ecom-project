
import React from 'react';
import {ucwords, uid} from "@/Lib/Helper";
import InputError from "@/Components/UI/InputError";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export const BootstrapSelectForm = ({xs="", mdl="", mdin="",label="",id="",options=[],valueData="",req="",error="",...inputProp})=> {
    return (
        <>
            <Row className="mb-3">
                <Col xs={xs} md={mdl}>
                    <label className="mt-2"><strong>{ucwords(label)} : </strong></label>
                </Col>
                <Col xs={xs} md={mdin}>
                    <select id={id} className="form-control" value={valueData} {...inputProp} required={req}>
                        <option value="" disabled={valueData ? null : true} >Select One</option>
                        {options.map((row,i)=>(
                            <option key={uid()} value={row?.id}>{row?.name}</option>
                        ))}
                    </select>
                    {error && <InputError message={error} />}
                </Col>
            </Row>
        </>
    );
}







