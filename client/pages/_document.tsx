import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';

import {ServerStyleSheet} from 'styled-components';
import {Footer} from "../components/common/Footer";
import {Aside} from "../components/common/Aside";

class ReservationDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        console.log(ctx);
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />)
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } finally {
            sheet.seal();
        }
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