import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";
import { GlobalContextProvider } from "../context";
import OnboardModal from "../components/OnBoardModal";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Patient Record - Block Chain</title>
      </Head>
      <GlobalContextProvider>
        <Header />
        <div className="relative">
          <OnboardModal />
          <Component {...pageProps} />
        </div>
      </GlobalContextProvider>
    </>
  );
}

export default MyApp;
