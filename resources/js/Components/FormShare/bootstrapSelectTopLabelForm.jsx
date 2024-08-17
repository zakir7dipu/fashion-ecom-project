
import React from 'react';
import {ucwords, uid} from "@/Lib/Helper";
import InputError from "@/Components/UI/InputError";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export const BootstrapSelectTopLabelForm = ({xs="12", mdin="",label="",id="",options=[],valueData="",className="",req="",error="",...inputProp})=> {
    return (
        <>
            <Col xs={xs} md={mdin} className="mb-3">
                <label> {ucwords(label)} <strong className={className}> *</strong></label>
                <select id={id} className="form-control" value={valueData} {...inputProp} required={req}>
                    <option value="" disabled={valueData ? null : true} >Select One</option>
                    {options.map((row,i)=>(
                        <option key={uid()} value={row?.id}>{ucwords(row?.name)}</option>
                    ))}
                </select>
                {error && <InputError message={error} />}
            </Col>
        </>
    );
}







