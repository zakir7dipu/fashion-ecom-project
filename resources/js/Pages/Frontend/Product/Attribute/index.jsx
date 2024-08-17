import React, {useEffect, useState} from 'react';
import Style from "./Attribute.module.css";

function Index({attributeTitle, productAttribute, setdate, activeData, className}) {
    const [selectedAttribute, setSelectedAttribute] = useState("");
    const AttributeHandle = (attributes) => {
        const attributeString = attributes;
        if (attributeString) {
            const attributeArray = attributeString.split(",");
            return attributeArray.map(item => (
                <button
                    key={item}
                    className={`${selectedAttribute === item ? 'active' : ''} btn ${Style.btn}`}
                    onClick={(e) => attributeSelect(e)}
                >
                    {item}
                </button>
            ));
        }
    }

    const attributeSelect = (e) => {
        const newAttribute = e.target.textContent;
        if (setdate) {
            setdate(newAttribute)
            setSelectedAttribute(newAttribute)
        }
    }

    useEffect(()=>{
        setSelectedAttribute(activeData)
    },[activeData])

    return (
        <div className={Style.attributeSection}>
            {
                attributeTitle && <span className={Style.title}>{attributeTitle}:</span>
            }
            <div className={`${Style.btnSection} ${className}`}>
                {AttributeHandle(productAttribute)}
            </div>
        </div>
    );
}

export default Index;
