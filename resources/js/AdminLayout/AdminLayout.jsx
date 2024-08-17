import React from "react";
import "../../admin_asset/css/bootstrap.min.css"
import "../../admin_asset/css/dataTables.bootstrap4.min.css"
import "../../admin_asset/css/typography.css"
import "../../admin_asset/css/style.css"
import "../../admin_asset/css/responsive.css"
import "../../css/admin_style.css"

import "../../admin_asset/js/jquery.min.js"
import "../../admin_asset/js/jquery.counterup.min.js"
import "../../admin_asset/js/slick.min.js"
import "../../admin_asset/js/jquery.magnific-popup.min.js"
import "../../admin_asset/js/smooth-scrollbar.js"
import "../../admin_asset/js/custom.js"
import '@fortawesome/fontawesome-free/css/all.min.css';

const AdminLayout = ({ children }) => {
    return (
        <div id="app">
            {children}
        </div>

    );
};

export default AdminLayout;
