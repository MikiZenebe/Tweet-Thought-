import Layout from "@/components/layout";
import "@/styles/globals.css";
import { Router } from "next/router";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/animations/Loading";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });

  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });
  return (
    <>
      {loading ? (
        loading && <Loading />
      ) : (
        <Layout>
          <ToastContainer limit={1} />
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}
