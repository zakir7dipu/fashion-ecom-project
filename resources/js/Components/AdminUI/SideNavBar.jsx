import React from 'react';
import {usePage} from "@inertiajs/react";
import AdminSidebar from "@/Components/AdminUI/AdminSidebar";


export default function SideNavBar ({ toggleSidebar }){
    const { auth } = usePage().props
    const user_role = auth.roles[0]
    return (
        <>
            <nav className="iq-sidebar-menu">
                <ul id="iq-sidebar-toggle" className="iq-menu">

                    {user_role=="super_admin"?
                        <>
                            <AdminSidebar toggleSidebar={toggleSidebar}/>
                        </>
                        :""
                    }
                </ul>
            </nav>
        </>
    );
}
