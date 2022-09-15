import type {AppProps} from 'next/app';
import {GlobalStyle} from '../styles/globalStyle';

function App({Component, pageProps}: AppProps) {
    return (
        <>
            <GlobalStyle/>
            <Component {...pageProps} />
        </>
    );
}

export default App;
