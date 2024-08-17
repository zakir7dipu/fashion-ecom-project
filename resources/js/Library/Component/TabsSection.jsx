import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Style from "./TabsSection.module.css";
import Card from "react-bootstrap/Card";
import {useInternalLink} from "@/Library/Helper.js";

function TabsSection({links}) {
    const handleSelect = (eventKey) => {
        let itemCard = document.querySelectorAll(".itemCardDetails")
        Array.from(itemCard).map((card) => {
            card.dataset.id === eventKey?
                card.classList.remove("d-none")
                : card.classList.add("d-none")
        })
    }


    return (
        <>
            <Nav variant="tabs" defaultActiveKey={links[0]?.key} onSelect={handleSelect}>
                {links.map((item, i) =>
                    <Nav.Item key={item?.key} className={Style.itemTab}>
                        <Nav.Link eventKey={item?.key}>{item?.title}</Nav.Link>
                    </Nav.Item>
                )}
            </Nav>

            {links.map((item, i) =>
                <Card className={`${i === 0 ? "" : "d-none"} ${Style.itemCard} itemCardDetails`} key={item?.key} data-id={item?.key}>
                    <Card.Body>
                        <img src={useInternalLink(item?.img)} alt=""/>
                    </Card.Body>
                </Card>
            )}
        </>
    );
}

export default TabsSection;
