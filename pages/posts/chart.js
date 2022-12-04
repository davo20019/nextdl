import Layout from '../../components/layout';
import Head from "next/head";
import Link from "next/link";
import CardLineChart from "../../components/cardLineChart";

export default function CharPost() {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>Hello World!!!</h1>
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
        </Layout>,
        <CardLineChart></CardLineChart>
    );
}