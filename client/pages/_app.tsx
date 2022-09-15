import type {AppProps} from 'next/app';

import {GlobalStyle} from '../styles/globalStyle';

import LayoutComponent from '../components/LayoutComponent';

function App({Component, pageProps}: AppProps) {
    return (
        <LayoutComponent>
            <GlobalStyle/>
            <Component {...pageProps} />
        </LayoutComponent>
    );
}

export default App;
