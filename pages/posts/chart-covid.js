import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';
import CovidChart from "../../components/CovidChart";

export default function FirstPost() {
    const dates = [
        '2019-01-01',
        '2019-01-02',
        '2019-01-03',
        '2019-01-04',
        '2019-01-05',
        '2020-01-01',
        '2020-01-02',
        '2020-01-03',
        '2020-01-04',
        '2020-01-05',
        '2021-01-01',
        '2021-01-02',
        '2021-01-03',
        '2021-01-04',
        '2021-01-05'
    ]

    const cases = [
        10,
        15,
        20,
        25,
        30,
        35,
        40,
        45,
        50,
        55,
        60,
        65,
        70,
        75,
        80
    ]

    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>Hello World!!!</h1>
            <CovidChart dates={dates} cases={cases} />
        </Layout>
    );
}