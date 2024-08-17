import React from 'react';
import {Link} from "@inertiajs/react";

export default function CustomPagination ({maindata}){

    return (
        <>
            <div className="items-center justify-between row p-4">
                <div className="items-center col-md-5">
                    Showing {maindata.from} to {maindata.to} total {maindata.total}
                </div>
                <div className="items-center col-md-7">
                    {maindata.links.map((link,index)=> {
                        return(
                            <Link
                                key={index}
                                href={link.url}
                                className="btn btn-sm btn-primary mr-2 text-sm rounded float-left"
                                preserveScroll
                                preserveState
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: link.label
                                    }}
                                />
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    );
}



{/*<div className="items-center justify-between row">*/}
{/*    <div className="items-center col-md-5">*/}
{/*        Showing {maindata.from} to {maindata.to} total {maindata.total}*/}
{/*    </div>*/}
{/*    <div className="items-center col-md-7">*/}
{/*        {maindata.links.map((link,index)=> {*/}
{/*            console.log(link)*/}
{/*            return(*/}
{/*                <Link*/}
{/*                    key={index}*/}
{/*                    href={link.url}*/}
{/*                    className="btn btn-sm btn-primary mr-2 text-sm rounded float-left"*/}
{/*                    preserveScroll*/}
{/*                    preserveState*/}
{/*                >*/}
{/*                    <div*/}
{/*                        dangerouslySetInnerHTML={{*/}
{/*                            __html: link.label*/}
{/*                        }}*/}
{/*                    />*/}
{/*                </Link>*/}
{/*            )*/}
{/*        })}*/}
{/*    </div>*/}
{/*</div>*/}

