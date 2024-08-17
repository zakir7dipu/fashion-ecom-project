
import React from 'react';
import {ucwords} from "@/Lib/Helper";
import InputError from "@/Components/UI/InputError";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BootstrapSwitchButton from "bootstrap-switch-button-react";


export const CheckButtonSwitch = ({md="",label="",error="", ...inputProp})=> {
    return (
        <>
            <Col xs={12} md={md} className="mt-2 mb-2" style={{textAlign:'right'}}>
                <label className="mr-2"><strong>{ucwords(label)} : </strong></label>
                <BootstrapSwitchButton
                    onstyle="success"
                    offstyle="outline-primary"
                    size="xs"
                    onlabel='Yes'
                    offlabel='No'
                    {...inputProp}
                />
                {error && <InputError message={error} />}
            </Col>

        </>
    );
}


