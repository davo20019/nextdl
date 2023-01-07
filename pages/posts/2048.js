import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';
import Game2048 from "../../components/2048";

export default function FirstPost() {
    const board = [

    ]
    return (
        <Layout>
            <Head>
                <title>The 2048 game v3</title>
            </Head>
            <h1>2048 Game</h1>
            <Game2048 />

        </Layout>
    );
}