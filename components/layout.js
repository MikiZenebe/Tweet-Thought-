import Head from "next/head";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Devs Thought</title>
        <meta name="description" content="Devs will share their thoughts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/devs.png" />
      </Head>

      <Nav />
      <main>{children}</main>

      <Footer />
    </div>
  );
}
