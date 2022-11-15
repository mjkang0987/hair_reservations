import React from 'react';

import Head from 'next/head';
import type {AppProps} from 'next/app';

import {RecoilRoot} from 'recoil';

import {GlobalStyle} from '../styles/globalStyle';

import LayoutComponent from '../components/LayoutComponent';

function App({Component, pageProps}: AppProps) {
    return (
        <RecoilRoot>
            <Head>
                <title>RESERVATION</title>
            </Head>
            <LayoutComponent>
                <GlobalStyle/>
                <Component {...pageProps} />
            </LayoutComponent>
        </RecoilRoot>
    );
}

export default App;
