import Head from 'next/head';
import Layout from '../../components/dalle';
import Index from "../../components/dalle";

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>Dall-e api call</title>
            </Head>
            <h1>Lets generate our own images</h1>
            <Index />
        </Layout>
    );
}