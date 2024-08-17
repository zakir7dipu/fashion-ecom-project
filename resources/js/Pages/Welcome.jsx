import { Link, Head } from '@inertiajs/react';
import React from "react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <h2>Hello welcome</h2>
        </>
    );
}
