import Head from 'next/head';
import Layout from '../../components/layout';
import Index from "../../components/dalle";
import GenerateImage from "../../components/generateimage";

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>Dall-e api call ss</title>
            </Head>
            <h1>Lets generate our own imagesss</h1>
            <GenerateImage />
        </Layout>
    );
}