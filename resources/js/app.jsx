// import './bootstrap';
// import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from "react";
import {ToastContainer} from "react-toastify";
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import store from './store';

const appName = import.meta.env.VITE_APP_NAME || 'AM Fashion';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);


        root.render(

                <Provider store={store}>
                    <ToastContainer/>
                    <App {...props} />
                </Provider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
