import React from 'react';
import Style from "./FilterByDrawer.module.css"
import {uid} from "@/Library/Helper.js";
import AttributeFilter from "@/Pages/Frontend/Shop/AttributeFilter/index.jsx";
import {IoCloseOutline} from "react-icons/io5";

function Index({categories, show, getMFilterEvent}) {
    return (
        <div className={`${Style.filterBySection} d-lg-none d-block ${show?Style.show:""}`}>
            <div className={Style.header}>
                <span>Filter By</span>
                <button
                    type="button"
                    className="btn-light filter_by_section_close"
                    onClick={e => getMFilterEvent("filter_by")}
                >
                    <IoCloseOutline
                        fontSize="22px"
                    />
                </button>
            </div>
            <div className={Style.body}>
                {
                    categories.map((filter, i) => (
                        <AttributeFilter filter={filter} event="1" index={i} key={uid()} sign="৳"/>
                    ))
                }
            </div>
        </div>
    );
}

export default Index;
