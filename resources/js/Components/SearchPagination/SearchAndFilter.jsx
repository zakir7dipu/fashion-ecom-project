import React, {useRef, useState} from 'react';
import tableCss from "@/Pages/Backend/TableView.module.css";
import TextInput from "@/Components/TextInput";
import {router} from "@inertiajs/react";
import {pickBy} from "lodash";

export default function SearchAndFilter ({maindata,route_link}){

    const perpage = useRef(maindata.per_page);
    const [search, setSearch] = useState("");


    const handleChangePerpage =(e)=>{
        perpage.current = e.target.value;
        getData()
    }

    const handleSearch = (e)=>{
        e.preventDefault();
        var search = e.target.value;
        setSearch(e.target.value)
        getData(search);
    }


    const getData = (search) =>{
        router.get(route(route_link),
            pickBy({
                perpage:perpage.current,
                search:search
            })
            ,{
                preserveScroll:true,
                preserveState:true,
            });
    }

    return (
        <>
            <div className={tableCss.containerSearch}>
                <div className={tableCss.one}>
                    <select
                        name="perpage"
                        id="perpage"
                        className={`rounded-lg ${tableCss.filterBox}`}
                        value={perpage.current}
                        onChange={(e)=>handleChangePerpage(e)}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div className={tableCss.two}>
                    <form>
                        <div className="mb-2 display-flex items-center gap-2">
                            <TextInput
                                type="search"
                                name="search"
                                placeholder="Search...."
                                value={search}
                                onChange={handleSearch}
                                autoFocus={true}
                                className={`form-control ${tableCss.inputWith}`}
                            />
                        </div>
                    </form>
                </div>
                <div className={tableCss.three}>
                    <strong>Total Row : {maindata.total?maindata.total:"0"}</strong>
                </div>
            </div>
        </>
    );
}

