import React from 'react';
import Style from "@/Pages/Frontend/BottomNav/BottomNav.module.css";
import {Button} from "react-bootstrap";


function ProcessBtn({fromSubmit}) {
    const style = {
        width: "100vw",
        height: "50px",
        borderRadius: "unset"
    }
    return (
        <div className={`${Style.bottomNav} d-lg-none d-block`}>
            <Button
                variant="btn btn-success btn-block"
                style={style}
                onClick={fromSubmit}
            >Continue To Payment</Button>
        </div>
    );
}

export default ProcessBtn;
