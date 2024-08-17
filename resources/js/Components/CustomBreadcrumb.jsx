import React from 'react';
import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import {uid} from "@/Library/Helper.js";
import Style from "./CustomBreadcrumb.module.css";

function CustomBreadcrumb({scrambs, children}) {
    const totalScramb = scrambs.length -1
    return (
        <Row>
            <Col lg={9}>
                <Breadcrumb className="">
                    {scrambs.map((scramb, i) => {
                        const {name, url} = scramb
                        return (
                            totalScramb !== i?
                                <Breadcrumb.Item href={url} key={uid()} className={Style.breadcrumbInactive}>{name}</Breadcrumb.Item>
                                :<Breadcrumb.Item key={uid()} className={Style.breadcrumbActive}>{name}</Breadcrumb.Item>
                        )
                    })}
                </Breadcrumb>
            </Col>

            <Col lg={3} className="d-none d-lg-block">{children}</Col>
        </Row>
    );
}

export default CustomBreadcrumb;
