import '../styles/global.css';
import Script from 'next/script'
import React from "@types/react";
export default function App({ Component, pageProps }) {
    return (
        <>
            <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXZpRZghGEq3KJt_EPB7nnFu3ttLJfrys" />
            <Component {...pageProps} />
        </>
    )
}