import React, {useState} from 'react';

function PageLink({props}) {
    var myStr = window.location.pathname;
    var param =  myStr.substring(1);

    return (
        <>
            <div className="page-header">
                <div className="page-block">
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <div className="page-header-title">
                                <h5 className="m-b-10">{props}</h5>
                            </div>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/admin/dashboard"><i
                                    className="fa fa-home"></i></a></li>
                                <li className="breadcrumb-item">{param}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PageLink;
