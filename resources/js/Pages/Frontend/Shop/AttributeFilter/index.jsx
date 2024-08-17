import React from 'react';
import Accordion from "react-bootstrap/Accordion";
import {useAccordionButton} from "react-bootstrap/AccordionButton";
import Style from "./AttributeFilter.module.css";
import Card from "react-bootstrap/Card";
import {uid} from "@/Library/Helper.js";
import PriceFilture from "@/Components/PriceFilture/index.jsx";

function AttributeFilterTitle({children, eventKey}) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <h4
            className={Style.title}
            onClick={decoratedOnClick}
        >
            {children}
        </h4>
    );
}

function AttributeFilterItemElement({title, count}) {
    return (
        <li className={Style.filterLi}>
            <label className={Style.itemLabel}>
                <input type="checkbox" className={Style.inputCheckbox}/>
                <span className={Style.itemLabelTitle}>{title}</span>
            </label>
            <span className={Style.itemLabelTitleCount}>({count})</span>
        </li>
    );
}

function AttributeFilterItem({title, event, data}) {
    return (
        <Card className={Style.filterWrapper}>
            <Card.Header className={Style.filterHeader}>
                <AttributeFilterTitle eventKey={event}>{title}</AttributeFilterTitle>
            </Card.Header>
            <Accordion.Collapse eventKey={event}>
                <Card.Body className={Style.body}>
                    <ul className={Style.filterUl}>
                        {data.map(item => (
                            <AttributeFilterItemElement
                                title={item?.title}
                                count={150}
                                getDataValue=""
                                key={uid()}
                            />
                        ))}
                    </ul>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

function RangeFilter({title, data, sign, event}) {
    const {maxValue, minValue, max} = data
    return (
        <Card className={Style.filterWrapper}>
            <Card.Header className={Style.filterHeader}>
                <AttributeFilterTitle eventKey={event}>{title}</AttributeFilterTitle>
            </Card.Header>
            <Accordion.Collapse eventKey={event}>
                <Card.Body className={Style.body}>
                    <PriceFilture />
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

function Index({filter, index, sign, event}) {
    const {title, dataItems, isRange} = filter

    return (
        <Accordion defaultActiveKey="0">
            {!isRange ?
                <AttributeFilterItem title={title} event={!event?"0":event} data={dataItems}/>
                : <RangeFilter title={title} event="0" data={dataItems} sign={sign}/>
            }

        </Accordion>
    );
}

export default Index;
