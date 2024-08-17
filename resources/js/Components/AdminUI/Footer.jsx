import React from 'react';

export default function Footer({ auth }) {
    return (
        <>
            <footer className="iq-footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item"><a href="#">Privacy Policy</a>
                                </li>
                                <li className="list-inline-item"><a href="#">Terms of Use</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-6 text-right">
                            Copyright 2024 <a href="#">AM Fashion</a> All Rights Reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

