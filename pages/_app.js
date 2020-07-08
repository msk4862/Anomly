import Head from 'next/head'

import { APP_NAME } from '../utils/Constants'
// Global styles
import '../styles/base.scss'

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>{APP_NAME}</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}
