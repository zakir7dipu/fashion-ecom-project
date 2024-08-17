import React from 'react';
import Style from "./SortByDrawer.module.css";
import {Container} from "react-bootstrap";
import {IoCloseOutline} from "react-icons/io5";

function Index({show, getMFilterEvent}) {

    return (
        <Container fluid className={`${Style.sortBySection} d-lg-none d-block ${show?Style.show:""}`}>
            <div className={Style.header}>
                <span>Sort By</span>
                <button type="button" className="btn-light sort_by_section_close" onClick={e=>getMFilterEvent("short_by")}>
                    <IoCloseOutline
                        fontSize="22px"
                    />
                </button>
            </div>
            <div className={Style.body}>
                <ul>
                    <li>
                        <div>
                            <input className="form-check-input" type="checkbox" name="sort_by[]" id="sort_box_1"
                                   value=""/>
                            <label className="form-check-label" htmlFor="sort_box_1"><span>Featured</span></label>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input className="form-check-input" type="checkbox" name="sort_by[]" id="sort_box_2"
                                   value=""/>
                            <label className="form-check-label" htmlFor="sort_box_2"><span>Price Low to High</span></label>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input className="form-check-input" type="checkbox" name="sort_by[]" id="sort_box_3"
                                   value=""/>
                            <label className="form-check-label"
                                   htmlFor="sort_box_3"><span>rice High to Low</span></label>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input className="form-check-input" type="checkbox" name="sort_by[]" id="sort_box_4"
                                   value=""/>
                            <label className="form-check-label" htmlFor="sort_box_4"><span>Newest</span></label>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input className="form-check-input" type="checkbox" name="sort_by[]" id="sort_box_5"
                                   value=""/>
                            <label className="form-check-label"
                                   htmlFor="sort_box_5"><span>Best Selling</span></label>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input className="form-check-input" type="checkbox" name="sort_by[]" id="sort_box_6"
                                   value=""/>
                            <label className="form-check-label" htmlFor="sort_box_6"><span>A-Z</span></label>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input className="form-check-input" type="checkbox" name="sort_by[]" id="sort_box_7"
                                   value=""/>
                            <label className="form-check-label" htmlFor="sort_box_7"><span>Z-A</span></label>
                        </div>
                    </li>
                </ul>
            </div>
        </Container>
    );
}

export default Index;
