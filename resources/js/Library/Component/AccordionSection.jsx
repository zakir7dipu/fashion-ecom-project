import Accordion from 'react-bootstrap/Accordion';
import {useAccordionButton} from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Style from "./AccordionSection.module.css"
import {createRef} from "react";

function HeaderToggle({children, eventKey, className}) {
    const titleRef = createRef()
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        titleRef.current.classList.toggle(Style.active)
    );

    return (
        <a href="#" onClick={e => e.preventDefault()}>
            <h4
                ref={titleRef}
                className={`${Style.title} ${eventKey=== "0"?Style.active:""}`}
                onClick={decoratedOnClick}
            >
                {children}
            </h4>
        </a>
    );
}

function AccordionSection({title, children, isActive}) {
    return (
        <Accordion defaultActiveKey="0">
            <Card className={Style.card}>
                <Card.Header>
                    <HeaderToggle eventKey={isActive}>{title}</HeaderToggle>
                </Card.Header>
                <Accordion.Collapse eventKey={isActive}>
                    <Card.Body>
                        <p className={Style.text}>{children}</p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default AccordionSection
