import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';
import CovidChart from "../../components/highchartsCovid";
import CovidPieChart from "../../components/highchartsPie";

export default function FirstPost() {
    const board = [

    ]
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>2048 Game</h1>
            <CovidChart />
            <div>This is a placeholder</div>
            <CovidPieChart />


        </Layout>
    );
}