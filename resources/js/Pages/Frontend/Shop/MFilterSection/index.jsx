import React from 'react';
import {Col, Row} from "react-bootstrap";
import SortAscending from "@/Library/CustomIconLibrary/SortAscending.jsx";
import FilterBy from "@/Library/CustomIconLibrary/FilterBy.jsx";
import Style from "./MFilterSection.module.css"

function Index({getMFilterEvent}) {
    return (
        <Row className={`d-lg-none ${Style.section}`}>
            <Col
                className={`col-6 ${Style.sectionLeft}`}
                onClick={e=>{
                    e.preventDefault();
                    getMFilterEvent("short_by")
                }}
            >
                <SortAscending
                    width={25}
                    height={25}
                />
                <span>Sort By</span>
            </Col>

            <Col
                className={`col-6 ${Style.sectionRight}`}
                onClick={e=> {
                    e.preventDefault();
                    getMFilterEvent("filter_by")
                }}
            >
                <FilterBy
                    width={20}
                    height={18}
                />
                <span>Filter By</span>
            </Col>
        </Row>
    );
}

export default Index;
