import Head from "next/head";
import styles from "../styles/Home.module.css";
// import Header from "../components/ManualHeader";
import Header from "../components/Header";
import LotteryEntrance from "../components/LotteryEntrance";
import Footer from "../components/Footer";
import Instructions from "../components/Instructions";
// import { Hero } from "web3uikit";

export default function Home() {
    return (
        // <Hero
        //     backgroundURL="https://moralis.io/wp-content/uploads/2021/06/blue-blob-background-2.svg"
        //     height="950px"
        // >
        <div className="bg-repeat bg-gradient-to-t from-indigo-50 to-blue-500">
            <Head>
                <title>LottFi - Decentralized Lottery</title>
                <meta name="description" content="Smart Contract Lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <LotteryEntrance />
            <Instructions />
            <Footer />
        </div>
        // </Hero>
    );
}
