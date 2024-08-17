import React from 'react';
import Nav from "react-bootstrap/Nav";
import {uid} from "@/Library/Helper.js";
import Style from "./TabSection.module.css";

function Index({navItems, tabSelect}) {
    return (
        <Nav variant="underline" defaultActiveKey={navItems.length && navItems[0].tabKey} className={Style.tabSection}>
            {navItems.map(item => {
                const {name, tabKey} = item
                return (
                    <Nav.Item key={uid()}>
                        <Nav.Link
                            className={Style.tabName}
                            href={tabKey}
                            onClick={e=> {
                                e.preventDefault()
                                tabSelect(tabKey)
                            }}
                        >{name}</Nav.Link>
                    </Nav.Item>
                )
            })}

        </Nav>
    );
}

export default Index;
