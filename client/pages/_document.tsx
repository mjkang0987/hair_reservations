import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';

import {Header} from '../components/common/Header';
import {Footer} from "../components/common/Footer";
import {Aside} from "../components/common/Aside";

class ReservationDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        console.log(ctx);
        return {...initialProps};
    }

    render() {
        return (
            <Html lang="ko">
                <Head/>
                <body>
                    <Header/>
                    <main>
                        <Aside/>
                        <Main/>
                        <NextScript/>
                    </main>
                    <Footer/>
                </body>
            </Html>
        );
    }
}

export default ReservationDocument;