import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta
                        name="description"
                        content="Anonymous realtime chat"
                    />
                    <meta
                        name="keywords"
                        content="NextJS, Chat, Anonymous, Realtime"
                    />
                    <meta name="author" content="Shoaib Asgar" />
                    <link
                        rel="stylesheet"
                        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    />
                    <link
                        rel="stylesheet"
                        href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>

                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
            </Html>
        );
    }
}

export default MyDocument;
